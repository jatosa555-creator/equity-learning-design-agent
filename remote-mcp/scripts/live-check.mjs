import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {corpusHash} from '../lib/library.mjs';
const base=(process.argv[2]??'https://equity-learning-knowledge.netlify.app').replace(/\/$/,'');
const log=[];let seq=0;
async function send(method,params={}){
  const input={jsonrpc:'2.0',id:++seq,method,params};
  const res=await fetch(base+'/mcp',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json, text/event-stream'},body:JSON.stringify(input)});
  const body=await res.json();log.push({input,http_status:res.status,body});return body;
}
const checks=[];const check=(name,pass)=>{assert.ok(pass,name);checks.push({name,pass:true});};
try{
  const hr=await fetch(base+'/health');const h=await hr.json();log.push({path:'/health',http_status:hr.status,body:h});
  check('public HTTPS health has expected corpus',hr.ok&&h.items===85&&h.corpus_sha256===corpusHash&&!h.live_drive_sync);
  const init=await send('initialize',{protocolVersion:'2025-03-26',capabilities:{},clientInfo:{name:'equity-live-check',version:'1.0.0'}});
  check('initialize real SDK server',init.result?.serverInfo.name==='equity-learning-knowledge');
  const list=await send('tools/list');check('exactly two read-only tools',list.result?.tools.length===2&&list.result.tools.every(t=>t.annotations.readOnlyHint===true&&t.annotations.destructiveHint===false&&t.annotations.openWorldHint===false));
  const search=await send('tools/call',{name:'search_equity_library',arguments:{query:'R2-L4',limit:2}});
  const found=JSON.parse(search.result.content[0].text);check('search locates requested anchor',found.matches[0]?.id==='R2-L4');
  const get=await send('tools/call',{name:'get_equity_items',arguments:{ids:['R2-L4','C1-S02']}});
  const exact=JSON.parse(get.result.content[0].text);check('exact item read with source and page',exact.items.length===2&&exact.items[1].source.location.includes('page 2')&&exact.corpus_sha256===corpusHash);
  const missing=await send('tools/call',{name:'get_equity_items',arguments:{ids:['NO-SUCH-ITEM']}});check('not-found explicit',JSON.parse(missing.result.content[0].text).not_found[0]==='NO-SUCH-ITEM');
  const empty=await send('tools/call',{name:'search_equity_library',arguments:{query:'ZZUNMATCHABLE987',limit:3}});check('no search match explicit',JSON.parse(empty.result.content[0].text).matches.length===0);
  for(const [label,name,args] of [['invalid limit','search_equity_library',{query:'voice',limit:99}],['URL access rejected','get_equity_items',{ids:['https://private-drive.test']}],['write tool absent','delete_item',{id:'R2-L4'}]]){
    const r=await send('tools/call',{name,arguments:args});check(label,Boolean(r.error||r.result?.isError));
  }
  const bad=await fetch(base+'/mcp',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json, text/event-stream'},body:'{'});check('malformed JSON controlled',bad.status===400);
  const wrong=await fetch(base+'/mcp');check('GET does not open endless stream',wrong.status===405);
  const origin=await fetch(base+'/mcp',{method:'POST',headers:{'Content-Type':'application/json','Origin':'https://untrusted.test'},body:'{}'});check('foreign browser origin rejected',origin.status===403);
  console.log(JSON.stringify({status:'PASS',base,checks:checks.length,corpus_sha256:corpusHash},null,2));
}catch(error){console.error(error.message);process.exitCode=1;}
finally{
  await mkdir('../docs/testing',{recursive:true});
  await writeFile('../docs/testing/live-mcp.json',JSON.stringify({date:new Date().toISOString(),base,checks,complete:!process.exitCode,log},null,2)+'\n');
}
