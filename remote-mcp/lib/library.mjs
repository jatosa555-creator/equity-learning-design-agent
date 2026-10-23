import corpus from '../data/corpus.json' with {type:'json'};
import digest from '../data/corpus-sha.mjs';
export {corpus};
export const corpusHash=digest;
export function searchLibrary(query,limit=5) {
  const terms=query.trim().toLocaleLowerCase().split(/\s+/u);
  return corpus.items.map(item=>({item,score:terms.reduce((n,t)=>n+(item.id.toLowerCase()===t?20:0)+(item.title.toLowerCase().includes(t)?5:0)+(item.text.toLowerCase().includes(t)?2:0)+(item.tags.some(x=>x.toLowerCase().includes(t))?1:0),0)}))
    .filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.item.id.localeCompare(b.item.id)).slice(0,limit)
    .map(({item})=>({id:item.id,title:item.title,excerpt:item.text.slice(0,400),source:item.source,snapshot:item.snapshot}));
}
export function getItems(ids) {
  const unique=[...new Set(ids)];
  return {items:unique.map(id=>corpus.items.find(x=>x.id===id)).filter(Boolean),not_found:unique.filter(id=>!corpus.items.some(x=>x.id===id)),snapshot:corpus.snapshot,corpus_sha256:corpusHash};
}
