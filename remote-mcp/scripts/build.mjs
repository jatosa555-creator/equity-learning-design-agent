import {mkdir,writeFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
await writeFile('dist/index.html','<!doctype html><html lang="en"><meta charset="utf-8"><title>Equity Learning Knowledge</title><h1>Equity Learning Knowledge</h1><p>Public read-only teaching summaries. No live Drive sync.</p><a href="https://github.com/jatosa555-creator/equity-learning-design-agent">Project, support and policies</a></html>');
