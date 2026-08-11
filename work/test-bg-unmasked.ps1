$css = Get-Content -Raw "$PSScriptRoot\..\styles.css"

if ($css -match '(?s)\.hero::after\s*\{.*?\}') {
  throw 'Hero background still has a pseudo-element overlay.'
}

$sceneBlocks = [regex]::Matches($css, '(?s)\.hero-scene\s*\{(.*?)\}')
foreach ($block in $sceneBlocks) {
  if ($block.Groups[1].Value -match 'opacity\s*:\s*(?!1(?:\.0+)?\s*;)[0-9.]+\s*;') {
    throw 'Hero background opacity is still reduced.'
  }
}

$glow = [regex]::Match($css, '(?s)\.product-shot::before\s*\{(.*?)\}')
if (-not $glow.Success) {
  throw 'Product-attached glow is missing.'
}

$glowCss = $glow.Groups[1].Value
if ($glowCss -notmatch 'z-index\s*:\s*0\s*;' -or
    $glowCss -notmatch 'radial-gradient' -or
    $glowCss -notmatch 'rgba\(255,\s*255,\s*255,\s*0\.98\)' -or
    $glowCss -notmatch 'rgba\(122,\s*126,\s*125,\s*0\.16\)') {
  throw 'Product glow does not have the approved neutral white and grey treatment.'
}

if ($glowCss -match 'rgba\(94,\s*190,\s*177' -or $glowCss -match 'rgba\(229,\s*248,\s*244') {
  throw 'Product glow still contains a mint or blue tint.'
}

foreach ($edge in @('top', 'right', 'bottom', 'left')) {
  if ($glowCss -notmatch "$edge\s*:\s*[0-9.]+%\s*;") {
    throw "Product glow must use percentage-based $edge positioning."
  }
}

$phoneBlock = [regex]::Match($css, '(?s)@media \(max-width: 575px\)\s*\{(.*?)\n\}')
if (-not $phoneBlock.Success -or
    $phoneBlock.Groups[1].Value -notmatch '(?s)\.product-shot\s*\{.*?left\s*:\s*50%\s*;.*?right\s*:\s*auto\s*;.*?bottom\s*:\s*0\.75rem\s*;.*?transform\s*:\s*translateX\(-50%\)\s*;') {
  throw 'Phone product composition is not centered and raised above the feature strip.'
}

if ($phoneBlock.Groups[1].Value -match 'right\s*:\s*-') {
  throw 'Phone product composition still uses a negative right offset.'
}

$stackedBlocks = [regex]::Matches($css, '(?s)@media \(max-width: 991px\)\s*\{(.*?)\n\}')
$stackedCss = ($stackedBlocks | ForEach-Object { $_.Groups[1].Value }) -join "`n"
if ($stackedBlocks.Count -eq 0 -or
    $stackedCss -notmatch 'max-height\s*:\s*740px\s*;' -or
    $stackedCss -notmatch '(?s)\.hero-copy\s*\{.*?left\s*:\s*50%\s*;.*?text-align\s*:\s*center\s*;.*?transform\s*:\s*translateX\(-50%\)\s*;') {
  throw 'Small-screen composition is not a centered vertical stack with a bounded hero height.'
}

$landscapeBlock = [regex]::Match($css, '(?s)@media \(orientation: landscape\) and \(max-height: 520px\) and \(max-width: 991px\)\s*\{(.*?)\n\}')
if (-not $landscapeBlock.Success -or
    $landscapeBlock.Groups[1].Value -notmatch 'min-height\s*:\s*360px\s*;' -or
    $landscapeBlock.Groups[1].Value -notmatch '(?s)\.hero-copy\s*\{.*?left\s*:\s*0\s*;.*?width\s*:\s*52%\s*;.*?text-align\s*:\s*left\s*;' -or
    $landscapeBlock.Groups[1].Value -notmatch '(?s)\.product-shot\s*\{.*?left\s*:\s*76%\s*;.*?bottom\s*:\s*50%\s*;') {
  throw 'Compact landscape layout is missing its side-by-side composition.'
}

Write-Output 'PASS: background is unmasked and the subtle glow is attached to the product.'
