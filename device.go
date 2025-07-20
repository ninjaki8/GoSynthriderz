package main

import (
	"bufio"
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"regexp"
	"strings"
	"time"
)

// getDeviceSerial scans all connected devices and extracts the serial of the matching device model.
func (a *App) GetDeviceSerial(adbPath string, deviceModel string) (string, error) {
	// Wait 2 seconds to allow USB device to be detected
	time.Sleep(2 * time.Second)

	cmd := exec.Command(adbPath, "devices", "-l")
	output, err := cmd.Output()
	if err != nil {
		return "", err
	}

	scanner := bufio.NewScanner(bytes.NewReader(output))
	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, "List of devices") || strings.TrimSpace(line) == "" {
			continue
		}

		fields := strings.Fields(line)
		if len(fields) < 2 || fields[1] != "device" {
			continue
		}

		serial := fields[0]
		for _, field := range fields {
			if strings.HasPrefix(field, "model:") {
				model := strings.TrimPrefix(field, "model:")
				if model == deviceModel {
					fmt.Printf("Model %s with serial %s found\n", model, serial)
					return serial, nil
				}
			}
		}
	}

	if err := scanner.Err(); err != nil {
		return "", err
	}

	return "", fmt.Errorf("%s not found", deviceModel)
}

// adbRemoteDirExists checks whether a directory exists on the device at the given path.
func (a *App) AdbRemoteDirExists(adbPath string, serial, remotePath string) bool {
	cmd := exec.Command(adbPath, "-s", serial, "shell", "ls", "-d", remotePath)
	err := cmd.Run()

	// If no error, directory exists
	if err == nil {
		return true
	}

	return false
}

// getDeviceSynthFiles creates a map of file names from the contents of a specified folder on the connected device.
func (a *App) GetDeviceSynthFiles(adbPath string, folderPath string, serial string) map[string]bool {
	a.EventLog("Fetching existing beatmaps...")

	cmd := exec.Command(adbPath, "-s", serial, "shell", "ls", folderPath)
	output, err := cmd.Output()
	if err != nil {
		fmt.Printf("Error listing folder %s: %v\n", folderPath, err)
		return map[string]bool{}
	}

	lines := strings.Split(string(output), "\n")

	synthFileNamesMap := make(map[string]bool)
	for _, line := range lines {
		trimmed := strings.TrimSpace(line)
		if trimmed != "" {
			synthFileNamesMap[trimmed] = true
		}
	}

	// Return the map of file names
	return synthFileNamesMap
}

func (a *App) PushBeatmap(adbPath string, filePath string, deviceSerial string, remoteDir string) error {
	if deviceSerial == "" {
		return fmt.Errorf("device serial empty")
	}

	// Push to device
	cmd := exec.Command(adbPath, "-s", deviceSerial, "push", filePath, remoteDir)

	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("adb push failed: %v\nOutput: %s", err, string(output))
	}

	// Clean up
	err = os.Remove(filePath)
	if err != nil {
		fmt.Printf("[WARNING] Failed to delete temp file %s: %v\n", filePath, err)
	}

	return nil
}

func (a *App) GetDeviceProperties(adbPath string, deviceSerial string) (DeviceDetails, error) {
	properties := map[string]string{
		"ro.product.manufacturer": "manufacturer",
		"ro.product.model":        "model",
		"ro.serialno":             "serial_no",
		"ro.product.build.date":   "build_date",
	}

	details := DeviceDetails{}

	for prop, field := range properties {
		cmd := exec.Command(adbPath, "-s", deviceSerial, "shell", "getprop", prop)
		output, err := cmd.Output()
		if err != nil {
			fmt.Printf("Failed to get %s: %v\n", prop, err)
			continue
		}

		value := strings.TrimSpace(string(output))

		// Set the appropriate field based on the property
		switch field {
		case "manufacturer":
			details.Manufacturer = value
		case "model":
			details.Model = value
		case "serial_no":
			details.SerialNo = value
		case "build_date":
			details.BuildDate = value
		}
	}

	// Get battery info
	battery, err := GetQuestBatteryLevel(adbPath, deviceSerial)
	if err != nil {
		fmt.Printf("Failed to get battery level: %v\n", err)
	}
	details.BatteryInfo = battery

	// Get storage info
	storage, err := GetQuestStorageLevel(adbPath, deviceSerial)
	if err != nil {
		fmt.Printf("Failed to get storage info: %v\n", err)
	}

	details.QuestDataUsage.UsedSpace = storage.UsedSpace
	details.QuestDataUsage.TotalSpace = storage.TotalSpace

	return details, nil
}

// GetQuestBatteryLevel executes adb command and returns battery info as JSON
func GetQuestBatteryLevel(adbPath, deviceSerial string) (BatteryInfo, error) {
	// Execute adb command
	cmd := exec.Command(adbPath, "-s", deviceSerial, "shell", "dumpsys", "battery")
	output, err := cmd.Output()
	if err != nil {
		return BatteryInfo{}, fmt.Errorf("failed to execute adb command: %v", err)
	}

	outputStr := string(output)

	// Extract battery level
	levelRegex := regexp.MustCompile(`level:\s*(\d+)`)
	matches := levelRegex.FindStringSubmatch(outputStr)

	if len(matches) < 2 {
		return BatteryInfo{}, nil
	}

	battery := BatteryInfo{
		BatteryLevel: strings.TrimSpace(matches[1]),
	}

	return battery, nil
}

func GetQuestStorageLevel(adbPath, deviceSerial string) (*QuestDataUsage, error) {
	cmd := exec.Command(adbPath, "-s", deviceSerial, "shell", "df", "-h", "/data")
	output, err := cmd.Output()
	if err != nil {
		return nil, fmt.Errorf("failed to execute adb command: %w", err)
	}

	scanner := bufio.NewScanner(strings.NewReader(string(output)))

	// Skip header
	if !scanner.Scan() {
		return nil, fmt.Errorf("no output from df command")
	}

	// Parse data line
	if !scanner.Scan() {
		return nil, fmt.Errorf("no data line found")
	}

	line := strings.TrimSpace(scanner.Text())
	re := regexp.MustCompile(`^(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(.+)$`)
	matches := re.FindStringSubmatch(line)

	if len(matches) != 7 {
		return nil, fmt.Errorf("failed to parse df output")
	}

	return &QuestDataUsage{
		UsedSpace:  matches[3], // Used column
		TotalSpace: matches[2], // Size column
	}, nil
}
