package main

const USB_VENDOR_ID_WINDOWS = "VID_2833"
const USB_VENDOR_ID_LINUX = "2833:"
const QUEST_DEVICE_MODEL = "Quest_3"
const SYNTHRIDERS_FOLDER = "/sdcard/SynthRidersUC/CustomSongs/"
const API_ENDPOINT = "https://synthriderz.com/api/beatmaps"
const BASE_URL = "https://synthriderz.com"

func (a *App) GetQuestDeviceModel() string {
	return QUEST_DEVICE_MODEL
}

func (a *App) GetSynthridersFolder() string {
	return SYNTHRIDERS_FOLDER
}
