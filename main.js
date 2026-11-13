import * as THREE from './vendor/three.module.min.js';
import { createWorld, createAvatar } from './world.js';
import { activities, runActivity, openPendingFortuneReading, openCollection } from './activities.js';
import { t, setLanguage, currentLanguage, languageOptions } from './i18n.js';
import { createBackup, parseBackup, restoreBackup } from './backup.js';
import { openMeditation, stopMeditation } from './meditation.js';

const $ = id => document.getElementById(id);
setLanguage(currentLanguage());
$('language-select').addEventListener('change', event => setLanguage(event.target.value));
const scene = new THREE.Scene();
scene.background = new THREE.Color('#d5e5dc');
scene.fog = new THREE.Fog('#d5e5dc', 48, 110);
const camera = new THREE.PerspectiveCamera(innerWidth < 600 ? 58 : 48, innerWidth / innerHeight, 0.1, 180);
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
$('scene').appendChild(renderer.domElement);
const ambientLight = new THREE.HemisphereLight('#fff2da', '#7d9a80', 2.1);
scene.add(ambientLight);
const sun = new THREE.DirectionalLight('#fff4df', 2.3);
sun.position.set(-15, 35, 20); sun.castShadow = true;
const lanternLights = [[-5.4,3.5,-15.3],[5.4,3.5,-15.3],[-5.5,3.9,16],[5.5,3.9,16]].map(([x,y,z]) => {
  const light=new THREE.PointLight('#ffb259', 15, 10, 2); light.position.set(x,y,z); light.visible=false; scene.add(light); return light;
});
sun.shadow.mapSize.set(1024, 1024); sun.shadow.camera.left = -40; sun.shadow.camera.right = 40; sun.shadow.camera.top = 40; sun.shadow.camera.bottom = -40; sun.shadow.normalBias = 0.04; scene.add(sun);
const { points, roofGroups = [], interiorSigns = [], fishGroup, updateWorld, petCat, gateFront, distantRidges = [], treeCrowns = [], turnSweeperToward, resetSweeper, setReleaseActive: renderReleaseActive, setDanceActive, hangWish } = createWorld(THREE, scene);
let localReleaseActive=false,sharedReleaseActive=false,releaseRenderedActive=false,previousReleaseMine=false;
function refreshRelease(){const next=localReleaseActive||sharedReleaseActive;if(next!==releaseRenderedActive){releaseRenderedActive=next;renderReleaseActive(next);}}
function setReleaseActive(active){localReleaseActive=!!active;refreshRelease();}
scene.userData.three=THREE;
scene.updateMatrixWorld(true);
const roofBounds=roofGroups.map(roof=>new THREE.Box3().setFromObject(roof));
const cameraRay=new THREE.Ray(), cameraRayHit=new THREE.Vector3(), cameraRayTarget=new THREE.Vector3();
const avatar = createAvatar(THREE); scene.add(avatar.group); avatar.group.position.set(0, 0, 23);
let started = false, target = null, chosenAction = null, currentPoint = null, overview = false, angle = 0, pitch = 0.34, distance = 12, moving = false, sound = false, audio;
let gesture = null, gestureUntil = 0, jumpVelocity = 0, jumpHeight = 0, fishFeedUntil = 0;
let walkBlend = 0, walkClock = 0, danceAreaEntered = false;
const avatarVariants=[['rose','粉衣花饰'],['sage','青衣兔耳'],['amber','杏衣熊帽'],['plum','紫衣花饰'],['sky','蓝衣兔耳'],['ink','黛衣熊帽'],['mint','绿衣花饰'],['cloud','云灰熊帽']];
let selectedVariant = 'rose', showPlayerName = true, night = false, windSource = null, windGain = null, heldProp = null;
let graphicsQuality='balanced';

function randomName() { const first=['松间','云上','青山','小雨','溪边','听风','白露','晚晴','山月','清禾']; const last=['旅人','行者','小客','游人','来客']; return first[Math.floor(Math.random()*first.length)]+last[Math.floor(Math.random()*last.length)]; }
let panorama = null;
new THREE.TextureLoader().load('./assets/mountain-panorama.jpg', texture => {
  texture.colorSpace=THREE.SRGBColorSpace;
  const material=new THREE.MeshBasicMaterial({map:texture,side:THREE.BackSide,fog:false,depthWrite:false,toneMapped:false,color:night?'#52647c':'#ffffff'});
  panorama=new THREE.Mesh(new THREE.CylinderGeometry(95,95,100,64,1,true),material);
  panorama.position.y=12; panorama.renderOrder=-10; scene.add(panorama); distantRidges.forEach(ridge=>ridge.visible=false);
}, undefined, () => {});
const nameCanvas = document.createElement('canvas'); nameCanvas.width = 512; nameCanvas.height = 96;
const nameTexture = new THREE.CanvasTexture(nameCanvas);
const nameSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: nameTexture, transparent: true, depthTest: false }));
nameSprite.position.set(0, 3.25, 0); nameSprite.scale.set(2.3, 0.44, 1); avatar.group.add(nameSprite);
function updateName() { const ctx = nameCanvas.getContext('2d'); ctx.clearRect(0,0,512,96); ctx.font='bold 38px sans-serif'; ctx.textAlign='center'; ctx.lineWidth=6; ctx.strokeStyle='#2a3d32'; ctx.strokeText($('name-input').value.trim() || '山间旅人',256,60); ctx.fillStyle='white'; ctx.fillText($('name-input').value.trim() || '山间旅人',256,60); nameTexture.needsUpdate=true; }
updateName();
const keys = new Set(), stick = { x: 0, y: 0 };
let route = [];
// The destination marker remains on the ground until the current walk finishes.
const destinationMarker=new THREE.Group();
const markerRing=new THREE.Mesh(new THREE.RingGeometry(0.46,0.55,40),new THREE.MeshBasicMaterial({color:'#f7e2a8',transparent:true,opacity:0.9,side:THREE.DoubleSide,depthWrite:false}));
markerRing.rotation.x=-Math.PI/2; destinationMarker.add(markerRing);
const markerInner=new THREE.Mesh(new THREE.RingGeometry(0.21,0.25,32),new THREE.MeshBasicMaterial({color:'#fff9dc',transparent:true,opacity:0.75,side:THREE.DoubleSide,depthWrite:false}));
markerInner.rotation.x=-Math.PI/2; markerInner.position.y=0.01; destinationMarker.add(markerInner);
destinationMarker.visible=false; destinationMarker.position.y=0.1; scene.add(destinationMarker);
const pendingInteractions = new Map();
const halls = [{x:0,z:-19,w:12,d:7}, {x:-15,z:-22,w:8,d:6}, {x:15,z:-22,w:8,d:6}, {x:-27,z:-15,w:7,d:6}, {x:27,z:-15,w:7,d:6}, {x:0,z:-28,w:7,d:6}, {x:-15,z:-8,w:8,d:6}, {x:15,z:-9,w:8,d:6}];
function wallBlocked(x,z, walls=halls) {
  return walls.some(h => {
    const dx=Math.abs(x-h.x), dz=z-h.z;
    const side=dx>h.w/2-0.65 && dx<h.w/2+0.55 && Math.abs(dz)<h.d/2+0.35;
    const back=dz < -h.d/2+0.65 && dz > -h.d/2-0.55 && dx<h.w/2+0.5;
    const front=Math.abs(dz-h.d/2)<0.55 && dx>h.w*0.28 && dx<h.w/2+0.45;
    return side || back || front;
  });
}
function blocked(x,z) {
  return Math.hypot(x, z+3) < 1.55 || Math.hypot(x-18,z-2) < 5.2 || wallBlocked(x,z);
}
const hotspotWalls=halls;
function hotspotBehindWall(point) {
  const dx=point.x-camera.position.x,dz=point.z-camera.position.z, steps=Math.ceil(Math.hypot(dx,dz)/0.35);
  for(let i=2;i<steps;i++) { const t=i/steps; if(wallBlocked(camera.position.x+dx*t,camera.position.z+dz*t,hotspotWalls)) return true; }
  return false;
}
function routeTo(destination) {
  // A compact grid search keeps automatic walking around walls and the pond.
  const size=65, toIndex=(x,z)=>(z+32)*size+x+32;
  const sx=Math.round(THREE.MathUtils.clamp(avatar.group.position.x,-32,32));
  const sz=Math.round(THREE.MathUtils.clamp(avatar.group.position.z,-32,32));
  const gx=Math.round(THREE.MathUtils.clamp(destination.x,-32,32));
  const gz=Math.round(THREE.MathUtils.clamp(destination.z,-32,32));
  const start=toIndex(sx,sz), goal=toIndex(gx,gz), previous=new Int32Array(size*size).fill(-1), queue=[start];
  previous[start]=start;
  for(let head=0; head<queue.length && previous[goal]===-1; head++) {
    const index=queue[head], x=index%size-32, z=Math.floor(index/size)-32;
    for(const [dx,dz] of [[0,-1],[1,0],[-1,0],[0,1],[1,-1],[-1,-1],[1,1],[-1,1]]) {
      const nx=x+dx,nz=z+dz; if(nx < -32 || nx > 32 || nz < -32 || nz > 32 || blocked(nx,nz)) continue;
      if(dx && dz && (blocked(x+dx,z) || blocked(x,z+dz))) continue;
      const next=toIndex(nx,nz); if(previous[next]!==-1) continue; previous[next]=index; queue.push(next);
    }
  }
  if(previous[goal]===-1) { route=[]; target=null; toast('这里暂时走不过去，请选择附近的位置'); return false; }
  const path=[]; for(let at=goal;at!==start;at=previous[at]) path.push(new THREE.Vector3(at%size-32,0,Math.floor(at/size)-32));
  path.reverse(); route=path; target=route.shift() || null; destinationMarker.position.set(destination.x,0.1,destination.z); return true;
}
const pointMap = {
  incense: 'incense', wish: 'wish', fortune: 'fortune', oracle: 'oracle-stall', tarot: 'tarot-stall', zodiac: 'tarot-stall',
  'main-hall': 'temple', wisdom: 'reading', blessing: 'blessing', moon: 'moon', breeze: 'breeze-hall', joy: 'joy-hall', cloud: 'cloud-hall',
  meditation: 'practice', alchemy: 'alchemy', woodfish: 'wood', bell: 'bell', drum: 'drum', exercise: 'practice', dance: 'dance', release: 'release',
  reading: 'reading', tea: 'tea', fish: 'pond', rest: 'practice', monk: 'monk', cat: 'cat'
};
const activityMap = { oracle: 'question', woodfish: 'wood', wisdom: 'reading' };
const locationMap = { incense:'香庭', wish:'心愿树', temple:'清和殿', pond:'观鱼池', reading:'藏书阁', bell:'钟亭', alchemy:'丹房', practice:'静修院', blessing:'福缘殿', moon:'月华堂', monk:'扫庭人', tea:'茶摊', cat:'猫咪', release:'解忧处', dance:'云间乐台', fortune:'签案', wood:'木鱼', drum:'鼓亭', 'breeze-hall':'清风殿', 'joy-hall':'长乐殿', 'cloud-hall':'望云殿', 'oracle-stall':'问心摊', 'tarot-stall':'星象摊' };
function toast(message) { $('toast').textContent = message; $('toast').classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => $('toast').classList.remove('show'), 2600); }
let modalOrigin=null, modalInert=[];
function showDialog(title,html,live) {
  const modal=$('modal'), dialog=modal.querySelector('.dialog');
  if(modal.hidden) {
    modalOrigin=document.activeElement;
    modalInert=[...$('game').children].filter(node=>node!==modal).map(node=>[node,node.inert]);
    modalInert.forEach(([node])=>{node.inert=true;});
    keys.clear(); resetStick();
  }
  dialog.classList.toggle('live-activity',live);
  $('modal-title').textContent=title; $('modal-body').innerHTML=html; modal.hidden=false; dialog.scrollTop=0;
  requestAnimationFrame(()=>{
    if(modal.hidden) return;
    const target=$('modal-body').querySelector('textarea:not(:disabled),input:not(:disabled),select:not(:disabled),button:not(:disabled)') || $('modal-close');
    target?.focus({preventScroll:true});
  });
}
function showModal(title, html) { showDialog(title,html,false); }
function showActivityPanel(title, html) { showDialog(title,html,true); }
document.addEventListener('keydown',event=>{
  if(event.key==='Escape') {
    if(!$('modal').hidden) closeModal();
    else if(!$('map-panel').hidden) { $('map-panel').hidden=true; $('map-toggle').focus(); }
    else if(!$('action-menu').hidden) { $('action-menu').hidden=true; $('menu-toggle').focus(); }
    else if(!$('emote-menu').hidden) { $('emote-menu').hidden=true; $('emote-toggle').focus(); }
    else return;
    event.preventDefault(); event.stopPropagation(); return;
  }
  const modal=$('modal'); if(modal.hidden || event.key!=='Tab') return;
  const focusable=[...modal.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),a[href]')].filter(node=>node.getClientRects().length);
  if(!focusable.length){event.preventDefault();return;}
  const first=focusable[0],last=focusable[focusable.length-1],active=document.activeElement;
  if(event.shiftKey && (active===first || !modal.contains(active))){event.preventDefault();last.focus();}
  else if(!event.shiftKey && (active===last || !modal.contains(active))){event.preventDefault();first.focus();}
});
function tone(id) {
  if (!sound) return;
  audio ||= new (window.AudioContext || window.webkitAudioContext)();
  if (audio.state === 'suspended') audio.resume();
  const voices = id === 'bell' ? [[330,1.8],[660,1.2],[990,0.7]] : id === 'drum' ? [[100,0.5],[150,0.25]] : [[480,0.22],[730,0.1]];
  voices.forEach(([frequency,duration],index) => {
    const oscillator=audio.createOscillator(), gain=audio.createGain(), now=audio.currentTime;
    oscillator.type='sine'; oscillator.frequency.setValueAtTime(frequency,now);
    if(id==='drum') oscillator.frequency.exponentialRampToValueAtTime(frequency*0.6,now+duration);
    gain.gain.setValueAtTime(0.035/(index+1),now); gain.gain.exponentialRampToValueAtTime(0.001,now+duration);
    oscillator.connect(gain).connect(audio.destination); oscillator.start(now); oscillator.stop(now+duration);
  });
}
function animateGesture(action, phase = '') {
  if (phase === 'end') { if(gesture?.action!==action) return; gesture = null; gestureUntil = 0; avatar.setProp?.(heldProp); return; }
  if (action === 'exercise' && phase === 'pause' && gesture?.action === 'exercise') { gesture.pauseTime = performance.now(); return; }
  const props={incense:'incense', fortune:'fortune', alchemy:'fan', wood:'mallet', drum:'mallet', reading:'book', tea:'cup'};
  avatar.setProp?.(props[action] || heldProp);
  gesture = { action, phase, started: performance.now() };
  gestureUntil = ['rest','exercise','reading','wood','bell','drum','dance'].includes(action) ? Infinity : performance.now() + 3000;
}
function closeModal() { stopMeditation(); $('modal').hidden = true; modalInert.forEach(([node,prior])=>{node.inert=prior;}); modalInert=[]; if(modalOrigin?.isConnected) modalOrigin.focus?.({preventScroll:true}); modalOrigin=null; gesture = null; gestureUntil = 0; avatar.setProp?.(heldProp); resetSweeper?.(); setReleaseActive?.(false); setDanceActive?.(false); stopStageBeat(); }
const api = { showModal, showActivityPanel, closeModal, clearTemporaryProp: () => avatar.setProp?.(heldProp), setProp: prop => { if (prop === 'cup' || prop === null) heldProp=prop; avatar.setProp?.(prop); }, getProp: () => heldProp, onRelease: active => setReleaseActive?.(active), onWishHang: theme => hangWish?.(theme), goTo: (id, callback) => { closeModal(); pendingInteractions.set(id, callback); navigate(id); }, notify: toast, playTone: tone, animate: animateGesture, onFishFeed: () => { fishFeedUntil = performance.now() + 5000; animateGesture('fish'); toast('鱼儿围了过来'); } };
let activityEpoch=0;
function openActivity(id) {
  // Timers from a closed interaction cannot reset a later interaction's pose.
  const epoch=++activityEpoch;
  const interactionApi={...api, animate:(action,phase)=>{ if(epoch===activityEpoch) api.animate(action,phase); }, onRelease:active=>{ if(epoch===activityEpoch) api.onRelease(active); }, onWishHang:theme=>{ if(epoch===activityEpoch) api.onWishHang(theme); }};
  // A redirected interaction must not survive switching to another activity.
  if(id!=='monk') pendingInteractions.clear();
  const positions={incense:[0,-3], wish:[8.5,6], fortune:[2.45,-16.65], oracle:[-23,-9.5], tarot:[23,-9.5], zodiac:[23,-9.5], breeze:[-27,-17], joy:[27,-17], cloud:[0,-30],
    'main-hall':[0,-21], blessing:[-15,-24], moon:[15,-24], wisdom:[-15,-4], reading:[-15,-4],
    alchemy:[15,-5], woodfish:[18.05,12.45], bell:[-16,9], drum:[-13,9], exercise:[16,10], dance:[27,16], release:[-27,12],
    tea:[-19,3], fish:[18,2], rest:[16,10], monk:[-8.4,11.2], cat:[-8,5]};
  const look=positions[id];
  if (look) { const dx=look[0]-avatar.group.position.x, dz=look[1]-avatar.group.position.z; if (Math.hypot(dx,dz)>0.1) avatar.group.rotation.y=Math.atan2(-dx,-dz); }
  if (id === 'meditation') { openMeditation(interactionApi); return; }
  const activity = activities.find(item => item.id === (activityMap[id] || id));
  if (activity) { runActivity(activity, interactionApi); return; }
  if (id === 'dance') {
    danceAreaEntered = true;
    setDanceActive?.(true); animateGesture('dance','start');
    showActivityPanel('云间乐台', '<div class="world-interaction"><p>跟着灯光轻轻舞动。节奏由山居现场合成。</p><div class="world-actions"><button id="stage-sound">开启节奏</button><button id="stage-leave" class="world-secondary">离开乐台</button></div></div>');
    $('stage-sound').onclick=()=>{if(stageBeatTimer){stopStageBeat();$('stage-sound').textContent='开启节奏';}else{startStageBeat();$('stage-sound').textContent='关闭节奏';}};
    $('stage-leave').onclick=()=>{closeModal();toast('带着好心情继续漫游');};return;
  }
  if (id === 'cat') {
    showActivityPanel('庭院里的猫', '<div class="world-interaction"><p id="cat-status">小猫在庭院里慢慢踱步，轻轻和它打个招呼。</p><div class="world-actions"><button id="pet-cat">摸摸小猫</button><button id="cat-wave" class="world-secondary">打个招呼</button><button id="cat-leave" class="world-secondary">离开</button></div></div>');
    $('pet-cat').onclick=()=>{ petCat?.(); animateGesture('fish'); $('cat-status').textContent='小猫眯起眼睛，开心地摇摇尾巴。'; };
    $('cat-wave').onclick=()=>{ animateGesture('wave'); $('cat-status').textContent='你向小猫挥了挥手。'; };
    $('cat-leave').onclick=()=>{ closeModal(); toast('小猫继续在庭院里散步'); }; return;
  }
  const names = { 'main-hall': '清和殿', blessing: '福缘殿', moon: '月华堂', breeze:'清风殿', joy:'长乐殿', cloud:'望云殿', monk: '扫庭人' };
  if (['main-hall', 'blessing', 'moon', 'breeze', 'joy', 'cloud'].includes(id)) {
    showActivityPanel(names[id], '<div class="world-interaction"><p id="hall-message">在殿中停一停，向心中的美好致意。</p><div class="world-actions"><button id="hall-bow">行礼</button><button id="hall-leave" class="world-secondary">继续漫游</button></div></div>');
    $('hall-bow').onclick = () => { animateGesture('bow'); $('hall-message').textContent='愿你此行安然。'; };
    $('hall-leave').onclick = () => { closeModal(); toast('愿你此行安然'); }; return;
  }
  if (id === 'monk') turnSweeperToward?.(avatar.group.position.x,avatar.group.position.z);
  if (id === 'monk' && openPendingFortuneReading(interactionApi)) return;
  if (id === 'monk') {
    showActivityPanel('扫庭人', '<div class="world-interaction"><p id="monk-message">山路走得累了，就在这里歇一歇吧。</p><div class="world-actions"><button id="monk-chat">聊聊山居</button><button id="monk-guide" class="world-secondary">问问去处</button><button id="monk-leave" class="world-secondary">告辞</button></div></div>');
    const words=['山里的风每天都不一样，慢慢走，总有新的景致。','听听钟声，看看池里的鱼，心自然会慢下来。','把心愿写下来，等以后再回头看看。']; let line=0;
    $('monk-chat').onclick=()=>{ $('monk-message').textContent=words[line++%words.length]; };
    $('monk-guide').onclick=()=>{ $('monk-message').textContent='想歇脚可以去观云亭；想看书，听雨阁里备了小册。'; };
    $('monk-leave').onclick=()=>{ closeModal(); toast('向扫庭人告别'); }; return;
  }
  showModal(names[id] || '山居一刻', '<div class="activity-content"><p>山风正好，随心走走吧。</p></div>');
}
function navigate(id) {
  for(const pendingId of pendingInteractions.keys()) if(pendingId!==id) pendingInteractions.delete(pendingId);
  const point = points.find(p => p.id === pointMap[id]);
  if (!point) return;
  chosenAction = id; const destinationX=point.x+(point.id==='monk'?1.4:0); const destinationZ=point.id === 'incense' ? -1 : point.z + (point.id === 'alchemy' ? 0 : point.id==='monk'?1.7:1.2); if (!routeTo(new THREE.Vector3(destinationX, 0, destinationZ))) { chosenAction = null; pendingInteractions.delete(id); return; }
  $('action-menu').hidden = true; $('emote-menu').hidden = true;
  if (!target && id==='dance' && $('modal').hidden) { openActivity('dance'); return; }
  toast(`正前往${locationMap[point.id] || point.name}`);
}
function nearPoint() {
  const selectedPoint = points.find(p => p.id === pointMap[chosenAction]);
  if (selectedPoint && Math.hypot(avatar.group.position.x - selectedPoint.x, avatar.group.position.z - selectedPoint.z) < selectedPoint.radius) return selectedPoint;
  let closest = null, best = Infinity;
  for (const p of points) { const d = Math.hypot(avatar.group.position.x - p.x, avatar.group.position.z - p.z); if (d < p.radius && d < best) { closest = p; best = d; } }
  return closest;
}
const direct = { incense:'incense', wish:'wish', temple:'main-hall', blessing:'blessing', moon:'moon', pond:'fish', reading:'reading', bell:'bell', alchemy:'alchemy', practice:'exercise', release:'release', dance:'dance', monk:'monk', tea:'tea', cat:'cat', fortune:'fortune', wood:'woodfish', drum:'drum', 'breeze-hall':'breeze', 'joy-hall':'joy', 'cloud-hall':'cloud', 'oracle-stall':'oracle', 'tarot-stall':'tarot' };
// Nearby world markers provide a direct, spatial way to discover activities.
const hotspotLayer=$('world-hotspots'), hotspotVector=new THREE.Vector3();
const hotspots=points.filter(point=>direct[point.id]).map(point=>{
  const button=document.createElement('button'); button.type='button'; button.className='world-hotspot'; button.hidden=true;
  const icon=document.createElement('span'); icon.className='hotspot-icon'; icon.setAttribute('aria-hidden','true'); icon.textContent='✦';
  const label=document.createElement('span'); label.textContent=point.name; button.append(icon,label);
  button.setAttribute('aria-label',point.name); hotspotLayer.appendChild(button);
  button.addEventListener('click',()=>{
    const action=direct[point.id], distanceToPoint=Math.hypot(avatar.group.position.x-point.x,avatar.group.position.z-point.z);
    if(distanceToPoint<point.radius) {
      target=null; route=[]; chosenAction=action;
      if(pendingInteractions.has(action)) { const callback=pendingInteractions.get(action); pendingInteractions.delete(action); callback(); }
      else openActivity(action);
    } else navigate(action);
  });
  return {point,button};
});
function updateHotspots() {
  const allowed=started && !overview && !target && $('modal').hidden && $('action-menu').hidden && $('map-panel').hidden && $('emote-menu').hidden;
  const placed=[];
  const candidates=allowed?hotspots.map(item=>({...item,distance:Math.hypot(avatar.group.position.x-item.point.x,avatar.group.position.z-item.point.z)})).filter(item=>item.distance<13).sort((a,b)=>a.distance-b.distance):[];
  const visible=new Set();
  for(const item of candidates) {
    hotspotVector.set(item.point.x,2.7,item.point.z).project(camera);
    const x=(hotspotVector.x+1)*innerWidth/2,y=(1-hotspotVector.y)*innerHeight/2;
    if(hotspotVector.z < -1 || hotspotVector.z > 1 || x<54 || x>innerWidth-54 || y<125 || y>innerHeight-170) continue;
    if(hotspotBehindWall(item.point)) continue;
    if(placed.some(pos=>Math.abs(pos.x-x)<100 && Math.abs(pos.y-y)<45)) continue;
    item.button.style.left=`${x}px`; item.button.style.top=`${y}px`; visible.add(item.button); placed.push({x,y});
    if(placed.length >= (innerWidth<600?2:3)) break;
  }
  hotspots.forEach(({button})=>{ const hidden=!visible.has(button); if(button.hidden!==hidden) button.hidden=hidden; });
}

function applyGraphicsQuality(mode) {
  graphicsQuality=mode==='smooth'?'smooth':'balanced';
  const shadows=graphicsQuality!=='smooth';
  const shadowChanged=renderer.shadowMap.enabled!==shadows;
  renderer.shadowMap.enabled=shadows; sun.castShadow=shadows;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, shadows?1.5:1));
  renderer.setSize(innerWidth,innerHeight);
  if(shadowChanged) scene.traverse(object=>{
    if(!object.isMesh || !object.material) return;
    const materials=Array.isArray(object.material)?object.material:[object.material];
    materials.forEach(material=>{material.needsUpdate=true;});
  });
}
function saveProfile() { try { localStorage.setItem('yunxi-profile', JSON.stringify({name: $('name-input').value.trim() || '山间旅人', variant: selectedVariant, showName: showPlayerName, quality:graphicsQuality})); return true; } catch { return false; } }
try {
  const profile=JSON.parse(localStorage.getItem('yunxi-profile') || 'null');
  if (profile && typeof profile.name === 'string') $('name-input').value=profile.name.slice(0,12);
  if (profile && avatarVariants.some(([id])=>id===profile.variant)) selectedVariant=profile.variant;
  if (profile && typeof profile.showName==='boolean') showPlayerName=profile.showName;
  if (profile && ['balanced','smooth'].includes(profile.quality)) graphicsQuality=profile.quality;
} catch {}
function chooseVariant(variant) {
  selectedVariant=variant; avatar.setVariant?.(variant);
  document.querySelectorAll('[data-avatar]').forEach(button => { const selected=button.dataset.avatar===variant; button.classList.toggle('selected',selected); button.setAttribute('aria-pressed', String(selected)); });
}
chooseVariant(selectedVariant); updateName(); applyGraphicsQuality(graphicsQuality);
$('enter-game').addEventListener('click', () => { updateName(); const saved=saveProfile(); started = true; $('welcome').hidden = true; document.dispatchEvent(new Event('fuyala:game-start')); toast(saved?'欢迎来到福呀啦':'形象暂在本页生效，刷新后可能丢失'); });
document.querySelectorAll('[data-avatar]').forEach(button => button.addEventListener('click', () => chooseVariant(button.dataset.avatar)));
$('random-name').onclick=()=>{ $('name-input').value=randomName(); updateName(); };
$('collection-toggle').onclick=()=>{ activityEpoch++; pendingInteractions.clear(); $('action-menu').hidden=true; $('emote-menu').hidden=true; $('map-panel').hidden=true; openCollection(api); };
$('menu-toggle').onclick = () => { if (!$('modal').hidden) closeModal(); $('action-menu').hidden = !$('action-menu').hidden; $('emote-menu').hidden = true; };
document.querySelectorAll('[data-category]').forEach(button => button.onclick=()=>{
  if (!$('modal').hidden) closeModal(); $('action-menu').hidden=false; $('emote-menu').hidden=true;
  const section=$('action-menu').querySelectorAll('.menu-section')[Number(button.dataset.category)];
  section?.scrollIntoView({block:'nearest',behavior:'smooth'});
});
$('menu-close').onclick = () => $('action-menu').hidden = true;
document.querySelectorAll('[data-action]').forEach(button => button.onclick = () => navigate(button.dataset.action));
$('interact').onclick = () => { if (!currentPoint) return; const id = chosenAction && pointMap[chosenAction] === currentPoint.id ? chosenAction : direct[currentPoint.id]; if (pendingInteractions.has(id)) { const callback=pendingInteractions.get(id); pendingInteractions.delete(id); callback(); } else openActivity(id); };
$('modal-close').onclick = closeModal;
const mapView={scale:1,x:0,y:0}, mapPointers=new Map(); let mapPinch=0, mapDragged=false, suppressMapClick=false;
function renderMap() {
  const rect=$('map-viewport').getBoundingClientRect();
  mapView.scale=THREE.MathUtils.clamp(mapView.scale,1,2.5);
  mapView.x=THREE.MathUtils.clamp(mapView.x,-rect.width*(mapView.scale-1)/2,rect.width*(mapView.scale-1)/2);
  mapView.y=THREE.MathUtils.clamp(mapView.y,-rect.height*(mapView.scale-1)/2,rect.height*(mapView.scale-1)/2);
  $('map-canvas').style.transform=`translate(${mapView.x}px,${mapView.y}px) scale(${mapView.scale})`;
  $('map-zoom-label').textContent=`${Math.round(mapView.scale*100)}%`;
}
$('map-toggle').onclick = () => { keys.clear(); resetStick(); $('map-panel').hidden=false; renderMap(); };
$('map-close').onclick = () => $('map-panel').hidden = true;
$('map-zoom-in').onclick=()=>{mapView.scale*=1.25;renderMap();};
$('map-zoom-out').onclick=()=>{mapView.scale/=1.25;renderMap();};
$('map-reset').onclick=()=>{mapView.scale=1;mapView.x=mapView.y=0;renderMap();};
$('map-center').onclick=()=>{ const rect=$('map-viewport').getBoundingClientRect(),p=avatar.group.position; mapView.scale=Math.max(1.5,mapView.scale); const px=THREE.MathUtils.clamp(50+p.x/60*80,5,95)/100,py=THREE.MathUtils.clamp(50+p.z/60*80,5,95)/100; mapView.x=(.5-px)*rect.width*mapView.scale;mapView.y=(.5-py)*rect.height*mapView.scale;renderMap(); };
const mapViewport=$('map-viewport');
mapViewport.addEventListener('wheel',event=>{event.preventDefault();mapView.scale*=event.deltaY<0?1.1:1/1.1;renderMap();},{passive:false});
mapViewport.addEventListener('keydown',event=>{
  const delta=24, key=event.key;
  if(key==='+'||key==='=')mapView.scale*=1.25;
  else if(key==='-'||key==='_')mapView.scale/=1.25;
  else if(key==='0'){mapView.scale=1;mapView.x=mapView.y=0;}
  else if(key==='ArrowLeft')mapView.x+=delta;
  else if(key==='ArrowRight')mapView.x-=delta;
  else if(key==='ArrowUp')mapView.y+=delta;
  else if(key==='ArrowDown')mapView.y-=delta;
  else return;
  event.preventDefault();event.stopPropagation();renderMap();
});
mapViewport.addEventListener('pointerdown',event=>{
  if(event.button!==0) return;
  const onButton=Boolean(event.target.closest('button'));
  // Mouse clicks on map destinations must remain ordinary button clicks.
  // Touches on a destination are tracked too, so they can begin a pinch.
  if(onButton && event.pointerType==='mouse') return;
  mapPointers.set(event.pointerId,{x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,onButton});
  if(!onButton) mapViewport.setPointerCapture(event.pointerId);
  if(mapPointers.size===1) mapDragged=false;
  if(mapPointers.size===2){
    const [a,b]=[...mapPointers.values()];mapPinch=Math.hypot(a.x-b.x,a.y-b.y);mapDragged=true;
    // Redirect both pointers after a pinch is established, preventing a destination click.
    for(const id of mapPointers.keys()) try {mapViewport.setPointerCapture(id);} catch {}
  }
});
mapViewport.addEventListener('pointermove',event=>{
  const pointer=mapPointers.get(event.pointerId);if(!pointer)return;
  const dx=event.clientX-pointer.x,dy=event.clientY-pointer.y;pointer.x=event.clientX;pointer.y=event.clientY;
  if(Math.hypot(pointer.x-pointer.startX,pointer.y-pointer.startY)>4){
    mapDragged=true;
    if(pointer.onButton) { try {mapViewport.setPointerCapture(event.pointerId);} catch {} }
  }
  if(mapPointers.size===2){const [a,b]=[...mapPointers.values()];const pinch=Math.hypot(a.x-b.x,a.y-b.y);if(mapPinch>0)mapView.scale*=pinch/mapPinch;mapPinch=pinch;}
  else if(mapPointers.size===1 && (!pointer.onButton || mapDragged)){mapView.x+=dx;mapView.y+=dy;}
  renderMap();
});
function finishMapPointer(event){if(!mapPointers.has(event.pointerId))return;mapPointers.delete(event.pointerId);mapPinch=0;if(mapDragged){suppressMapClick=true;setTimeout(()=>{suppressMapClick=false;},0);}}
mapViewport.addEventListener('pointerup',finishMapPointer);mapViewport.addEventListener('pointercancel',finishMapPointer);
mapViewport.addEventListener('click',event=>{if(suppressMapClick){event.preventDefault();event.stopPropagation();}},true);
document.querySelectorAll('[data-map-action]').forEach(button => button.onclick=()=>{
  $('map-panel').hidden=true;
  navigate(button.dataset.mapAction);
});
$('overview-toggle').onclick = () => { overview = !overview; toast(overview ? '已切换俯瞰视角' : '已返回人物视角'); };
function setAmbient(enabled) {
  if (!enabled) { if (windGain && audio) windGain.gain.setTargetAtTime(0,audio.currentTime,0.2); return; }
  audio ||= new (window.AudioContext || window.webkitAudioContext)();
  if (audio.state === 'suspended') audio.resume();
  if (!windSource) {
    const buffer=audio.createBuffer(1,audio.sampleRate*3,audio.sampleRate), data=buffer.getChannelData(0);
    for(let i=0;i<data.length;i++) data[i]=Math.random()*2-1;
    windSource=audio.createBufferSource(); windSource.buffer=buffer; windSource.loop=true;
    const filter=audio.createBiquadFilter(); filter.type='lowpass'; filter.frequency.value=370;
    windGain=audio.createGain(); windGain.gain.value=0; windSource.connect(filter).connect(windGain).connect(audio.destination); windSource.start();
  }
  windGain.gain.setTargetAtTime(0.018,audio.currentTime,0.5);
}
$('sound-toggle').onclick = () => { sound = !sound; if(!sound) { stopStageBeat(); const stageButton=$('stage-sound'); if(stageButton) stageButton.textContent='开启节奏'; } setAmbient(sound); $('sound-toggle').classList.toggle('active', sound); $('sound-toggle').setAttribute('aria-pressed',String(sound)); toast(sound ? '山风与互动声音已开启' : '声音已关闭'); };
let stageBeatTimer=null, stageBeatCount=0;
function stopStageBeat(){if(stageBeatTimer!==null)clearInterval(stageBeatTimer);stageBeatTimer=null;}
function startStageBeat(){
  if(stageBeatTimer!==null)return;
  audio ||= new (window.AudioContext || window.webkitAudioContext)(); if(audio.state==='suspended')audio.resume();
  sound=true; $('sound-toggle').classList.add('active'); $('sound-toggle').setAttribute('aria-pressed','true'); setAmbient(true);
  function beat(){const now=audio.currentTime;const osc=audio.createOscillator(),gain=audio.createGain();osc.type='sine';osc.frequency.setValueAtTime(stageBeatCount++%2?220:110,now);osc.frequency.exponentialRampToValueAtTime(55,now+.16);gain.gain.setValueAtTime(.03,now);gain.gain.exponentialRampToValueAtTime(.001,now+.18);osc.connect(gain).connect(audio.destination);osc.start(now);osc.stop(now+.19);}
  beat();stageBeatTimer=setInterval(beat,500);
}
$('time-toggle').onclick = () => {
  night=!night; scene.background.set(night?'#253d51':'#d5e5dc'); scene.fog.color.set(night?'#253d51':'#d5e5dc');
  ambientLight.intensity=night?0.75:2.1; sun.intensity=night?0.75:2.3; sun.color.set(night?'#a5b9df':'#fff4df'); lanternLights.forEach(light=>light.visible=night); if (panorama) panorama.material.color.set(night?'#52647c':'#ffffff');
  $('time-toggle').textContent=night?'☀':'☾'; $('time-toggle').setAttribute('aria-pressed',String(night)); toast(night?'夜幕降临':'天光正好');
};
function updateFullscreenControl(){
  const control=$('fullscreen-toggle');if(!control)return;
  const supported=Boolean(document.fullscreenEnabled && $('game').requestFullscreen && document.exitFullscreen);
  const active=Boolean(document.fullscreenElement);control.disabled=!supported;
  control.setAttribute('aria-pressed',String(active));control.textContent=t(active?'fullscreenExit':'fullscreenEnter');
  const status=$('fullscreen-status');if(status && !supported)status.textContent=t('fullscreenUnavailable');
}
document.addEventListener('fullscreenchange',updateFullscreenControl);
$('settings-toggle').onclick = () => {
  let choice=selectedVariant;
  showModal(t('settings'), `<label for="profile-language">${t('chooseLanguage')}</label><select id="profile-language" class="language-select">${languageOptions()}</select><small class="profile-language-note">${t('languageNote')}</small><label for="profile-quality">${t('graphicsQuality')}</label><select id="profile-quality" class="language-select"><option value="balanced">${t('qualityBalanced')}</option><option value="smooth">${t('qualitySmooth')}</option></select><div class="fullscreen-setting"><button type="button" id="fullscreen-toggle" class="secondary"></button><p id="fullscreen-status" class="backup-help" role="status"></p></div><label for="profile-name">${t('name')}</label><div class="profile-name-row"><input id="profile-name" maxlength="12" autocomplete="off"><button type="button" id="profile-random" class="profile-random">${t('random')}</button></div><p>${t('avatar')}</p><div class="profile-options">${avatarVariants.map(([id,label])=>`<button type="button" data-profile="${id}">${label}</button>`).join('')}</div><label class="profile-name-visibility"><input type="checkbox" id="profile-show-name"> ${t('showName')}</label><button id="profile-save">${t('save')}</button><div class="backup-controls"><p><strong>${t('shareTitle')}</strong></p><p class="backup-help">${t('shareHelp')}</p><label for="share-link">${t('shareLabel')}</label><input id="share-link" readonly><button type="button" id="share-copy" class="secondary">${t('shareCopy')}</button><p id="share-status" class="backup-help" aria-live="polite"></p></div><div class="backup-controls"><p><strong>${t('backupTitle')}</strong></p><p class="backup-help">${t('backupHelp')}</p><button type="button" id="backup-export" class="secondary">${t('backupExport')}</button><button type="button" id="backup-import" class="secondary">${t('backupImport')}</button><input type="file" id="backup-file" accept=".json,application/json" hidden></div>`);
  updateFullscreenControl();
  $('fullscreen-toggle').onclick=async()=>{
    try { if(document.fullscreenElement) await document.exitFullscreen(); else await $('game').requestFullscreen(); }
    catch { const status=$('fullscreen-status'); if(status)status.textContent=t('fullscreenError'); }
    updateFullscreenControl();
  };
  const linkUrl=new URL(window.location.href);linkUrl.search='';linkUrl.hash='';
  $('share-link').value=linkUrl.href;
  $('share-copy').onclick=async()=>{
    try {if(!navigator.clipboard?.writeText)throw new Error('unavailable');await navigator.clipboard.writeText(linkUrl.href);$('share-status').textContent=t('shareCopied');}
    catch {$('share-link').focus();$('share-link').select();$('share-status').textContent=t('shareManual');}
  };
  $('backup-export').onclick=()=>{
    try {const contents=createBackup(localStorage), blob=new Blob([contents],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='fuyala-save.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
    catch {toast(t('backupExportError'));}
  };
  $('backup-import').onclick=()=>{$('backup-file').click();};
  $('backup-file').onchange=async event=>{
    const file=event.target.files?.[0];event.target.value='';if(!file)return;
    if(file.size>2*1024*1024){toast(t('backupInvalid'));return;}
    let data;try{data=parseBackup(await file.text());}catch{toast(t('backupInvalid'));return;}
    if(!window.confirm(t('backupConfirm')))return;
    try{restoreBackup(localStorage,data);window.location.reload();}
    catch{toast(t('backupStorageError'));}
  };
  $('profile-name').value=$('name-input').value;
  $('profile-quality').value=graphicsQuality;
  $('profile-show-name').checked=showPlayerName;
  $('profile-random').onclick=()=>{ $('profile-name').value=randomName(); };
  const choices=[...$('modal-body').querySelectorAll('[data-profile]')];
  function mark(){ choices.forEach(button=>{const selected=button.dataset.profile===choice;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));}); }
  choices.forEach(button=>button.onclick=()=>{choice=button.dataset.profile;mark();}); mark();
  $('profile-save').onclick=()=>{ const languageSaved=setLanguage($('profile-language').value); $('name-input').value=$('profile-name').value.trim() || '山间旅人'; showPlayerName=$('profile-show-name').checked; applyGraphicsQuality($('profile-quality').value); chooseVariant(choice); updateName(); const saved=saveProfile() && languageSaved; closeModal(); toast(saved?'个人设置已保存':'设置暂在本页生效，刷新后可能丢失'); };
};
$('photo-button').onclick = () => {
  renderer.render(scene,camera); const photo=renderer.domElement.toDataURL('image/png');
  showModal('留住这一刻','<img class="photo-preview" alt="刚刚拍摄的庭院照片"><p>保存这张照片，留作纪念。</p><button id="photo-save">保存照片</button>');
  $('modal-body').querySelector('img').src=photo; $('photo-save').onclick=()=>{const link=document.createElement('a');link.download='福呀啦.png';link.href=photo;link.click();};
};
$('emote-toggle').onclick = () => { $('emote-menu').hidden = !$('emote-menu').hidden; $('action-menu').hidden = true; };
document.querySelectorAll('[data-emote]').forEach(button => button.onclick = () => { $('emote-menu').hidden = true; animateGesture(button.dataset.emote); toast(button.textContent); });
window.addEventListener('keydown', e => { if (!$('modal').hidden || !$('map-panel').hidden || !$('action-menu').hidden || !$('emote-menu').hidden || /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) return; keys.add(e.key.toLowerCase()); if (e.key.toLowerCase() === 'e' && currentPoint && $('modal').hidden) $('interact').click(); if (e.code === 'Space' && started && jumpHeight === 0 && $('modal').hidden) { e.preventDefault(); jumpVelocity = 5.8; } });
window.addEventListener('blur', () => { keys.clear(); resetStick(); });
window.addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));
let joystickPointer = null, lastStickTap = 0;
$('joystick').addEventListener('pointerdown', e => { if (performance.now() - lastStickTap < 320 && jumpHeight === 0) jumpVelocity = 5.8; lastStickTap = performance.now(); joystickPointer = e.pointerId; e.currentTarget.setPointerCapture(e.pointerId); });
$('joystick').addEventListener('pointermove', e => { if(e.pointerId !== joystickPointer) return; const rect = e.currentTarget.getBoundingClientRect(), x = (e.clientX - rect.left - rect.width/2)/(rect.width/2), y=(e.clientY-rect.top-rect.height/2)/(rect.height/2), len=Math.max(1,Math.hypot(x,y)); stick.x=x/len; stick.y=y/len; $('joystick-knob').style.transform=`translate(${stick.x*28}px, ${stick.y*28}px)`; target = null; route = []; chosenAction=null; pendingInteractions.clear(); });
function resetStick(){ joystickPointer=null; stick.x=stick.y=0; $('joystick-knob').style.transform=''; }
$('joystick').addEventListener('pointerup',resetStick); $('joystick').addEventListener('pointercancel',resetStick);
const pointers = new Map();
let lastPinch = 0;
renderer.domElement.addEventListener('pointerdown', e => {
  renderer.domElement.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY, moved: false });
  if (pointers.size === 2) { const [a, b] = [...pointers.values()]; lastPinch = Math.hypot(a.x-b.x, a.y-b.y); }
});
renderer.domElement.addEventListener('pointermove', e => {
  const pointer = pointers.get(e.pointerId); if (!pointer) return;
  const dx = e.clientX - pointer.x, dy = e.clientY - pointer.y;
  pointer.x = e.clientX; pointer.y = e.clientY;
  if (Math.hypot(pointer.x-pointer.startX, pointer.y-pointer.startY) > 5) pointer.moved = true;
  if (pointers.size === 2) {
    const [a,b] = [...pointers.values()]; const pinch = Math.hypot(a.x-b.x,a.y-b.y);
    if (lastPinch) distance = THREE.MathUtils.clamp(distance * lastPinch / pinch, 7, 25);
    lastPinch = pinch; a.moved = true; b.moved = true;
  } else { angle -= dx * 0.006; pitch = THREE.MathUtils.clamp(pitch + dy * 0.004, 0.25, 1.15); }
});
renderer.domElement.addEventListener('pointerup', e => {
  const pointer = pointers.get(e.pointerId);
  if (pointer && !pointer.moved && pointers.size === 1 && started && $('modal').hidden) {
    const ndc = new THREE.Vector2(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(ndc,camera); const hit = new THREE.Vector3();
    if (ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),hit)) { chosenAction = null; pendingInteractions.clear(); routeTo(new THREE.Vector3(THREE.MathUtils.clamp(hit.x,-30,30),0,THREE.MathUtils.clamp(hit.z,-30,30)));  }
  }
  pointers.delete(e.pointerId); lastPinch = 0;
});
renderer.domElement.addEventListener('pointercancel', e => { pointers.delete(e.pointerId); lastPinch = 0; });
renderer.domElement.addEventListener('wheel', e => { distance = THREE.MathUtils.clamp(distance + e.deltaY*0.01,7,25); }, {passive:true});
window.addEventListener('resize', () => { camera.aspect=innerWidth/innerHeight; camera.fov=innerWidth < 600 ? 58 : 48; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });
const clock = new THREE.Clock(); let elapsed=0;
function animate() {
 requestAnimationFrame(animate); const dt=Math.min(clock.getDelta(),0.05); elapsed+=dt;
 let x=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0)+stick.x;
 let z=(keys.has('s')||keys.has('arrowdown')?1:0)-(keys.has('w')||keys.has('arrowup')?1:0)+stick.y;
 if (x || z) { target=null; route=[]; chosenAction=null; pendingInteractions.clear(); const len=Math.hypot(x,z); x/=len; z/=len; const wx=x*Math.cos(angle)+z*Math.sin(angle), wz=-x*Math.sin(angle)+z*Math.cos(angle); x=wx; z=wz; }
 else if(target) {
   while(target && Math.hypot(target.x-avatar.group.position.x,target.z-avatar.group.position.z)<0.25) {
     target=route.shift() || null;
     if(!target && chosenAction) {
       if(chosenAction==='dance' && $('modal').hidden) openActivity('dance');
       else toast('已到达，点击互动');
     }
   }
   if(target) { const dx=target.x-avatar.group.position.x, dz=target.z-avatar.group.position.z, d=Math.hypot(dx,dz); x=dx/d; z=dz/d; }
 }
 destinationMarker.visible=started && !!target;
 if(destinationMarker.visible) { const pulse=1+Math.sin(elapsed*3)*0.09; destinationMarker.scale.set(pulse,1,pulse); markerInner.rotation.z=elapsed*0.7; }
 moving=started && !!(x || z) && $('modal').hidden;
 if(moving){ const speed=keys.has('shift') || Math.hypot(stick.x, stick.y)>0.8 ? 7.5 : 4.5; const nextX=THREE.MathUtils.clamp(avatar.group.position.x+x*speed*dt,-32,32), nextZ=THREE.MathUtils.clamp(avatar.group.position.z+z*speed*dt,-32,32); if(!blocked(nextX,avatar.group.position.z)) avatar.group.position.x=nextX; if(!blocked(avatar.group.position.x,nextZ)) avatar.group.position.z=nextZ; const facing=Math.atan2(-x,-z), delta=Math.atan2(Math.sin(facing-avatar.group.rotation.y),Math.cos(facing-avatar.group.rotation.y)); avatar.group.rotation.y+=delta*Math.min(1,dt*10); }
 // Manual entry into the music stage starts its interaction once per visit.
 const stageDistance=Math.hypot(avatar.group.position.x-27,avatar.group.position.z-19);
 if(stageDistance>5) danceAreaEntered=false;
 if(started && stageDistance<3 && !danceAreaEntered && !target && $('modal').hidden && $('action-menu').hidden && $('map-panel').hidden && $('emote-menu').hidden){ danceAreaEntered=true; openActivity('dance'); }
 const previousAvatarY = avatar.group.position.y;
 if (jumpHeight > 0 || jumpVelocity > 0) { jumpHeight = Math.max(0, jumpHeight + jumpVelocity * dt); jumpVelocity -= 13 * dt; if (jumpHeight === 0) jumpVelocity = 0; } avatar.group.position.y = jumpHeight;
 // Keep the joints continuous as the player starts walking, sits or changes activity.
 const previousPose = {
   leftLeg: avatar.leftLeg.rotation.x, rightLeg: avatar.rightLeg.rotation.x,
   leftArmX: avatar.leftArm.rotation.x, rightArmX: avatar.rightArm.rotation.x,
   leftArmZ: avatar.leftArm.rotation.z, rightArmZ: avatar.rightArm.rotation.z,
   bodyX: avatar.group.rotation.x, bodyZ: avatar.group.rotation.z,
   headX: avatar.head.rotation.x, headZ: avatar.head.rotation.z,
   y: previousAvatarY
 };
 walkBlend += ((moving ? 1 : 0) - walkBlend) * (1 - Math.exp(-dt * 9));
 walkClock += dt * (keys.has('shift') ? 11 : 8.5);
 const stride = Math.sin(walkClock), breathing = Math.sin(elapsed * 1.65);
 const swing = stride * 0.52 * walkBlend;
 avatar.leftLeg.rotation.x=swing; avatar.rightLeg.rotation.x=-swing;
 avatar.leftArm.rotation.x=-swing*0.72; avatar.rightArm.rotation.x=swing*0.72;
 avatar.leftArm.rotation.z = 0.035 + breathing * 0.018; avatar.rightArm.rotation.z = -0.035 - breathing * 0.018;
 avatar.group.rotation.x = 0.035 * walkBlend; avatar.group.rotation.z = stride * 0.035 * walkBlend;
 avatar.head.rotation.x = breathing * 0.018; avatar.head.rotation.z = -stride * 0.025 * walkBlend;
 avatar.group.position.y = jumpHeight + Math.abs(Math.sin(walkClock)) * 0.055 * walkBlend;
 if (heldProp === 'cup') avatar.rightArm.rotation.x = 0.75;
 if (gesture && performance.now() < gestureUntil && !moving) {
   const phase = ((gesture.pauseTime || performance.now()) - gesture.started) / 1000;
   const gentle = Math.sin(phase * 1.8);
   if (gesture.action === 'wave') { avatar.rightArm.rotation.z = -2.0 + Math.sin(phase * 7) * 0.26; avatar.rightArm.rotation.x = 0.25; avatar.head.rotation.z = 0.08; }
   else if (gesture.action === 'fish') { avatar.rightArm.rotation.x = 0.8 + Math.sin(phase * 4) * 0.32; avatar.rightArm.rotation.z = -0.25; avatar.group.rotation.x = -0.09; }
   else if (gesture.action === 'bow') { const bow = Math.sin(Math.min(1,phase/2.7)*Math.PI); avatar.group.rotation.x = -0.38 * bow; avatar.leftArm.rotation.x = 0.9; avatar.rightArm.rotation.x = 0.9; avatar.head.rotation.x = -0.12*bow; }
   else if (gesture.action === 'incense') { avatar.leftArm.rotation.x = 1.0 + gentle*0.025; avatar.rightArm.rotation.x = 1.05 + gentle*0.025; avatar.group.rotation.x = gesture.phase === 'offer' ? -0.28 : -0.05; avatar.head.rotation.x=-0.08; }
   else if (gesture.action === 'fortune') { avatar.rightArm.rotation.x = 1.05 + (gesture.phase === 'shake' ? Math.sin(phase*11)*0.28 : gentle*0.025); avatar.leftArm.rotation.x = 0.7; avatar.head.rotation.x=-0.08; }
   else if (gesture.action === 'wish') { avatar.rightArm.rotation.x = 1.65 + Math.sin(phase*3)*0.12; avatar.rightArm.rotation.z=-0.3; avatar.leftArm.rotation.x=0.4; avatar.head.rotation.x=0.12; }
   else if (gesture.action === 'reading') { avatar.leftArm.rotation.x = 0.85; avatar.rightArm.rotation.x = 1.1; avatar.head.rotation.x = -0.18 + gentle*0.025; }
   else if (gesture.action === 'alchemy') { avatar.rightArm.rotation.x = 0.9 + Math.sin(phase*7)*0.38; avatar.group.rotation.z = Math.sin(phase*3.5)*0.06; }
   else if (['wood','bell','drum'].includes(gesture.action)) {
     const strike=gesture.phase==='strike' && phase<0.55 ? Math.sin(phase*Math.PI/0.55)*0.55 : 0;
     avatar.rightArm.rotation.x=0.8+strike;
     avatar.head.rotation.x=-0.06-strike*0.08;
     if (gesture.action==='wood') { avatar.group.position.y=jumpHeight-0.28; avatar.leftLeg.rotation.x=1.15; avatar.rightLeg.rotation.x=1.15; avatar.group.rotation.x=-0.08; }
   }
   else if (gesture.action === 'hug') { avatar.leftArm.rotation.z = 1.0; avatar.rightArm.rotation.z = -1.0; avatar.leftArm.rotation.x = 0.7; avatar.rightArm.rotation.x = 0.7; }
   else if (gesture.action === 'heart') { avatar.leftArm.rotation.z = 2.4; avatar.rightArm.rotation.z = -2.4; avatar.head.rotation.z = 0.12; }
   else if (gesture.action === 'exercise') {
     // Eight distinct, deliberately slow forms. Pausing freezes their phase.
     const form=Number(gesture.phase)||0, slow=Math.sin(phase*1.1), rise=(slow+1)/2;
     switch(form) {
       case 0: avatar.leftArm.rotation.z=0.25+rise*1.65; avatar.rightArm.rotation.z=-0.25-rise*1.65; break;
       case 1: avatar.leftArm.rotation.z=1.25+slow*0.25; avatar.rightArm.rotation.z=-0.35-slow*0.35; avatar.group.rotation.z=slow*0.12; break;
       case 2: avatar.leftArm.rotation.x=0.4+rise*1.1; avatar.rightArm.rotation.x=1.5-rise*1.1; avatar.group.rotation.z=slow*0.08; break;
       case 3: avatar.leftArm.rotation.z=0.5+rise*1.1; avatar.rightArm.rotation.z=-0.5-rise*1.1; avatar.group.rotation.x=-0.12*rise; break;
       case 4: avatar.leftArm.rotation.x=0.8+slow*0.3; avatar.rightArm.rotation.x=0.8-slow*0.3; avatar.leftArm.rotation.z=0.55; avatar.rightArm.rotation.z=-0.55; break;
       case 5: avatar.group.rotation.x=-0.28*rise; avatar.leftArm.rotation.x=0.4+rise*0.6; avatar.rightArm.rotation.x=0.4+rise*0.6; break;
       case 6: avatar.leftArm.rotation.z=1.1+slow*0.45; avatar.rightArm.rotation.z=-1.1+slow*0.45; avatar.group.rotation.z=-slow*0.12; break;
       default: avatar.leftArm.rotation.z=0.25+rise*1.25; avatar.rightArm.rotation.z=-0.25-rise*1.25; avatar.head.rotation.x=-rise*0.08;
     }
   }
   else if (gesture.action === 'dance') { avatar.leftArm.rotation.z=.65+Math.sin(phase*3)*.7; avatar.rightArm.rotation.z=-.65-Math.sin(phase*3+1)*.7; avatar.group.rotation.z=Math.sin(phase*3)*.12; avatar.head.rotation.z=-Math.sin(phase*3)*.06; }
   else if (gesture.action === 'rest') { avatar.group.position.y = jumpHeight-0.25; avatar.leftLeg.rotation.x = 1.1; avatar.rightLeg.rotation.x = 1.1; avatar.group.rotation.x = -0.08; }
   else if (gesture.action === 'tea') { avatar.rightArm.rotation.x = gesture.phase === 'drink' ? 1.55 - Math.min(phase,2)*0.18 : 1.1; avatar.head.rotation.x=-0.08; }
   else if (gesture.action === 'tarot') { avatar.leftArm.rotation.x = 0.8 + Math.sin(phase*4)*0.15; avatar.rightArm.rotation.x = 0.8 - Math.sin(phase*4)*0.15; avatar.head.rotation.x=-0.13; }
   else if (gesture.action === 'question') { avatar.head.rotation.x = -0.16 + gentle*0.015; avatar.rightArm.rotation.x = 0.65; }
   else { avatar.rightArm.rotation.x = 0.8 + Math.sin(phase * 6) * 0.2; }
 } else if (gesture && performance.now() >= gestureUntil) { gesture = null; avatar.setProp?.(heldProp); }
 const poseEase=1-Math.exp(-dt*11);
 const ease=(oldValue,newValue)=>THREE.MathUtils.lerp(oldValue,newValue,poseEase);
 avatar.leftLeg.rotation.x=ease(previousPose.leftLeg,avatar.leftLeg.rotation.x); avatar.rightLeg.rotation.x=ease(previousPose.rightLeg,avatar.rightLeg.rotation.x);
 avatar.leftArm.rotation.x=ease(previousPose.leftArmX,avatar.leftArm.rotation.x); avatar.rightArm.rotation.x=ease(previousPose.rightArmX,avatar.rightArm.rotation.x);
 avatar.leftArm.rotation.z=ease(previousPose.leftArmZ,avatar.leftArm.rotation.z); avatar.rightArm.rotation.z=ease(previousPose.rightArmZ,avatar.rightArm.rotation.z);
 avatar.group.rotation.x=ease(previousPose.bodyX,avatar.group.rotation.x); avatar.group.rotation.z=ease(previousPose.bodyZ,avatar.group.rotation.z);
 avatar.head.rotation.x=ease(previousPose.headX,avatar.head.rotation.x); avatar.head.rotation.z=ease(previousPose.headZ,avatar.head.rotation.z);
 // Preserve instantaneous jumps; blend only the seated/standing transition.
 if (jumpHeight === 0) avatar.group.position.y=ease(previousPose.y,avatar.group.position.y);
 currentPoint=nearPoint(); $('interact').hidden=!started || !currentPoint || !!target || !$('modal').hidden; if(currentPoint) { $('interact').textContent = chosenAction && pointMap[chosenAction]===currentPoint.id ? (document.querySelector(`[data-action="${chosenAction}"]`)?.textContent.trim() || currentPoint.name) : currentPoint.name; $('location-name').textContent=locationMap[currentPoint.id] || currentPoint.name; } else { $('location-name').textContent=avatar.group.position.z>18?'山门前':'山居庭院'; }
 const p=avatar.group.position; cameraRayTarget.set(p.x,p.y+1.5,p.z).sub(camera.position); const cameraRayLength=cameraRayTarget.length(); cameraRay.set(camera.position,cameraRayTarget.normalize()); if (gateFront) gateFront.visible = overview || p.z > 22; updateWorld?.(dt, elapsed); if (fishGroup) { const fed = performance.now() < fishFeedUntil; if (fed) fishGroup.rotation.y += dt * 0.67; const scale = fed ? 0.58 : 1; fishGroup.scale.lerp(new THREE.Vector3(scale, 1, scale), 0.035); } const roofCenters = [[0,16,5], [0,-19,6], [-15,-8,5], [15,-9,5], [-15,-22,5], [15,-22,5], [-16,9,4], [16,10,4], [-19,3,3], [-27,-15,4], [27,-15,4], [0,-28,4], [-23,-9.5,2.8], [23,-9.5,2.8]]; roofGroups.forEach((roof, index) => {
   const center=roofCenters[index]; if (!center) return;
   if (overview) { roof.visible=true; return; }
   if (index===0) { roof.visible=p.z>22; return; }
   const dx=camera.position.x-p.x, dz=camera.position.z-p.z, length2=dx*dx+dz*dz;
   const t=length2 ? THREE.MathUtils.clamp(((center[0]-p.x)*dx+(center[1]-p.z)*dz)/length2,0,1) : 0;
   const along=Math.hypot(p.x+t*dx-center[0],p.z+t*dz-center[1]);
   const near=Math.hypot(p.x-center[0],p.z-center[1])<center[2];
   const bounds=roofBounds[index], intersects=bounds && !bounds.isEmpty() && (bounds.containsPoint(camera.position) || (cameraRay.intersectBox(bounds,cameraRayHit) && cameraRayHit.distanceTo(camera.position)<cameraRayLength));
   roof.visible=!(near || intersects || (t>0 && t<1 && along<center[2]));
 });
 treeCrowns.forEach(tree => {
   if (overview) { tree.mesh.visible=true; tree.trunks?.forEach(part=>part.visible=true); return; }
   const dx=camera.position.x-p.x, dz=camera.position.z-p.z, length2=dx*dx+dz*dz;
   const t=length2 ? ((tree.x-p.x)*dx+(tree.z-p.z)*dz)/length2 : 0;
   const along=Math.hypot(p.x+t*dx-tree.x,p.z+t*dz-tree.z);
   tree.mesh.visible=!(Math.hypot(camera.position.x-tree.x,camera.position.z-tree.z)<tree.radius || (t>0.08 && t<0.98 && along<tree.radius));
   const trunkBlocked=t>0 && t<1 && along<tree.trunkRadius || Math.hypot(camera.position.x-tree.x,camera.position.z-tree.z)<tree.trunkRadius;
   tree.trunks?.forEach(part=>part.visible=!trunkBlocked);
 });
 interiorSigns.forEach(sign => { sign.mesh.visible = overview || Math.hypot(p.x-sign.x,p.z-sign.z) > sign.radius; }); const interior=halls.some(h => Math.abs(p.x-h.x)<h.w/2-0.4 && p.z<h.z+h.d/2+0.8 && p.z>h.z-h.d/2);
 const nearTea=Math.hypot(p.x+19,p.z-4.7)<3.5;
 const liveActivity=!$('modal').hidden && $('modal').querySelector('.dialog').classList.contains('live-activity');
 const facing=avatar.group.rotation.y;
 nameSprite.visible = showPlayerName && !liveActivity;
 const readingClose=gesture?.action==='reading';
 const nearFish=liveActivity && currentPoint?.id==='pond', nearMonk=liveActivity && currentPoint?.id==='monk', nearRelease=liveActivity && currentPoint?.id==='release';
 // Keep the small ritual in view; restore the avatar immediately afterward.
 avatar.group.visible=!nearRelease;
 const liveSide=readingClose?2.3:nearMonk?-3.4:(nearTea||nearFish||nearRelease)?-4.5:4.5, liveBack=readingClose?2.0:nearMonk?2.3:3;
 const livePosition=new THREE.Vector3(p.x+Math.sin(facing)*liveBack+Math.cos(facing)*liveSide,p.y+(readingClose?2.7:3.0),p.z+Math.cos(facing)*liveBack-Math.sin(facing)*liveSide);
 const desired=overview?new THREE.Vector3(0,65,6):nearRelease?new THREE.Vector3(-24.3,4.5,19.3):nearFish?new THREE.Vector3(14,9.5,5.5):liveActivity?livePosition:interior?new THREE.Vector3(p.x+Math.sin(angle)*8,p.y+4.5,p.z+Math.cos(angle)*8):nearTea?new THREE.Vector3(p.x+Math.sin(angle)*6-Math.cos(angle)*6,p.y+5,p.z+Math.cos(angle)*6+Math.sin(angle)*6):new THREE.Vector3(p.x+Math.sin(angle)*distance*Math.cos(pitch),p.y+distance*Math.sin(pitch)+2,p.z+Math.cos(angle)*distance*Math.cos(pitch)); camera.position.lerp(desired,0.08); const mapPlayer = document.querySelector('.map-player'); if (mapPlayer) { mapPlayer.style.left = `${THREE.MathUtils.clamp(50 + p.x / 60 * 70, 10, 90)}%`; mapPlayer.style.top = `${THREE.MathUtils.clamp(48 + p.z / 60 * 70, 10, 80)}%`; mapPlayer.style.transform = `rotate(${avatar.group.rotation.y}rad)`; } const fullMarker = $('world-map-player'); if(fullMarker) { fullMarker.style.left = `${THREE.MathUtils.clamp(50+p.x/60*80,5,95)}%`; fullMarker.style.top = `${THREE.MathUtils.clamp(50+p.z/60*80,5,95)}%`; fullMarker.style.transform=`translate(-50%, -50%) rotate(${avatar.group.rotation.y}rad)`; } camera.lookAt(overview?new THREE.Vector3(0,0,0):nearRelease?new THREE.Vector3(-27,1.55,11.45):nearFish?new THREE.Vector3(16.2,0.8,2):liveActivity?new THREE.Vector3(p.x,1.55,p.z):interior?new THREE.Vector3(p.x-Math.sin(angle)*1.5,2.5,p.z-Math.cos(angle)*1.5):new THREE.Vector3(p.x,1.4,p.z)); camera.updateMatrixWorld(); updateHotspots(); renderer.render(scene,camera);
}
animate();
