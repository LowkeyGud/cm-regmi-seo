#!/usr/bin/env python3
"""Fix future dates in all documentation files"""
import os
import re
from datetime import datetime

current_date = datetime.now()
current_year = current_date.year
current_month = current_date.month
current_day = current_date.day

docs_dir = "/workspace/src/app/docs"

# Map of old dates to new dates
date_replacements = {
    "2026-05-24": f"{current_year-1}-05-24",
    "2026-05-27": f"{current_year-1}-05-27",
    "May 26, 2026": f"May 26, {current_year-1}",
    "May 27, 2026": f"May 27, {current_year-1}",
}

for root, dirs, files in os.walk(docs_dir):
    for file in files:
        if file == "page.tsx":
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            original_content = content
            for old_date, new_date in date_replacements.items():
                content = content.replace(old_date, new_date)
            
            if content != original_content:
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Fixed dates in: {filepath}")

print("Date fixing complete!")
