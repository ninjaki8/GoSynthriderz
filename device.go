package main

import (
	"bufio"
	"bytes"
	"fmt"
	"os"
	"os/exec"
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
