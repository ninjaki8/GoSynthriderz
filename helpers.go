package main

import "fmt"

func (a *App) SyncNewBeatmaps(allPages []BeatmapPage, synthFilesMap map[string]bool, adbPath string, serial string) {
	// Loop through all beatmaps and check if each filename exists on the device
	var newBeatmaps []Beatmap
	for _, page := range allPages {
		for _, beatmap := range page.Data {
			if !synthFilesMap[beatmap.Filename] {
				newBeatmaps = append(newBeatmaps, beatmap)
			}
		}
	}

	// Display new number of beatmaps to download
	newBeatmapsTotal := len(newBeatmaps)
	if newBeatmapsTotal > 0 {
		a.EventLog(fmt.Sprintf("Found %d new beatmaps to download:\n", newBeatmapsTotal))

		// Download new beatmaps and upload to device
		for i, bm := range newBeatmaps {
			// GET beatmap URL
			filePath, err := a.DownloadBeatmap(bm)
			if err != nil {
				a.EventLog(fmt.Sprintf("Failed to download beatmap %v", err))
				continue
			}

			// Push file to device
			err = a.PushBeatmap(adbPath, filePath, bm.Filename, serial, SYNTHRIDERS_FOLDER)
			if err != nil {
				a.EventLog(fmt.Sprintf("Error: %v", err))
			} else {
				a.EventLog(fmt.Sprintf("[Uploaded %d/%d] %s", i+1, newBeatmapsTotal, bm.Filename))
			}
		}
	}

	a.EventLog("Task complete!")
}
