from pathlib import Path
import re

root=Path('src/app/docs')
files=list(root.rglob('page.tsx'))
byline_html='''
        <p className="text-sm text-muted-foreground mb-4">By <strong>CM Regmi</strong> • Published May 26, 2026</p>
'''

for f in files:
    s=f.read_text(encoding='utf-8')
    if 'By <strong>CM Regmi' in s:
        print('skip',f)
        continue
    # find first closing h1 tag
    m=re.search(r"(<h1[\s\S]*?>[\s\S]*?<\\/h1>)",s)
    if m:
        insert_point=m.end()
        s=s[:insert_point]+"\n"+byline_html+s[insert_point:]
        f.write_text(s,encoding='utf-8')
        words=len(re.findall(r"\\w+",s))
        print('patched',f,words)
    else:
        print('no h1',f)
