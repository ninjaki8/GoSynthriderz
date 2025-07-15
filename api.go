package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

// fetchPage performs an HTTP GET request for a specific page number and returns the decoded BeatmapPage
func (a *App) FetchPage(page int) (BeatmapPage, error) {
	client := &http.Client{Timeout: 10 * time.Second}
	url := fmt.Sprintf("%s?page=%d", API_ENDPOINT, page)
	a.EventLog(url)

	resp, err := client.Get(url)
	if err != nil {
		return BeatmapPage{}, fmt.Errorf("request failed for page %d: %w", page, err)
	}
	defer resp.Body.Close()

	var apiResponse BeatmapPage
	if err := json.NewDecoder(resp.Body).Decode(&apiResponse); err != nil {
		return BeatmapPage{}, fmt.Errorf("JSON decode failed for page %d: %w", page, err)
	}

	return apiResponse, nil
}

func (a *App) FetchAllPages(totalPages int) []BeatmapPage {
	var allPages []BeatmapPage

	for page := 1; page <= totalPages; page++ {
		p, err := a.FetchPage(page)
		if err != nil {
			a.EventLog(fmt.Sprintf("Failed to fetch page %d: %v", page, err))
			continue
		}
		allPages = append(allPages, p)
	}

	return allPages
}

func (a *App) DownloadBeatmap(b Beatmap) (string, error) {
	// Step 1: Download file
	url := BASE_URL + b.DownloadUrl
	resp, err := http.Get(url)
	if err != nil {
		return "", fmt.Errorf("failed to download %s: %v", b.Filename, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("download failed for %s: status %s", b.Filename, resp.Status)
	}

	// Step 2: Save to a temp file
	tmpPath := filepath.Join(os.TempDir(), b.Filename)
	outFile, err := os.Create(tmpPath)
	if err != nil {
		return "", fmt.Errorf("failed to create file: %v", err)
	}
	defer outFile.Close()

	_, err = io.Copy(outFile, resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to write file: %v", err)
	}

	return tmpPath, nil
}
