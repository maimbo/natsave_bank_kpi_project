$dashboardsPath = "c:\sc.saas\natsave_bank_kpi\dashboards"
$files = Get-ChildItem "$dashboardsPath\*.html"

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Replace Vue directives with vanilla JavaScript
    # 1. Replace @click.prevent="toggleMenu('financial')" with data-menu="financial"
    $content = $content -replace '@click\.prevent="toggleMenu\(''(\w+)''\)"', 'data-menu="$1"'
    
    # 2. Replace dynamic chevron icons with static ones + class
    $content = $content -replace ':data-lucide="expandedMenus\.(\w+) \? ''chevron-down'' : ''chevron-right''" class="ml-auto"', 'data-lucide="chevron-right" class="ml-auto menu-chevron"'
    
    # 3. Remove v-if from sub-menus (show/hide will be controlled by JS)
    $content = $content -replace ' v-if="expandedMenus\.\w+"', ' style="display:none;"'
    
    # 4. Remove :class bindings from sub-links (active class will be added by JS)
    $content = $content -replace ' :class="\{ ''active'': currentPage === ''\w+'' \}"', ''
    
    # 5. Remove v-cloak from app div
    $content = $content -replace ' v-cloak', ''
    
    # Save the file
    Set-Content $file.FullName -Value $content -Encoding UTF8 -NoNewline
}

Write-Host "`nDone! Converted all files to vanilla JavaScript."
