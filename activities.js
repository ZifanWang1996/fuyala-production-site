import { zodiacActivity } from './zodiac.js';
export const activities = [
  { id:'incense', group:'祈愿', name:'敬一炷香', location:'香庭' },
  { id:'wish', group:'祈愿', name:'写下心愿', location:'心愿树' },
  { id:'fortune', group:'祈愿', name:'抽一支签', location:'清和殿' },
  { id:'tarot', group:'祈愿', name:'星象牌', location:'星象摊' },
  { id:'zodiac', group:'祈愿', name:'生肖心笺', location:'星象摊' },
  { id:'question', group:'祈愿', name:'自我反思', location:'听雨阁' },
  { id:'alchemy', group:'体验', name:'炼制香丸', location:'丹房' },
  { id:'wood', group:'体验', name:'敲木鱼', location:'静修院' },
  { id:'bell', group:'体验', name:'鸣钟', location:'钟亭' },
  { id:'drum', group:'体验', name:'击鼓', location:'鼓亭' },
  { id:'exercise', group:'体验', name:'八段舒展', location:'练功场' },
  { id:'release', group:'体验', name:'打小人 · 烦恼退散', location:'解忧处' },
  { id:'reading', group:'闲游', name:'翻阅小册', location:'藏书阁' },
  { id:'tea', group:'闲游', name:'品一杯茶', location:'茶亭' },
  { id:'fish', group:'闲游', name:'喂锦鲤', location:'观鱼池' },
  { id:'rest', group:'闲游', name:'坐下来', location:'静修院' },
];

const fortunes = [
  { title:'山路渐明', verse:'云过峰头天渐阔，\n松间小径自分明。', summary:'眼前的事情正在展开，先从看得清的一步开始。', action:'今天挑一件小事，把它安稳地做好。' },
  { title:'清风入怀', verse:'一庭花影随风动，\n半盏清茶待月明。', summary:'给忙碌的日子留一点空隙，心绪会慢慢舒展。', action:'给自己一段不被打扰的休息时间。' },
  { title:'细水长流', verse:'细流穿石终成路，\n新叶经春渐满枝。', summary:'眼下适合耐心积累，微小的进步也值得珍惜。', action:'记下你愿意坚持的一件事。' },
  { title:'云开见月', verse:'山外浮云终有散，\n水中明月照归舟。', summary:'暂时的迷茫并非终点，可以先照顾好身边的事情。', action:'向信任的人说说自己的想法。' },
  { title:'松间有路', verse:'山深不必忧无径，\n且听松风指去程。', summary:'不必一次决定所有事情，先辨认稳固的脚下。', action:'列出眼下可以选择的两条路。' },
  {"title":"春山新雨","verse":"一夜春雨洗山青，\n满径新芽向日生。","summary":"旧事过后，新的可能正在出现，给它一点生长的时间。","action":"写下一个你想重新开始的小计划。"},
  {"title":"檐下听雨","verse":"疏雨轻敲青瓦响，\n闲云缓过小桥东。","summary":"不必急着给一切下结论，安静观察也有价值。","action":"为正在犹豫的事留出一天观察时间。"},
  {"title":"竹影摇窗","verse":"竹影横窗风自过，\n一杯温水伴书香。","summary":"环境的微小调整，可能让心情重新舒展。","action":"整理身边的一小块地方。"},
  {"title":"花开有信","verse":"枝头一朵迎风笑，\n不问旁花早与迟。","summary":"每个人都有自己的节奏，不必拿他人的进度衡量自己。","action":"记下自己的一个进步。"},
  {"title":"舟行缓水","verse":"一叶轻舟随水去，\n两岸青山伴客行。","summary":"缓慢并不代表停滞，找到合适的步速才能走得长远。","action":"把今天的任务缩减到最重要的三件。"},
  {"title":"灯下重逢","verse":"小巷归时灯未灭，\n故人相见话平常。","summary":"一段平常的联系，也许能带来意料之外的温暖。","action":"向许久未联系的朋友问一声好。"},
  {"title":"松风送暖","verse":"松风穿过深林处，\n吹醒窗前一树花。","summary":"让清晰的交流替代猜测，事情会更容易推进。","action":"把一个需要帮助的地方说清楚。"},
  {"title":"溪桥初雪","verse":"桥边薄雪留行迹，\n溪上微光照晚归。","summary":"变化来临时，先稳住日常，再考虑下一步。","action":"为明天准备一件能让自己安心的小事。"},
  {"title":"远山含翠","verse":"远岫层层藏雨意，\n近林片片带新晴。","summary":"大方向可以暂时放远，先照顾触手可及的事。","action":"完成一项拖延许久的小任务。"},
  {"title":"庭前落叶","verse":"落叶归根滋旧土，\n来年新绿满庭芳。","summary":"结束并不意味着失去所有，它也能为新事物腾出空间。","action":"整理一件已经不再需要的物品。"},
  {"title":"月照清泉","verse":"清泉映月波微动，\n静处方知水底明。","summary":"当思绪纷乱时，先停一停，再做选择。","action":"做三次缓慢的深呼吸。"},
  {"title":"石径寻芳","verse":"石径弯弯通竹里，\n不经意处有花开。","summary":"尝试一条不同的小路，可能会发现新的乐趣。","action":"换一条熟悉路线，留意沿途的变化。"},
  {"title":"暖阳入室","verse":"一缕朝阳穿纸牖，\n半窗暖色入闲居。","summary":"照顾身体和休息，是应对忙碌的重要基础。","action":"起身伸展，喝一杯温水。"},
  {"title":"群山回响","verse":"一声轻唤穿林去，\n山谷遥遥有应声。","summary":"愿意表达自己的需要，才有机会得到回应。","action":"向值得信任的人提出一个具体请求。"},
  {"title":"小舟靠岸","verse":"风平水阔舟将泊，\n灯火人家在岸头。","summary":"努力之后允许自己休息，靠岸不是退缩。","action":"给自己安排一段不做任务的时间。"},
  {"title":"茶烟袅袅","verse":"茶烟细细随风起，\n静看云从屋上行。","summary":"不必同时处理所有烦恼，先分辨轻重缓急。","action":"写下眼下最值得关注的一件事。"},
  {"title":"鸟语初晴","verse":"雨歇林梢闻鸟语，\n日斜篱畔见新苔。","summary":"经历不顺后，小小好转也值得留意。","action":"记录今天发生的一件好事。"},
  {"title":"青石生苔","verse":"青石无言苔自长，\n流年有意水长清。","summary":"有些成果需要长期积累，不必催促自己立刻看到答案。","action":"为一项长期目标设定一个容易做到的小步骤。"},
  {"title":"风过花田","verse":"花田风过香如故，\n蜂蝶来时各有期。","summary":"人与人的节奏不同，留出余地有助于彼此理解。","action":"认真听完一个人的想法，再表达自己的意见。"},
  {"title":"初月如钩","verse":"新月弯弯悬树杪，\n微光点点入山窗。","summary":"起步时不必追求完美，微弱的光也能照亮第一步。","action":"用十分钟开始一件想做的事。"},
  {"title":"林间拾光","verse":"林隙流光随叶落，\n溪边野草向风摇。","summary":"日子里的细小愉悦，是可以主动发现的。","action":"留意身边三种颜色或声音。"},
  {"title":"山门未闭","verse":"山门半掩迎行客，\n小径犹通旧日家。","summary":"遇到阻碍时，可以换一种方式寻求帮助。","action":"列出一个可以咨询的人或渠道。"},
  {"title":"云影过湖","verse":"云影悠悠湖上走，\n水纹圈圈向岸开。","summary":"情绪会变化，不必急于用此刻的感觉定义全部。","action":"给自己的感受起一个温和的名字。"},
  {"title":"泉声入梦","verse":"夜深泉响穿林去，\n灯暗山居好入眠。","summary":"忙碌之后需要恢复，休息值得被认真安排。","action":"今晚比平时早一点放下手机。"},
  {"title":"稻香盈野","verse":"稻穗低垂迎晚照，\n田间笑语伴风来。","summary":"积累正在形成成果，也别忘了感谢共同付出的人。","action":"感谢一位最近帮助过你的人。"},
  {"title":"春水初生","verse":"春水盈溪流未急，\n小鱼摆尾过桥西。","summary":"新计划适合从小范围试起，再根据实际情况调整。","action":"为一个想法设计一次低成本尝试。"},
  {"title":"秋山见红","verse":"秋山叶染千重色，\n一径清风送客行。","summary":"变化有时令人不安，也可能带来新的视角。","action":"写下近期变化带来的一个新机会。"},
  {"title":"篱边野菊","verse":"篱边小菊无人问，\n依旧迎霜自在开。","summary":"你的价值不必完全由外界的评价决定。","action":"写下一件自己认可的努力。"},
  {"title":"雨后新桥","verse":"雨后新桥横浅水，\n行人缓步过溪来。","summary":"问题未必需要独自解决，合作可以搭起新的桥。","action":"把需要协作的事项拆成可沟通的部分。"},
  {"title":"晚霞满天","verse":"晚霞渐染山头树，\n归鸟轻飞向远林。","summary":"一天的收尾同样重要，可以温柔地结束忙碌。","action":"写下今天已完成的一件事。"},
  {"title":"一盏微灯","verse":"一盏微灯明古道，\n数声虫语伴人归。","summary":"即便前路很长，也可以只看清下一小段。","action":"决定接下来半小时要做的一件事。"},
  {"title":"山花向阳","verse":"山花不择无人处，\n照样迎阳自在开。","summary":"关注自己能够照顾的部分，不必让所有人都满意。","action":"对一个超出能力的请求温和地说不。"},
  {"title":"清池映云","verse":"清池一面收云影，\n风起波生各有纹。","summary":"同一件事可能有不同理解，换个角度再看一次。","action":"试着写下另一种可能的解释。"},
  {"title":"小径转弯","verse":"小径转弯山色变，\n松林深处见人家。","summary":"眼前看不到结果，不代表没有其他选择。","action":"列出除原计划外的一个备选方案。"},
  {"title":"晨露凝叶","verse":"晨露晶莹停叶上，\n风来轻颤未曾惊。","summary":"脆弱的时候放慢速度，是照顾自己的方式。","action":"今天为自己减少一个不必要的负担。"},
  {"title":"故纸留香","verse":"旧书翻处风轻动，\n字里行间有远山。","summary":"回顾曾经学到的经验，也许能帮助解决眼前的事。","action":"想起一次你克服困难的方法。"},
  {"title":"月满西窗","verse":"月色轻铺窗下案，\n笔端缓写未完章。","summary":"未完成的事情可以留待明天，不必苛责自己。","action":"为未完成的任务写下下一步后安心休息。"},
  {"title":"山泉绕石","verse":"山泉绕石寻新路，\n不与顽岩争去留。","summary":"遇到无法改变的部分，可以把力气放到可调整的方向。","action":"区分一件事中可控与不可控的部分。"},
  {"title":"风筝向远","verse":"长线牵风云外去，\n回头仍见手中绳。","summary":"探索新事物时，保留熟悉的支持会让人更安心。","action":"开始尝试前，先确认可求助的人。"},
  {"title":"桥畔柳青","verse":"桥畔新柳迎春绿，\n行人驻足听莺声。","summary":"短暂的停顿能帮助你发现原先忽略的细节。","action":"在下一项任务前休息五分钟。"},
  {"title":"夜航有星","verse":"夜航虽远星相伴，\n水阔风轻辨去途。","summary":"暂时没有完整答案时，可以依靠已经确认的事实。","action":"写下目前确定知道的三件事。"},
  {"title":"松子落庭","verse":"松子轻敲庭下石，\n微声也可报秋来。","summary":"细小的提醒值得重视，但不必放大成全部。","action":"检查一项容易忽略的小细节。"},
  {"title":"白云归岫","verse":"白云自在归山岫，\n倦鸟从容入旧林。","summary":"回到熟悉的习惯中，有时是恢复力量的好方法。","action":"做一件让自己感到安稳的日常小事。"},
  {"title":"风起扬帆","verse":"风来正好舒轻帆，\n水阔仍须看岸行。","summary":"机会出现时，可以带着准备尝试，同时留意边界。","action":"写下尝试前需要确认的一项条件。"},
  {"title":"山谷回春","verse":"幽谷初回春意暖，\n枯枝渐有嫩芽生。","summary":"低落之后的恢复可能很慢，每一点好转都值得珍惜。","action":"给自己定一个轻松可完成的小目标。"},
  {"title":"莲叶听风","verse":"莲叶轻摇承细雨，\n池中锦鲤戏清波。","summary":"给思绪一些空间，不必每个念头都立刻回应。","action":"安静坐一会儿，观察呼吸。"},
  {"title":"旧路新景","verse":"旧路重行花又发，\n曾经风景亦常新。","summary":"熟悉的事情也能重新发现乐趣，关键在于留心。","action":"换一种方式完成一件日常小事。"},
  {"title":"竹林小憩","verse":"竹林深处凉风至，\n石上闲坐听鸟鸣。","summary":"短暂休整可以帮助你恢复注意力。","action":"在工作间隙离开屏幕片刻。"},
  {"title":"雨润新苗","verse":"细雨无声滋嫩叶，\n春泥有意护新苗。","summary":"耐心照料正在萌芽的计划，成长不必急于求成。","action":"给一个新习惯设定可持续的频率。"},
  {"title":"溪水绕村","verse":"溪水绕村流不尽，\n人间烟火暖山居。","summary":"简单的日常和可靠的关系，都是值得珍视的支持。","action":"与身边的人一起吃一顿饭或聊一会儿。"},
  {"title":"清晨启程","verse":"晨光初照山门路，\n行囊轻装步自舒。","summary":"出发前适当准备，能够减少途中不必要的焦虑。","action":"整理出下一步必需的两样东西。"},
  {"title":"窗前闻桂","verse":"窗前桂子随风落，\n一院清香入晚凉。","summary":"生活中不只有任务，也有值得享受的瞬间。","action":"给自己留一段做喜欢事情的时间。"},
  {"title":"雪融见草","verse":"雪融檐下溪声细，\n草露坡头一点青。","summary":"困难过后，恢复需要时间，不必强求立即如常。","action":"留意今天身体或心情的一个需要。"},
  {"title":"归途有伴","verse":"归途并肩听晚籁，\n一程山路不觉长。","summary":"陪伴不一定要解决问题，彼此在场也有意义。","action":"约一个信任的人散步或通话。"},
  {"title":"山雨将晴","verse":"山雨渐收云欲散，\n天边一线透微明。","summary":"变化也许尚未完成，可以给事情留出缓冲。","action":"把可以稍后决定的事暂时放下。"},
];
const cards = [
  { name:'星光', symbol:'✦', meaning:'对未来保有期待，从眼前的小事开始。', prompt:'你最近期待发生的一件事是什么？' },
  { name:'溪流', symbol:'≈', meaning:'顺着真实的感受调整方向，让事情按自己的速度流动。', prompt:'有什么事情可以不用勉强？' },
  { name:'山岚', symbol:'☁', meaning:'远处尚不清晰时，先照顾好眼前的路。', prompt:'你脚下最稳固的支持是什么？' },
  { name:'晨芽', symbol:'❋', meaning:'一点新的勇气，足以开启下一段旅程。', prompt:'今天可以迈出的第一步是什么？' },
  { name:'归舟', symbol:'☾', meaning:'休息也是前行的一部分，允许自己靠岸片刻。', prompt:'你需要怎样的休息？' },
  {"name":"月影","symbol":"☾","meaning":"允许自己慢下来，辨认情绪中尚未被看见的部分。","prompt":"当下哪一种感受需要被温柔对待？"},
  {"name":"晨光","symbol":"☼","meaning":"新的开始不要求完美，只需要愿意迈出一点。","prompt":"你希望今天从哪件小事开始？"},
  {"name":"山石","symbol":"◆","meaning":"稳固的边界能为改变提供支撑。","prompt":"有哪些原则或习惯值得你守住？"},
  {"name":"远帆","symbol":"⚑","meaning":"向未知前进时，准备和好奇可以同时存在。","prompt":"探索之前，你需要准备什么？"},
  {"name":"花信","symbol":"✿","meaning":"每种成长都有时节，等待也是照料的一部分。","prompt":"什么事情可以给它多一点时间？"},
  {"name":"清泉","symbol":"♒","meaning":"补充能量之后，思路或许会更加清晰。","prompt":"什么能帮助你恢复精力？"},
  {"name":"风铃","symbol":"♪","meaning":"留意环境中的细微提醒，也听见自己的需要。","prompt":"最近有什么信号值得你关注？"},
  {"name":"古桥","symbol":"⌒","meaning":"理解和沟通能为彼此搭建一条路。","prompt":"你可以怎样表达自己的想法？"},
  {"name":"落叶","symbol":"❧","meaning":"适时放下已经不再适合的安排，为新生活留出空间。","prompt":"有什么负担可以减轻一点？"},
  {"name":"灯火","symbol":"✧","meaning":"一份小小的善意，足以让漫长的一天温暖起来。","prompt":"今天你想把善意送给谁？"},
  {"name":"竹林","symbol":"♧","meaning":"柔韧不等于没有力量，调整姿态也可以继续前行。","prompt":"面对变化，你有哪些灵活的选择？"},
  {"name":"雨露","symbol":"❊","meaning":"被滋养的事物才能慢慢生长，照顾自己并非浪费时间。","prompt":"你最近忽略了自己的哪种需要？"},
  {"name":"海潮","symbol":"≋","meaning":"起伏是自然的过程，允许状态有高有低。","prompt":"状态低落时，什么能让你稍感安稳？"},
  {"name":"归鸟","symbol":"♢","meaning":"寻找安全、熟悉的地方，是恢复勇气的一种方式。","prompt":"你在哪里最容易感到放松？"},
  {"name":"云雀","symbol":"♬","meaning":"在严肃的目标之外，也可以给好奇心留一个位置。","prompt":"最近有什么小事让你感到有趣？"},
  {"name":"青芽","symbol":"♣","meaning":"微小而持续的行动，会逐渐累积成变化。","prompt":"哪一个习惯可以从两分钟开始？"},
  {"name":"星河","symbol":"✺","meaning":"当视野被眼前的事占满，退后一步或许能看到更多可能。","prompt":"从更长的时间来看，什么对你最重要？"},
];
const books = [
  { name:'清风篇', pages:['先慢慢呼吸，让心追上脚步。','放下片刻，不必一次解开所有心事。','今日能安稳做好一件小事，已经很好。'], bookmark:'松风' },
  { name:'山行篇', pages:['山路不必走得很快，留意脚下的花与石。','走远之前，先给自己准备充足的水。','每一次停下，都是为了更自在地出发。'], bookmark:'远山' },
  { name:'灯火篇', pages:['一盏小灯，也能照亮眼前的路。','把善意留给别人，也留一份给自己。','愿你回头时，总能看见温暖的方向。'], bookmark:'暖灯' },
];
const bookmarkDesigns = [
  {name:'松风', icon:'♧', detail:'松影轻摇'}, {name:'远山', icon:'⌂', detail:'山色入画'},
  {name:'暖灯', icon:'✦', detail:'一盏微光'}, {name:'花信', icon:'✿', detail:'花开有期'},
  {name:'云笺', icon:'☁', detail:'云卷云舒'}, {name:'溪月', icon:'☾', detail:'月映清溪'},
];
function recordObject(value) { return value && typeof value==='object' && !Array.isArray(value)?value:{}; }
function recordCount(value) { return Number.isSafeInteger(value) && value>0?value:0; }
function bookmarkGallery(marks) {
  const collected=bookmarkDesigns.filter(item=>recordCount(marks[item.name])>0).length;
  return `<p>${readingText('galleryInfo',{count:collected,total:bookmarkDesigns.length})}</p><div class="ritual-grid">${bookmarkDesigns.map(item=>{const count=recordCount(marks[item.name]);return `<div class="ritual-option"><strong>${count?`${item.icon} ${markDisplay(item)}`:`◇ ${readingText('uncollected')}`}</strong><small>${count?`${markDetail(item)} · ${readingText('owned',{count})}`:readingText('keepReading')}</small></div>`;}).join('')}</div>${recordCount(marks.legacy)?`<p class="ritual-caption">${readingText('oldMarks',{count:recordCount(marks.legacy)})}</p>`:''}`;
}
const recipes = [
  { id:'calm', name:'安然香丸', icon:'◉', detail:'淡淡木香，留一份从容。' },
  { id:'sun', name:'晴日香丸', icon:'✺', detail:'清甜花香，迎接明朗的一天。' },
  { id:'courage', name:'勇气香丸', icon:'✦', detail:'一缕暖香，陪你迈出一步。' },
  { id:'rest', name:'安眠香丸', icon:'☾', detail:'柔和草木香，送给疲倦的自己。' },
];
const prefix='yunxi-activities-';
// Preserve each first-version value independently, including when another key is malformed.
function migrate(oldKey, newKey, convert) {
  try {
    if (localStorage.getItem(prefix + newKey) !== null) return;
    const raw = localStorage.getItem(oldKey);
    if (raw === null) return;
    const value = convert(JSON.parse(raw));
    if (value !== null) localStorage.setItem(prefix + newKey, JSON.stringify(value));
  } catch { /* Keep the original key and retry on the next page load. */ }
}
migrate('shanlan-incense-pellets', 'pellets', value => Number.isFinite(value) && value > 0 ? { legacy:value } : null);
migrate('shanlan-bookmarks', 'bookmarks', value => Number.isFinite(value) && value > 0 ? { legacy:value } : null);
migrate('shanlan-wish', 'wish', value => typeof value === 'string' && value ? { text:value, date:null } : null);
migrate('shanlan-reflection', 'reflection', value => typeof value === 'string' && value ? value : null);
let pendingBrew = null, pendingBrewSaved = false;
let pendingBookmark = null;
let heldTeaName = '清茶';
let exerciseSerial = 0;

function read(key, fallback) { try { const raw=localStorage.getItem(prefix+key); return raw === null ? fallback : JSON.parse(raw); } catch { return fallback; } }
function write(key, value) { try { localStorage.setItem(prefix+key,JSON.stringify(value)); return true; } catch { return false; } }
function pick(list) { return list[Math.floor(Math.random()*list.length)]; }
function byId(id) { return document.getElementById(id); }
function bind(id, fn) { byId(id)?.addEventListener('click',fn); }
function escapeText(value) { const node=document.createElement('span'); node.textContent=value; return node.innerHTML; }
function button(label,id,secondary=false) { return `<button type="button" id="${id}" class="ritual-button${secondary?' ritual-secondary':''}">${label}</button>`; }
function view(api,title,body) { ensureStyles(); api.showModal(title,`<div class="ritual-view">${body}</div>`); }
function panel(api,title,body) {
  ensureStyles();
  const html=`<div class="ritual-view live-control">${body}</div>`;
  if (api.showActivityPanel) api.showActivityPanel(title,html);
  else api.showModal(title,html);
}
function scene(icon, label, extra='') { return `<div class="ritual-stage ${extra}"><div class="ritual-glow"></div><span class="ritual-icon" aria-hidden="true">${icon}</span><small>${label}</small></div>`; }
function animate(api,id,phase) { api.animate?.(id,phase); }
function finish(api,message) { api.closeModal?.(); api.notify(message); }
function ensureStyles() {
  if (byId('ritual-styles')) return;
  const style=document.createElement('style'); style.id='ritual-styles'; style.textContent=`
  .ritual-view{font-family:inherit;color:#374c40}.ritual-view p{line-height:1.8;margin:10px 0;color:#627267}.dialog .ritual-view .ritual-stage{position:relative;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;min-height:132px;margin:4px 0 15px;border-radius:14px;overflow:hidden;color:#f8efda;background:radial-gradient(circle at 50% 100%,#7f9276,#334d40 62%,#293e34)}.ritual-stage .ritual-glow{position:absolute;width:130px;height:130px;border:1px solid #e9d9a055;border-radius:50%;box-shadow:0 0 0 15px #fff2,0 0 0 30px #fff1}.ritual-stage .ritual-icon{position:relative;font-family:serif;font-size:64px;line-height:1;text-shadow:0 3px 18px #12251a88}.ritual-stage small{position:relative;font-size:10px;letter-spacing:.18em;color:#e5debc}.dialog .ritual-view .ritual-button{min-height:43px;border:0;border-radius:99px;background:#3c604d;color:#fff;padding:10px 19px;margin:8px 5px 0 0}.dialog .ritual-view .ritual-button:disabled{opacity:.5}.dialog .ritual-view .ritual-secondary{background:#dce4d7;color:#385445}.dialog .ritual-view .ritual-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0}.dialog .ritual-view .ritual-option{display:block;width:100%;text-align:left;background:#e8ece0;border:1px solid #d2dbca;border-radius:11px;padding:12px;color:#334f40}.ritual-option strong,.ritual-option small{display:block}.ritual-option small{margin-top:4px;line-height:1.5;color:#708075}.ritual-view textarea{display:block;width:100%;min-height:90px;resize:vertical;border:1px solid #c7d2c2;border-radius:10px;background:#fffdf5;color:#30493b;padding:12px}.dialog .ritual-view .ritual-caption{font-size:12px;color:#89988a}.dialog .ritual-view .ritual-meter{height:9px;background:#dfe8d9;border-radius:9px;overflow:hidden;margin:18px 0 8px}.ritual-meter span{height:100%;display:block;background:linear-gradient(90deg,#a3be84,#d7b56c);transition:width .35s}.dialog .ritual-view .ritual-count{font:500 42px Georgia,serif;color:#476550;text-align:center}.dialog .ritual-view .ritual-progress{text-align:center;font-size:12px;color:#7a8f7c}.dialog .ritual-view .ritual-paper{padding:22px;border:1px solid #e6dcbf;background:#faf5e5;box-shadow:0 3px 10px #403d2312;border-radius:7px}.ritual-paper h3{color:#755d3c;margin:0 0 8px}.ritual-paper .verse{white-space:pre-line;font:500 19px/1.9 Georgia,serif;letter-spacing:.08em;color:#59614c}.ritual-paper p{font-size:13px}.ritual-cards{display:flex;justify-content:center;gap:10px;margin:18px 0}.dialog .ritual-view .ritual-card{height:120px;flex:1;max-width:84px;border:2px solid #cdbd8b;border-radius:8px;background:linear-gradient(145deg,#38485b,#273443);color:#ead89c;font:30px Georgia,serif;box-shadow:0 5px 10px #253a3020}.ritual-card:hover{transform:translateY(-5px)}.dialog .ritual-view .ritual-pages{min-height:106px;display:grid;place-items:center;padding:20px;text-align:center;font-size:18px;line-height:1.9;color:#5b634b;background:#f4eedb;border:1px solid #e4d8bc;border-radius:7px}.dialog .ritual-view .ritual-actions{display:flex;flex-wrap:wrap}.dialog .ritual-view .ritual-sway .ritual-icon{animation:ritual-sway .7s ease-in-out infinite alternate}@keyframes ritual-sway{from{transform:rotate(-12deg)}to{transform:rotate(12deg)}}@media(max-width:500px){.dialog .ritual-view .ritual-stage{min-height:110px}.ritual-stage .ritual-icon{font-size:52px}.dialog .ritual-view .ritual-card{height:102px}}
  .dialog.live-activity{background:rgba(30,48,40,.88);border:1px solid #fff6;color:#f6f5e9;padding:20px 22px;width:min(365px,100%);backdrop-filter:blur(12px);box-shadow:0 9px 36px #17292066}
  .dialog.live-activity .ritual-cards{margin:8px 0;gap:8px;justify-content:flex-start}.dialog.live-activity .ritual-card{height:64px;max-width:64px;font-size:22px}
  .dialog.live-activity:before,.dialog.live-activity .dialog-mark{display:none}.dialog.live-activity h2{font-size:17px;margin:0 38px 8px 0;color:#fff}.dialog.live-activity .dialog-close{right:14px;top:12px;background:#ffffff1f;color:#fff}.dialog.live-activity .live-control{color:#f8f8ec}.dialog.live-activity .live-control p{color:#f3f0df;margin:6px 0;font-size:13px}.dialog.live-activity .live-control .ritual-progress{color:#e0eadc;text-align:left}.dialog.live-activity .live-control .ritual-count{text-align:left;color:#fff;font-size:30px}.dialog.live-activity .live-control .ritual-meter{margin:9px 0 6px;height:6px}.dialog.live-activity .live-control .ritual-button{background:#f2f5e9;color:#30483a}.dialog.live-activity .live-control .ritual-secondary{background:#ffffff20;color:#fff;border:1px solid #ffffff70}.dialog.live-activity .live-control .exercise-heading{padding:8px;background:#ffffff12}.dialog.live-activity .live-control .exercise-heading strong,.dialog.live-activity .live-control .exercise-index{color:#fff}.dialog.live-activity .live-control .exercise-heading small{color:#d8e4d4}@media(max-width:600px){.dialog.live-activity{max-height:40dvh;width:min(360px,100%);padding:16px 18px}.dialog.live-activity .live-control p{font-size:12px}.dialog.live-activity .live-control .ritual-button{padding:9px 16px;min-height:40px}}
  .ritual-visual{position:relative;height:116px;overflow:hidden;margin:2px 0 10px;border-radius:14px;background:radial-gradient(ellipse at 50% 120%,#bd9862,#486553 58%,#263e34);display:flex;align-items:center;justify-content:center;color:#eadbb4}
  .ritual-burner{position:absolute;bottom:8px;font-size:50px;line-height:1;color:#d5b77c;text-shadow:0 3px 5px #172b21}.ritual-stick{position:absolute;bottom:43px;left:50%;height:48px;width:3px;background:linear-gradient(#f7c35f 8%,#ce684e 15%,#805345 100%);box-shadow:-11px 2px #875848,11px 2px #875848}.incense-ready .ritual-stick{opacity:.42}.ritual-smoke{position:absolute;left:49%;bottom:83px;font:38px serif;color:#e9ecd0aa;opacity:0}.incense-light .ritual-smoke,.incense-offer .ritual-smoke,.incense-done .ritual-smoke{opacity:.8;animation:ritual-smoke 2.3s ease-in-out infinite}.ritual-lots{height:128px}.ritual-lot-cup{position:absolute;bottom:12px;padding:12px 25px;border-radius:5px 5px 20px 20px;background:linear-gradient(90deg,#663d31,#a6644a 50%,#593a31);border:2px solid #c8a46b;font:bold 27px serif}.ritual-lot-sticks{position:absolute;bottom:67px;color:#e5d6aa;letter-spacing:-1px;font-size:30px}.ritual-lots.ritual-sway .ritual-lot-cup,.ritual-lots.ritual-sway .ritual-lot-sticks{animation:ritual-sway .45s ease-in-out infinite alternate}.ritual-revealed{height:148px;width:104px;margin:12px auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:9px;border:2px solid #ccb987;border-radius:9px;background:radial-gradient(circle,#52627c,#28364e);color:#f0dfa9;box-shadow:0 8px 18px #1c332c4d;animation:reveal-card .55s ease-out}.ritual-revealed span{font-size:42px}.ritual-revealed strong{font-family:serif;letter-spacing:.2em}.ritual-revealed small{font-size:9px;letter-spacing:.14em}.exercise-heading{display:flex;align-items:center;gap:14px;border-radius:12px;background:#e4eadf;padding:14px}.exercise-index{font:40px Georgia,serif;color:#91a88e}.exercise-heading small,.exercise-heading strong{display:block}.exercise-heading small{font-size:10px;letter-spacing:.15em;color:#85988a}.exercise-heading strong{font-size:18px;margin-top:4px}@keyframes ritual-smoke{0%{transform:translate(0,6px);opacity:0}35%{opacity:.8}100%{transform:translate(5px,-17px);opacity:0}}@keyframes reveal-card{from{transform:rotateY(90deg)}to{transform:rotateY(0)}}
  `; document.head.appendChild(style);
}

// Text for activities that have been fully translated. Stored activity data stays in
// its original format; only the displayed interface is localized.
const activityLanguages=['zh-CN','zh-TW','en','ja','ko'];
const activityTranslations={
  incenseTitle:['香庭 · 敬香','香庭 · 敬香','Incense offering','香の庭 · お香','향 뜰 · 향 피우기'],
  incenseIntro:['在香炉前停一停，静心敬上一炷香。','在香爐前停一停，靜心敬上一炷香。','Pause by the incense burner and take a quiet moment.','香炉の前で立ち止まり、静かにお香を供えます。','향로 앞에서 잠시 멈춰 고요히 향을 올려요.'],
  ready:['准备好了','準備好了','Ready','準備完了','준비 완료'],
  incenseStart:['开始敬香','開始敬香','Offer incense','お香を供える','향 올리기'],
  leave:['离开','離開','Leave','離れる','나가기'],
  incenseStages:[['手持清香','点燃清香','双手敬香'],['手持清香','點燃清香','雙手敬香'],['Hold the incense','Light the incense','Offer with both hands'],['お香を持つ','お香に火をつける','両手でお香を供える'],['향을 들기','향에 불을 붙이기','두 손으로 향 올리기']],
  incenseDone:['清香已奉上，愿此刻安宁。','清香已奉上，願此刻安寧。','The incense is offered. May this moment be peaceful.','お香を供えました。穏やかなひとときを。','향을 올렸어요. 이 순간이 평온하기를.'],
  complete:['礼成','禮成','Done','完了','완료'],
  incenseOffered:['已敬上一炷清香','已敬上一炷清香','Incense offered','お香を供えました','향을 올렸어요'],
  incenseBusy:['正在敬香','正在敬香','Offering incense','お香を供えています','향을 올리는 중'],
  incenseLeft:['已离开香庭','已離開香庭','Left the incense court','香の庭を離れました','향 뜰을 나왔어요'],
  releaseTitle:['打小人 · 烦恼退散','打小人 · 煩惱退散','Paper figure ritual','紙人形の儀式','종이 인형 의식'],
  releaseScene:['给自己一点轻松','給自己一點輕鬆','Make room for ease','心を少し軽く','마음을 가볍게'],
  releaseIntro:['写下一个称呼或一件烦心事，解忧处的山居人会挥棒敲打纸偶，陪你把烦恼放下。文字只留在当前页面，完成后清除。','寫下一個稱呼或一件煩心事，解憂處的山居人會揮棒敲打紙偶，陪你把煩惱放下。文字只留在目前頁面，完成後清除。','Write a name or a worry. The garden keeper will tap a paper figure as a small ritual of letting go. Your text stays on this page and is cleared when you finish.','名前か気になることを書いてください。庭守が紙人形をたたき、気持ちを手放すお手伝いをします。入力内容はこのページ内にのみ残り、完了後に消去されます。','이름이나 걱정거리를 적어 주세요. 정원지기가 종이 인형을 두드리며 마음을 내려놓도록 도와드려요. 입력한 내용은 이 페이지에만 머물며 완료 후 지워져요.'],
  releaseLabel:['想放下的称呼或烦恼','想放下的稱呼或煩惱','A name or worry to let go','手放したい名前や気がかり','내려놓고 싶은 이름이나 걱정'],
  releasePlaceholder:['写下称呼或烦恼……','寫下稱呼或煩惱……','Write a name or worry…','名前や気がかりを書く…','이름이나 걱정을 적어 주세요…'],
  releaseStart:['开始打小人','開始打小人','Start the ritual','儀式を始める','의식 시작'],
  later:['稍后再来','稍後再來','Come back later','後でまた来る','나중에 다시 오기'],
  draft:['草稿暂留在当前页面','草稿暫留在目前頁面','Draft kept on this page','下書きはこのページに残ります','초안은 이 페이지에 남아요'],
  wander:['继续漫游','繼續漫遊','Continue exploring','散策を続ける','계속 둘러보기'],
  releaseError:['请先写下称呼或烦恼。','請先寫下稱呼或煩惱。','Please write a name or a worry first.','先に名前か気がかりを書いてください。','먼저 이름이나 걱정을 적어 주세요.'],
  releaseLines:[['轻轻一敲，让烦心事慢慢远去。','再敲一下，给自己留一点从容。','山风吹过，心里的结也松一松。','愿接下来的日子，多些轻松与自在。'],['輕輕一敲，讓煩心事慢慢遠去。','再敲一下，給自己留一點從容。','山風吹過，心裡的結也鬆一鬆。','願接下來的日子，多些輕鬆與自在。'],['A gentle tap; let the worry drift away.','Another tap; make a little room to breathe.','As the mountain breeze passes, let your heart loosen.','May the days ahead bring you ease.'],['ひとたたき。気がかりがゆっくり遠ざかりますように。','もうひとたたき。心にゆとりが生まれますように。','山風とともに、心の結び目もほどけますように。','これからの日々が穏やかでありますように。'],['가볍게 한 번, 걱정이 천천히 멀어지기를.','다시 한 번, 마음에 여유가 생기기를.','산바람과 함께 마음의 매듭도 풀리기를.','앞으로의 날들이 조금 더 편안하기를.']],
  releaseRunning:['让烦恼随风而去','讓煩惱隨風而去','Let your worries drift away','気がかりを風にのせて','걱정을 바람에 실어 보내요'],
  releaseProgress:['打小人进度','打小人進度','Ritual progress','儀式の進行状況','의식 진행 상황'],
  releaseRemaining:['正在放下 · 剩余 {n} 秒','正在放下 · 剩餘 {n} 秒','Letting go · {n} seconds left','手放す時間 · 残り {n} 秒','내려놓는 중 · {n}초 남음'],
  stop:['停止','停止','Stop','中止','중지'],
  releaseDoneTitle:['轻轻放下','輕輕放下','Gently let go','そっと手放して','살며시 내려놓아요'],
  releaseDoneScene:['随风而去','隨風而去','Gone with the breeze','風にのせて','바람을 따라'],
  releaseDoneBody:['纸偶收好，烦恼留在风里。愿你带着轻一点的心情继续走。','紙偶收好，煩惱留在風裡。願你帶著輕一點的心情繼續走。','The paper figure is put away. May you continue with a lighter heart.','紙人形を片づけて、少し軽くなった心で歩き出しましょう。','종이 인형을 정리했어요. 한결 가벼운 마음으로 걸어가요.'],
  releaseDoneToast:['给自己一点轻松','給自己一點輕鬆','Take a moment to breathe','心にひと息を','마음에 여유를'],
  releaseStopped:['已停止，草稿暂留在当前页面','已停止，草稿暫留在目前頁面','Stopped; your draft remains on this page','中止しました。下書きはこのページに残ります','중지했어요. 초안은 이 페이지에 남아요'],
  instrumentTitles:[['静坐敲木鱼','钟亭 · 拉绳鸣钟','鼓亭 · 轻敲庭鼓'],['靜坐敲木魚','鐘亭 · 拉繩鳴鐘','鼓亭 · 輕敲庭鼓'],['Wooden fish','Bell pavilion','Garden drum'],['木魚をたたく','鐘楼 · 鐘を鳴らす','太鼓をたたく'],['목어 두드리기','종각 · 종 울리기','정원 북 두드리기']],
  instrumentActions:[['敲木鱼','鸣钟','敲鼓'],['敲木魚','鳴鐘','敲鼓'],['Tap wooden fish','Ring bell','Beat drum'],['木魚をたたく','鐘を鳴らす','太鼓をたたく'],['목어 두드리기','종 울리기','북 두드리기']],
  instrumentDescriptions:[['心随声音，呼吸慢慢放缓。','等钟声渐远，再轻轻拉一次。','跟着自己的节奏，轻敲鼓面。'],['心隨聲音，呼吸慢慢放緩。','等鐘聲漸遠，再輕輕拉一次。','跟著自己的節奏，輕敲鼓面。'],['Follow the sound and slow your breathing.','Wait for the bell to fade before ringing again.','Tap the drum at your own pace.'],['音に耳を澄ませ、呼吸をゆっくりと。','鐘の音が遠のいてから、もう一度鳴らしましょう。','自分のリズムで太鼓をたたきましょう。'],['소리에 귀 기울이며 호흡을 천천히 해요.','종소리가 잦아들면 다시 울려 주세요.','자신의 리듬에 맞춰 북을 두드려요.']],
  hitCountBefore:['已敲 ','已敲 ','Count: ','回数: ','횟수: '], hitCountAfter:[' 次',' 次','','','회'],
  riseLeave:['起身离开','起身離開','Get up and leave','立ち上がって離れる','일어나 나가기'],
  hitCountToast:['已敲 {n} 次','已敲 {n} 次','Played {n} times','{n} 回鳴らしました','{n}회 연주했어요']
};
// Localized display strings; persistent identifiers and user-authored text remain unchanged.
Object.assign(activityTranslations, {
 wishTitle:['心愿树 · 写心愿','心願樹 · 寫心願','Wish tree · Write a wish','願いの木 · 願いを書く','소원 나무 · 소원 쓰기'],
 wishIntro:['写下给未来自己的心愿，选一份心意挂上树梢。','寫下給未來自己的心願，選一份心意掛上樹梢。','Write a wish for your future self and choose a tag for the tree.','未来の自分への願いを書き、木に結ぶ札を選びましょう。','미래의 나에게 바라는 소원을 쓰고 나무에 걸 소원지를 골라요.'],
 wishPlaceholder:['此刻，我希望……','此刻，我希望……','Right now, I wish…','今、願うことは…','지금 나의 소원은…'],
 wishChoose:['选择心愿笺','選擇心願箋','Choose a wish tag','願い札を選ぶ','소원지 고르기'],
 wishPrivacy:['心愿仅保存在这台设备；浏览器清除数据后无法恢复。','心願僅保存在這台裝置；清除瀏覽器資料後無法復原。','Wishes stay on this device and cannot be recovered if browser data is cleared.','願いはこの端末にのみ保存され、ブラウザのデータを消すと復元できません。','소원은 이 기기에만 저장되며 브라우저 데이터를 지우면 복구할 수 없어요.'],
 wishPrepare:['准备系上','準備繫上','Prepare to hang','結ぶ準備','걸 준비하기'],wishBook:['心愿簿','心願簿','Wish journal','願い帳','소원 수첩'],
 wishPrivate:['这些心愿只保存在当前设备。','這些心願只保存在目前裝置。','These wishes are saved only on this device.','願いはこの端末にのみ保存されます。','소원은 이 기기에만 저장돼요.'],
 wishNew:['写下新心愿','寫下新心願','Write a new wish','新しい願いを書く','새 소원 쓰기'],wishPast:['曾经的心愿','曾經的心願','A past wish','以前の願い','지난 소원'],wishBack:['返回心愿簿','返回心願簿','Back to wish journal','願い帳に戻る','소원 수첩으로 돌아가기'],
 wishTagTitle:['心愿树 · 系心愿笺','心願樹 · 繫心願箋','Wish tree · Hang a tag','願いの木 · 願い札を結ぶ','소원 나무 · 소원지 걸기'],
 wishTagIntro:['准备好时，将「{theme}」心愿笺轻轻系在树梢。','準備好時，將「{theme}」心願箋輕輕繫在樹梢。','When ready, gently hang your “{theme}” tag on the tree.','準備ができたら「{theme}」の札を木に結びましょう。','준비가 되면 “{theme}” 소원지를 나무에 걸어요.'],
 wishReady:['心愿笺已备好','心願箋已備好','Your tag is ready','願い札の準備ができました','소원지가 준비됐어요'],wishHang:['系上心愿笺','繫上心願箋','Hang the wish','願い札を結ぶ','소원지 걸기'],wishEdit:['修改心愿','修改心願','Edit wish','願いを直す','소원 수정'],
 wishFailed:['保存失败，心愿仍在当前页面，请检查浏览器存储后重试。','儲存失敗，心願仍在目前頁面，請檢查瀏覽器儲存後重試。','Could not save; your wish remains on this page. Check browser storage and retry.','保存できません。願いはこのページに残ります。保存設定を確認して再試行してください。','저장하지 못했어요. 소원은 이 페이지에 남아 있어요. 브라우저 저장 공간을 확인하고 다시 시도하세요.'],
 wishRetry:['重试保存','重試儲存','Retry saving','もう一度保存','다시 저장'],wishHanging:['正在系上心愿笺……','正在繫上心願箋……','Hanging your wish…','願い札を結んでいます…','소원지를 걸고 있어요…'],wishDone:['心愿已系上','心願已繫上','Wish hung','願いを結びました','소원지를 걸었어요'],
 wishDoneBody:['愿这份「{theme}」慢慢生长。心愿已保存在本机。','願這份「{theme}」慢慢生長。心願已保存在本機。','May your “{theme}” wish grow. It is saved on this device.','「{theme}」の願いが育ちますように。願いは端末に保存されました。','“{theme}” 소원이 자라나기를. 이 기기에 저장됐어요.'],wishToast:['愿这份期待慢慢生长','願這份期待慢慢生長','May your wish grow','願いが育ちますように','소원이 자라나기를'],wishView:['查看心愿簿','查看心願簿','View wish journal','願い帳を見る','소원 수첩 보기'],
 themes:[['安然','成长','团圆','新旅程'],['安然','成長','團圓','新旅程'],['Peace','Growth','Togetherness','New journey'],['安らぎ','成長','つながり','新たな旅'],['평온','성장','함께','새로운 여정']],
 teaNames:[['桂花乌龙','茉莉清茶','山楂果茶'],['桂花烏龍','茉莉清茶','山楂果茶'],['Osmanthus oolong','Jasmine tea','Hawthorn fruit tea'],['金木犀烏龍茶','ジャスミン茶','サンザシ茶'],['계화 우롱차','재스민 차','산사나무 차']],
 teaCup:['一杯{tea}','一杯{tea}','A cup of {tea}','{tea}を一杯','{tea} 한 잔'],teaWarm:['暖暖的茶捧在手里，喝一口再慢慢走。','暖暖的茶捧在手裡，喝一口再慢慢走。','Hold a warm cup, take a sip, and continue your walk.','温かいお茶をひと口飲んで、ゆっくり歩きましょう。','따뜻한 차를 한 모금 마시고 천천히 걸어요.'],
 teaSips:['已喝 {n} 口','已喝 {n} 口','Sips: {n}','飲んだ回数: {n}','마신 횟수: {n}'],teaDrink:['喝一口','喝一口','Take a sip','ひと口飲む','한 모금 마시기'],teaCarry:['带着茶走走','帶著茶走走','Carry tea along','お茶を持って歩く','차를 들고 걷기'],teaPut:['放下茶杯','放下茶杯','Put down the cup','カップを置く','찻잔 내려놓기'],teaCarryToast:['捧着一杯{tea}','捧著一杯{tea}','Carrying {tea}','{tea}を持っています','{tea}을 들고 있어요'],teaPutToast:['放下茶杯','放下茶杯','Cup put down','カップを置きました','찻잔을 내려놓았어요'],teaTitle:['茶亭','茶亭','Tea pavilion','茶屋','차 정자'],teaIntro:['选一杯茶，带着它慢慢逛山居。','選一杯茶，帶著它慢慢逛山居。','Choose a tea to take on your walk.','お茶を選んで、ゆっくり散策しましょう。','차를 골라 정원을 천천히 둘러봐요.'],teaBrew:['泡一杯','泡一杯','Brew a cup','一杯いれる','한 잔 우리기'],
 fishTitle:['观鱼池 · 喂鱼','觀魚池 · 餵魚','Koi pond · Feed the fish','鯉の池 · 餌やり','연못 · 물고기 먹이 주기'],fishIntro:['轻轻撒下鱼食，看锦鲤慢慢游来。','輕輕撒下魚食，看錦鯉慢慢游來。','Scatter some food and watch the koi gather.','餌をまいて、鯉が集まる様子を眺めましょう。','먹이를 뿌리고 비단잉어가 모이는 모습을 살펴봐요.'],fishNotYet:['还未投喂','還未投餵','Not fed yet','まだ餌をあげていません','아직 먹이를 주지 않았어요'],fishFeed:['投喂锦鲤','投餵錦鯉','Feed the koi','鯉に餌をあげる','비단잉어 먹이 주기'],fishLeave:['离开池边','離開池邊','Leave the pond','池を離れる','연못 떠나기'],fishRemaining:['锦鲤正在聚拢 · {n} 秒','錦鯉正在聚攏 · {n} 秒','Koi are gathering · {n} seconds','鯉が集まっています · {n} 秒','비단잉어가 모이는 중 · {n}초'],fishEating:['鱼儿正在进食','魚兒正在進食','The fish are eating','魚が食べています','물고기가 먹고 있어요'],fishCount:['已投喂 {n} 次，鱼群慢慢散开','已投餵 {n} 次，魚群慢慢散開','Fed {n} times; the fish drift apart','餌やり {n} 回。魚たちはゆっくり散っていきます','먹이를 {n}회 주었어요. 물고기들이 천천히 흩어져요'],fishAgain:['再投一次','再投一次','Feed again','もう一度あげる','다시 주기'],fishBye:['鱼群在池中慢慢游动','魚群在池中慢慢游動','The fish swim gently in the pond','魚たちが池をゆっくり泳いでいます','물고기들이 연못에서 천천히 헤엄쳐요'],
});
Object.assign(activityTranslations,{
 brewTitle:['丹房 · 选择香丸','丹房 · 選擇香丸','Incense room · Choose a pellet','香の部屋 · 香丸を選ぶ','향방 · 향환 고르기'],
 brewIntro:['选一款香丸开炉，静候成香。扇火可以加快进度。','選一款香丸開爐，靜候成香。搧火可以加快進度。','Choose a pellet and tend the stove. Fanning speeds up the process.','香丸を選んで炉にかけます。火をあおぐと早く仕上がります。','향환을 골라 화로를 켜요. 부채질하면 더 빨리 만들 수 있어요.'],
 brewNames:[['安然香丸','晴日香丸','勇气香丸','安眠香丸'],['安然香丸','晴日香丸','勇氣香丸','安眠香丸'],['Peace pellet','Sunny day pellet','Courage pellet','Restful night pellet'],['安らぎの香丸','晴れの日の香丸','勇気の香丸','安眠の香丸'],['평온 향환','맑은 날 향환','용기 향환','편안한 밤 향환']],
 brewDetails:[['淡淡木香，留一份从容。','清甜花香，迎接明朗的一天。','一缕暖香，陪你迈出一步。','柔和草木香，送给疲倦的自己。'],['淡淡木香，留一份從容。','清甜花香，迎接明朗的一天。','一縷暖香，陪你邁出一步。','柔和草木香，送給疲倦的自己。'],['A gentle woody scent for a quiet moment.','A sweet floral scent for a bright day.','A warm scent to accompany your next step.','A soft herbal scent for a tired day.'],['ほのかな木の香りで穏やかなひとときを。','甘い花の香りで晴れやかな一日を。','温かな香りとともに一歩を。','柔らかな草木の香りで休息を。'],['은은한 나무 향으로 여유를.','달콤한 꽃향기로 밝은 하루를.','따뜻한 향과 함께 한 걸음을.','부드러운 풀 향기로 지친 마음에 쉼을.']],
 brewLegacy:['此前收藏 {n} 枚香丸','此前收藏 {n} 枚香丸','Previously collected: {n}','以前の収集: {n} 個','이전 수집: {n}개'],brewOwned:['已藏 {n} 枚','已藏 {n} 枚','Collected: {n}','収集: {n} 個','수집: {n}개'],
 brewRoom:['丹房 · {name}','丹房 · {name}','Incense room · {name}','香の部屋 · {name}','향방 · {name}'],brewWait:['守着丹炉，轻轻扇火，静候香丸炼成。','守著丹爐，輕輕搧火，靜候香丸煉成。','Stay by the stove and fan gently as the pellet forms.','炉を見守り、静かに火をあおぎましょう。','화로를 지키며 부드럽게 부채질해요.'],brewWorking:['正在炼制','正在煉製','Preparing','調合中','만드는 중'],brewFan:['轻轻扇火','輕輕搧火','Fan gently','火をあおぐ','부채질하기'],brewReady:['香丸已成，可以收取了。','香丸已成，可以收取了。','The pellet is ready to collect.','香丸ができました。受け取れます。','향환이 완성됐어요. 수령할 수 있어요.'],brewProgress:['炼制中 · {n}%','煉製中 · {n}%','Preparing · {n}%','調合中 · {n}%','만드는 중 · {n}%'],brewUnsaved:[' · 进度暂留本页，刷新后可能丢失',' · 進度暫留本頁，重新整理後可能遺失',' · Progress is only on this page and may be lost on reload',' · 進行状況はページ内のみで、再読み込みで失われる場合があります',' · 진행 상황이 이 페이지에만 남아 새로고침하면 사라질 수 있어요'],brewCollect:['收取香丸','收取香丸','Collect pellet','香丸を受け取る','향환 받기'],brewFail:['保存失败，香丸仍在丹炉中，请检查浏览器存储后重试。','儲存失敗，香丸仍在丹爐中，請檢查瀏覽器儲存後重試。','Could not save. The pellet remains in the stove; check browser storage and retry.','保存できません。香丸は炉に残っています。保存設定を確認して再試行してください。','저장하지 못했어요. 향환은 화로에 남아 있어요. 저장 공간을 확인하고 다시 시도하세요.'],brewRetry:['重试收取','重試收取','Retry collection','もう一度受け取る','다시 받기'],brewSaved:['香丸已收好','香丸已收好','Pellet collected','香丸を収めました','향환을 받았어요'],brewSavedBody:['已收藏 {n} 枚。愿这份香气陪你慢慢走。','已收藏 {n} 枚。願這份香氣陪你慢慢走。','Collected {n}. May its scent accompany your walk.','{n} 個集めました。香りとともにゆっくり歩きましょう。','{n}개를 모았어요. 향기와 함께 천천히 걸어요.'],brewCollected:['收到一枚{name}','收到一枚{name}','Collected {name}','{name}を受け取りました','{name}을 받았어요'],brewContinues:['丹炉会继续慢慢炼制','丹爐會繼續慢慢煉製','The stove will continue preparing your pellet','炉で調合が続きます','화로에서 계속 만들어져요'],brewMemory:['本次丹炉暂留在当前页面，请勿刷新','本次丹爐暫留在目前頁面，請勿重新整理','This session stays on this page; do not reload','今回の炉はページ内のみです。再読み込みしないでください','이번 화로는 이 페이지에만 남아요. 새로고침하지 마세요']
});

Object.assign(activityTranslations,{
 starTitle:['星象摊 · 星象牌','星象攤 · 星象牌','Star cards','星のカード','별 카드'],starIntro:['将想问的事情留在心里，也可以写下来。牌意用于自我思考。','將想問的事情留在心裡，也可以寫下來。牌意用於自我思考。','Hold a question in mind or write it down. The cards are for personal reflection.','気になることを心に留めるか、書き留めてください。カードは内省のためのものです。','마음속 질문을 떠올리거나 적어 보세요. 카드는 스스로 생각하는 데 쓰여요.'],starNote:['','牌名、牌义和提示目前为简体中文。','Card names, meanings and prompts are currently in Simplified Chinese.','カード名・意味・問いは現在簡体字中国語です。','카드 이름과 의미, 질문은 현재 중국어 간체로 제공돼요.'],starPlaceholder:['此刻，我想问……（选填）','此刻，我想問……（選填）','My question… (optional)','今聞きたいこと…（任意）','지금 묻고 싶은 것… (선택)'],starResume:['继续查看未保存的牌','繼續查看未儲存的牌','Resume unsaved card','未保存のカードを見る','저장하지 않은 카드 이어보기'],starRedraw:['重新抽牌','重新抽牌','Draw again','引き直す','다시 뽑기'],starShuffle:['开始洗牌','開始洗牌','Shuffle cards','カードをシャッフル','카드 섞기'],starLast:['查看上次纸条','查看上次紙條','View last note','前回のメモを見る','지난 쪽지 보기'],starPrevious:['上次的星象纸条','上次的星象紙條','Last star card note','前回の星のカード','지난 별 카드 쪽지'],starQuestion:['心中所问：','心中所問：','Your question: ','あなたの問い：','마음속 질문: '],starAnother:['再抽一张','再抽一張','Draw another','もう一枚引く','한 장 더 뽑기'],starPutAway:['收好','收好','Put away','しまう','보관'],starAway:['纸条已收好','紙條已收好','Note put away','メモをしまいました','쪽지를 보관했어요'],starShuffleTitle:['星象摊 · 洗牌','星象攤 · 洗牌','Star cards · Shuffle','星のカード · シャッフル','별 카드 · 섞기'],starShuffling:['静心片刻，正在洗牌…','靜心片刻，正在洗牌…','Take a quiet moment while the cards shuffle…','心を静めて、カードを混ぜています…','잠시 마음을 가라앉히고 카드를 섞어요…'],starShuffleProgress:['静心洗牌 · {n} / 3','靜心洗牌 · {n} / 3','Shuffling · {n} / 3','シャッフル中 · {n} / 3','카드 섞는 중 · {n} / 3'],starClosed:['已收起牌','已收起牌','Cards put away','カードをしまいました','카드를 정리했어요'],starChoose:['选择一张牌','選擇一張牌','Choose a card','カードを一枚選ぶ','카드 한 장 고르기'],starChooseIntro:['牌已洗好。跟随直觉，选择一张。','牌已洗好。跟隨直覺，選擇一張。','The cards are shuffled. Choose one intuitively.','カードを混ぜました。直感で一枚選びましょう。','카드를 섞었어요. 마음 가는 한 장을 골라요.'],starChooseAria:['选择第 {n} 张牌','選擇第 {n} 張牌','Choose card {n}','{n} 枚目を選ぶ','{n}번째 카드 선택'],starReshuffle:['重新洗牌','重新洗牌','Shuffle again','もう一度混ぜる','다시 섞기'],starReveal:['星象牌 · 翻牌','星象牌 · 翻牌','Star cards · Reveal','星のカード · めくる','별 카드 · 뒤집기'],starDrawn:['抽到「{name}」，看看它想带来的思考。','抽到「{name}」，看看它想帶來的思考。','You drew “{name}”. See what it invites you to consider.','「{name}」を引きました。カードからの問いを見てみましょう。','“{name}” 카드를 뽑았어요. 어떤 생각을 전하는지 살펴봐요.'],starMeaning:['查看牌义','查看牌義','View meaning','意味を見る','의미 보기'],starLater:['稍后再看','稍後再看','View later','後で見る','나중에 보기'],starMemory:['这张牌暂留在当前页面','這張牌暫留在目前頁面','This card remains on this page','カードはこのページに残ります','카드가 이 페이지에 남아요'],starInterpretation:['牌面寓意','牌面寓意','Card meaning','カードの意味','카드 의미'],starPrompt:['留给自己的问题','留給自己的問題','A question for yourself','自分への問い','나에게 남기는 질문'],starPrivacy:['选择保存后，纸条会保存在当前浏览器。','選擇儲存後，紙條會保存在目前瀏覽器。','If saved, the note stays in this browser.','保存するとメモはこのブラウザに残ります。','저장하면 쪽지가 이 브라우저에 남아요.'],starSave:['保存纸条','儲存紙條','Save note','メモを保存','쪽지 저장'],starSaveError:['本机暂时无法保存纸条，请稍后重试','本機暫時無法儲存紙條，請稍後重試','Could not save this note; please retry','メモを保存できません。後でもう一度お試しください','쪽지를 저장하지 못했어요. 나중에 다시 시도하세요'],starSaved:['星象纸条已收好','星象紙條已收好','Star card note saved','星のカードを保存しました','별 카드 쪽지를 저장했어요']
});

Object.assign(activityTranslations,{
 reflectionTitle:['听雨阁 · 自我反思','聽雨閣 · 自我反思','Rain pavilion · Reflection','聴雨閣 · 内省','청우각 · 마음 돌아보기'],
 reflectionIntro:['写下自己的想法，整理下一步。记录由你亲自填写。','寫下自己的想法，整理下一步。紀錄由你親自填寫。','Write down your thoughts and consider your next step. Your words are your own.','自分の考えを書き、次の一歩を整理しましょう。','생각을 적고 다음 걸음을 정리해요. 기록은 직접 작성해요.'],
 reflectionResume:['继续写草稿','繼續寫草稿','Continue draft','下書きを続ける','초안 이어 쓰기'],reflectionStart:['开始记录','開始記錄','Start writing','書き始める','기록 시작'],reflectionPrevious:['查看上次记录','查看上次紀錄','View last entry','前回の記録を見る','지난 기록 보기'],
 reflectionPreviousTitle:['上次的反思记录','上次的反思紀錄','Last reflection','前回の内省記録','지난 마음 기록'],reflectionNew:['写下新记录','寫下新紀錄','Write a new entry','新しい記録を書く','새 기록 쓰기'],reflectionPut:['收好','收好','Put away','しまう','보관'],reflectionSavedToast:['记录已收好','紀錄已收好','Entry put away','記録をしまいました','기록을 보관했어요'],
 reflectionEditTitle:['自我反思','自我反思','Reflection','内省','마음 돌아보기'],reflectionEdit:['想一件挂心的事，写下自己现在能够迈出的一步。','想一件掛心的事，寫下自己現在能夠邁出的一步。','Think of something on your mind and write one step you can take now.','気がかりを一つ思い浮かべ、今できる一歩を書きましょう。','마음에 걸리는 일을 떠올리고 지금 할 수 있는 한 걸음을 적어 봐요.'],
 reflectionPlaceholder:['我想迈出的第一步是……','我想邁出的第一步是……','The first step I can take is…','最初の一歩は…','내가 내딛을 첫걸음은…'],reflectionPrivacy:['选择保存后记录会存入当前浏览器。未保存草稿只留在当前页面。','選擇儲存後紀錄會存入目前瀏覽器。未儲存草稿只留在目前頁面。','Saved entries stay in this browser. Unsaved drafts stay only on this page.','保存した記録はこのブラウザに、未保存の下書きはこのページにのみ残ります。','저장한 기록은 이 브라우저에, 저장하지 않은 초안은 이 페이지에만 남아요.'],
 reflectionSave:['保存记录','儲存紀錄','Save entry','記録を保存','기록 저장'],reflectionLater:['稍后再写','稍後再寫','Write later','後で書く','나중에 쓰기'],reflectionFailTitle:['记录暂未保存','紀錄暫未儲存','Entry not saved','記録を保存できません','기록을 저장하지 못했어요'],reflectionFail:['本机保存暂不可用，请检查浏览器存储后重试。','本機儲存暫不可用，請檢查瀏覽器儲存後重試。','Device storage is unavailable. Check browser storage and retry.','端末に保存できません。ブラウザの保存設定を確認して再試行してください。','저장 공간을 사용할 수 없어요. 브라우저 저장 공간을 확인하고 다시 시도하세요.'],
 reflectionRetry:['重试保存','重試儲存','Retry saving','もう一度保存','다시 저장'],reflectionEditAgain:['返回编辑','返回編輯','Back to editing','編集に戻る','수정으로 돌아가기'],reflectionFailAgain:['仍无法保存，请检查浏览器存储','仍無法儲存，請檢查瀏覽器儲存','Still unable to save; check browser storage','保存できません。ブラウザの保存設定を確認してください','아직 저장할 수 없어요. 브라우저 저장 공간을 확인하세요'],
 reflectionSavedTitle:['留给自己的话','留給自己的話','A note to yourself','自分への言葉','나에게 남기는 말'],reflectionSavedBody:['已保存在本机。一步一步来，就很好。','已保存在本機。一步一步來，就很好。','Saved on this device. One step at a time is enough.','この端末に保存しました。一歩ずつで大丈夫です。','이 기기에 저장했어요. 한 걸음씩이면 충분해요.'],reflectionSavedEnd:['愿你找到自己的步调','願你找到自己的步調','May you find your own pace','自分の歩みを見つけられますように','자신의 속도를 찾기를 바라요'],
 exerciseTitle:['八段舒展','八段舒展','Eight gentle stretches','八つのストレッチ','여덟 가지 스트레칭'],exerciseFollow:['跟随山居人','跟隨山居人','Follow the keeper','庭守と一緒に','정원지기 따라 하기'],exercisePause:['暂停','暫停','Pause','一時停止','일시 정지'],exerciseResume:['继续跟练','繼續跟練','Resume','再開','계속하기'],exerciseNext:['下一式','下一式','Next movement','次の動き','다음 동작'],exerciseFinish:['完成','完成','Finish','完了','완료'],exerciseStopped:['已停止跟练','已停止跟練','Practice stopped','練習を中止しました','따라 하기를 중지했어요'],exerciseDone:['舒展完成','舒展完成','Stretches complete','ストレッチ完了','스트레칭 완료'],exerciseDoneScene:['一组八段舒展已完成','一組八段舒展已完成','All eight stretches completed','八つのストレッチが完了しました','여덟 가지 스트레칭을 마쳤어요'],exerciseDoneBody:['跟随呼吸舒展过后，愿你带着轻松的心情继续漫游。','跟隨呼吸舒展過後，願你帶著輕鬆的心情繼續漫遊。','After stretching with your breath, continue your walk at ease.','呼吸に合わせて体をほぐし、穏やかに散策を続けましょう。','호흡에 맞춰 몸을 푼 뒤 편안하게 산책을 계속해요.'],exerciseDoneToast:['已完成一组舒展','已完成一組舒展','Completed a set of stretches','ストレッチを一組終えました','스트레칭 한 세트를 마쳤어요'],exerciseStep:['第 {n} / 8 式','第 {n} / 8 式','Movement {n} / 8','動き {n} / 8','동작 {n} / 8'],exercisePaused:['已暂停','已暫停','Paused','一時停止中','일시 정지됨'],exerciseRemaining:['剩余 {n} 秒','剩餘 {n} 秒','{n} seconds left','残り {n} 秒','{n}초 남음'],exerciseIntro:['跟随师傅舒展。八个动作会依次进行。','跟隨師傅舒展。八個動作會依次進行。','Follow the keeper through eight gentle movements.','庭守と一緒に八つの動きで体をほぐします。','정원지기를 따라 여덟 가지 동작으로 몸을 풀어요.'],exerciseStart:['开始跟练','開始跟練','Start practice','練習を始める','따라 하기 시작'],
 exerciseMoves:[[['双手托举','双臂向上舒展，缓缓放下。'],['左右开弓','双臂向两侧打开，换边舒展。'],['一手托天','一手向上，一手向下，轻轻伸展。'],['回望身后','转动肩颈，缓缓向后看。'],['左右轻摆','随呼吸轻轻摆动身体。'],['双手攀足','慢慢俯身，再缓缓直起。'],['攒拳伸臂','稳住脚步，向前伸臂。'],['轻提脚跟','轻提脚跟，放松收势。']],[['雙手托舉','雙臂向上舒展，緩緩放下。'],['左右開弓','雙臂向兩側打開，換邊舒展。'],['一手托天','一手向上，一手向下，輕輕伸展。'],['回望身後','轉動肩頸，緩緩向後看。'],['左右輕擺','隨呼吸輕輕擺動身體。'],['雙手攀足','慢慢俯身，再緩緩直起。'],['攢拳伸臂','穩住腳步，向前伸臂。'],['輕提腳跟','輕提腳跟，放鬆收勢。']],[['Lift both hands','Stretch both arms up and lower them slowly.'],['Open to each side','Open your arms and stretch to each side.'],['Reach one hand up','Reach one hand up and the other down.'],['Look behind','Gently turn your shoulders and look behind.'],['Sway side to side','Sway gently with your breath.'],['Reach toward your feet','Slowly bend forward, then rise.'],['Extend your arms','Stand steadily and extend your arms forward.'],['Raise your heels','Lift your heels gently, then relax.']],[['両手を上げる','両腕を上に伸ばし、ゆっくり下ろします。'],['左右に開く','両腕を開き、左右に伸ばします。'],['片手を天に','片手を上へ、もう片方を下へ伸ばします。'],['後ろを振り向く','肩と首を回し、ゆっくり後ろを見ます。'],['左右に揺れる','呼吸に合わせて体を揺らします。'],['足元に手を伸ばす','ゆっくり前にかがみ、体を起こします。'],['腕を前に伸ばす','足元を安定させ、両腕を前に伸ばします。'],['かかとを上げる','かかとを軽く上げて、力を抜きます。']],[['두 손 들어 올리기','두 팔을 위로 뻗고 천천히 내려요.'],['양옆으로 펼치기','팔을 펼쳐 양쪽으로 스트레칭해요.'],['한 손 하늘로','한 손은 위로, 다른 손은 아래로 뻗어요.'],['뒤돌아보기','어깨와 목을 돌려 천천히 뒤를 봐요.'],['좌우로 흔들기','호흡에 맞춰 몸을 가볍게 흔들어요.'],['발 쪽으로 뻗기','천천히 몸을 숙였다가 일어나요.'],['팔 앞으로 뻗기','발을 고정하고 팔을 앞으로 뻗어요.'],['뒤꿈치 들기','뒤꿈치를 가볍게 들고 힘을 풀어요.']]],
 restTitle:['树荫下休息','樹蔭下休息','Rest in the shade','木陰でひと休み','나무 그늘에서 쉬기'],restBody:['风吹过树梢。留一点时间给自己，静静地坐一会儿。','風吹過樹梢。留一點時間給自己，靜靜地坐一會兒。','The breeze moves through the trees. Take a quiet moment to sit.','梢を風が通ります。静かに座ってひと休みしましょう。','바람이 나뭇가지를 스쳐요. 잠시 조용히 앉아 쉬어요.'],restLeave:['起身继续逛','起身繼續逛','Get up and continue','立ち上がって散策を続ける','일어나 계속 둘러보기'],restDone:['带着轻松的心情继续走','帶著輕鬆的心情繼續走','Continue with a lighter heart','軽やかな気持ちで歩きましょう','가벼운 마음으로 계속 걸어요'],
 collectionPelletsTitle:['香丸收藏','香丸收藏','Incense pellet collection','香丸コレクション','향환 컬렉션'],collectionItemCount:['{n} 枚','{n} 枚','{n} collected','{n} 個','{n}개'],
 collectionEarly:['早期收藏 · {n} 枚','早期收藏 · {n} 枚','Earlier collection · {n}','以前の収集 · {n} 個','이전 수집 · {n}개'],collectionBrewing:['丹炉中：{name}。回丹房查看炼制进度。','丹爐中：{name}。回丹房查看煉製進度。','In the stove: {name}. Return to the incense room to check progress.','炉の中：{name}。香の部屋で進行状況を確認できます。','화로 속: {name}. 향방에서 진행 상황을 확인하세요.'],collectionWishEmpty:['还没有心愿。可以去心愿树写下第一张心愿笺。','還沒有心願。可以去心願樹寫下第一張心願箋。','No wishes yet. Visit the wish tree to write your first tag.','願いはまだありません。願いの木で最初の札を書きましょう。','아직 소원이 없어요. 소원 나무에서 첫 소원지를 써 보세요.'],collectionWishInfo:['点开查看。心愿只在本机保存。','點開查看。心願只在本機保存。','Select a wish to view it. Wishes are saved only on this device.','選んでご覧ください。願いはこの端末にのみ保存されます。','소원을 선택해 살펴보세요. 소원은 이 기기에만 저장돼요.'],collectionWishDefault:['心愿','心願','Wish','願い','소원'],collectionPending:['待解签诗','待解籤詩','Fortune awaiting interpretation','解説待ちのおみくじ','해설을 기다리는 운세'],collectionPendingInfo:['去找扫庭人查看解签。','去找掃庭人查看解籤。','Visit the garden keeper for an interpretation.','庭守に解説を聞きましょう。','정원지기에게 해설을 들어 보세요.'],collectionLast:['上次解签','上次解籤','Last interpretation','前回の解説','지난 해설'],collectionStar:['星象牌','星象牌','Star card','星のカード','별 카드'],collectionEmpty:['还没有保存的记录。','還沒有儲存的紀錄。','No saved records yet.','保存された記録はまだありません。','아직 저장된 기록이 없어요.']
});

function extra(key,vars={}) {
  const raw=at(key);
  return typeof raw==='string' ? raw.replace(/\{(\w+)\}/g,(_,name)=>String(vars[name]??'')) : raw;
}

function activityLanguageIndex(){const lang=globalThis.document?.documentElement?.lang;const index=activityLanguages.indexOf(lang);return index<0?0:index;}
function at(key){return activityTranslations[key][activityLanguageIndex()];}
function formatActivity(key,n){return at(key).replace('{n}',String(n));}
// Localized display text; the original Chinese book and bookmark keys remain the storage IDs.
const readingLabels={
 galleryTitle:['书签图鉴','書籤圖鑑','Bookmark gallery','しおり図鑑','책갈피 도감'],
 galleryInfo:['已收藏 {count} / {total} 款。阅读小册可获得书签。','已收藏 {count} / {total} 款。閱讀小冊可獲得書籤。','Collected {count} / {total} designs. Read a booklet to find bookmarks.','{total} 種類中 {count} 種類を収集。小冊子を読むとしおりが見つかります。','{total}종 중 {count}종 수집. 소책자를 읽으면 책갈피를 얻어요.'],
 uncollected:['未收集','未收集','Not collected','未収集','미수집'],
 keepReading:['继续阅读，寻找这款书签','繼續閱讀，尋找這款書籤','Keep reading to find this bookmark','読み進めてしおりを見つけましょう','계속 읽으며 이 책갈피를 찾아보세요'],
 owned:['已藏 {count} 枚','已藏 {count} 枚','Owned: {count}','所持数: {count}','보유: {count}개'],
 oldMarks:['早期收藏 {count} 枚，款式未记录。','早期收藏 {count} 枚，款式未記錄。','Earlier collection: {count}; designs were not recorded.','以前の収集: {count} 枚。デザインの記録はありません。','이전 수집: {count}개. 디자인은 기록되지 않았어요.'],
 backBooks:['返回书册','返回書冊','Back to books','本に戻る','책으로 돌아가기'],library:['藏书阁','藏書閣','Library','書庫','서고'],
 libraryIntro:['选一本小册慢慢翻阅，读完可收好一枚书签。阅读记录与收藏保存在本机。','選一本小冊慢慢翻閱，讀完可收好一枚書籤。閱讀記錄與收藏保存在本機。','Choose a booklet. Finish it to collect a bookmark. Reading progress and collections stay on this device.','小冊子を選んでゆっくり読みましょう。読了するとしおりがもらえます。記録と収集品はこの端末に保存されます。','소책자를 골라 천천히 읽어요. 다 읽으면 책갈피를 얻어요. 기록과 수집품은 이 기기에 저장돼요.'],
 oldCounts:['旧版未记录每本的阅读次数，新完成的阅读将开始计数。','舊版未記錄每本的閱讀次數，新完成的閱讀將開始計數。','Earlier versions did not count readings per book. New completed readings will be counted.','以前の版では本ごとの読了回数を記録していません。新しい読了から数えます。','이전 버전에는 책별 읽기 횟수가 기록되지 않아 새로 완료한 읽기부터 셉니다.'],
 readCount:['已阅 {n} 次','已閱 {n} 次','Read {n} times','読了 {n} 回','읽은 횟수 {n}회'],resumePage:[' · 读到第 {n} 页',' · 讀到第 {n} 頁',' · at page {n}',' · {n} ページから',' · {n}쪽부터'],
 galleryButton:['书签图鉴 · {n} / {total}','書籤圖鑑 · {n} / {total}','Bookmarks · {n} / {total}','しおり · {n} / {total}','책갈피 · {n} / {total}'],
 saveFailTitle:['书签暂未保存','書籤暫未儲存','Bookmark not saved','しおりを保存できません','책갈피를 저장하지 못했어요'],
 saveFail:['保存失败，书签和本次阅读记录暂留在当前页面。请检查浏览器存储后重试。','儲存失敗，書籤和本次閱讀記錄暫留在目前頁面。請檢查瀏覽器儲存後重試。','Save failed. The bookmark and reading record remain on this page. Check browser storage and retry.','保存に失敗しました。しおりと読書記録はこのページに残ります。ブラウザの保存設定を確認して再試行してください。','저장에 실패했어요. 책갈피와 읽기 기록은 이 페이지에 남아요. 브라우저 저장 공간을 확인하고 다시 시도해 주세요.'],
 retry:['重试保存','重試儲存','Retry saving','再保存','다시 저장'],found:['找到一枚书签','找到一枚書籤','A bookmark found','しおりを見つけました','책갈피를 찾았어요'],
 savedMark:['「{name}」书签已收好，收藏 {n} / {total} 款。','「{name}」書籤已收好，收藏 {n} / {total} 款。','“{name}” bookmark saved. Collected {n} / {total}.','「{name}」を保存しました。収集 {n} / {total} 種類。','“{name}” 책갈피를 저장했어요. {n} / {total}종 수집.'],
 progressFail:['收藏已保存，但阅读位置暂未清除，刷新后可能仍显示旧进度。','收藏已儲存，但閱讀位置暫未清除，重新整理後可能仍顯示舊進度。','The bookmark was saved, but the reading position could not be cleared. The old position may return after reload.','しおりは保存されましたが、読書位置を消去できませんでした。再読み込み後に古い位置が表示される場合があります。','수집품은 저장됐지만 읽기 위치는 지우지 못했어요. 새로고침하면 이전 위치가 보일 수 있어요.'],
 keepBookmark:['收好书签','收好書籤','Keep bookmark','しおりをしまう','책갈피 보관'],readAnother:['再读一本','再讀一本','Read another','別の本を読む','다른 책 읽기'],
 keptBookmark:['已收好书签','已收好書籤','Bookmark saved','しおりを保存しました','책갈피를 저장했어요'],
 page:['第 {n} / {total} 页','第 {n} / {total} 頁','Page {n} / {total}','{n} / {total} ページ','{n} / {total}쪽'],
 unsavedProgress:[' · 进度暂留当前页面',' · 進度暫留目前頁面',' · progress stays on this page',' · 進行状況はこのページ内のみ',' · 진행 상황은 이 페이지에만 남아요'],
 previous:['上一页','上一頁','Previous','前のページ','이전 쪽'],nextPage:['翻页','翻頁','Next page','次のページ','다음 쪽'],finishReading:['完成阅读','完成閱讀','Finish reading','読了','읽기 완료'],putBook:['放下小册','放下小冊','Put down the book','本を閉じる','책 내려놓기'],
 progressSaved:['已记住阅读位置','已記住閱讀位置','Reading position saved','読書位置を保存しました','읽던 위치를 저장했어요'],progressMemory:['阅读位置暂留在当前页面','閱讀位置暫留在目前頁面','Reading position stays on this page','読書位置はこのページに残ります','읽던 위치는 이 페이지에 남아요'],
 collection:['山居收藏','山居收藏','Garden collection','山居のコレクション','정원 컬렉션'],collectionInfo:['收藏与记录保存在这台设备的浏览器中。','收藏與記錄保存在這台裝置的瀏覽器中。','Collections and records are stored in this device’s browser.','収集品と記録はこの端末のブラウザに保存されます。','수집품과 기록은 이 기기의 브라우저에 저장돼요.'],
 storageFail:['本机存储暂不可用，已保存的收藏可能无法读取。','本機儲存暫不可用，已儲存的收藏可能無法讀取。','Browser storage is unavailable; saved collections may not be readable.','ブラウザの保存領域を利用できません。保存済みの収集品を読み込めない場合があります。','브라우저 저장소를 사용할 수 없어 기존 수집품을 읽지 못할 수 있어요.'],
 incenseCollection:['香丸','香丸','Incense pellets','香玉','향 알갱이'],bookmarks:['书签','書籤','Bookmarks','しおり','책갈피'],wishes:['心愿簿','心願簿','Wish journal','願い帳','소원 노트'],fortunes:['签诗与星象牌','籤詩與星象牌','Fortunes and star cards','おみくじと星のカード','운세와 별 카드'],recent:['查看最近的记录','查看最近的記錄','View recent records','最近の記録を見る','최근 기록 보기'],
 itemCount:['{n} 枚','{n} 枚','{n} items','{n} 個','{n}개'],wishCount:['{n} 条','{n} 條','{n} wishes','{n} 件','{n}개'],kindCount:['{n} 款','{n} 款','{n} designs','{n} 種類','{n}종'],close:['收好','收好','Close','閉じる','닫기'],collectionClosed:['已收好收藏','已收好收藏','Collection closed','コレクションを閉じました','컬렉션을 닫았어요'],backCollection:['返回收藏','返回收藏','Back to collection','コレクションに戻る','컬렉션으로 돌아가기'],
 chineseContentNote:['','籤詩及部分記錄內容目前為簡體中文。','Fortune texts and some records are currently in Simplified Chinese.','おみくじと一部の記録は現在簡体字中国語です。','운세와 일부 기록은 현재 중국어 간체로 제공돼요.']
};
const localizedBooks=[
 [['清风篇','山行篇','灯火篇'],['清風篇','山行篇','燈火篇'],['Gentle Breeze','Mountain Walk','Lantern Light'],['清風の巻','山歩きの巻','灯火の巻'],['맑은 바람 편','산책 편','등불 편']],
 [
  [['先慢慢呼吸，让心追上脚步。','放下片刻，不必一次解开所有心事。','今日能安稳做好一件小事，已经很好。'],['山路不必走得很快，留意脚下的花与石。','走远之前，先给自己准备充足的水。','每一次停下，都是为了更自在地出发。'],['一盏小灯，也能照亮眼前的路。','把善意留给别人，也留一份给自己。','愿你回头时，总能看见温暖的方向。']],
  [['先慢慢呼吸，讓心追上腳步。','放下片刻，不必一次解開所有心事。','今日能安穩做好一件小事，已經很好。'],['山路不必走得很快，留意腳下的花與石。','走遠之前，先給自己準備充足的水。','每一次停下，都是為了更自在地出發。'],['一盞小燈，也能照亮眼前的路。','把善意留給別人，也留一份給自己。','願你回頭時，總能看見溫暖的方向。']],
  [['Breathe slowly and let your heart catch up with your steps.','Set things down for a moment; you need not solve every worry at once.','Doing one small thing steadily today is already enough.'],['There is no need to hurry along a mountain path; notice the flowers and stones.','Before a long walk, bring enough water.','Every pause makes room for a more comfortable journey.'],['Even a small lantern can light the path ahead.','Offer kindness to others, and save some for yourself.','May you always find warmth when you look back.']],
  [['ゆっくり息をして、心が歩みに追いつくのを待ちましょう。','ひと休み。すべての悩みを一度に解く必要はありません。','今日は小さなことを一つ丁寧にできれば、それで十分。'],['山道を急ぐ必要はありません。足元の花や石に目を向けて。','遠くへ行く前に、十分な水を用意しましょう。','立ち止まるたびに、より心地よく歩き出せます。'],['小さな灯りでも、目の前の道を照らせます。','人への優しさと同じように、自分にも優しさを。','振り返るとき、いつも温かな場所が見えますように。']],
  [['천천히 숨 쉬며 마음이 걸음을 따라오게 해요.','잠시 내려놓아요. 모든 걱정을 한꺼번에 풀 필요는 없어요.','오늘 작은 일 하나를 차분히 해낸 것만으로도 충분해요.'],['산길을 서두르지 않아도 돼요. 발밑의 꽃과 돌을 살펴봐요.','멀리 가기 전에 물을 넉넉히 챙겨요.','잠시 멈출 때마다 더 편안하게 다시 출발할 수 있어요.'],['작은 등불 하나도 눈앞의 길을 밝혀줘요.','다른 사람에게 건네는 다정함을 자신에게도 남겨두세요.','뒤돌아볼 때마다 따뜻한 곳이 보이기를 바라요.']]
 ]
];
const localizedBookmarks=[
 [['松风','远山','暖灯','花信','云笺','溪月'],['松風','遠山','暖燈','花信','雲箋','溪月'],['Pine Breeze','Distant Hills','Warm Lantern','Flower Letter','Cloud Note','Stream Moon'],['松風','遠山','暖かな灯','花便り','雲の便り','小川の月'],['솔바람','먼 산','따뜻한 등불','꽃 소식','구름 편지','시냇물 달']],
 [['松影轻摇','山色入画','一盏微光','花开有期','云卷云舒','月映清溪'],['松影輕搖','山色入畫','一盞微光','花開有期','雲卷雲舒','月映清溪'],['Swaying pines','Hills in a painting','A little light','Flowers in season','Drifting clouds','Moonlit stream'],['揺れる松影','絵のような山','小さな灯り','花咲く季節','流れる雲','月映る小川'],['흔들리는 솔그늘','그림 같은 산','작은 불빛','꽃피는 계절','흐르는 구름','달 비친 시내']]
];
function readingText(key,vars={}){const str=readingLabels[key][activityLanguageIndex()];return str.replace(/\{(\w+)\}/g,(_,name)=>String(vars[name]??''));}
function bookDisplay(book){const index=books.indexOf(book);return localizedBooks[0][activityLanguageIndex()][index]||book.name;}
function pageDisplay(book,n){const index=books.indexOf(book);return localizedBooks[1][activityLanguageIndex()][index]?.[n]??book.pages[n];}
function markDisplay(mark){const index=bookmarkDesigns.indexOf(mark);return localizedBookmarks[0][activityLanguageIndex()][index]||mark.name;}
function markDetail(mark){const index=bookmarkDesigns.indexOf(mark);return localizedBookmarks[1][activityLanguageIndex()][index]||mark.detail;}
Object.assign(readingLabels,{
 fortuneNote:['','籤詩原文及解讀目前為簡體中文。','The poem and interpretation are currently in Simplified Chinese.','おみくじの詩と解説は現在簡体字中国語です。','운세 시와 해설은 현재 중국어 간체로 제공돼요.'],
 slipInHand:['手中的签诗','手中的籤詩','Fortune in hand','手元のおみくじ','손에 든 운세'],
 pendingInfo:['你还有一支签诗，带着它去找山居人解读。','你還有一支籤詩，帶著它去找山居人解讀。','You have a fortune to take to the garden keeper for an interpretation.','まだおみくじを持っています。庭守に解説してもらいましょう。','아직 운세가 있어요. 정원지기에게 해설을 부탁해 보세요.'],
 pendingMemory:['签诗暂留在当前页面，刷新前可重试保存。','籤詩暫留在目前頁面，重新整理前可重試儲存。','This fortune stays on this page. Retry saving before reloading.','おみくじはこのページに残っています。再読み込み前に保存をお試しください。','운세가 이 페이지에 남아 있어요. 새로고침 전에 저장을 다시 시도하세요.'],
 viewSlip:['查看签诗','查看籤詩','View fortune','おみくじを見る','운세 보기'],newFortune:['重新求签','重新求籤','Draw again','引き直す','다시 뽑기'],
 clearError:['暂时无法清除旧签诗，请检查浏览器存储后重试','暫時無法清除舊籤詩，請檢查瀏覽器儲存後重試','Could not clear the old fortune. Check browser storage and retry.','古いおみくじを消去できません。ブラウザの保存設定を確認して再試行してください。','기존 운세를 지우지 못했어요. 브라우저 저장 공간을 확인하고 다시 시도하세요.'],
 noLast:['暂无已保存的解签','暫無已儲存的解籤','No saved interpretation yet','保存された解説はありません','저장된 해설이 없어요'],
 lastReading:['上次的解签','上次的解籤','Last interpretation','前回の解説','지난 해설'],meaning:['签意','籤意','Interpretation','解説','해설'],todayAction:['今日可以做的事','今日可以做的事','A small step for today','今日できること','오늘 할 수 있는 작은 일'],drawAgain:['再求一签','再求一籤','Draw another','もう一度引く','한 번 더 뽑기'],
 drawTitle:['清和殿 · 求签','清和殿 · 求籤','Serenity Hall · Draw a fortune','清和殿 · おみくじ','청화전 · 운세 뽑기'],
 drawIntro:['静下心来，让一支签慢慢落下。','靜下心來，讓一支籤慢慢落下。','Take a quiet moment and draw a fortune.','心を落ち着けて、おみくじを引きましょう。','마음을 가라앉히고 운세를 뽑아 보세요.'],
 readyDraw:['准备摇签','準備搖籤','Ready to draw','おみくじを引く準備','운세 뽑기 준비'],startDraw:['开始摇签','開始搖籤','Start drawing','おみくじを引く','운세 뽑기 시작'],viewLast:['查看上次解签','查看上次解籤','View last interpretation','前回の解説を見る','지난 해설 보기'],leaveForNow:['暂时离开','暫時離開','Leave for now','いったん離れる','잠시 떠나기'],shakeStatus:['静心摇签 · {n} / 3','靜心搖籤 · {n} / 3','Drawing · {n} / 3','おみくじを引く · {n} / 3','운세 뽑는 중 · {n} / 3'],
 drawn:['一签已出','一籤已出','Your fortune is ready','おみくじが出ました','운세가 나왔어요'],drawnInfo:['捧起这支签，看看此刻的提醒。','捧起這支籤，看看此刻的提醒。','Take your fortune and read its reflection.','おみくじを手に取り、今への言葉を見てみましょう。','운세를 들어 지금의 메시지를 살펴보세요.'],putDown:['已放下签筒','已放下籤筒','Fortune container put down','おみくじ筒を置きました','운세 통을 내려놓았어요'],
 todayFortune:['今日签语','今日籤語','Today’s fortune','今日のおみくじ','오늘의 운세'],findKeeper:['带上签诗，请扫庭人解读这份提醒。','帶上籤詩，請掃庭人解讀這份提醒。','Take the fortune to the garden keeper for an interpretation.','おみくじを持って庭守に解説してもらいましょう。','운세를 가지고 정원지기에게 해설을 부탁해 보세요.'],
 saveUnavailable:['本机保存暂不可用，签诗仅保留在当前页面。刷新前可以重试。','本機儲存暫不可用，籤詩僅保留在目前頁面。重新整理前可以重試。','Browser storage is unavailable. The fortune remains on this page; retry before reloading.','保存領域を利用できません。おみくじはこのページに残ります。再読み込み前にお試しください。','저장소를 사용할 수 없어요. 운세는 이 페이지에 남아 있으니 새로고침 전에 다시 시도하세요.'],
 goRead:['前往解签','前往解籤','Go for interpretation','解説を聞きに行く','해설 들으러 가기'],putSlip:['先收起签诗','先收起籤詩','Keep for later','後で読む','나중에 보기'],
 slipSaved:['签诗已收好，可以稍后回来解签','籤詩已收好，可以稍後回來解籤','Fortune saved; return for an interpretation later','おみくじを保存しました。後で解説を聞けます','운세를 저장했어요. 나중에 해설을 들을 수 있어요'],slipMemory:['签诗暂留在当前页面，刷新后可能丢失','籤詩暫留在目前頁面，重新整理後可能遺失','Fortune stays on this page and may be lost after reloading','おみくじはページ内のみです。再読み込み後は失われる場合があります','운세가 이 페이지에만 남아 있어 새로고침하면 사라질 수 있어요'],
 saveAgainError:['仍无法保存，请检查浏览器存储','仍無法儲存，請檢查瀏覽器儲存','Still unable to save; check browser storage','保存できません。ブラウザの保存設定を確認してください','아직 저장할 수 없어요. 브라우저 저장 공간을 확인하세요'],savedLocal:['签诗已保存在本机','籤詩已儲存在本機','Fortune saved on this device','おみくじを端末に保存しました','운세를 이 기기에 저장했어요'],
 keeperReading:['扫庭人的解签','掃庭人的解籤','The keeper’s interpretation','庭守の解説','정원지기의 해설'],interpreting:['解签','解籤','Interpretation','解説','해설'],viewLastHint:['收好后可以在求签处查看上次解签。','收好後可以在求籤處查看上次解籤。','After saving, find this interpretation at the fortune stand.','保存後、おみくじの場所で前回の解説を見られます。','저장하면 운세 뽑는 곳에서 지난 해설을 볼 수 있어요.'],keepNote:['收好纸条','收好紙條','Save note','紙をしまう','쪽지 보관'],laterRead:['稍后再看','稍後再看','Read later','後で読む','나중에 보기'],
 saveReadingError:['暂时无法保存解签，请检查浏览器存储后重试','暫時無法儲存解籤，請檢查瀏覽器儲存後重試','Could not save the interpretation; check browser storage and retry','解説を保存できません。保存設定を確認して再試行してください','해설을 저장하지 못했어요. 저장 공간을 확인하고 다시 시도하세요'],
 clearSlipError:['签诗暂时无法收好，请检查浏览器存储后重试','籤詩暫時無法收好，請檢查瀏覽器儲存後重試','Could not put away the fortune; check browser storage and retry','おみくじをしまえません。保存設定を確認して再試行してください','운세를 정리하지 못했어요. 저장 공간을 확인하고 다시 시도하세요'],
 onward:['愿你从容向前','願你從容向前','May you move forward with ease','穏やかな歩みを','편안하게 앞으로 나아가길 바라요'],inHand:['签诗暂时留在手中','籤詩暫時留在手中','Fortune kept in hand','おみくじを手元に残しました','운세를 손에 두었어요']
});
function fortuneNote(){const text=readingText('fortuneNote');return text?`<p class="ritual-caption">${text}</p>`:'';}



function incense(api) {
  const stages = [
    { label:at('incenseStages')[0], phase:'take', duration:1100 },
    { label:at('incenseStages')[1], phase:'light', duration:1600 },
    { label:at('incenseStages')[2], phase:'offer', duration:2400 },
  ];
  let timer = null, step = 0, cancelled = false;
  function stop() { cancelled=true; if (timer !== null) clearTimeout(timer); timer=null; animate(api,'incense','end'); }
  panel(api,at('incenseTitle'),`<p>${at('incenseIntro')}</p><div class="ritual-meter"><span id="incense-progress" style="width:0%"></span></div><div class="ritual-progress" id="incense-status">${at('ready')}</div><div class="ritual-actions">${button(at('incenseStart'),'incense-start')}${button(at('leave'),'incense-leave',true)}</div>`);
  const status=byId('incense-status'), bar=byId('incense-progress'), start=byId('incense-start');
  function advance() {
    const modal=byId('modal');
    if(cancelled || !status.isConnected || (modal && modal.hidden)) { stop(); return; }
    if(step >= stages.length) {
      status.textContent=at('incenseDone'); bar.style.width='100%';
      animate(api,'incense','end'); start.textContent=at('complete'); start.disabled=false;
      start.onclick=()=>finish(api,at('incenseOffered')); return;
    }
    const stage=stages[step]; status.textContent=stage.label; bar.style.width=`${(step+1)/stages.length*100}%`;
    animate(api,'incense',stage.phase); if(stage.phase==='light') api.playTone?.('incense');
    step++; timer=setTimeout(advance,stage.duration);
  }
  animate(api,'incense','prepare');
  bind('incense-start',()=>{ if(step!==0 || cancelled) return; start.disabled=true; start.textContent=at('incenseBusy'); advance(); });
  bind('incense-leave',()=>{stop();finish(api,at('incenseLeft'));});
}

// A draft remains available if the player closes the panel before hanging it.
let wishDraft = '';
let wishTheme = '安然';
function wish(api) {
  const themes=['安然','成长','团圆','新旅程'];
  const themeDisplay=theme=>{const i=themes.indexOf(theme);return i<0?theme:extra('themes')[i];};
  function wishes() {
    const saved=read('wishes',[]);
    const list=Array.isArray(saved)?saved.filter(item=>item && typeof item.text==='string' && item.text.trim()):[];
    const legacy=read('wish',null);
    if (legacy && typeof legacy.text==='string' && legacy.text.trim() && !list.some(item=>item.text===legacy.text && item.date===legacy.date)) list.push({...legacy, id:'legacy', theme:legacy.theme || '安然'});
    return list.slice(0,30);
  }
  function edit() {
    const history=wishes();
    view(api,extra('wishTitle'),`<p>${extra('wishIntro')}</p><textarea id="ritual-input" maxlength="120" placeholder="${extra('wishPlaceholder')}"></textarea><div class="ritual-progress">${extra('wishChoose')}</div><div class="ritual-actions">${themes.map((theme,i)=>button((wishTheme===theme?'✓ ':'')+themeDisplay(theme),'wish-theme-'+i,true)).join('')}</div><p class="ritual-caption">${extra('wishPrivacy')}</p>${button(extra('wishPrepare'),'ritual-next')}${history.length?button(`${extra('wishBook')} · ${history.length}`,'wish-history',true):''}`);
    const input=byId('ritual-input'); input.value=wishDraft;
    input.addEventListener('input',()=>{wishDraft=input.value;});
    themes.forEach((theme,i)=>bind('wish-theme-'+i,()=>{wishDraft=input.value;wishTheme=theme;edit();}));
    bind('wish-history',historyView);
    bind('ritual-next',()=>{wishDraft=input.value;const value=wishDraft.trim();if(!value){input.focus();return;}prepare(value,wishTheme);});
  }
  function historyView() {
    const list=wishes();
    view(api,extra('wishBook'),`<p>${extra('wishPrivate')}</p><div class="ritual-grid">${list.map((item,i)=>`<button class="ritual-option" id="wish-open-${i}"><strong>✿ ${escapeText(themeDisplay(item.theme || '安然'))}</strong><small>${escapeText(item.text.length>24?item.text.slice(0,24)+'…':item.text)}</small></button>`).join('')}</div>${button(extra('wishNew'),'wish-write',true)}`);
    list.forEach((item,i)=>bind('wish-open-'+i,()=>{view(api,extra('wishPast'),`<div class="ritual-paper"><h3>${escapeText(themeDisplay(item.theme || '安然'))}</h3><p>${escapeText(item.text)}</p></div>${button(extra('wishBack'),'wish-back')}${button(extra('wishNew'),'wish-write',true)}`);bind('wish-back',historyView);bind('wish-write',edit);}));
    bind('wish-write',edit);
  }
  function prepare(value,theme) {
    const entry={id:`wish-${Date.now()}-${Math.random().toString(36).slice(2)}`,text:value,theme,date:Date.now()};
    panel(api,extra('wishTagTitle'),`<p>${extra('wishTagIntro',{theme:escapeText(themeDisplay(theme))})}</p><div class="ritual-progress" id="wish-status">${extra('wishReady')}</div>${button(extra('wishHang'),'wish-hang')}${button(extra('wishEdit'),'wish-edit',true)}`);
    const status=byId('wish-status'), action=byId('wish-hang'); let timer=null, running=false, retry=false;
    function persist() {
      const list=wishes(), added=!list.some(item=>item.id===entry.id);
      if (added) list.unshift(entry);
      if (!write('wishes',list.slice(0,30))) { status.textContent=extra('wishFailed');action.textContent=extra('wishRetry');action.disabled=false;running=false;retry=true;return; }
      if (added) { try { api.onWishHang?.(theme); } catch { /* Saving stays authoritative. */ } }
      write('wish',{text:entry.text,date:entry.date,theme:entry.theme});
      wishDraft=''; animate(api,'wish','end');
      panel(api,extra('wishDone'),`<p>${extra('wishDoneBody',{theme:escapeText(themeDisplay(theme))})}</p>${button(at('wander'),'wish-done')}${button(extra('wishView'),'wish-book',true)}`);
      bind('wish-done',()=>finish(api,extra('wishToast')));bind('wish-book',historyView);
    }
    bind('wish-hang',()=>{
      if(running)return;
      if(retry){persist();return;}
      running=true;action.disabled=true;status.textContent=extra('wishHanging');animate(api,'wish','hang');
      timer=setTimeout(()=>{timer=null;const modal=byId('modal');if(!status.isConnected || (modal && modal.hidden))return;persist();},1300);
    });
    bind('wish-edit',()=>{if(timer!==null)clearTimeout(timer);animate(api,'wish','end');edit();});
  }
  edit();
}

let pendingSlip = null;
let pendingSlipSaved = false;
function findPendingFortune() {
  const stored = pendingSlip || read('pending-fortune', null);
  return stored && fortunes.find(item => item.title === stored.title) || null;
}
// Reopen the actual stored or session-only slip after a reload or interrupted walk.
export function openPendingFortuneReading(api) {
  if (!findPendingFortune()) return false;
  fortune(api, true);
  return true;
}
function fortune(api, startReading = false) {
  let result = findPendingFortune();
  let persisted = Boolean(result && (!pendingSlip || pendingSlipSaved));
  function storeSlip(value) {
    if(value) { pendingSlip=value; pendingSlipSaved=write('pending-fortune',value); persisted=pendingSlipSaved; return persisted; }
    try { localStorage.removeItem(prefix+'pending-fortune'); }
    catch { if (persisted || pendingSlipSaved || read('pending-fortune',null)) return false; }
    pendingSlip=null; pendingSlipSaved=false; persisted=false;
    return true;
  }
  function begin() {
    if(result && typeof result.title==='string') {
      view(api,readingText('slipInHand'),`<p>${readingText('pendingInfo')}</p>${fortuneNote()}${persisted?'':`<p class="ritual-caption">${readingText('pendingMemory')}</p>`}<div class="ritual-paper"><h3>${escapeText(result.title)}</h3><div class="verse">${escapeText(result.verse)}</div></div>${button(readingText('viewSlip'),'ritual-resume')}${button(readingText('newFortune'),'ritual-new',true)}`);
      bind('ritual-resume',slip); bind('ritual-new',()=>{if(!storeSlip(null)){api.notify(readingText('clearError'));return;}result=null;shake();}); return;
    }
    shake();
  }
  function lastReading() {
    const saved=read('last-fortune',null);
    const previous=saved && fortunes.find(item=>item.title===saved.title);
    if(!previous){api.notify(readingText('noLast'));shake();return;}
    view(api,readingText('lastReading'),`${fortuneNote()}<div class="ritual-paper"><h3>${escapeText(previous.title)}</h3><div class="verse">${escapeText(previous.verse)}</div><h3>${readingText('meaning')}</h3><p>${escapeText(previous.summary)}</p><h3>${readingText('todayAction')}</h3><p>${escapeText(previous.action)}</p></div>${button(readingText('drawAgain'),'ritual-again')}${button(readingText('close'),'ritual-close',true)}`);
    bind('ritual-again',shake);bind('ritual-close',()=>finish(api,readingText('wander')));
  }
  function shake() {
    let shakes=0, timer=null, running=false;
    const last=read('last-fortune',null), hasLast=last && fortunes.some(item=>item.title===last.title);
    panel(api,readingText('drawTitle'),`<p id="ritual-lots">${readingText('drawIntro')}</p>${fortuneNote()}<div class="ritual-meter"><span id="ritual-shake-progress" style="width:0%"></span></div><div class="ritual-progress" id="ritual-shake-status">${readingText('readyDraw')}</div>${button(readingText('startDraw'),'ritual-shake')}${hasLast?button(readingText('viewLast'),'ritual-last',true):''}${button(readingText('leaveForNow'),'ritual-stop',true)}`);
    const stage=byId('ritual-lots'), progress=byId('ritual-shake-progress'), status=byId('ritual-shake-status'), action=byId('ritual-shake');
    function stop(){if(timer!==null)clearTimeout(timer);timer=null;running=false;}
    function shakeNext(){
      const modal=byId('modal');
      if(!stage.isConnected || (modal && modal.hidden)){stop();animate(api,'fortune','end');return;}
      shakes++;stage.classList?.add('ritual-sway');progress.style.width=`${shakes/3*100}%`;status.textContent=readingText('shakeStatus',{n:shakes});
      animate(api,'fortune','shake');api.playTone?.('wood');
      if(shakes<3){timer=setTimeout(shakeNext,650);return;}
      timer=setTimeout(()=>{
        const modalNow=byId('modal');if(!stage.isConnected || (modalNow && modalNow.hidden)){stop();animate(api,'fortune','end');return;}
        stop();result={...pick(fortunes)};storeSlip(result);
        panel(api,readingText('drawn'),`<p>${readingText('drawnInfo')}</p>${button(readingText('viewSlip'),'ritual-next')}`);bind('ritual-next',slip);
      },650);
    }
    animate(api,'fortune','start');
    bind('ritual-shake',()=>{if(running)return;running=true;action.disabled=true;const lastButton=byId('ritual-last');if(lastButton)lastButton.disabled=true;shakeNext();});
    bind('ritual-last',()=>{stop();animate(api,'fortune','end');lastReading();});
    bind('ritual-stop',()=>{stop();animate(api,'fortune','end');finish(api,readingText('putDown'));});
  }

  function slip() {
    view(api,readingText('todayFortune'),`${fortuneNote()}<div class="ritual-paper"><h3>${escapeText(result.title)}</h3><div class="verse">${escapeText(result.verse)}</div></div><p>${readingText('findKeeper')}</p>${persisted?'':`<p class="ritual-caption">${readingText('saveUnavailable')}</p>`}<div class="ritual-actions">${button(readingText('goRead'),'ritual-next')}${button(readingText('putSlip'),'ritual-done',true)}${persisted?'':button(readingText('retry'),'ritual-retry',true)}</div>`);
    bind('ritual-next',()=>{if(api.goTo){animate(api,'fortune','end');api.closeModal?.();api.goTo('monk',()=>openPendingFortuneReading(api));}else reading();});
    bind('ritual-done',()=>{animate(api,'fortune','end');finish(api,readingText(persisted?'slipSaved':'slipMemory'));});
    bind('ritual-retry',()=>{if(!storeSlip(result)){api.notify(readingText('saveAgainError'));return;}api.notify(readingText('savedLocal'));slip();});
  }
  function reading() {
    animate(api,'fortune','read');
    view(api,readingText('keeperReading'),`${scene('☯',readingText('interpreting'))}${fortuneNote()}<div class="ritual-paper"><h3>${escapeText(result.title)}</h3><div class="verse">${escapeText(result.verse)}</div><h3>${readingText('meaning')}</h3><p>${escapeText(result.summary)}</p><h3>${readingText('todayAction')}</h3><p>${escapeText(result.action)}</p></div><p class="ritual-caption">${readingText('viewLastHint')}</p>${button(readingText('keepNote'),'ritual-next')}${button(readingText('laterRead'),'ritual-later',true)}`);
    bind('ritual-next',()=>{if(!write('last-fortune',{title:result.title})){api.notify(readingText('saveReadingError'));return;}if(!storeSlip(null)){api.notify(readingText('clearSlipError'));return;}animate(api,'fortune','end');finish(api,readingText('onward'));});
    bind('ritual-later',()=>{animate(api,'fortune','end');finish(api,readingText('inHand'));});
  }
  if (startReading && result) reading(); else begin();
}

// Unfinished text and selected cards remain in memory until the visitor saves them.
let pendingTarot = null;
let tarotQuestionDraft = '';
let reflectionDraft = '';
function tarot(api) {
  let deck=[], selected=null, questionText='';
  function start() {
    const last=read('last-card',null);
    const savedDraft=pendingTarot;
    view(api,extra('starTitle'),`<p>${extra('starIntro')}</p>${extra('starNote')?`<p class="ritual-caption">${extra('starNote')}</p>`:''}<textarea id="ritual-question" maxlength="120" placeholder="${extra('starPlaceholder')}"></textarea><div class="ritual-actions">${savedDraft?button(extra('starResume'),'ritual-resume'):''}${button(extra(savedDraft?'starRedraw':'starShuffle'),'ritual-next')}${last && typeof last.card==='string' ? button(extra('starLast'),'ritual-previous',true) : ''}${button(at('later'),'ritual-done',true)}</div>`);
    const input=byId('ritual-question');
    input.value=savedDraft?.question ?? tarotQuestionDraft;
    input.addEventListener('input',()=>{tarotQuestionDraft=input.value;});
    bind('ritual-done',()=>{animate(api,'tarot','end');finish(api,at('wander'));});
    bind('ritual-resume',()=>{selected=savedDraft.card;questionText=savedDraft.question;reveal();});
    bind('ritual-previous',()=>{view(api,extra('starPrevious'),`${extra('starNote')?`<p class="ritual-caption">${extra('starNote')}</p>`:''}<div class="ritual-paper"><h3>${escapeText(last.card)}</h3>${last.question?`<p>${extra('starQuestion')}${escapeText(last.question)}</p>`:''}<p>${escapeText(last.meaning||'')}</p></div>${button(extra('starAnother'),'ritual-next')}${button(extra('starPutAway'),'ritual-done',true)}`);bind('ritual-next',start);bind('ritual-done',()=>finish(api,extra('starAway')));});
    bind('ritual-next',()=>{tarotQuestionDraft=input.value;questionText=input.value.trim();pendingTarot=null;shuffle();});
  }
  function shuffle() {
    deck=cards.map(card=>({...card}));
    for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}
    animate(api,'tarot','shuffle');
    panel(api,extra('starShuffleTitle'),`<p id="tarot-shuffle-status">${extra('starShuffling')}</p><div class="ritual-meter"><span id="tarot-shuffle-progress" style="width:0%"></span></div>${button(at('stop'),'tarot-shuffle-stop',true)}`);
    const status=byId('tarot-shuffle-status'), progress=byId('tarot-shuffle-progress'); let timer=null, step=0, cancelled=false;
    function stop(){cancelled=true;if(timer!==null)clearTimeout(timer);timer=null;animate(api,'tarot','end');}
    function tick(){const modal=byId('modal');if(cancelled||!status.isConnected||(modal&&modal.hidden)){stop();return;}step++;progress.style.width=`${step/3*100}%`;status.textContent=extra('starShuffleProgress',{n:step});if(step<3){timer=setTimeout(tick,550);return;}timer=setTimeout(()=>{const current=byId('modal');if(cancelled||!status.isConnected||(current&&current.hidden)){stop();return;}timer=null;choose();},550);}
    bind('tarot-shuffle-stop',()=>{stop();finish(api,extra('starClosed'));});tick();
  }
  function choose() {
    panel(api,extra('starChoose'),`<p>${extra('starChooseIntro')}</p><div class="ritual-cards">${[1,2,3].map(i=>`<button class="ritual-card" id="ritual-card-${i}" aria-label="${extra('starChooseAria',{n:i})}"><span>✧</span></button>`).join('')}</div>${button(extra('starReshuffle'),'ritual-reshuffle',true)}${button(at('leave'),'ritual-done',true)}`);
    [1,2,3].forEach(i=>bind('ritual-card-'+i,()=>{selected=deck[i-1];pendingTarot={card:selected,question:questionText};reveal();}));
    bind('ritual-reshuffle',shuffle);bind('ritual-done',()=>{animate(api,'tarot','end');finish(api,extra('starClosed'));});
  }
  function reveal() {
    animate(api,'tarot','reveal');
    panel(api,extra('starReveal'),`<p>${extra('starDrawn',{name:escapeText(selected.name)})}</p>${extra('starNote')?`<p class="ritual-caption">${extra('starNote')}</p>`:''}${button(extra('starMeaning'),'ritual-next')}${button(extra('starLater'),'ritual-done',true)}`);
    bind('ritual-next',meaning);bind('ritual-done',()=>{animate(api,'tarot','end');finish(api,extra('starMemory'));});
  }
  function meaning() {
    view(api,selected.name,`${extra('starNote')?`<p class="ritual-caption">${extra('starNote')}</p>`:''}<div class="ritual-paper"><h3>${selected.symbol} ${escapeText(selected.name)}</h3>${questionText?`<p>${extra('starQuestion')}${escapeText(questionText)}</p>`:''}<h3>${extra('starInterpretation')}</h3><p>${escapeText(selected.meaning)}</p><h3>${extra('starPrompt')}</h3><p>${escapeText(selected.prompt)}</p></div><p class="ritual-caption">${extra('starPrivacy')}</p>${button(extra('starSave'),'ritual-next')}${button(extra('starLater'),'ritual-done',true)}`);
    bind('ritual-done',()=>{animate(api,'tarot','end');finish(api,extra('starMemory'));});
    bind('ritual-next',()=>{
      const saved=write('last-card',{card:selected.name,meaning:selected.meaning,question:questionText,date:Date.now()});
      if(!saved){api.notify(extra('starSaveError'));return;}
      pendingTarot=null;tarotQuestionDraft='';animate(api,'tarot','end');finish(api,extra('starSaved'));
    });
  }
  start();
}

function question(api) {
  const previous=read('reflection',null);
  function intro(){
    panel(api,extra('reflectionTitle'),`<p>${extra('reflectionIntro')}</p><div class="ritual-actions">${button(reflectionDraft?extra('reflectionResume'):extra('reflectionStart'),'reflection-start')}${typeof previous==='string'&&previous?button(extra('reflectionPrevious'),'reflection-previous',true):''}${button(at('leave'),'reflection-leave',true)}</div>`);
    bind('reflection-start',edit);bind('reflection-leave',()=>{animate(api,'question','end');finish(api,at('wander'));});
    bind('reflection-previous',()=>{view(api,extra('reflectionPreviousTitle'),`<div class="ritual-paper"><p>${escapeText(previous)}</p></div>${button(extra('reflectionNew'),'ritual-next')}${button(extra('reflectionPut'),'ritual-done',true)}`);bind('ritual-next',edit);bind('ritual-done',()=>finish(api,extra('reflectionSavedToast')));});
  }
  function edit(){
    animate(api,'question','write');
    view(api,extra('reflectionEditTitle'),`<p>${extra('reflectionEdit')}</p><textarea id="ritual-input" maxlength="200" placeholder="${extra('reflectionPlaceholder')}"></textarea><p class="ritual-caption">${extra('reflectionPrivacy')}</p>${button(extra('reflectionSave'),'ritual-next')}${button(extra('reflectionLater'),'ritual-stop',true)}`);
    const input=byId('ritual-input');input.value=reflectionDraft;input.addEventListener('input',()=>{reflectionDraft=input.value;});
    bind('ritual-stop',()=>{reflectionDraft=input.value;animate(api,'question','end');finish(api,at('draft'));});
    bind('ritual-next',()=>{
      const value=input.value.trim();reflectionDraft=input.value;if(!value){input.focus();return;}
      if(!write('reflection',value)){
        view(api,extra('reflectionFailTitle'),`<div class="ritual-paper"><p>${escapeText(value)}</p></div><p>${extra('reflectionFail')}</p>${button(extra('reflectionRetry'),'ritual-retry')}${button(extra('reflectionEditAgain'),'ritual-edit',true)}`);
        bind('ritual-edit',edit);bind('ritual-retry',()=>{if(!write('reflection',value)){api.notify(extra('reflectionFailAgain'));return;}saved(value);});return;
      }
      saved(value);
    });
  }
  function saved(value){reflectionDraft='';animate(api,'question','end');view(api,extra('reflectionSavedTitle'),`<div class="ritual-paper"><p>${escapeText(value)}</p></div><p>${extra('reflectionSavedBody')}</p>${button(extra('reflectionPut'),'ritual-next')}`);bind('ritual-next',()=>finish(api,extra('reflectionSavedEnd')));}
  intro();
}

function alchemy(api) {
  const recipeName=r=>extra('brewNames')[recipes.indexOf(r)] || r.name;
  const recipeDetail=r=>extra('brewDetails')[recipes.indexOf(r)] || r.detail;
  function choose() {
    const collections=recordObject(read('pellets',{}));
    const current=pendingBrew || read('brewing',null);
    if (current && !pendingBrew) pendingBrewSaved=true;
    if (current) {
      const claimId=current.claimId || `${current.id}-${current.start}`;
      if (collections.claimedBrews?.[claimId]) {
        pendingBrew=null;
        try { localStorage.removeItem(prefix+'brewing'); } catch { /* Claim marker prevents duplicate collection. */ }
      } else { animate(api,'alchemy','start'); brew(current); return; }
    }
    view(api,extra('brewTitle'),`<p>${extra('brewIntro')}</p>${recordCount(collections.legacy)?`<p class="ritual-caption">${extra('brewLegacy',{n:recordCount(collections.legacy)})}</p>`:''}<div class="ritual-grid">${recipes.map(r=>`<button class="ritual-option" id="recipe-${r.id}"><strong>${r.icon} ${recipeName(r)}</strong><small>${recipeDetail(r)}<br>${extra('brewOwned',{n:recordCount(collections[r.id])})}</small></button>`).join('')}</div>`);
    recipes.forEach(r=>bind('recipe-'+r.id,()=>{const state={id:r.id,start:Date.now(),boost:0,claimId:`${r.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`};pendingBrew=state;pendingBrewSaved=write('brewing',state);animate(api,'alchemy','start');brew(state);}));
  }
  function brew(state) {
    const recipe=recipes.find(r=>r.id===state.id)||recipes[0];
    state.claimId ||= `${state.id}-${state.start}`;
    pendingBrew=state;
    panel(api,extra('brewRoom',{name:recipeName(recipe)}),`<p>${extra('brewWait')}</p><div class="ritual-meter"><span id="ritual-bar" style="width:0%"></span></div><div class="ritual-progress" id="ritual-status">${extra('brewWorking')}</div><div class="ritual-actions">${button(extra('brewFan'),'ritual-stoke')}${button(at('later'),'ritual-later',true)}</div>`);
    const bar=byId('ritual-bar'), status=byId('ritual-status'), action=byId('ritual-stoke'); let frame;
    function update(){cancelAnimationFrame(frame);const modal=byId('modal');if(!bar.isConnected || (modal && modal.hidden))return;const progress=Math.min(100,Math.floor((Date.now()-state.start)/300+state.boost));bar.style.width=progress+'%';status.textContent=(progress>=100?extra('brewReady'):extra('brewProgress',{n:progress}))+(pendingBrewSaved?'':extra('brewUnsaved'));action.textContent=progress>=100?extra('brewCollect'):extra('brewFan');action.dataset.ready=progress>=100?'yes':'no';if(progress<100) frame=requestAnimationFrame(update);}
    bind('ritual-stoke',()=>{
      if(action.dataset.ready==='yes'){
        const all=recordObject(read('pellets',{}));
        all.claimedBrews=recordObject(all.claimedBrews);
        if (!all.claimedBrews[state.claimId]) { all[recipe.id]=recordCount(all[recipe.id])+1; all.claimedBrews[state.claimId]=true; }
        if (!write('pellets',all)) { status.textContent=extra('brewFail'); action.textContent=extra('brewRetry'); return; }
        pendingBrew=null;pendingBrewSaved=false;
        try{localStorage.removeItem(prefix+'brewing');}catch{};
        animate(api,'alchemy','collect');
        view(api,extra('brewSaved'),`${scene(recipe.icon,recipeName(recipe))}<p>${extra('brewSavedBody',{n:all[recipe.id]})}</p>${button(at('wander'),'ritual-next')}`);
        bind('ritual-next',()=>finish(api,extra('brewCollected',{name:recipeName(recipe)})));
      } else {state.boost+=12;pendingBrewSaved=write('brewing',state);animate(api,'alchemy','fan');api.playTone?.('wood');update();}
    });
    bind('ritual-later',()=>{pendingBrewSaved=write('brewing',state);finish(api,pendingBrewSaved?extra('brewContinues'):extra('brewMemory'));});update();
  }
  choose();
}

function instrument(api,id) {
  const index={wood:0,bell:1,drum:2}[id];
  const config=[at('instrumentTitles')[index],['◉','♧','◎'][index],at('instrumentActions')[index],at('instrumentDescriptions')[index]];
  let count=0, locked=false;
  animate(api,id,'start');
  panel(api,config[0],`<p>${config[3]}</p><div class="ritual-progress">${at('hitCountBefore')}<strong id="ritual-count">0</strong>${at('hitCountAfter')}</div><div class="ritual-actions">${button(config[2],'ritual-strike')}${button(at('riseLeave'),'ritual-leave',true)}</div>`);
  bind('ritual-strike',()=>{
    if(locked) return;
    locked=true;count++;
    const countNode=byId('ritual-count'), strike=byId('ritual-strike');
    countNode.textContent=String(count);strike.disabled=true;
    api.playTone?.(id);animate(api,id,'strike');
    setTimeout(()=>{locked=false;if(strike.isConnected)strike.disabled=false;},id==='bell'?1100:400);
  });
  bind('ritual-leave',()=>{animate(api,id,'end');finish(api,formatActivity('hitCountToast',count));});
}
function exercise(api) {
  const movements=extra('exerciseMoves');
  const serial=++exerciseSerial;
  const duration=8000;let index=0,paused=false,stageStart=0,elapsedBeforePause=0,timer=null,finished=false;
  function stopTimer(){if(timer!==null){clearTimeout(timer);timer=null;}}
  function end(message){stopTimer();animate(api,'exercise','end');finish(api,message);}
  function render() {
    stopTimer();
    const [name,description]=movements[index];
    panel(api,extra('exerciseTitle'),`<div class="exercise-heading"><span class="exercise-index">${String(index+1).padStart(2,'0')}</span><div><small>${extra('exerciseFollow')}</small><strong>${name}</strong></div></div><p>${description}</p><div class="ritual-meter"><span id="exercise-progress" style="width:0%"></span></div><div class="ritual-progress" id="exercise-status">${extra('exerciseStep',{n:index+1})}</div><div class="ritual-actions">${button(paused?extra('exerciseResume'):extra('exercisePause'),'exercise-pause')}${button(index===7?extra('exerciseFinish'):extra('exerciseNext'),'exercise-next',true)}${button(at('stop'),'exercise-stop',true)}</div>`);
    bind('exercise-pause',()=>{
      if(paused){paused=false;stageStart=Date.now()-elapsedBeforePause;animate(api,'exercise',index);}
      else {paused=true;elapsedBeforePause=Math.min(duration,Date.now()-stageStart);animate(api,'exercise','pause');}
      render();
    });
    bind('exercise-next',advance);bind('exercise-stop',()=>end(extra('exerciseStopped')));
    tick();
  }
  function advance() {
    stopTimer();
    if(index===movements.length-1){
      finished=true;animate(api,'exercise','end');
      view(api,extra('exerciseDone'),`${scene('✣',extra('exerciseDoneScene'))}<p>${extra('exerciseDoneBody')}</p>${button(at('wander'),'exercise-done')}`);
      bind('exercise-done',()=>finish(api,extra('exerciseDoneToast')));return;
    }
    index++;stageStart=Date.now();elapsedBeforePause=0;paused=false;animate(api,'exercise',index);render();
  }
  function tick() {
    const bar=byId('exercise-progress'), status=byId('exercise-status'), modal=byId('modal');
    if(serial!==exerciseSerial){stopTimer();return;}
    if(finished || !bar || (modal && modal.hidden)){stopTimer();animate(api,'exercise','end');return;}
    const elapsed=paused?elapsedBeforePause:Math.max(0,Date.now()-stageStart);
    bar.style.width=`${Math.min(100,elapsed/duration*100)}%`;
    status.textContent=`${extra('exerciseStep',{n:index+1})} · ${paused?extra('exercisePaused'):extra('exerciseRemaining',{n:Math.max(0,Math.ceil((duration-elapsed)/1000))})}`;
    if(!paused && elapsed>=duration){advance();return;}
    timer=setTimeout(tick,150);
  }
  panel(api,extra('exerciseTitle'),`<p>${extra('exerciseIntro')}</p>${button(extra('exerciseStart'),'exercise-start')}${button(at('later'),'exercise-cancel',true)}`);
  bind('exercise-start',()=>{stageStart=Date.now();animate(api,'exercise',0);render();});
  bind('exercise-cancel',()=>finish(api,at('wander')));
}

// The private draft exists only in this page's memory; it is never persisted.
let releaseDraft='', cancelActiveRelease=null;
function release(api) {
  // Retire a previous run before a new one can control the same scene.
  cancelActiveRelease?.();
  let timer=null, active=false;
  function stopTimer(){if(timer!==null){clearTimeout(timer);timer=null;}}
  function cleanup(){
    stopTimer();
    if(active){active=false;api.onRelease?.(false);animate(api,'release','end');}
    if(cancelActiveRelease===cleanup)cancelActiveRelease=null;
  }
  function begin() {
    view(api,at('releaseTitle'),`${scene('❋',at('releaseScene'))}<p>${at('releaseIntro')}</p><label for="ritual-input">${at('releaseLabel')}</label><textarea id="ritual-input" maxlength="100" placeholder="${at('releasePlaceholder')}" aria-describedby="release-error"></textarea><p id="release-error" class="ritual-caption" aria-live="polite"></p>${button(at('releaseStart'),'ritual-next')}${button(at('later'),'ritual-stop',true)}`);
    const input=byId('ritual-input'),error=byId('release-error'); input.value=releaseDraft;
    input.addEventListener('input',()=>{releaseDraft=input.value;error.textContent='';});
    bind('ritual-stop',()=>{cleanup();finish(api,releaseDraft?at('draft'):at('wander'));});
    bind('ritual-next',()=>{releaseDraft=input.value;if(!releaseDraft.trim()){error.textContent=at('releaseError');input.focus();return;}perform();});
  }
  function perform() {
    const duration=10000,start=Date.now();let lastBeat=-1,lastLine=-1;
    const lines=at('releaseLines');
    active=true;cancelActiveRelease=cleanup;
    animate(api,'release','start'); api.onRelease?.(true);
    panel(api,at('releaseRunning'),`<p id="release-verse" aria-live="polite"></p><div class="ritual-meter" role="progressbar" aria-label="${at('releaseProgress')}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="release-meter"><span id="release-progress" style="width:0%"></span></div><div class="ritual-progress" id="release-status">${formatActivity('releaseRemaining',10)}</div>${button(at('stop'),'ritual-stop',true)}`);
    const bar=byId('release-progress'), status=byId('release-status'),verse=byId('release-verse'),meter=byId('release-meter');
    function tick(){
      const modal=byId('modal');if(!bar.isConnected || (modal && modal.hidden)){cleanup();return;}
      const elapsed=Math.max(0,Date.now()-start), beat=Math.floor(elapsed/1250), line=Math.min(lines.length-1,Math.floor(elapsed/2500));
      const progress=Math.min(100,Math.floor(elapsed/duration*100));bar.style.width=`${progress}%`;meter.setAttribute('aria-valuenow',String(progress));status.textContent=formatActivity('releaseRemaining',Math.max(0,Math.ceil((duration-elapsed)/1000)));
      if(line!==lastLine){lastLine=line;verse.textContent=lines[line];}
      if(beat!==lastBeat && elapsed<duration){lastBeat=beat;animate(api,'release','strike');api.playTone?.('wood');}
      if(elapsed>=duration){cleanup();releaseDraft='';view(api,at('releaseDoneTitle'),`${scene('✧',at('releaseDoneScene'))}<p>${at('releaseDoneBody')}</p>${button(at('wander'),'ritual-next')}`);bind('ritual-next',()=>finish(api,at('releaseDoneToast')));return;}
      timer=setTimeout(tick,200);
    }
    bind('ritual-stop',()=>{cleanup();finish(api,at('releaseStopped'));});tick();
  }
  begin();
}

// Reading position survives closing the panel, and is stored per book when available.
let pendingReading = null, readingClaimSerial = 0;
function reading(api) {
  function clearBook() { if(api.clearTemporaryProp) api.clearTemporaryProp(); else api.setProp?.(null); }
  function progressFor(book) {
    const progress=recordObject(read('reading-progress',{}));
    const stored=Number.isInteger(progress[book.name])?progress[book.name]:0;
    const current=pendingReading?.name===book.name?pendingReading.page:stored;
    return Math.max(0,Math.min(book.pages.length-1,current));
  }
  function remember(book,n) {
    pendingReading={name:book.name,page:n};
    const all=recordObject(read('reading-progress',{})); all[book.name]=n;
    return write('reading-progress',all);
  }
  function clearProgress(book) {
    if(pendingReading?.name===book.name)pendingReading=null;
    const all=recordObject(read('reading-progress',{}));delete all[book.name];return write('reading-progress',all);
  }
  function gallery() {
    const marks=recordObject(read('bookmarks',{}));
    view(api,readingText('galleryTitle'),`${bookmarkGallery(marks)}${button(readingText('backBooks'),'reading-back')}`);
    bind('reading-back',choose);
  }
  function choose() {
    if (pendingBookmark) { saveBookmark(pendingBookmark); return; }
    const marks=recordObject(read('bookmarks',{})), counts=recordObject(marks._readingCounts);
    const collected=bookmarkDesigns.filter(item=>recordCount(marks[item.name])>0).length;
    const oldCountsUnrecorded=!marks._readingCounts && (bookmarkDesigns.some(item=>recordCount(marks[item.name]))||recordCount(marks.legacy));
    view(api,readingText('library'),`<p>${readingText('libraryIntro')}</p>${oldCountsUnrecorded?`<p class="ritual-caption">${readingText('oldCounts')}</p>`:''}<div class="ritual-grid">${books.map((b,i)=>{const n=progressFor(b);return `<button class="ritual-option" id="book-${i}"><strong>▤ ${bookDisplay(b)}</strong><small>${readingText('readCount',{n:recordCount(counts[b.name])})}${n?readingText('resumePage',{n:n+1}):''}</small></button>`;}).join('')}</div><div class="ritual-actions">${button(readingText('galleryButton',{n:collected,total:bookmarkDesigns.length}),'reading-gallery',true)}</div>`);
    books.forEach((b,i)=>bind('book-'+i,()=>page(b,progressFor(b))));bind('reading-gallery',gallery);
  }
  function prepareBookmark(book) {
    const marks=recordObject(read('bookmarks',{}));
    // Prefer an uncollected or least-collected design; equal candidates remain random.
    const lowest=Math.min(...bookmarkDesigns.map(item=>recordCount(marks[item.name])));
    const design=pick(bookmarkDesigns.filter(item=>recordCount(marks[item.name])===lowest));
    return {book,design,claimId:`${Date.now()}-${++readingClaimSerial}-${Math.random().toString(36).slice(2)}`};
  }
  function saveBookmark(claim) {
    pendingBookmark=claim;
    const {book,design,claimId}=claim, marks=recordObject(read('bookmarks',{}));
    if(marks._lastReadingClaim!==claimId) {
      const counts=recordObject(marks._readingCounts);
      marks[design.name]=recordCount(marks[design.name])+1;
      marks._readingCounts={...counts,[book.name]:recordCount(counts[book.name])+1};
      marks._lastReadingClaim=claimId;
    }
    // The bookmark and reading count share one atomic localStorage write.
    if (!write('bookmarks',marks)) {
      view(api,readingText('saveFailTitle'),`${scene(design.icon,markDisplay(design))}<p>${readingText('saveFail')}</p>${button(readingText('retry'),'ritual-retry')}`);
      bind('ritual-retry',()=>saveBookmark(claim));return;
    }
    pendingBookmark=null; const progressCleared=clearProgress(book); clearBook(); animate(api,'reading','end');
    const collected=bookmarkDesigns.filter(item=>recordCount(marks[item.name])>0).length;
    view(api,readingText('found'),`${scene(design.icon,markDisplay(design))}<p>${readingText('savedMark',{name:markDisplay(design),n:collected,total:bookmarkDesigns.length})}</p>${progressCleared?'':`<p class="ritual-caption">${readingText('progressFail')}</p>`}${button(readingText('keepBookmark'),'ritual-next')}${button(readingText('galleryTitle'),'ritual-gallery',true)}${button(readingText('readAnother'),'ritual-again',true)}`);
    bind('ritual-next',()=>finish(api,readingText('keptBookmark')));bind('ritual-gallery',gallery);bind('ritual-again',choose);
  }
  function page(book,n) {
    const saved=remember(book,n);
    api.setProp?.('book'); animate(api,'reading',n);
    panel(api,bookDisplay(book),`<div class="ritual-progress">${readingText('page',{n:n+1,total:book.pages.length})}${saved?'':readingText('unsavedProgress')}</div><p>${escapeText(pageDisplay(book,n))}</p><div class="ritual-actions">${n>0?button(readingText('previous'),'ritual-prev',true):''}${button(readingText(n===book.pages.length-1?'finishReading':'nextPage'),'ritual-next')}${button(readingText('putBook'),'ritual-stop',true)}</div>`);
    bind('ritual-prev',()=>page(book,n-1));
    bind('ritual-next',()=>{if(n<book.pages.length-1){page(book,n+1);return;}saveBookmark(prepareBookmark(book));});
    bind('ritual-stop',()=>{clearBook();animate(api,'reading','end');finish(api,readingText(saved?'progressSaved':'progressMemory'));});
  }
  choose();
}

function tea(api) {
  const teas=['桂花乌龙','茉莉清茶','山楂果茶'];
  const teaDisplay=name=>{const index=teas.indexOf(name);return index<0?name:extra('teaNames')[index];};
  const holding=api.getProp?.()==='cup';
  function drink(name) {
    let sips=0;const label=teaDisplay(name);
    panel(api,extra('teaCup',{tea:label}),`<p>${extra('teaWarm')}</p><div class="ritual-progress" id="tea-sips">${extra('teaSips',{n:0})}</div>${button(extra('teaDrink'),'ritual-drink')}${button(extra('teaCarry'),'ritual-next',true)}${button(extra('teaPut'),'ritual-put',true)}`);
    bind('ritual-drink',()=>{sips++;byId('tea-sips').textContent=extra('teaSips',{n:sips});animate(api,'tea','drink');api.playTone?.('tea');});
    bind('ritual-next',()=>{api.setProp?.('cup');finish(api,extra('teaCarryToast',{tea:label}));});
    bind('ritual-put',()=>{api.setProp?.(null);animate(api,'tea','end');finish(api,extra('teaPutToast'));});
  }
  if(holding){drink(heldTeaName);return;}
  view(api,extra('teaTitle'),`<p>${extra('teaIntro')}</p><div class="ritual-grid">${teas.map((name,i)=>`<button class="ritual-option" id="tea-${i}"><strong>♨ ${teaDisplay(name)}</strong><small>${extra('teaBrew')}</small></button>`).join('')}</div>`);
  teas.forEach((name,i)=>bind('tea-'+i,()=>{heldTeaName=name;api.setProp?.('cup');animate(api,'tea','take');drink(name);}));
}

function fish(api) {
  let count=0, feedingUntil=0, timer=null;
  animate(api,'fish','start');
  panel(api,extra('fishTitle'),`<p>${extra('fishIntro')}</p><div class="ritual-progress" id="fish-count">${extra('fishNotYet')}</div><div class="ritual-actions">${button(extra('fishFeed'),'ritual-feed')}${button(extra('fishLeave'),'ritual-leave',true)}</div>`);
  const status=byId('fish-count'), action=byId('ritual-feed');
  function clearTimer(){if(timer!==null)clearTimeout(timer);timer=null;}
  function update(){
    const modal=byId('modal');
    if(!status.isConnected || (modal && modal.hidden)){clearTimer();return;}
    const remaining=Math.max(0,Math.ceil((feedingUntil-Date.now())/1000));
    if(remaining){status.textContent=extra('fishRemaining',{n:remaining});action.textContent=extra('fishEating');action.disabled=true;timer=setTimeout(update,250);return;}
    clearTimer();status.textContent=extra('fishCount',{n:count});action.textContent=extra('fishAgain');action.disabled=false;
  }
  bind('ritual-feed',()=>{
    if(Date.now()<feedingUntil)return;
    count++;feedingUntil=Date.now()+5000;api.onFishFeed?.();animate(api,'fish','feed');update();
  });
  bind('ritual-leave',()=>{clearTimer();animate(api,'fish','end');finish(api,extra('fishBye'));});
}

function rest(api){animate(api,'rest','sit');panel(api,extra('restTitle'),`<p>${extra('restBody')}</p>${button(extra('restLeave'),'ritual-next')}`);bind('ritual-next',()=>{animate(api,'rest','end');finish(api,extra('restDone'));});}


// One place to revisit saved collectibles. This is read-only and does not transmit data.
export function openCollection(api) {
  let storageAvailable=true;
  try { localStorage.getItem(prefix+'pellets'); } catch { storageAvailable=false; }
  const object=value=>value && typeof value==='object' && !Array.isArray(value)?value:{};
  const amount=value=>Number.isFinite(value) && value>0?Math.floor(value):0;
  const getPellets=()=>object(read('pellets',{}));
  const getBookmarks=()=>object(read('bookmarks',{}));
  function getWishes() {
    const saved=read('wishes',[]), list=Array.isArray(saved)?saved.filter(item=>item && typeof item.text==='string' && item.text.trim()).slice(0,30):[];
    const legacy=read('wish',null);
    if(legacy && typeof legacy.text==='string' && legacy.text.trim() && !list.some(item=>item.text===legacy.text && item.date===legacy.date)) list.push(legacy);
    return list.slice(0,30);
  }
  const back=()=>button(readingText('backCollection'),'collection-back',true);
  function show(title,body) { view(api,title,body+back()); bind('collection-back',overview); }
  function overview() {
    const pellets=getPellets(), marks=getBookmarks(), wishes=getWishes();
    const pelletCount=recipes.reduce((n,r)=>n+amount(pellets[r.id]),amount(pellets.legacy));
    const bookmarkCount=bookmarkDesigns.filter(item=>amount(marks[item.name])>0).length;
    view(api,readingText('collection'),`${storageAvailable?'':`<p>${readingText('storageFail')}</p>`}<p>${readingText('collectionInfo')}</p>${readingText('chineseContentNote')?`<p class="ritual-caption">${readingText('chineseContentNote')}</p>`:''}<div class="ritual-grid"><button class="ritual-option" id="collection-pellets"><strong>◉ ${readingText('incenseCollection')}</strong><small>${readingText('itemCount',{n:pelletCount})}</small></button><button class="ritual-option" id="collection-bookmarks"><strong>▤ ${readingText('bookmarks')}</strong><small>${readingText('kindCount',{n:`${bookmarkCount} / ${bookmarkDesigns.length}`})}</small></button><button class="ritual-option" id="collection-wishes"><strong>✧ ${readingText('wishes')}</strong><small>${readingText('wishCount',{n:wishes.length})}</small></button><button class="ritual-option" id="collection-fortune"><strong>⌁ ${readingText('fortunes')}</strong><small>${readingText('recent')}</small></button></div>${button(readingText('close'),'collection-close')}`);
    bind('collection-close',()=>finish(api,readingText('collectionClosed')));
    bind('collection-pellets',pelletView);bind('collection-bookmarks',bookmarkView);bind('collection-wishes',wishView);bind('collection-fortune',fortuneView);
  }
  function pelletView() {
    const pellets=getPellets(), current=pendingBrew || read('brewing',null), brewing=recipes.find(recipe=>recipe.id===current?.id);
    const name=recipe=>extra('brewNames')[recipes.indexOf(recipe)] || recipe.name;
    const lines=recipes.map(recipe=>`<p>${recipe.icon} ${name(recipe)} · ${extra('collectionItemCount',{n:amount(pellets[recipe.id])})}</p>`).join('');
    show(extra('collectionPelletsTitle'),`<div class="ritual-paper">${lines}${amount(pellets.legacy)?`<p>${extra('collectionEarly',{n:amount(pellets.legacy)})}</p>`:''}</div>${brewing?`<p>${extra('collectionBrewing',{name:name(brewing)})}</p>`:''}`);
  }
  function bookmarkView() {
    const marks=getBookmarks();
    show(readingText('galleryTitle'),bookmarkGallery(marks));
  }
  function wishView() {
    const wishes=getWishes(),themeName=item=>{
      const theme=typeof item.theme==='string'?item.theme:'';
      const index=['安然','成长','团圆','新旅程'].indexOf(theme);
      return index<0?(theme || extra('collectionWishDefault')):extra('themes')[index];
    };
    if(!wishes.length){show(readingText('wishes'),`<p>${extra('collectionWishEmpty')}</p>`);return;}
    view(api,readingText('wishes'),`<p>${extra('collectionWishInfo')}</p><div class="ritual-grid">${wishes.map((item,i)=>`<button class="ritual-option" id="collection-wish-${i}"><strong>✿ ${escapeText(themeName(item))}</strong><small>${escapeText(item.text.length>24?item.text.slice(0,24)+'…':item.text)}</small></button>`).join('')}</div>${back()}`);
    bind('collection-back',overview);
    wishes.forEach((item,i)=>bind('collection-wish-'+i,()=>{
      view(api,extra('wishPast'),`<div class="ritual-paper"><h3>${escapeText(themeName(item))}</h3><p>${escapeText(item.text)}</p></div>${button(extra('wishBack'),'collection-wish-back',true)}`);bind('collection-wish-back',wishView);
    }));
  }
  function fortuneView() {
    const pending=findPendingFortune(), last=object(read('last-fortune',null)), lastFortune=fortunes.find(item=>item.title===last.title);
    const saved=object(read('last-card',null)), card=cards.find(item=>item.name===saved.card);
    const parts=[];
    if(pending) parts.push(`<h3>${extra('collectionPending')} · ${escapeText(pending.title)}</h3><p>${extra('collectionPendingInfo')}</p>`);
    if(lastFortune) parts.push(`<h3>${extra('collectionLast')} · ${escapeText(lastFortune.title)}</h3><p>${escapeText(lastFortune.summary)}</p>`);
    if(card) parts.push(`<h3>${extra('collectionStar')} · ${escapeText(card.name)}</h3>${typeof saved.question==='string' && saved.question?`<p>${extra('starQuestion')}${escapeText(saved.question)}</p>`:''}<p>${escapeText(card.meaning)}</p>`);
    const note=(pending || lastFortune?fortuneNote():'')+(card && at('starNote')?`<p class="ritual-caption">${at('starNote')}</p>`:'');
    show(readingText('fortunes'),parts.length?`${note}<div class="ritual-paper">${parts.join('')}</div>`:`<p>${extra('collectionEmpty')}</p>`);
  }
  overview();
}

export function runActivity(activity,api){const id=typeof activity==='string'?activity:activity.id;if(id!=='exercise')exerciseSerial++;const handlers={incense,wish,fortune,tarot,question,alchemy,exercise,release,reading,tea,fish,rest,zodiac:api=>zodiacActivity(api,{view,button,bind,byId,finish})};if(['wood','bell','drum'].includes(id)){instrument(api,id);return;}handlers[id]?.(api);}
