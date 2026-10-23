# Start here — connected RC3

Read AGENTS.md and docs/submission/RELEASE-STATUS.md. Keep this repository and endpoint separate from Teacher Growth Partner and Emergency-Ready STEM.

## Product

Coach, Quick QA, Improve Plan and Design Inclusive STEM. 5E is optional. Rubric V4 has 24 summarized developmental anchors; Checklist V8 has 57 project-mapped entries. Four guides complete an 85-entry public corpus. Source permission is recorded in docs/submission/content-authorization.json. No original documents or personal records are included.

## Build and check

1. Python3.11+: `python scripts/build_corpus.py --check` checks Markdown against the snapshot. See docs/KNOWLEDGE-MAINTENANCE.md before changing knowledge content.
2. Node22+, from remote-mcp: `npm ci --ignore-scripts`, `npm test`, `npm run build`. Seven local test groups cover the real SDK and boundaries.
3. From remote-mcp: `node scripts/live-check.mjs` calls production and records actual public responses. Thirteen protocol checks are separate from model/teacher evaluation. Do not use personal data in a test.
4. From repository root: `python scripts/build_connected.py --demo-url https://github.com/jatosa555-creator/equity-learning-design-agent/releases/download/mcp-review-demo-v1/Equity-MCP-Actual-Response-Walkthrough.mp4`. This verifies health and the video URL, then generates the connected ZIP and receipt. Review the ZIP before uploading; do not upload the full handoff archive.
5. Git main is connected to Netlify. Push reviewed changes, confirm a ready production deploy and actual HTTPS behavior. Production is public; previews are private. Do not weaken these controls or purchase services without authorization.

## Evidence and release gates

The inherited RC2 behavior was reviewed in 54 full-context and 14 fallback simulations. The new connected route has local SDK/live HTTPS checks; these are not proof of native ChatGPT installation, mobile/free-account usability or teacher outcomes. An installed RC2 CLI smoke was blocked by execution policy and was not treated as PASS or bypassed.

The portal draft has a new connected package name, not MCP added onto a published Skills-only listing. Exactly five positive and three out-of-scope negative review prompts are supplied in docs/submission/CONNECTED-REVIEW-CASES.json. Functional not-found/invalid-input tests remain in the MCP tests.

The owner explicitly confirmed all six actual portal attestations and authorized Submit for this Equity draft. Submission succeeded on 2026-10-23: the detail page shows metadata/skills 1.0.0-rc.3 · In review, Publication Not published and MCP Configured. See docs/submission/RELEASE-STATUS.md and the screenshot in the handoff. Do not submit a duplicate. For a future submission, inspect the actual current findings, domain, video, cases and attestations and obtain any newly required owner confirmation. Keep Not submitted / In review / Approved / Published distinct.

For training on 5–6 November2026, use docs/WORKSHOP-PROMPT-TH.txt and the examples. The plain Prompt has less source detail than the complete Skill and no live retrieval; rehearse the actual teacher account. No approval deadline is guaranteed.
