"""Regenerate the public snapshot from canonical Skill Markdown, not original files."""
from pathlib import Path
import argparse,hashlib,json,re
root=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');a=p.parse_args()
data=root/'remote-mcp/data/corpus.json';corpus=json.loads(data.read_text(encoding='utf-8'))
refs=root/'plugin/skills/equity-lesson-design/references'
rows={}
for line in (refs/'checklist-v8-crosswalk.md').read_text(encoding='utf-8').splitlines():
    cells=[c.strip() for c in line.strip().strip('|').split('|')]
    if len(cells)==5 and re.fullmatch(r'C[1-4]-[A-Z]+\d+',cells[0]):rows[cells[0]]=cells
anchors={ident:(level.strip(),text.strip()) for ident,level,text in re.findall(r'^\| (R[1-6]-L[1-4]) \| ([^|]+) \| ([^|]+) \|$',(refs/'rubric-v4-levels.md').read_text(encoding='utf-8'),re.M)}
assert len(rows)==57 and len(anchors)==24
for item in corpus['items']:
    ident=item['id']
    if ident in rows:
        _,page,meaning,links,evidence=rows[ident]
        rubric=re.findall(r'R[1-6]',links)
        item['title']=meaning
        item['text']=meaning+'\nหลักฐานที่ควรสังเกต: '+evidence+'\nRubric links (proposed): '+', '.join(rubric)
        item['source']['location']=f'PDF page {page}; product-created ID {ident}'
    elif ident in anchors:
        level,text=anchors[ident];item['title']=ident+' '+level
        item['text']=text+'\nUse only with requested dimension-specific developmental comparison and adequate reported practice. One activity/vote does not establish L4. Read full rubric guide before comparing levels.'
    else:item['text']=(refs/item['source']['title']).read_text(encoding='utf-8')
body=(json.dumps(corpus,ensure_ascii=False,indent=2)+'\n').encode()
if a.check:
    assert json.loads(data.read_text(encoding='utf-8'))==corpus,'Snapshot differs from canonical Markdown; regenerate and review the diff.'
    print('PASS: 85 snapshot entries match canonical Markdown content and locations.')
else:
    data.write_bytes(body);digest=hashlib.sha256(body).hexdigest()
    (data.parent/'corpus.sha256').write_bytes((digest+'\n').encode())
    (data.parent/'corpus-sha.mjs').write_bytes(('export default '+json.dumps(digest)+';\n').encode())
    print('Regenerated snapshot. Review changes, update version/date if appropriate, run tests, then commit and deploy.')
