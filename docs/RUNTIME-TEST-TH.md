# การทดสอบ runtime RC2

วันที่ 23 ตุลาคม 2026

## สิ่งที่ยืนยันได้

ติดตั้ง snapshot RC2 ใน local plugin cache แล้ว ผลเทียบ bytes อยู่ `_development/evidence/runtime-review.json` ให้ดูรายไฟล์และจำนวนจริงจาก JSON

## สิ่งที่ยังไม่ผ่าน

attempt-200 มีคำตอบครบ 4 คำขอ แต่ทุกคำขอรายงานอ่าน Skill ไม่ได้ และ stderr มี `exec_command ... rejected: blocked by policy` รวมทั้งคำเตือนชื่อ plugin config จึงเป็น BLOCKED ไม่ใช่ผ่านการอ่าน/โหลดไฟล์ ผล CLI exit0 ไม่ใช่หลักฐานว่าใช้ Skill แล้ว

ไม่มีการเปลี่ยน shell หรือช่องทางเพื่อหลบการปฏิเสธในรอบต่อจากพักงาน ต้องแก้ข้อจำกัดของสภาพแวดล้อมที่รองรับก่อนทดสอบซ้ำ ไม่เปลี่ยน config กลางของผู้ใช้ การมีชื่อ Skill ใน catalog ของแชตนี้ไม่แทนการตรวจเส้นทางใช้งานครู

RC1 เคยอ่านจาก cache ได้ 2 คำขอเมื่อระบุ path แต่เป็นรุ่นเก่า ไม่ยกผลนั้นเป็น RC2 การค้นพบจากชื่อ CLI ใน RC1 ยังไม่สำเร็จ

Full-context simulation54 และ fallback14 ไม่อ่าน cache และไม่พิสูจน์ progressive loading หรือการติดตั้งผ่าน Directory

## ทดลองครู/แพลตฟอร์ม

ยังไม่มี RC2 native ChatGPT/mobile/free-account installation หรือ teacher pilot การทดลอง web4โหมดเป็น RC1 หนึ่งบัญชีและมี Memory updated ที่แจ้งเจ้าของแล้ว ต้องตรวจการตั้งค่าบัญชีก่อนซ้อมจริง

MCP/deployment ตามคำสั่งใหม่แยกรายงานใน docs/submission/RELEASE-STATUS.md ของ connected project ไม่อ้างผล Skills-only ว่าพิสูจน์ endpoint
