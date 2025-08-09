# === CONFIGURATION ===

# Paths
$exePath = "C:\Users\ninjaki8\Desktop\GoSynthriderz\build\bin\GoSynthriderz.exe"
$signtoolPath = "C:\Program Files (x86)\Windows Kits\10\bin\10.0.26100.0\x64\signtool.exe"
$pfxExportPath = "C:\Users\ninjaki8\Desktop\codesign_test.pfx"

# Password for .pfx export - choose a strong password
$pfxPasswordPlain = "123456"

# === SCRIPT ===

# Step 1: Create self-signed code signing certificate
Write-Output "Creating self-signed code signing certificate..."
$cert = New-SelfSignedCertificate -Type CodeSigningCert -Subject "CN=GoSynthriderz Cert" -KeyExportPolicy Exportable -CertStoreLocation Cert:\CurrentUser\My

if ($null -eq $cert) {
    Write-Error "Failed to create self-signed certificate."
    exit 1
}

# Step 2: Export the certificate as .pfx
Write-Output "Exporting certificate to $pfxExportPath..."
$pfxPassword = ConvertTo-SecureString -String $pfxPasswordPlain -Force -AsPlainText
Export-PfxCertificate -Cert "Cert:\CurrentUser\My\$($cert.Thumbprint)" -FilePath $pfxExportPath -Password $pfxPassword

if (-Not (Test-Path $pfxExportPath)) {
    Write-Error "Failed to export .pfx file."
    exit 1
}

# Step 3: Validate paths
if (-Not (Test-Path $signtoolPath)) {
    Write-Error "signtool.exe not found at $signtoolPath"
    exit 1
}

if (-Not (Test-Path $exePath)) {
    Write-Error "Executable not found at $exePath"
    exit 1
}

# Step 4: Sign the executable
Write-Output "Signing $exePath with certificate..."

& "$signtoolPath" sign /f "$pfxExportPath" /p "$pfxPasswordPlain" /tr http://timestamp.digicert.com /td sha256 /fd sha256 "$exePath"

if ($LASTEXITCODE -eq 0) {
    Write-Output "Signing succeeded!"
} else {
    Write-Error "Signing failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}
