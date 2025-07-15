package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

// Check adb path
func (a *App) GetAdbPath() string {
	localAppData := os.Getenv("LOCALAPPDATA")
	destDir := filepath.Join(localAppData, "Android", "platform-tools")
	adbPath := filepath.Join(destDir, "adb.exe")

	if _, err := os.Stat(adbPath); err == nil {
		return adbPath
	}

	return "adb not found.."
}

// Get adb version
func (a *App) GetAdbVersion(adbPath string) (string, error) {
	cmd := exec.Command(adbPath, "version")
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("[ERROR] %v", err)
	}

	return fmt.Sprintf("%s\n", string(output)), nil
}

// startAdbServer ensures the ADB server is running and prints its status.
func (a *App) StartAdbServer(adbPath string) error {
	cmd := exec.Command(adbPath, "start-server")
	err := cmd.Run()

	if err != nil {
		return fmt.Errorf("failed to start ADB server: %v", err)
	}

	return nil
}
