import {createServer} from 'node:http';
import {handleMcp,health} from '../lib/server.mjs';
createServer(async(req,res)=>{
  const chunks=[];for await(const chunk of req)chunks.push(chunk);
  const url='http://127.0.0.1:8787'+req.url;
  const request=new Request(url,{method:req.method,headers:req.headers,...(req.method==='POST'?{body:Buffer.concat(chunks)}:{})});
  const result=req.url==='/health'?health():await handleMcp(request);
  res.writeHead(result.status,Object.fromEntries(result.headers));res.end(Buffer.from(await result.arrayBuffer()));
}).listen(8787,'127.0.0.1',()=>console.log('Local MCP: http://127.0.0.1:8787/mcp'));
