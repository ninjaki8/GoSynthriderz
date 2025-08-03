package main

import (
	"fmt"
	"os/exec"
	"runtime"
	"strings"
	"syscall"
)

func IsPluggedInWindows() bool {
	cmd := exec.Command("powershell.exe", "-Command", `Get-PnpDevice -PresentOnly | Where-Object { $_.InstanceId -like 'USB\VID_*' } | Select-Object -ExpandProperty InstanceId`)
	cmd.SysProcAttr = &syscall.SysProcAttr{
		HideWindow:    true,
		CreationFlags: 0x08000000, // CREATE_NO_WINDOW
	}
	output, err := cmd.Output()
	if err != nil {
		fmt.Println("Error running PowerShell:", err)
		return false
	}

	return strings.Contains(string(output), USB_VENDOR_ID_WINDOWS)
}

func IsUsbAvailable() bool {
	_, err := exec.LookPath("lsusb")
	return err == nil
}

func IsPluggedInLinux() bool {
	if !IsUsbAvailable() {
		fmt.Println("Error: 'lsusb' not found. Please install it (e.g., with 'sudo pacman -S usbutils').")
		return false
	}

	out, err := exec.Command("lsusb").Output()
	if err != nil {
		fmt.Println("Failed to run lsusb:", err)
		return false
	}

	lines := strings.Split(string(out), "\n")
	for _, line := range lines {
		if strings.Contains(line, USB_VENDOR_ID_LINUX) {
			return true
		}
	}

	return false
}

func (a *App) IsQuestUsbConnected() bool {
	switch runtime.GOOS {
	case "windows":
		if IsPluggedInWindows() {
			return true
		}

	case "linux":
		if IsPluggedInLinux() {
			return true
		}
	}

	return false
}
