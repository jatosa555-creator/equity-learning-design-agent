# แผนการใช้ในการอบรมวันที่ 5–6 พฤศจิกายน 2026

## เพิ่มเติมสำหรับรุ่น1.0 RC

ใช้ `examples/SCIENCE-WORKSHOP-TH.md` สาธิตCoach→Quick QA→Improve และ `examples/MATH-WORKSHOP-TH.md` สาธิตDesignพร้อมใบงาน/exit ticket ให้ครูสังเกตdelivery QAที่ตรวจคำสั่งจริง ไม่ใช้คำว่าแผนผ่านแปลว่าผลเสมอภาคเกิดแล้ว

เริ่มต้นได้4คำสั่ง: “ขอปรึกษาเรื่อง...” / “ช่วยตรวจแผนนี้...” / “ปรับแผนเลย คงเงื่อนไขเดิม...” / “ออกแบบกิจกรรมจากเป้าหมายนี้...” ขอ “ตรวจละเอียดตามเงื่อนไขก่อนส่ง” ได้เมื่อต้องการรายงานรายข้อ ไม่ต้องบอกประเภทบัญชี

หากติดตั้งไม่ได้ เปิดแชตใหม่ วางWORKSHOP-PROMPT-TH.txt แล้วพิมพ์โจทย์ ไม่แสดงข้อมูลนักเรียนจริง ชุดตัวอย่างเป็นข้อมูลสังเคราะห์ การsimulationในCLIยังไม่ใช่หลักฐานว่าบัญชีครูทุกบัญชีใช้ได้ ต้องซ้อมบนแพลตฟอร์มเป้าหมายและเก็บข้อจำกัดก่อนอบรม

## ทางเลือก 5E

ครูขอ “ปรับเป็น 5E ฉบับย่อ” หรือ “ออกแบบ 5E สองคาบ” ได้ หากคาบสั้นหรือมีโครงสร้างเดิมให้คงโครงสร้างครู ไม่บังคับครบห้าขั้นทุกคาบ ตัวอย่างอยู่ `examples/OPTIONAL-5E-TH.md`

## สองแทร็กพร้อมกัน
**Track A: Plugin public listing** — ตรวจสิทธิ์เนื้อหา, ทำแพ็กเกจและเทส, ใช้ Plugin Creator/Developer Portal สแกนแล้วส่งตรวจเมื่อพร้อม; การยื่นไม่การันตีอนุมัติภายในกำหนด. นี่เป็น RC สำหรับตรวจภายใน ยังไม่ผ่านการอนุมัติเผยแพร่สาธารณะ.
**Track B: Workshop fallback** — เตรียม prompt handout, 2 lesson case studies, facilitator demonstration บนบัญชีผู้สอน, สไลด์ QR ไปยังคู่มือ/ไฟล์ prompt ที่แชร์อย่างได้รับอนุญาต. ไม่อาศัยอนุมัติ Plugin.

## Daily checkpoints
- **22–24 Oct:** freeze terminology and license/credit clearance; choose review rubric (6 dimensions) and HIP examples; define 4 modes (Coach + 3 original).
- **25–27 Oct:** Codex scaffolding, 30 core tests + 4 optional 5E cases, 2 lesson examples in science/math, Thai wording, privacy and no-unfounded-score QA.
- **28–30 Oct:** run teacher pilot with available users; submission portal checks; revise.
- **31 Oct–2 Nov:** freeze workshop fallback kit and facilitator slides; submit plugin when *fully ready* (do not submit as demo-only).
- **3–4 Nov:** full rehearsal and screenshots, offline backup prompts, contingency workflow.
- **5–6 Nov:** 15-minute demonstration + 20–30-minute teacher practice and 3D reflection; record anonymous usability feedback.

## Workshop exercise 30 minutes (Coach first)
1. 4 min: Teacher types a real, anonymized classroom dilemma; Coach asks one relevant question with Equity lens.
2. 5 min: Short teacher–Coach dialogue to choose one small experiment; coach can give direct advice if requested.
3. 5 min: Paste/attach existing lesson plan (privacy scrub); Quick QA returns evidence vs unknown (Rubric 6).
4. 8 min: Improve Plan with 1–2 HIPs, not every practice.
5. 5 min: Partner feedback; agree one classroom test.
6. 3 min: Record one change + one signal of equitable participation.

**Fallback if time is limited:** 20–25 minutes, Coach 3 minutes then Quick QA 5 + Improve 8 + peer review 4 + exit card 2.


## Acceptance criteria
- Thai instructions understood without technology training;
- teachers can ask advice in Coach Mode without being forced to upload a plan; teachers can finish a review and one actionable lesson improvement;
- no invented score, national curriculum reference or inferred student identity;
- HIP selected aligns with objectives and not everything added at once;
- classroom evidence plan present;
- fallback works even if no public listing approved.


## สาธิตจุดเด่น V4/V8 ใน RC2

ใช้ examples/FRAMEWORK-DEPTH-DEMO-TH.md: ให้ครูลอง “เด็กสลับหน้าที่แล้ว แต่หัวหน้าคนเดิมเลือกทุกครั้ง” แล้วสังเกตว่า Agent แยกบทบาทจากสิทธิจริงอย่างไร ต่อ Quick QA → Improve โดยคงเวลาและทรัพยากร ให้คู่ครูตรวจข้อเสนอที่มีผลต่อการตัดสินใจและเหตุผลรายคน ใช้ micro-evidence-card-th.md เลือกทดลองเพียงหนึ่งประเด็น

กรณีสำรอง: “เด็กตอบว่าสนุก แต่ยังไม่มีเหตุผลหรือก้าวต่อ” และ “ไม่อยากพูดความรู้สึกต่อหน้าชั้น” ตรวจว่า Agent เคารพทางเลือกและไม่สรุปความเข้าใจจากความเงียบหรืออารมณ์ การซ้อมนี้ไม่ใช่การให้ระดับครูหรือรับรองห้องเรียน

Workshop Prompt มีบทสรุป V4/V8 แต่ไม่ได้บรรจุ descriptor เต็ม 24 ช่อง หากต้องเทียบละเอียดให้เปิดบทสรุป rubric-v4-levels.md เพิ่มและมีหลักฐานที่ตรงมิติ ไม่สมมติว่าการวาง Prompt ทำให้มีข้อมูลการสอนจริง
