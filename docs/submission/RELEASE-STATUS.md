# RELEASE STATUS — Equity Learning Design Agent

วันที่ 23 ตุลาคม 2026 — **ส่งสำเร็จ: In review / Not published**

## ทำแล้ว

- Connected package `equity-learning-design-agent-connected` รุ่น **1.0.0-rc.3**, 23 ไฟล์ runtime รวม manifest/checksum. คง4โหมดและoptional5E เพิ่ม public read-only MCP แยก ไม่มี database/dashboard/Driveสด/ความจำข้ามแชต
- Publisher: **CHANON PHAJUNDA** ยืนยันจากเจ้าของและตรง Developer identity ในพอร์ทัล
- เจ้าของยืนยันสิทธิ์บทสรุป V4 24 ช่อง, V8 57 ข้อ, Mini-Box/Compass/HIP/3D สำหรับโครงการนี้โดยเฉพาะ รวม85 retrieval entries ไม่รวมต้นฉบับ/โลโก้/ข้อมูลบุคคล
- Repository: https://github.com/jatosa555-creator/equity-learning-design-agent
- Support: repository/issues; Privacy: repository/blob/main/docs/privacy.md; Terms: repository/blob/main/docs/terms.md. ตรวจ HTTP200 ของทั้ง4URLจริงแล้ว
- Netlify: **equity-learning-knowledge**, site ID `6d598053-b00c-4f58-832a-c3d57a683641`, team jatosa555. Git continuous deployment main/base remote-mcp. Commit `288ee1aa58ee38f39016bf11fc244c1cc5a7aef0` เกิด production deploy `6adb154e0c65b43cc659f5c6` ready หลัง push ยืนยันCDได้จริง
- Production public; previews private. No Auth ใช้เฉพาะคลังบทสรุปสาธารณะ ที่ https://equity-learning-knowledge.netlify.app/mcp; health https://equity-learning-knowledge.netlify.app/health
- Snapshot 2026-10-23 SHA256 `02e70c0f0d70a59a8831127a88ab60965b7ffb44c40a9a6c9b1b48a19970f081`; สคริปต์ตรวจ85รายการตรง Markdown และสร้าง snapshot ซ้ำได้
- ทดสอบ local MCP7/7กลุ่ม; HTTPSจริง13/13; ZIPpreflight16/16; URLจริง6/6. การทดสอบเหล่านี้ไม่แทน native installation หรือ teacher pilot
- RC2เดิม full-context54/54 และ Promptสำรอง14/14 PASS ตามขอบเขตในรายงาน; installed CLI attempt-200 BLOCKED4/4 ไม่ยกเป็น PASS และไม่หลบนโยบาย
- วิดีโอ56วินาทีและ JSONคำตอบจริงเผยแพร่โดยเจ้าของอนุญาตเฉพาะแล้ว: https://github.com/jatosa555-creator/equity-learning-design-agent/releases/tag/mcp-review-demo-v1 เป็น walkthrough จาก saved actual HTTPS responses ไม่ใช่การอัด nativeChatGPT หรือการทดลองครู

## OpenAI submission ที่ตรวจจริง

- Plugin ID: `plugin_asdk_app_6adb1381225081919e95f6afff05ff86`
- Draft/version ID: `appsub_6adb1381228081919b57e2defc87572c`
- https://platform.openai.com/plugins/manage/plugin_asdk_app_6adb1381225081919e95f6afff05ff86
- Skill: **Checks passed**. MCP: **Configured**, **Domain verified**, เครื่องมือ `search_equity_library` และ `get_equity_items`; latest MCP scan **No findings**
- Metadata มีคำเตือน **ไม่บล็อก**: automated privacy-policy assessment could not be completed. ห้ามเรียกว่าPrivacyผ่านตรวจแล้ว
- ข้อมูลรีวิวมี5positive/3negativeและวิดีโอURLจริง แก้ negativeข้อแรกจากunknownIDเป็นงานโอนเงินนอกขอบเขตตามนิยามพอร์ทัล; not-foundยังทดสอบในระบบต่อ
- ดาวน์โหลด draft กลับมาตรวจแล้ว **เนื้อหาทั้ง23ไฟล์ตรงต้นทางทุกbyte** พอร์ทัลแพ็กZIPใหม่จึงทำให้hashตัวarchiveต่างกัน ดู portal-draft-verification.json

## SHA256

- Source ZIP: `e6d852d09d0441e0e72da49be894f1a9c2d659c758d29019c44eeab6873db8a3`
- Portal-downloaded ZIP: `28d32bd35c78483c0f0ac0bfb17c5769c4cc186d80d040414cae8987567917a8`

## ส่งพิจารณาสำเร็จแล้ว

- เจ้าของ CHANON PHAJUNDA ยืนยันข้อความรับรองจริงทั้ง6ข้อและอนุญาต Submit สำหรับ Equity โดยเฉพาะ จากนั้นตรวจ draft/ถ้อยคำเดิม ติ๊กทั้ง6ข้อ และกด Submit
- ตรวจผลจากพอร์ทัลจริงวันที่23ตุลาคม2026: **Review status In review**, **Publication Not published**, **MCP Configured**, เมนูเวอร์ชัน **1.0.0-rc.3 · In review**
- หน้ารวมแสดง Version1.0.0 แต่หน้ารายละเอียดระบุ metadata/skills1.0.0-rc.3 ตามแพ็กเกจที่ส่ง ไม่ได้เปลี่ยน ZIP หลังส่ง
- หลักฐานในชุด handoff: `_development/evidence/connected/openai-in-review.png` และ `portal-draft-verification.json` โดยเก็บ receipt ก่อนส่งแยกไว้
- การส่งนี้ไม่ใช่การอนุมัติหรือ Publish และไม่มีการรับประกันระยะเวลาตรวจ

## ขั้นต่อไป

1. รอผลพิจารณาจาก OpenAI และแก้ตามข้อเสนอแนะถ้ามี ยังไม่มีการสร้าง automation เฝ้าติดตาม
2. ถ้าอนุมัติภายหลัง ค่อย Publish ตามคำอนุญาตและทดสอบติดตั้งบัญชีเป้าหมาย/มือถือ/บัญชีฟรี ไม่อ้างผลการเรียนรู้ที่ยังไม่ได้ทดลอง
3. อบรม5–6พฤศจิกายน2026มี Prompt สำรองและตัวอย่างให้ซ้อม ยังต้องทดลองครูจริง

Teacher Growth Partner เป็นตัวอย่าง **In review / Not published** แยกจากโครงการนี้ ไม่ได้แก้endpointหรือรายการเดิม ไม่มีautomationเฝ้าติดตามถูกสร้าง
