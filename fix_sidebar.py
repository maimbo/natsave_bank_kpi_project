import os
import re

dashboard_dir = r"c:\sc.saas\natsave_bank_kpi\dashboards"

# Pattern to find the dynamic icon
# <i :data-lucide="expandedMenus.financial ? 'chevron-down' : 'chevron-right'" class="ml-auto" style="width: 16px; height: 16px;"></i>
# We want to capture the menu key (e.g., 'financial')

pattern = re.compile(r'<i :data-lucide="expandedMenus\.(\w+) \? \'chevron-down\' : \'chevron-right\'" (class="[^"]*" style="[^"]*")></i>')

def replace_icon(match):
    key = match.group(1)
    attrs = match.group(2)
    return f'<i v-if="expandedMenus.{key}" data-lucide="chevron-down" {attrs}></i>\n                            <i v-else data-lucide="chevron-right" {attrs}></i>'

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, count = pattern.subn(replace_icon, content)
    
    if count > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {count} icons in {os.path.basename(filepath)}")
    else:
        print(f"No matches in {os.path.basename(filepath)}")

# Iterate over all .html files
for filename in os.listdir(dashboard_dir):
    if filename.endswith(".html") and filename != "roa-roe.html": # roa-roe is already fixed
        process_file(os.path.join(dashboard_dir, filename))
