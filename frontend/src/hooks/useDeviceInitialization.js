import { useState, useEffect } from "react";
import { GetAdbPath, GetQuestDeviceModel, GetDeviceSerial } from "../../wailsjs/go/main/App";

export const useDeviceInitialization = () => {
  const [adbPath, setAdbPath] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [deviceSerial, setDeviceSerial] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      const newErrors = {};

      // First, get essential data
      const [pathResult, modelResult] = await Promise.allSettled([GetAdbPath(), GetQuestDeviceModel()]);

      // Handle ADB path result
      if (pathResult.status === "fulfilled") {
        setAdbPath(pathResult.value);
      } else {
        console.error("Error getting ADB path:", pathResult.reason);
        newErrors.adbPath = "Failed to get ADB path: " + pathResult.reason?.message;
      }

      // Handle device model result
      if (modelResult.status === "fulfilled") {
        setDeviceModel(modelResult.value);
      } else {
        console.error("Error getting device model:", modelResult.reason);
        newErrors.deviceModel = "Failed to get device model: " + modelResult.reason?.message;
      }

      // Try to get device serial if we have the prerequisites
      const hasPath = pathResult.status === "fulfilled";
      const hasModel = modelResult.status === "fulfilled";

      if (hasPath && hasModel) {
        try {
          const serial = await GetDeviceSerial(pathResult.value, modelResult.value);
          setDeviceSerial(serial);
        } catch (error) {
          console.error("Error getting device serial:", error);
          newErrors.deviceSerial = "Device not connected: " + error;
          setDeviceSerial("");
        }
      } else {
        newErrors.deviceSerial = "Cannot get device serial - missing ADB path or device model";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...newErrors,
        }));
      }
      setLoading(false);
    };

    initializeApp();
  }, []);

  // Return all the state and any helper functions
  return {
    adbPath,
    deviceModel,
    deviceSerial,
    loading,
    errors,
    setErrors,
    // You could also return refresh function
    refresh: () => {
      setLoading(true);
      // Re-run the initialization logic
    },
  };
};
