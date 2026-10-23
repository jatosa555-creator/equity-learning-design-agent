# Knowledge maintenance

Canonical teaching text lives in `plugin/skills/equity-lesson-design/references/`. The MCP JSON is a generated, dated snapshot of those summaries. Do not edit the JSON text and Markdown independently.

1. Confirm permission for new content and keep original files and personal records out of this repository.
2. Edit the relevant Markdown. Preserve stable product IDs and exact source version/location. Check against the source; never claim original-file access from a summary alone.
3. Run `python scripts/build_corpus.py --check`. For an intended change, run without `--check` to regenerate the snapshot and its SHA files. Review the diff; update snapshot date/version and relevant item metadata when the source changes. The helper preserves existing tags/provenance; adding/removing entries needs an explicit schema/count and test update.
4. From remote-mcp run `npm ci --ignore-scripts`, `npm test` and `npm run build`. Commit the reviewed source, regenerated data and hashes. Git continuous deployment publishes the new snapshot; then run `node scripts/live-check.mjs` against production and record actual results.
5. Rebuild the Plugin ZIP when its Skill, metadata or packaged Markdown changes and upload that ZIP to OpenAI. A server deploy alone does not update the packaged fallback or approve a new Plugin version.

This is not live Drive sync. Adding a file to Google Drive does not update this MCP automatically. No student/teacher memory or records are stored. Keep external-source permission separate from source availability. `build_corpus.py` uses the project's existing 85-entry inventory; expanding it requires deliberate ID/provenance and test maintenance.
