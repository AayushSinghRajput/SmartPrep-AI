Add-Type -AssemblyName System.Drawing

$size = 512
$bmp = New-Object System.Drawing.Bitmap $size, $size
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

# Rounded squircle path
function Get-RoundedRectPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    return $path
}

$rectPath = Get-RoundedRectPath 16 16 480 480 108

# Background Gradient
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.PointF 0, 0),
    (New-Object System.Drawing.PointF $size, $size),
    [System.Drawing.Color]::FromArgb(255, 30, 27, 75),
    [System.Drawing.Color]::FromArgb(255, 67, 56, 202)
)
$g.FillPath($bgBrush, $rectPath)

# Outer Border Glow Pen
$ringPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(140, 129, 140, 248), 4)
$g.DrawPath($ringPen, $rectPath)

# 1. Left Wing (Upper Loop of S)
$ptsL = @(
    (New-Object System.Drawing.PointF 256, 128),
    (New-Object System.Drawing.PointF 190, 128),
    (New-Object System.Drawing.PointF 140, 168),
    (New-Object System.Drawing.PointF 140, 222),
    (New-Object System.Drawing.PointF 140, 268),
    (New-Object System.Drawing.PointF 180, 308),
    (New-Object System.Drawing.PointF 244, 316),
    (New-Object System.Drawing.PointF 272, 276),
    (New-Object System.Drawing.PointF 216, 268),
    (New-Object System.Drawing.PointF 192, 248),
    (New-Object System.Drawing.PointF 192, 220),
    (New-Object System.Drawing.PointF 192, 192),
    (New-Object System.Drawing.PointF 220, 172),
    (New-Object System.Drawing.PointF 256, 172)
)
$bL = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.PointF 140, 128),
    (New-Object System.Drawing.PointF 272, 316),
    [System.Drawing.Color]::FromArgb(255, 165, 180, 252),
    [System.Drawing.Color]::FromArgb(255, 79, 70, 229)
)
$g.FillPolygon($bL, $ptsL)

# 2. Lower Loop (Lower Loop of S)
$ptsLow = @(
    (New-Object System.Drawing.PointF 256, 384),
    (New-Object System.Drawing.PointF 322, 384),
    (New-Object System.Drawing.PointF 372, 344),
    (New-Object System.Drawing.PointF 372, 290),
    (New-Object System.Drawing.PointF 372, 244),
    (New-Object System.Drawing.PointF 332, 204),
    (New-Object System.Drawing.PointF 268, 196),
    (New-Object System.Drawing.PointF 240, 236),
    (New-Object System.Drawing.PointF 296, 244),
    (New-Object System.Drawing.PointF 320, 264),
    (New-Object System.Drawing.PointF 320, 292),
    (New-Object System.Drawing.PointF 320, 320),
    (New-Object System.Drawing.PointF 292, 340),
    (New-Object System.Drawing.PointF 256, 340)
)
$bLow = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.PointF 240, 196),
    (New-Object System.Drawing.PointF 372, 384),
    [System.Drawing.Color]::FromArgb(255, 129, 140, 248),
    [System.Drawing.Color]::FromArgb(255, 49, 46, 129)
)
$g.FillPolygon($bLow, $ptsLow)

# 3. Ascension Forward Wing (Right Wing)
$ptsWing = @(
    (New-Object System.Drawing.PointF 256, 172),
    (New-Object System.Drawing.PointF 372, 118),
    (New-Object System.Drawing.PointF 390, 132),
    (New-Object System.Drawing.PointF 374, 238),
    (New-Object System.Drawing.PointF 350, 252),
    (New-Object System.Drawing.PointF 256, 210)
)
$bWing = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.PointF 256, 118),
    (New-Object System.Drawing.PointF 390, 252),
    [System.Drawing.Color]::FromArgb(255, 103, 232, 249),
    [System.Drawing.Color]::FromArgb(255, 2, 132, 199)
)
$g.FillPolygon($bWing, $ptsWing)

# 4. Golden Academic Honor Ribbon
$ptsGold = @(
    (New-Object System.Drawing.PointF 174, 294),
    (New-Object System.Drawing.PointF 256, 332),
    (New-Object System.Drawing.PointF 338, 294),
    (New-Object System.Drawing.PointF 350, 306),
    (New-Object System.Drawing.PointF 256, 396),
    (New-Object System.Drawing.PointF 162, 306)
)
$bGold = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.PointF 162, 294),
    (New-Object System.Drawing.PointF 350, 396),
    [System.Drawing.Color]::FromArgb(255, 253, 224, 71),
    [System.Drawing.Color]::FromArgb(255, 217, 119, 6)
)
$g.FillPolygon($bGold, $ptsGold)

# 5. AI Sparkle Star (Diamond star at nexus)
$starPts = @(
    (New-Object System.Drawing.PointF 256, 216),
    (New-Object System.Drawing.PointF 266, 246),
    (New-Object System.Drawing.PointF 296, 256),
    (New-Object System.Drawing.PointF 266, 266),
    (New-Object System.Drawing.PointF 256, 296),
    (New-Object System.Drawing.PointF 246, 266),
    (New-Object System.Drawing.PointF 216, 256),
    (New-Object System.Drawing.PointF 246, 246)
)
$g.FillPolygon([System.Drawing.Brushes]::White, $starPts)
$g.FillEllipse([System.Drawing.Brushes]::Cyan, 251, 251, 10, 10)
$g.FillEllipse([System.Drawing.Brushes]::White, 253, 253, 6, 6)

# Orbit Nodes
$g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 56, 189, 248))), 384, 122, 14, 14)
$g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 165, 180, 252))), 124, 216, 10, 10)

# Save 512x512 logo.png
$bmp.Save("client/public/logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Save 180x180 apple-touch-icon.png
$appleBmp = New-Object System.Drawing.Bitmap 180, 180
$gApple = [System.Drawing.Graphics]::FromImage($appleBmp)
$gApple.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gApple.DrawImage($bmp, 0, 0, 180, 180)
$appleBmp.Save("client/public/apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$gApple.Dispose()
$appleBmp.Dispose()

# Save 32x32 favicon.ico
$icoBmp = New-Object System.Drawing.Bitmap 32, 32
$gIco = [System.Drawing.Graphics]::FromImage($icoBmp)
$gIco.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gIco.DrawImage($bmp, 0, 0, 32, 32)
$iconHandle = $icoBmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($iconHandle)
$fs = [System.IO.File]::Create("client/public/favicon.ico")
$icon.Save($fs)
$fs.Close()
$gIco.Dispose()
$icoBmp.Dispose()

$g.Dispose()
$bmp.Dispose()

Write-Output "Successfully generated: logo.png (512x512), apple-touch-icon.png (180x180), and favicon.ico (32x32)!"

