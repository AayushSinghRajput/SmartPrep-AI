$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$cwd = (Get-Location).Path
$svgPath = Join-Path $cwd "client\public\logo.svg"
$outPng = Join-Path $cwd "client\public\logo.png"
$htmlPath = Join-Path $cwd "client\public\temp_logo.html"

$svgUri = "file:///" + $svgPath.Replace("\", "/")
$htmlUri = "file:///" + $htmlPath.Replace("\", "/")

$html = @"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  html, body { margin: 0; padding: 0; background: transparent; overflow: hidden; width: 512px; height: 512px; }
  img { width: 512px; height: 512px; display: block; }
</style>
</head>
<body>
  <img src="$svgUri" />
</body>
</html>
"@

Set-Content -Path $htmlPath -Value $html -Encoding UTF8

Start-Process -FilePath $edge -ArgumentList "--headless", "--disable-gpu", "--default-background-color=00000000", "--window-size=512,512", "--screenshot=`"$outPng`"", "`"$htmlUri`"" -Wait -NoNewWindow

Start-Sleep -Seconds 1
Remove-Item $htmlPath -Force -ErrorAction SilentlyContinue

if (Test-Path $outPng) {
    $item = Get-Item $outPng
    Write-Output "Successfully generated logo.png ($($item.Length) bytes)"
} else {
    Write-Output "Failed to generate logo.png"
}

