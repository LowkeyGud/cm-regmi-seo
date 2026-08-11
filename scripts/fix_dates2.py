#!/usr/bin/env python3
"""Fix remaining future dates in all documentation files"""
import os
import re
from datetime import datetime

current_date = datetime.now()
current_year = current_date.year

docs_dir = "/workspace/src/app/docs"

for root, dirs, files in os.walk(docs_dir):
    for file in files:
        if file == "page.tsx":
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            original_content = content
            
            # Fix any remaining 2026 dates in code examples (backups_2026-05-20 -> backups_2024-05-20)
            content = re.sub(r'backups_2026-', f'backups_{current_year-2}-', content)
            
            if content != original_content:
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Fixed dates in: {filepath}")

print("Date fixing complete!")
