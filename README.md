# Equity Learning Design Agent

Thai-friendly support for teachers: **Coach → Quick QA → Improve Plan → Design Inclusive STEM**. Choose a mode naturally in conversation. Use 5E when useful or requested; teachers may choose another lesson structure.

## What is distinctive

The workflow connects lesson evidence to operational summaries of six rubric dimensions with 24 developmental anchors, 57 V8 checklist entries, contextual Mini-Box coaching and a proportionate check before delivering a draft. It distinguishes role rotation from real influence, plan intentions from observed classroom practice, and participation from compulsory public speech.

The connected build adds two read-only MCP tools: `search_equity_library` then `get_equity_items`. Search finds relevant IDs; exact retrieval supplies the summary, source version/location and citation link before use. The library has **85 entries**: 57 checklist summaries, 24 rubric anchors and 4 guides. It is a 2026-10-23 snapshot, with product-created IDs, not official item numbering or live Google Drive access.

## Status and use

See [release status](docs/submission/RELEASE-STATUS.md) for actual deployment, test and review states. This repository is not a claim of OpenAI approval or publication. No teacher pilot or verified learner outcome is claimed.

- [Workshop Prompt without installation](docs/WORKSHOP-PROMPT-TH.txt)
- [Training, 5–6 November 2026](docs/TRAINING-NOV-5-6-TH.md)
- [Skill source](plugin/skills/equity-lesson-design/SKILL.md)
- [Source versions and terminology](plugin/skills/equity-lesson-design/references/framework-sources.md)
- [Privacy](docs/privacy.md) · [Terms](docs/terms.md) · [Support](https://github.com/jatosa555-creator/equity-learning-design-agent/issues)

The publisher **CHANON PHAJUNDA** confirmed permission to publish these original summaries for this project. Original DOCX/PDF files, institutional logos, personal teacher/student information and development credentials are excluded. This is not an institutional certification or endorsement. Use generic topics only in MCP requests.

## Development

Node 22+, Python 3.11+ for packaging. From `remote-mcp`: `npm ci --ignore-scripts`, `npm test`, `npm run build`, `npm start`. Lockfile pins the dependency tree. Production uses a separate Netlify project under team jatosa555; the Teacher Growth Partner endpoint is not modified or reused.

Canonical Skill source is in `plugin/`. `scripts/build_connected.py` generates the connected ZIP by overlaying its retrieval guidance and manifest. Do not hand-edit generated releases or upload the full development handoff as a Plugin ZIP. No MCP client needs a GitHub or private Drive token to read this public snapshot.
