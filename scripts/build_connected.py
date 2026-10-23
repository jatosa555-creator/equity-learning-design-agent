"""Build initial connected package from one canonical Skill tree; no upload."""
import argparse,hashlib,json,zipfile
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request,urlopen

root=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--endpoint',default='https://equity-learning-knowledge.netlify.app/mcp');p.add_argument('--demo-url');p.add_argument('--offline',action='store_true',help='Build draft only; never mark live verification')
a=p.parse_args();u=urlparse(a.endpoint)
if u.scheme!='https' or u.path!='/mcp' or u.username or u.password:p.error('Use actual HTTPS /mcp URL without credentials')
health=None
if not a.offline:
    with urlopen(a.endpoint[:-4]+'/health',timeout=30) as r:health=json.load(r)
    expected=(root/'remote-mcp/data/corpus.sha256').read_text().strip()
    assert health.get('status')=='ok' and health.get('items')==85 and health.get('corpus_sha256')==expected
if a.demo_url:
    d=urlparse(a.demo_url)
    if d.scheme!='https' or d.username or d.password:p.error('Demo must be actual public HTTPS URL')
    with urlopen(Request(a.demo_url,method='HEAD'),timeout=30) as r:assert r.status==200
files={f.relative_to(root/'plugin').as_posix():f.read_bytes() for f in (root/'plugin').rglob('*') if f.is_file()}
m=json.loads(files['plugin.json']);m['name']='equity-learning-design-agent-connected';m['version']='1.0.0-rc.3'
m['description']='Thai teacher coaching, lesson QA and inclusive STEM design with read-only, source-backed equity reference retrieval.'
o=m['extensions']['com.openai'];i=o['interface']
i['longDescription']='Equity Learning Design Agent supports teachers in Thai through Coach, Quick QA, Improve Plan and Design Inclusive STEM. It distinguishes meaningful learner influence from role rotation and checks drafts against the teacher’s goals, time, materials and requested components. Optional 5E remains the teacher’s choice.\n\nA public read-only MCP searches and reads 85 owner-authorized summary entries: 24 Rubric V4 anchors, 57 Checklist V8 entries and four Mini-Box/Compass/HIP/3D guides. Items include IDs, source version/location, summary links and a dated snapshot. Product IDs and mappings are not official numbering. Search generic teaching topics only; never send personal records.\n\nNo live Drive sync, school database, persistent memory, automated messaging, formal teacher rating, institutional certification or verified learner outcome is provided. Teachers make final decisions and review drafts before use. If retrieval is unavailable, the packaged Markdown snapshot offers a bounded fallback.'
i['capabilities']=['Teacher coaching','Review and improve a lesson','Design inclusive STEM activities','Search and read source-backed teaching summaries']
o['publication']['release_notes']='Initial connected build: separate public read-only equity library MCP, search then exact-item source tracing, 2026-10-23 Markdown fallback, four modes and optional 5E. No private Drive access.'
o['publication']['translations']['th-TH']['description']='คู่คิดครู 4 โหมด: Coach, Quick QA, Improve Plan และ Design Inclusive STEM พร้อมค้นและอ่านบทสรุปคลังความรู้ 85 รายการผ่าน MCP แยก ระบุรหัส รุ่น และตำแหน่งอ้างอิง ใช้ 5E ได้ตามครูเลือก ตรวจงานตามเป้าหมาย เวลา และอุปกรณ์ก่อนส่ง ครูตัดสินใจขั้นสุดท้าย ไม่มี Drive สด ฐานข้อมูลโรงเรียน ความจำข้ามแชต หรือการรับรองหน่วยงาน'
o['review']={'test_cases':json.loads((root/'docs/submission/CONNECTED-REVIEW-CASES.json').read_text(encoding='utf-8')),'commerce':False}
if a.demo_url:o['review']['demo_recording_url']=a.demo_url
files['plugin.json']=(json.dumps(m,ensure_ascii=False,indent=2)+'\n').encode()
files['mcp.json']=(json.dumps({'$schema':'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json','mcpServers':{'equity-learning-knowledge':{'type':'streamable-http','url':a.endpoint}}},indent=2)+'\n').encode()
files['skills/equity-lesson-design/references/connected-retrieval.md']=(root/'packaging/connected/connected-retrieval.md').read_bytes()
key='skills/equity-lesson-design/SKILL.md';files[key]=files[key].replace(b'| 1.0.0-rc.2',b'| 1.0.0-rc.3')+b'\n\n## Connected retrieval\n\nFor source-backed criteria, exact source requests or use of the connected equity library, read `references/connected-retrieval.md` and follow search then exact-item retrieval. General coaching does not require a tool call.\n'
key='skills/equity-lesson-design/references/framework-sources.md';files[key]+='\n\nRelease permission update, 2026-10-23: the owner explicitly authorized these original summaries for this project’s public GitHub and separate MCP. No original files, logos or individual learner records are included; no institutional endorsement is implied.\n'.encode()
assert all(not name.endswith(('.pdf','.docx','.env')) for name in files)
out=root/'dist/Equity_Learning_Design_Agent_Connected_v1.0.0-rc.3.zip';out.parent.mkdir(exist_ok=True)
files['MANIFEST.sha256']=''.join(hashlib.sha256(data).hexdigest()+'  '+name+'\n' for name,data in sorted(files.items())).encode()
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    for name,data in sorted(files.items()):
        info=zipfile.ZipInfo(name,date_time=(2026,10,23,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,data)
with zipfile.ZipFile(out) as z:
    assert z.testzip() is None and len(z.namelist())==len(set(z.namelist()))==len(files)
    assert all(z.read(n)==d for n,d in files.items())
receipt={'version':m['version'],'name':m['name'],'zip':out.name,'files':len(files),'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'endpoint':a.endpoint,'health':health,'demo_recording_url':a.demo_url,'status':'Draft; not submitted or approved','review_recording_present':bool(a.demo_url),'crc_and_byte_comparison':'PASS'}
out.with_suffix('.receipt.json').write_text(json.dumps(receipt,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(receipt,ensure_ascii=False,indent=2))
