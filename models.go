package main

// Beatmap represents a single beatmap entry in the API response
type Beatmap struct {
	Filename    string `json:"filename"`
	DownloadUrl string `json:"download_url"`
}

// BeatmapPage represents a single paginated response from the API
type BeatmapPage struct {
	Data      []Beatmap `json:"data"`
	Count     int       `json:"count"`
	Total     int       `json:"total"`
	Page      int       `json:"page"`
	PageCount int       `json:"pageCount"`
}

// Device details struct for Quest 3 props
type DeviceDetails struct {
	Manufacturer string `json:"manufacturer"`
	Model        string `json:"model"`
	SerialNo     string `json:"serial_no"`
	BuildDate    string `json:"build_date"`
	BatteryInfo
	QuestDataUsage
}

// Quest Battery info struct
type BatteryInfo struct {
	BatteryLevel string `json:"battery_level"`
}

// Quest Storage struct
type QuestDataUsage struct {
	UsedSpace  string `json:"used_space"`
	TotalSpace string `json:"total_space"`
}
