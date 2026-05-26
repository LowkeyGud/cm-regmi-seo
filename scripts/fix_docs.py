from pathlib import Path
import re
root=Path('src/app/docs')
marker='\n\n        <section className="space-y-4 mt-6">'
byline='\n        <p className="text-sm text-muted-foreground mb-4">By <strong>CM Regmi</strong> • Published May 26, 2026</p>\n'
patched_files=[]
for f in root.rglob('page.tsx'):
    s=f.read_text(encoding='utf-8')
    idx_main_close=s.rfind('</main>')
    idx_marker=s.find(marker)
    changed=False
    if idx_marker!=-1 and idx_main_close!=-1:
        # If marker is after main close, move block
        if idx_marker>idx_main_close:
            block=s[idx_marker:]
            s=s[:idx_marker]
            # insert block before </main>
            s=s[:idx_main_close]+block+s[idx_main_close:]
            changed=True
    # insert byline after first </h1>
    if 'By <strong>CM Regmi' not in s:
        m=re.search(r'(</h1>)',s)
        if m:
            pos=m.end()
            s=s[:pos]+byline+s[pos:]
            changed=True
    if changed:
        f.write_text(s,encoding='utf-8')
        patched_files.append(f)
print('patched',len(patched_files),'files')
for p in patched_files:
    print(p)
