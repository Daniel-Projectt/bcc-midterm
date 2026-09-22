Add-Type -AssemblyName System.Drawing
$ROOT = Split-Path -Parent $PSScriptRoot

$cParch  = [System.Drawing.Color]::FromArgb(248,245,238)
$cLight  = [System.Drawing.Color]::FromArgb(255,254,251)
$cGold   = [System.Drawing.Color]::FromArgb(122,47,51)     # oxblood
$cGoldLt = [System.Drawing.Color]::FromArgb(169,146,130)   # warm taupe
$cInk    = [System.Drawing.Color]::FromArgb(31,27,24)
$cMuted  = [System.Drawing.Color]::FromArgb(138,128,120)

function New-Canvas($w, $h) {
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear($cParch)
  $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
  $gp.AddEllipse(-($w*0.15), -($h*0.5), ($w*1.3), ($h*1.6))
  $br = New-Object System.Drawing.Drawing2D.PathGradientBrush($gp)
  $br.CenterPoint = New-Object System.Drawing.PointF(($w/2), ($h*0.36))
  $br.CenterColor = $cLight; $br.SurroundColors = @($cParch)
  $g.FillRectangle($br, 0, 0, $w, $h); $br.Dispose(); $gp.Dispose()
  return @($bmp, $g)
}
function Draw-Diamond($g, $brush, $cx, $cy, $r) {
  $pts = @((New-Object System.Drawing.PointF($cx, ($cy-$r))), (New-Object System.Drawing.PointF(($cx+$r), $cy)),
           (New-Object System.Drawing.PointF($cx, ($cy+$r))), (New-Object System.Drawing.PointF(($cx-$r), $cy)))
  $g.FillPolygon($brush, $pts)
}
function Draw-Frame($g, $w, $h, $inset) {
  $p1 = New-Object System.Drawing.Pen(([System.Drawing.Color]::FromArgb(150, $cGoldLt)), 2.0)
  $p2 = New-Object System.Drawing.Pen(([System.Drawing.Color]::FromArgb(90,  $cGoldLt)), 1.0)
  $g.DrawRectangle($p1, $inset, $inset, ($w - 2*$inset), ($h - 2*$inset))
  $g.DrawRectangle($p2, ($inset+10), ($inset+10), ($w - 2*$inset - 20), ($h - 2*$inset - 20))
  $gb = New-Object System.Drawing.SolidBrush($cGold)
  foreach ($c in @(@($inset,$inset), @(($w-$inset),$inset), @($inset,($h-$inset)), @(($w-$inset),($h-$inset)))) { Draw-Diamond $g $gb $c[0] $c[1] 6 }
}
function Draw-Tracked($g, $text, $font, $brush, $cx, $y, $track) {
  $sf = [System.Drawing.StringFormat]::GenericTypographic
  $sz = New-Object System.Drawing.SizeF(3000, 300)
  $ws = @(); $tot = 0
  foreach ($ch in $text.ToCharArray()) { $wd = $g.MeasureString([string]$ch, $font, $sz, $sf).Width; if ($ch -eq ' ') { $wd = $font.Size * 0.32 }; $ws += $wd; $tot += $wd + $track }
  $tot -= $track; $x = $cx - $tot/2
  for ($i = 0; $i -lt $text.Length; $i++) { $g.DrawString([string]$text[$i], $font, $brush, $x, $y, $sf); $x += $ws[$i] + $track }
}
function Draw-Centered($g, $text, $font, $brush, $w, $y) {
  $sf = New-Object System.Drawing.StringFormat; $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $g.DrawString($text, $font, $brush, (New-Object System.Drawing.RectangleF(0, $y, $w, 420)), $sf)
}
function Draw-Flourish($g, $cx, $y, $half) {
  $pen = New-Object System.Drawing.Pen($cGoldLt, 1.6); $pen.StartCap = 'Round'; $pen.EndCap = 'Round'
  $pen2 = New-Object System.Drawing.Pen(([System.Drawing.Color]::FromArgb(150, $cGoldLt)), 1.0)
  foreach ($s in @(-1, 1)) {
    $a = @((New-Object System.Drawing.PointF(($cx + $s*$half), ($y+10))), (New-Object System.Drawing.PointF(($cx + $s*$half*0.8), ($y-22))),
           (New-Object System.Drawing.PointF(($cx + $s*$half*0.5), ($y-24))), (New-Object System.Drawing.PointF(($cx + $s*$half*0.33), ($y-2))),
           (New-Object System.Drawing.PointF(($cx + $s*$half*0.2), ($y+12))), (New-Object System.Drawing.PointF(($cx + $s*$half*0.1), ($y+16))),
           (New-Object System.Drawing.PointF($cx, $y)))
    $g.DrawBeziers($pen, $a)
    $b = @((New-Object System.Drawing.PointF(($cx + $s*$half*0.86), ($y+18))), (New-Object System.Drawing.PointF(($cx + $s*$half*0.66), ($y-4))),
           (New-Object System.Drawing.PointF(($cx + $s*$half*0.45), ($y-6))), (New-Object System.Drawing.PointF(($cx + $s*$half*0.3), ($y+6))),
           (New-Object System.Drawing.PointF(($cx + $s*$half*0.18), ($y+16))), (New-Object System.Drawing.PointF(($cx + $s*$half*0.09), ($y+19))),
           (New-Object System.Drawing.PointF($cx, ($y+6))))
    $g.DrawBeziers($pen2, $b)
    $ax = $cx + $s*$half - 11
    $g.DrawArc($pen, $ax, ($y+2), 22, 22, 300, 300)
  }
  Draw-Diamond $g (New-Object System.Drawing.SolidBrush($cGoldLt)) $cx ($y+1) 5
}

# ---------------- preview 1200 x 630 ----------------
$W = 1200; $H = 630
$c = New-Canvas $W $H; $bmp = $c[0]; $g = $c[1]
Draw-Frame $g $W $H 30
$gold = New-Object System.Drawing.SolidBrush($cGold); $ink = New-Object System.Drawing.SolidBrush($cInk); $muted = New-Object System.Drawing.SolidBrush($cMuted)
Draw-Tracked $g 'MIDTERM REVIEW' (New-Object System.Drawing.Font('Segoe UI', 17)) $gold ($W/2) 112 9
Draw-Centered $g 'Biblical Care' (New-Object System.Drawing.Font('Palatino Linotype', 60, [System.Drawing.FontStyle]::Bold)) $ink $W 170
$bi = [System.Drawing.FontStyle]::Bold -bor [System.Drawing.FontStyle]::Italic
Draw-Centered $g '& Counseling' (New-Object System.Drawing.Font('Palatino Linotype', 60, $bi)) $ink $W 268
Draw-Flourish $g ($W/2) 412 250
Draw-Centered $g 'Key figures  ~  Organizations  ~  History  ~  Theology  ~  Essays' (New-Object System.Drawing.Font('Palatino Linotype', 17, [System.Drawing.FontStyle]::Italic)) $muted $W 468
Draw-Centered $g 'Charts, flashcards, matching, quizzes and a full mock exam' (New-Object System.Drawing.Font('Palatino Linotype', 15)) $muted $W 512
$g.Dispose(); $bmp.Save((Join-Path $ROOT 'preview.png'), [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()

# ---------------- icon 512 x 512 ----------------
$c = New-Canvas 512 512; $bmp = $c[0]; $g = $c[1]
Draw-Frame $g 512 512 26
Draw-Centered $g 'BC' (New-Object System.Drawing.Font('Palatino Linotype', 140, [System.Drawing.FontStyle]::Bold)) $ink 512 92
Draw-Flourish $g 256 370 150
$g.Dispose(); $bmp.Save((Join-Path $ROOT 'icon.png'), [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
"preview.png " + [math]::Round((Get-Item (Join-Path $ROOT 'preview.png')).Length/1KB) + " KB; icon.png " + [math]::Round((Get-Item (Join-Path $ROOT 'icon.png')).Length/1KB) + " KB"
