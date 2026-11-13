// Only these fixed values may cross a statistics boundary.
export const SITE='https://fuyala.com';
const sourceAllow=new Map([['chatgpt','chatgpt.com'],['chatgpt.com','chatgpt.com'],['chat.openai.com','chat.openai.com'],['google','google'],['bing','bing'],['fuyala_qa','fuyala_qa']]);
const mediumAllow=new Set(['referral','organic','social']);
const hostMap=[['chatgpt.com','chatgpt.com'],['chat.openai.com','chat.openai.com'],['google.com','google.com'],['bing.com','bing.com']];
export function safePage(path){return path==='/'?SITE+'/':path==='/about'||path==='/about.html'?SITE+'/about':null;}
export function safeSource(search,referrer){
 let params;try{params=new URLSearchParams(search||'');}catch{params=new URLSearchParams();}
 const raw=(params.get('utm_source')||'').toLowerCase(), utm=sourceAllow.get(raw)||null;
 const med=(params.get('utm_medium')||'').toLowerCase(),medium=mediumAllow.has(med)?med:null;
 let host='';try{host=new URL(referrer).hostname.toLowerCase().replace(/\.$/,'');}catch{}
 const match=hostMap.find(([root])=>host===root||host.endsWith('.'+root));
 const refHost=match?.[1]||null;
 const refClass=refHost?.includes('chatgpt')||refHost==='chat.openai.com'?'chatgpt':refHost==='google.com'?'google':refHost==='bing.com'?'bing':null;
 const utmClass=utm==='chatgpt.com'||utm==='chat.openai.com'?'chatgpt':utm;
 const conflict=Boolean(refClass&&utmClass&&refClass!==utmClass);
 const urlParams=new URLSearchParams();
 if(!conflict&&utm)urlParams.set('utm_source',utm);
 if(!conflict&&utm&&medium)urlParams.set('utm_medium',medium);
 return {query:urlParams.toString(),referrer:conflict||!refHost?'':`https://${refHost}/`,signal:conflict?'conflict':refClass?'referrer':utm?'utm':'unknown'};
}
export function buildPayload(event,path,source){
 const page=safePage(path);if(!page||!['pageview','game_start'].includes(event))return null;
 const query=source?.query?`?${source.query}`:'';
 return {name:event,domain:'fuyala.com',url:page+query,referrer:source?.referrer||'',props:{source_signal:source?.signal||'unknown'}};
}
export function makeClientId(cryptoObj){
 const bytes=new Uint32Array(2);cryptoObj.getRandomValues(bytes);return `${bytes[0]}.${bytes[1]}`;
}
