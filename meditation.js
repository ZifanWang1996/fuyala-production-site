import { currentLanguage } from './i18n.js';

const copy={
 'zh-CN':['山间静心','选一段时间，在山风里缓一缓。可以睁眼、暂停或随时离开。','30 秒','1 分钟','3 分钟','开始静心','吸气，感受身体；呼气，轻轻放松。','暂停','继续','结束','静心结束','这段时间留给了自己，愿你带着从容继续漫游。','继续漫游','已暂停','还剩','秒','当前为单人静心，不显示虚拟同伴。'],
 'zh-TW':['山間靜心','選一段時間，在山風裡緩一緩。可以睜眼、暫停或隨時離開。','30 秒','1 分鐘','3 分鐘','開始靜心','吸氣，感受身體；呼氣，輕輕放鬆。','暫停','繼續','結束','靜心結束','這段時間留給了自己，願你帶著從容繼續漫遊。','繼續漫遊','已暫停','還剩','秒','目前為單人靜心，不顯示虛擬同伴。'],
 en:['Mountain pause','Choose a moment to slow down. Keep your eyes open, pause, or leave whenever you wish.','30 seconds','1 minute','3 minutes','Begin','Breathe in and notice your body. Breathe out and soften.','Pause','Resume','End','A moment for yourself','You made space for yourself. Continue at your own pace.','Continue exploring','Paused','Remaining','seconds','This is a solo activity; no simulated companions are shown.'],
 ja:['山でひと休み','時間を選んで、ゆっくり過ごしましょう。目を開けたままでも、一時停止や終了もできます。','30秒','1分','3分','始める','息を吸って体を感じ、吐きながら力を抜きます。','一時停止','再開','終了','ひと休み終了','自分のための時間を過ごしました。ゆっくり散策を続けましょう。','散策を続ける','一時停止中','残り','秒','一人で行う体験です。架空の参加者は表示されません。'],
 ko:['산속에서 잠시 쉬기','시간을 골라 천천히 쉬어 보세요. 눈을 뜨거나 일시 정지하고 언제든 끝낼 수 있어요.','30초','1분','3분','시작','숨을 들이쉬며 몸을 느끼고, 내쉬며 힘을 풀어요.','일시 정지','계속','종료','휴식 마침','나를 위한 시간을 보냈어요. 천천히 산책을 계속해요.','계속 둘러보기','일시 정지됨','남은 시간','초','혼자 하는 활동이며 가상의 참가자는 표시하지 않아요.']
};

// The clock uses elapsed time so delayed callbacks don't make a session longer.
export function createMeditationClock(duration, now=()=>Date.now()) {
 let remaining=duration, started=null;
 return {
  start(){if(started===null && remaining>0)started=now();},
  pause(){if(started!==null){remaining=Math.max(0,remaining-(now()-started));started=null;}},
  remaining(){return Math.max(0,remaining-(started===null?0:now()-started));},
  paused(){return started===null;}
 };
}
let activeCleanup=()=>{};
export function stopMeditation(){activeCleanup();activeCleanup=()=>{};}
export function openMeditation(api){
 stopMeditation();
 const c=copy[currentLanguage()]||copy['zh-CN']; let timer=null,clock=null;
 const byId=id=>document.getElementById(id);
 function cleanup(){if(timer!==null)clearInterval(timer);timer=null;document.removeEventListener('visibilitychange',onVisibility);api.animate?.('rest','end');}
 activeCleanup=cleanup;
 function onVisibility(){if(document.hidden && clock && !clock.paused()){clock.pause();renderTick();}}
 document.addEventListener('visibilitychange',onVisibility);
 const close=()=>{stopMeditation();api.closeModal();};
 api.showModal(c[0],`<div class="meditation-view"><div class="meditation-symbol" aria-hidden="true">✧</div><p>${c[1]}</p><p class="meditation-note">${c[16]}</p><label for="meditation-duration">${c[0]}</label><select id="meditation-duration"><option value="30">${c[2]}</option><option value="60">${c[3]}</option><option value="180">${c[4]}</option></select><div class="world-actions"><button id="meditation-start">${c[5]}</button><button id="meditation-close" class="world-secondary">${c[9]}</button></div></div>`);
 byId('meditation-close').onclick=close;
 byId('meditation-start').onclick=()=>{
  const seconds=Number(byId('meditation-duration').value);clock=createMeditationClock(seconds*1000);clock.start();api.animate?.('rest','start');
  api.showActivityPanel(c[0],`<div class="meditation-view meditation-live"><div class="meditation-breathe" aria-hidden="true">✧</div><p>${c[6]}</p><p id="meditation-status" role="status"></p><div class="world-actions"><button id="meditation-pause">${c[7]}</button><button id="meditation-end" class="world-secondary">${c[9]}</button></div></div>`);
  byId('meditation-pause').onclick=()=>{if(clock.paused()){clock.start();api.animate?.('rest','start');}else clock.pause();renderTick();};
  byId('meditation-end').onclick=close;timer=setInterval(renderTick,250);renderTick();
 };
 function renderTick(){
  const status=byId('meditation-status'),pause=byId('meditation-pause');
  if(!status || byId('modal')?.hidden){stopMeditation();return;}
  const remaining=Math.ceil(clock.remaining()/1000);status.textContent=`${clock.paused()?c[13]+' · ':''}${c[14]} ${remaining} ${c[15]}`;pause.textContent=clock.paused()?c[8]:c[7];
  if(!remaining){stopMeditation();api.showModal(c[10],`<div class="meditation-view"><div class="meditation-symbol" aria-hidden="true">✧</div><p>${c[11]}</p><div class="world-actions"><button id="meditation-finish">${c[12]}</button></div></div>`);byId('meditation-finish').onclick=close;}
 }
}
