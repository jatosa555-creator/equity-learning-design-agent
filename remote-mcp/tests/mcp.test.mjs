import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {handleMcp,health} from '../lib/server.mjs';
import {corpus,corpusHash,searchLibrary,getItems} from '../lib/library.mjs';
const headers={'Content-Type':'application/json','Accept':'application/json, text/event-stream'};
async function rpc(method,params={}){const r=await handleMcp(new Request('http://localhost/mcp',{method:'POST',headers,body:JSON.stringify({jsonrpc:'2.0',id:1,method,params})}));return {status:r.status,body:await r.json()};}
test('85 unique approved entries, 24 anchors, 57 checklist entries and provenance',()=>{
  assert.equal(corpus.items.length,85);assert.equal(new Set(corpus.items.map(x=>x.id)).size,85);
  assert.equal(corpus.items.filter(x=>/^R\d-L\d$/.test(x.id)).length,24);
  assert.equal(corpus.items.filter(x=>/^C\d-/.test(x.id)).length,57);
  assert.ok(corpus.items.every(x=>x.source.location&&x.source.summary_url.startsWith('https://github.com/jatosa555-creator/equity-learning-design-agent/')));
  assert.equal(corpusHash,createHash('sha256').update(readFileSync(new URL('../data/corpus.json',import.meta.url))).digest('hex'));
});
test('search followed by exact item read, no-match and missing IDs',()=>{
  assert.equal(searchLibrary('R2-L4')[0].id,'R2-L4');assert.ok(getItems(['R2-L4']).items[0].text.includes('ร่วม'));
  assert.equal(searchLibrary('ZZUNMATCHABLE987').length,0);assert.deepEqual(getItems(['NO-SUCH-ITEM']).not_found,['NO-SUCH-ITEM']);
});
test('MCP initialize and list only two read-only closed-world tools',async()=>{
  const init=await rpc('initialize',{protocolVersion:'2025-03-26',capabilities:{},clientInfo:{name:'test',version:'1'}});
  assert.equal(init.status,200);assert.equal(init.body.result.serverInfo.name,'equity-learning-knowledge');
  const list=await rpc('tools/list');assert.deepEqual(list.body.result.tools.map(x=>x.name).sort(),['get_equity_items','search_equity_library']);
  for(const t of list.body.result.tools){assert.equal(t.annotations.readOnlyHint,true);assert.equal(t.annotations.destructiveHint,false);assert.equal(t.annotations.openWorldHint,false);}
});
test('actual MCP search/call returns bounded source-backed data',async()=>{
  const search=await rpc('tools/call',{name:'search_equity_library',arguments:{query:'เสียง',limit:2}});
  const a=JSON.parse(search.body.result.content[0].text);assert.ok(a.matches.length>0&&a.matches.length<=2);
  const read=await rpc('tools/call',{name:'get_equity_items',arguments:{ids:[a.matches[0].id]}});
  const b=JSON.parse(read.body.result.content[0].text);assert.equal(b.items[0].id,a.matches[0].id);assert.ok(b.items[0].source.location);
});
test('invalid inputs and unsupported write tool do not execute',async()=>{
  for(const [name,args] of [['search_equity_library',{query:'x',limit:99}],['get_equity_items',{ids:[]}],['get_equity_items',{ids:['https://private-drive.test']}],['delete_item',{id:'R2-L4'}]]){
    const r=await rpc('tools/call',{name,arguments:args});assert.ok(r.body.error||r.body.result?.isError,JSON.stringify(r));
  }
});
test('method, origin, content type, byte and malformed JSON limits',async()=>{
  assert.equal((await handleMcp(new Request('http://localhost/mcp'))).status,405);
  assert.equal((await handleMcp(new Request('http://localhost/mcp',{method:'POST',headers:{...headers,Origin:'https://untrusted.test'},body:'{}'}))).status,403);
  assert.equal((await handleMcp(new Request('http://localhost/mcp',{method:'POST',body:'{}'}))).status,415);
  assert.equal((await handleMcp(new Request('http://localhost/mcp',{method:'POST',headers,body:'x'.repeat(17000)}))).status,413);
  assert.equal((await handleMcp(new Request('http://localhost/mcp',{method:'POST',headers,body:'{'}))).status,400);
});
test('health states snapshot, count, hash and no live sync',async()=>{
  const data=await health().json();assert.equal(data.items,85);assert.equal(data.live_drive_sync,false);assert.equal(data.corpus_sha256,corpusHash);
});
