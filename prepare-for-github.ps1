# Prepares a folder for GitHub upload (no node_modules, no .git)
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$out = Join-Path $root "github-upload-ready"

if (Test-Path $out) { Remove-Item $out -Recurse -Force }
New-Item -ItemType Directory -Path $out | Out-Null

$copyItems = @(
  "artifacts",
  "lib",
  "api",
  "scripts",
  "attached_assets",
  ".gitignore",
  ".npmrc",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "tsconfig.base.json",
  "tsconfig.json",
  "vercel.json"
)

foreach ($item in $copyItems) {
  $src = Join-Path $root $item
  if (-not (Test-Path $src)) {
    Write-Warning "Skip missing: $item"
    continue
  }
  $dest = Join-Path $out $item
  Copy-Item -Path $src -Destination $dest -Recurse -Force
}

$zip = Join-Path $root "final-landing-page-upload.zip"
if (Test-Path $zip) { Remove-Item $zip -Force }
Compress-Archive -Path (Join-Path $out "*") -DestinationPath $zip -Force

Write-Host ""
Write-Host "Done." -ForegroundColor Green
Write-Host "Folder: $out"
Write-Host "ZIP:    $zip"
Write-Host "Upload contents to GitHub repo final-landing-page"
