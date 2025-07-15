/**
 * Parses ADB version output string into a structured object
 * @param {string} adbOutput - Raw ADB version output string
 * @returns {Object} Parsed ADB version data with version, buildVersion, installPath, and platform
 */
export const parseAdbVersion = (adbOutput) => {
  // Handle null, undefined, or empty input
  if (!adbOutput || typeof adbOutput !== 'string') {
    return {
      version: null,
      buildVersion: null,
      installPath: null,
      platform: null
    };
  }
  
  const lines = adbOutput.trim().split('\n');
  
  // Extract version from first line (if it exists)
  const versionMatch = lines[0]?.match(/Android Debug Bridge version (\d+\.\d+\.\d+)/);
  const version = versionMatch ? versionMatch[1] : null;
  
  // Extract build version from second line (if it exists)
  const buildVersionMatch = lines[1]?.match(/Version (.+)/);
  const buildVersion = buildVersionMatch ? buildVersionMatch[1] : null;
  
  // Extract install path from third line (if it exists)
  const installPathMatch = lines[2]?.match(/Installed as (.+)/);
  const installPath = installPathMatch ? installPathMatch[1] : null;
  
  // Extract platform from fourth line (if it exists)
  const platformMatch = lines[3]?.match(/Running on (.+)/);
  const platform = platformMatch ? platformMatch[1] : null;
  
  return {
    version,
    buildVersion,
    installPath,
    platform
  };
};