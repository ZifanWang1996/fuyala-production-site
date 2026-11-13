// Backups contain only game-owned browser records. They never leave this device
// unless the player chooses to move the downloaded file.
const keys=[
  'yunxi-profile','yunxi-language','yunxi-activities-pellets','yunxi-activities-bookmarks',
  'yunxi-activities-wish','yunxi-activities-wishes','yunxi-activities-reflection',
  'yunxi-activities-pending-fortune','yunxi-activities-last-fortune','yunxi-activities-last-card',
  'yunxi-activities-brewing','yunxi-activities-reading-progress',
  'shanlan-incense-pellets','shanlan-bookmarks','shanlan-wish','shanlan-reflection'
];
const keySet=new Set(keys);
const maxBytes=2*1024*1024;
const languages=new Set(['zh-CN','zh-TW','en','ja','ko']);
const isRecord=value=>value!==null && typeof value==='object' && !Array.isArray(value);
function inspect(value,depth=0){
  if(depth>12)throw new Error('invalid');
  if(value===null || typeof value==='boolean')return;
  if(typeof value==='number'){if(!Number.isFinite(value))throw new Error('invalid');return;}
  if(typeof value==='string'){if(value.length>20000)throw new Error('invalid');return;}
  if(Array.isArray(value)){if(value.length>1000)throw new Error('invalid');value.forEach(item=>inspect(item,depth+1));return;}
  if(!isRecord(value))throw new Error('invalid');
  const fields=Object.keys(value);if(fields.length>10000)throw new Error('invalid');
  for(const field of fields){if(['__proto__','prototype','constructor'].includes(field) || field.length>500)throw new Error('invalid');inspect(value[field],depth+1);}
}
function validateRecord(key,raw){
  if(typeof raw!=='string' || raw.length>maxBytes)throw new Error('invalid');
  if(key==='yunxi-language'){if(!languages.has(raw))throw new Error('invalid');return;}
  let value;try{value=JSON.parse(raw);}catch{throw new Error('invalid');}
  inspect(value);
  if(key.startsWith('shanlan-')) {
    const numerical=key==='shanlan-incense-pellets'||key==='shanlan-bookmarks';
    if(numerical ? (typeof value!=='number'||value<0) : typeof value!=='string')throw new Error('invalid');
    return;
  }
  if(key==='yunxi-activities-wishes') {if(!Array.isArray(value) || value.length>30 || value.some(v=>!isRecord(v)||typeof v.text!=='string'))throw new Error('invalid');}
  else if(key==='yunxi-activities-reflection'){if(typeof value!=='string')throw new Error('invalid');}
  else if(!isRecord(value))throw new Error('invalid');
  if(key==='yunxi-activities-pellets')for(const [field,item] of Object.entries(value)){
    if(field==='claimedBrews'){if(!isRecord(item)||Object.values(item).some(v=>v!==true))throw new Error('invalid');}
    else if(typeof item!=='number'||!Number.isFinite(item)||item<0)throw new Error('invalid');
  }
  if(key==='yunxi-activities-bookmarks')for(const [field,item] of Object.entries(value)){
    if(field==='_lastReadingClaim'){if(typeof item!=='string')throw new Error('invalid');}
    else if(field==='_readingCounts'){if(!isRecord(item)||Object.values(item).some(v=>typeof v!=='number'||!Number.isFinite(v)||v<0))throw new Error('invalid');}
    else if(typeof item!=='number'||!Number.isFinite(item)||item<0)throw new Error('invalid');
  }
  if(key==='yunxi-activities-reading-progress' && Object.values(value).some(v=>!Number.isInteger(v)||v<0))throw new Error('invalid');
  if(key==='yunxi-activities-brewing' && (typeof value.id!=='string'||typeof value.start!=='number'||typeof value.boost!=='number'))throw new Error('invalid');
  if(key==='yunxi-profile'){
    if(value.name!==undefined && (typeof value.name!=='string' || value.name.length>12))throw new Error('invalid');
    if(value.variant!==undefined && !['rose','sage','amber','plum','sky','ink','mint','cloud'].includes(value.variant))throw new Error('invalid');
    if(value.showName!==undefined && typeof value.showName!=='boolean')throw new Error('invalid');
    if(value.quality!==undefined && !['balanced','smooth'].includes(value.quality))throw new Error('invalid');
  }
}
export function createBackup(storage,now=new Date()){
  const data=Object.create(null);
  for(const key of keys){const raw=storage.getItem(key);if(raw!==null){validateRecord(key,raw);data[key]=raw;}}
  if(!Object.keys(data).length)throw new Error('invalid');
  const output=JSON.stringify({format:'yunxi-garden-backup',version:1,exportedAt:now.toISOString(),data},null,2);
  if(new TextEncoder().encode(output).byteLength>maxBytes)throw new Error('too-large');
  return output;
}
export function parseBackup(text){
  if(typeof text!=='string' || new TextEncoder().encode(text).byteLength>maxBytes)throw new Error('invalid');
  let input;try{input=JSON.parse(text);}catch{throw new Error('invalid');}
  if(!isRecord(input) || input.format!=='yunxi-garden-backup' || input.version!==1 || !isRecord(input.data))throw new Error('invalid');
  const entries=Object.entries(input.data);
  if(entries.length===0 || entries.length>keys.length || entries.some(([key])=>!keySet.has(key)))throw new Error('invalid');
  for(const [key,raw] of entries)validateRecord(key,raw);
  return input.data;
}
export function restoreBackup(storage,data){
  if(!isRecord(data) || !Object.keys(data).length)throw new Error('invalid');
  for(const [key,raw] of Object.entries(data)){if(!keySet.has(key))throw new Error('invalid');validateRecord(key,raw);}
  const previous=new Map(keys.map(key=>[key,storage.getItem(key)]));
  try{
    for(const key of keys){if(Object.hasOwn(data,key))storage.setItem(key,data[key]);else storage.removeItem(key);}
  }catch(error){
    for(const [key,value] of previous)try{if(value===null)storage.removeItem(key);else storage.setItem(key,value);}catch{}
    throw new Error('storage');
  }
}
