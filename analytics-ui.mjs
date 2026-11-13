import {safePage,safeSource,buildPayload,makeClientId} from './analytics-core.mjs';
import {FRAME_HTML} from './analytics-frame.mjs';
const CONSENT='fuyala-analytics-consent-v1',CLIENT='fuyala-analytics-client-v1',SOURCE='fuyala-analytics-source-v1';
const copy={
 'zh-CN':['统计设置','帮助我们了解访问量和开始游戏的次数。仅在你允许后使用 Google Analytics 和 ShipSolo；不会发送姓名、心愿或输入内容。可随时撤回。','允许统计','拒绝统计','暂不决定','玩法与隐私','无法保存选择，请检查浏览器存储设置。','部分本地统计数据无法删除，请在浏览器中清除本站数据。'],
 'zh-TW':['統計設定','幫助我們了解訪問量和開始遊戲的次數。僅在你允許後使用 Google Analytics 和 ShipSolo；不會傳送姓名、心願或輸入內容。可隨時撤回。','允許統計','拒絕統計','暫不決定','玩法與隱私','無法儲存選擇，請檢查瀏覽器儲存設定。','部分本機統計資料無法刪除，請在瀏覽器清除本站資料。'],
 en:['Analytics settings','Help us understand visits and game starts. Google Analytics and ShipSolo run only with your permission; names, wishes and entered text are not sent. You can withdraw at any time.','Allow analytics','Reject analytics','Decide later','How to play & privacy','Could not save your choice. Please check browser storage.','Some local analytics data could not be removed. Clear this site’s browser data.'],
 ja:['アクセス解析の設定','訪問とゲーム開始の状況を把握するため、許可いただいた場合のみ Google Analytics と ShipSolo を使います。名前や願い、入力内容は送信しません。いつでも取り消せます。','解析を許可','解析を拒否','後で決める','遊び方とプライバシー','設定を保存できません。ブラウザーの保存設定をご確認ください。','一部の解析データを削除できません。ブラウザーでこのサイトのデータを消去してください。'],
 ko:['통계 설정','방문과 게임 시작 횟수를 알아보기 위해 허용한 경우에만 Google Analytics와 ShipSolo를 사용해요. 이름, 소원, 입력 내용은 보내지 않아요. 언제든 철회할 수 있어요.','통계 허용','통계 거부','나중에 결정','이용 방법 및 개인정보','선택을 저장하지 못했어요. 브라우저 저장 설정을 확인해 주세요.','일부 통계 데이터를 삭제하지 못했어요. 브라우저에서 이 사이트의 데이터를 지워 주세요.']
};
let choice=null,frame=null,ready=false,pendingStart=false,started=false;const pendingRequests=new Set();
let source=safeSource(location.search,document.referrer);
const page=safePage(location.pathname), allowedHost=location.protocol==='https:'&&['fuyala.com','www.fuyala.com'].includes(location.hostname);
const el=(tag,cls)=>{const n=document.createElement(tag);if(cls)n.className=cls;return n;};
const prefs=el('button','analytics-settings');prefs.type='button';
const panel=el('section','analytics-panel');panel.setAttribute('aria-labelledby','analytics-title');panel.hidden=true;
const title=el('h2');title.id='analytics-title';const desc=el('p'),status=el('p','analytics-status');status.setAttribute('role','status');
const controls=el('div','analytics-actions');const allow=el('button'),reject=el('button'),later=el('button');
for(const b of [allow,reject,later]){b.type='button';controls.appendChild(b);}
const more=el('a');more.href='/about#statistics';panel.append(title,desc,controls,more,status);document.body.append(prefs,panel);
function text(){let lang=document.documentElement.lang;try{lang=localStorage.getItem('yunxi-language')||lang;}catch{}const c=copy[lang]||copy['zh-CN'];[prefs.textContent,desc.textContent,allow.textContent,reject.textContent,later.textContent,more.textContent]=c;title.textContent=c[0];return c;}
function readConsent(){try{if(sessionStorage.getItem('fuyala-analytics-session-denied')==='1')return 'denied';return localStorage.getItem(CONSENT);}catch{return null;}}
function client(){try{let id=localStorage.getItem(CLIENT);if(!/^\d{1,10}\.\d{1,10}$/.test(id||'')){id=makeClientId(crypto);localStorage.setItem(CLIENT,id);}return id;}catch{return null;}}
function removeData(){let removed=true;try{localStorage.removeItem(CLIENT);if(localStorage.getItem(CLIENT)!==null)removed=false;}catch{removed=false;}try{sessionStorage.removeItem(SOURCE);if(sessionStorage.getItem(SOURCE)!==null)removed=false;}catch{removed=false;}return removed;}
function rememberSource(){try{const old=sessionStorage.getItem(SOURCE);if(old){const parsed=JSON.parse(old);const safe=safeSource(parsed.query,parsed.referrer);if(parsed.signal==='conflict')safe.signal='conflict';source=safe;}else sessionStorage.setItem(SOURCE,JSON.stringify(source));}catch{}}
function stop(){ready=false;pendingStart=false;if(frame){frame.remove();frame=null;}for(const controller of pendingRequests)controller.abort();pendingRequests.clear();}
function emit(name){
 if(choice!=='granted'||!allowedHost||!page)return;
 const payload=buildPayload(name,location.pathname,source);if(!payload)return;
 const controller=new AbortController();pendingRequests.add(controller);
 fetch('https://plausible.shipsolo.io/api/event',{method:'POST',mode:'cors',credentials:'omit',referrerPolicy:'no-referrer',headers:{'Content-Type':'text/plain'},body:JSON.stringify(payload),signal:controller.signal}).catch(()=>{}).finally(()=>pendingRequests.delete(controller));
 if(name==='game_start'){if(frame&&ready)frame.contentWindow.postMessage({type:'game_start'},'*');else if(frame)pendingStart=true;}
}
function activate(){
 if(choice!=='granted'||!allowedHost||!page||frame)return;
 rememberSource();const id=client();if(!id)return;
 const frameEl=document.createElement('iframe');frameEl.hidden=true;frameEl.setAttribute('sandbox','allow-scripts');frameEl.referrerPolicy='no-referrer';frameEl.setAttribute('title','Analytics');frame=frameEl;
 frameEl.srcdoc=FRAME_HTML;document.body.appendChild(frameEl);emit('pageview');
}
window.addEventListener('message',event=>{
 if(!frame||event.source!==frame.contentWindow||event.origin!=='null'||event.data?.type!=='fuyala-analytics-ready'||choice!=='granted')return;
 const id=client();if(!id)return;const campaign=new URLSearchParams(source.query);ready=true;frame.contentWindow.postMessage({type:'initialize',page,referrer:source.referrer,clientId:id,campaignSource:campaign.get('utm_source')||'',campaignMedium:campaign.get('utm_medium')||''},'*');
 if(pendingStart){pendingStart=false;frame.contentWindow.postMessage({type:'game_start'},'*');}
});
function apply(value,persist=true){
 if(!['granted','denied'].includes(value))return;
 if(persist){try{localStorage.setItem(CONSENT,value);if(localStorage.getItem(CONSENT)!==value)throw Error('storage');sessionStorage.removeItem('fuyala-analytics-session-denied');}catch{stop();choice='denied';removeData();try{sessionStorage.setItem('fuyala-analytics-session-denied','1');}catch{}try{localStorage.removeItem(CONSENT);}catch{}status.textContent=text()[6];return;}}
 choice=value;panel.hidden=true;status.textContent='';
 if(value==='denied'){stop();if(!removeData()){panel.hidden=false;status.textContent=text()[7];}}else activate();
}
prefs.onclick=()=>{text();panel.hidden=false;};allow.onclick=()=>apply('granted');reject.onclick=()=>apply('denied');later.onclick=()=>{panel.hidden=true;};
window.addEventListener('storage',event=>{if(event.key===CONSENT||event.key===null){if(readConsent()==='granted')apply('granted',false);else{stop();choice='denied';if(!removeData()){panel.hidden=false;status.textContent=text()[7];}}}});
document.addEventListener('fuyala:languagechange',text);
document.addEventListener('fuyala:game-start',()=>{if(!started){started=true;emit('game_start');}});
text();const saved=readConsent();if(saved==='granted')apply('granted',false);else if(saved==='denied')choice='denied';else panel.hidden=false;
