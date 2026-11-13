// Interface navigation translations. Activity stories remain in Simplified Chinese.
const languages=['zh-CN','zh-TW','en','ja','ko'];
const ui={
  fullscreenEnter:['进入全屏','進入全螢幕','Enter fullscreen','全画面にする','전체 화면'],
  fullscreenExit:['退出全屏','離開全螢幕','Exit fullscreen','全画面を終了','전체 화면 종료'],
  fullscreenUnavailable:['当前浏览器不支持全屏','目前瀏覽器不支援全螢幕','Fullscreen is unavailable in this browser','このブラウザーでは全画面表示を利用できません','이 브라우저에서는 전체 화면을 사용할 수 없어요'],
  fullscreenError:['无法切换全屏，请检查浏览器设置','無法切換全螢幕，請檢查瀏覽器設定','Could not change fullscreen. Check your browser settings.','全画面を切り替えられません。ブラウザーの設定をご確認ください。','전체 화면을 바꿀 수 없어요. 브라우저 설정을 확인해 주세요.'],
  zodiacMenu:['生肖心笺','生肖心箋','Zodiac reflection','十二支の心の便り','십이지 마음 쪽지'],
  chooseLanguage:['界面语言','介面語言','Interface language','表示言語','화면 언어'],
  shareTitle:['分享游戏','分享遊戲','Share game','ゲームを共有','게임 공유'],
  shareHelp:['复制链接，与朋友各自进入山居。','複製連結，與朋友各自進入山居。','Copy the link to explore the garden separately.','リンクをコピーして、それぞれ山居を散策できます。','링크를 복사해 각자 정원을 둘러볼 수 있어요.'],
  shareLabel:['游戏链接','遊戲連結','Game link','ゲームのリンク','게임 링크'], shareCopy:['复制链接','複製連結','Copy link','リンクをコピー','링크 복사'],
  shareCopied:['链接已复制','連結已複製','Link copied','リンクをコピーしました','링크를 복사했어요'],
  shareManual:['无法自动复制，请选择链接手动复制。','無法自動複製，請選取連結手動複製。','Could not copy automatically. Select the link and copy it.','自動コピーできません。リンクを選んでコピーしてください。','자동으로 복사하지 못했어요. 링크를 선택해 복사해 주세요.'],
  backupTitle:['存档备份','存檔備份','Save backup','セーブデータ','저장 데이터'],
  backupHelp:['文件包含名字、心愿和游戏记录，请妥善保管；导入会替换本机存档并重新加载。','檔案包含名字、心願和遊戲紀錄，請妥善保管；匯入會取代本機存檔並重新載入。','The file contains your name, wishes and game records. Keep it private. Import replaces this device’s save and reloads the page.','ファイルには名前、願い、記録が含まれます。大切に保管してください。読み込みはこの端末のデータを置き換え、再読み込みします。','파일에는 이름, 소원, 게임 기록이 포함돼요. 안전하게 보관해 주세요. 가져오면 이 기기의 저장 데이터가 교체되고 다시 열립니다.'],
  backupExport:['导出存档','匯出存檔','Export save','書き出す','저장 내보내기'], backupImport:['导入存档','匯入存檔','Import save','読み込む','저장 가져오기'],
  backupConfirm:['导入会替换此浏览器中的福呀啦存档，并重新加载。确定继续？','匯入會取代此瀏覽器中的福呀啦存檔並重新載入。確定繼續？','Import replaces this browser’s FuYaLa save and reloads the page. Continue?','このブラウザのデータを置き換えて再読み込みします。続けますか？','이 브라우저의 저장 데이터를 교체하고 다시 엽니다. 계속할까요?'],
  backupInvalid:['文件无效或版本不兼容，未修改存档。','檔案無效或版本不相容，未修改存檔。','Invalid or incompatible file. Your save was not changed.','ファイルが無効か、対応していません。データは変更されていません。','파일이 유효하지 않거나 호환되지 않아 저장 데이터가 변경되지 않았어요.'],
  backupStorageError:['存储不可用或容量不足；已尝试恢复原有存档，请检查本机数据。','儲存空間無法使用或不足；已嘗試還原原有存檔，請檢查本機資料。','Storage failed or is full. We attempted to restore the previous save; please check your data.','保存に失敗しました。元のデータの復元を試みたため、内容をご確認ください。','저장 공간에 문제가 있어 이전 데이터 복구를 시도했어요. 저장 내용을 확인해 주세요.'],
  backupExportError:['无法读取本机存档或生成备份。','無法讀取本機存檔或產生備份。','Could not read or export this device’s save.','保存データを読み取るか書き出せませんでした。','저장 데이터를 읽거나 내보내지 못했어요.'],

  graphicsQuality:['画面质量','畫面品質','Graphics quality','画質','화면 품질'],
  qualityBalanced:['标准','標準','Standard','標準','표준'],
  qualitySmooth:['流畅（降低分辨率并关闭阴影）','流暢（降低解析度並關閉陰影）','Smooth (lower resolution, no shadows)','軽量（解像度を下げて影をオフ）','원활하게 (해상도 낮춤, 그림자 끄기)'],

  languageNote:['部分界面及活动内容暂为简体中文','部分介面及活動內容暫為簡體中文','Some interface text and activities are currently in Simplified Chinese','一部の表示と体験内容は現在簡体字中国語です','일부 화면과 체험 내용은 현재 중국어 간체로 제공됩니다'],
  settings:['个人设置','個人設定','Settings','設定','설정'], name:['你的名字','你的名字','Your name','お名前','이름'], random:['换一个','換一個','Random','ランダム','무작위'], avatar:['选择形象','選擇形象','Choose an avatar','姿を選ぶ','캐릭터 선택'], showName:['显示我的头顶名字','顯示我的頭頂名字','Show my name above my avatar','頭上に名前を表示','캐릭터 위에 이름 표시'], save:['保存设置','儲存設定','Save settings','設定を保存','설정 저장'],
  'welcome-overline':['给自己一段山中时光','給自己一段山中時光','Take a moment in the hills','山でひとときを','산속에서 잠시 쉬어가요'],
  'welcome-line1':['山有愿，福自来。','山有願，福自來。','A little mountain of wishes.','願いの山で、ひと休み。','소원이 머무는 산에서.'],
  'welcome-line2':['在这里，把日子过得松一点。','在這裡，把日子過得鬆一點。','Take your time here.','ここでは、心をゆるめて。','이곳에서 마음을 놓아보세요.'],
  choose:['选个模样','選個模樣','Choose your look','姿を選ぶ','모습 선택'], swipe:['左右滑动查看更多','左右滑動查看更多','Swipe to see more','横にスワイプ','옆으로 밀어 더 보기'], call:['怎么称呼你','怎麼稱呼你','What should we call you?','お名前を教えてください','어떻게 불러드릴까요?'], enter:['进入山居','進入山居','Enter the garden','山居へ入る','정원 입장'], foot:['无需匆忙，愿你在这里找到片刻自在。','無需匆忙，願你在這裡找到片刻自在。','Take your time and find a moment of peace.','どうぞゆっくりお過ごしください。','서두르지 말고 편히 쉬어가세요.'],
  categories:[['祈愿','殿宇','体验','闲游'],['祈願','殿宇','體驗','閒遊'],['Wishes','Halls','Activities','Explore'],['祈り','お堂','体験','散策'],['소원','전각','체험','산책']],
  actions:[['敬香','心愿树','抽签','自我反思','星象牌','清和殿','听雨阁','福缘殿','月华堂','清风殿','长乐殿','望云殿','炼丹','木鱼','鸣钟','敲鼓','舒展','云间乐台','打小人 · 烦恼退散','藏书阁','一杯茶','喂鱼','休息','山居人','摸猫'],['敬香','心願樹','抽籤','自我反思','星象牌','清和殿','聽雨閣','福緣殿','月華堂','清風殿','長樂殿','望雲殿','煉丹','木魚','鳴鐘','敲鼓','舒展','雲間樂台','打小人 · 煩惱退散','藏書閣','一杯茶','餵魚','休息','山居人','摸貓'],['Incense','Wish tree','Draw a fortune','Reflection','Star cards','Serenity Hall','Rain Pavilion','Blessing Hall','Moon Hall','Breeze Hall','Joy Hall','Cloud Hall','Craft incense','Wooden fish','Ring bell','Beat drum','Stretch','Music stage','Paper figure ritual','Library','Tea','Feed fish','Rest','Caretaker','Pet cat'],['お香','願いの木','おみくじ','内省','星のカード','清和殿','聴雨閣','福縁殿','月華堂','清風殿','長楽殿','望雲殿','香作り','木魚','鐘','太鼓','ストレッチ','音楽広場','紙人形の儀式','書庫','お茶','魚に餌','休憩','庭守','猫をなでる'],['향 피우기','소원 나무','운세 뽑기','마음 돌아보기','별 카드','청화전','청우각','복연전','월화당','청풍전','장락전','망운전','향 만들기','목어','종 치기','북 치기','스트레칭','음악 무대','종이 인형 의식','서고','차 한 잔','물고기 먹이','쉬기','정원지기','고양이 쓰다듬기']],
  menuTitle:['去山中走走','去山中走走','Explore the garden','山を歩こう','정원 둘러보기'], menuDesc:['选一个去处，沿着石路慢慢走。','選一個去處，沿著石路慢慢走。','Choose a place and take the stone path.','行き先を選んで、石畳を歩こう。','장소를 고르고 돌길을 따라 걸어요.'],
  mapTitle:['山居地图','山居地圖','Garden map','山居の地図','정원 지도'], mapDesc:['在这里，随心走走。','在這裡，隨心走走。','Wander at your own pace.','気の向くままに歩こう。','마음 가는 대로 걸어요.'], mapCenter:['定位自己','定位自己','Find me','現在地','내 위치'], mapReset:['复位','重設','Reset','リセット','초기화'], mapCaption:['点地点前往；拖动地图，滚轮或双指缩放。','點地點前往；拖動地圖，滾輪或雙指縮放。','Choose a place; drag or pinch to explore.','場所を選択。ドラッグやピンチで操作。','장소를 선택하고 드래그하거나 두 손가락으로 확대하세요.'],
  tour:['游览','遊覽','Explore','散策','둘러보기'], emote:['动作','動作','Actions','動作','동작'], emotes:[['挥手','作揖','拥抱','比心'],['揮手','作揖','擁抱','比心'],['Wave','Bow','Hug','Heart'],['手を振る','お辞儀','ハグ','ハート'],['손 흔들기','인사','포옹','하트']],
  aria:[['福呀啦游戏','可探索的山林庭院','附近可互动地点','游览分类','打开庭院地图','打开游览菜单','拖动摇杆移动角色','打开动作菜单','游览菜单','关闭游览菜单','山居地图','关闭地图','缩小地图','放大地图','你的位置','关闭','进入福呀啦','随机生成名字'],['福呀啦遊戲','可探索的山林庭院','附近可互動地點','遊覽分類','打開庭院地圖','打開遊覽選單','拖動搖桿移動角色','打開動作選單','遊覽選單','關閉遊覽選單','山居地圖','關閉地圖','縮小地圖','放大地圖','你的位置','關閉','進入福呀啦','隨機產生名字'],['FuYaLa game','Explorable mountain garden','Nearby places','Explore categories','Open garden map','Open explore menu','Drag joystick to move','Open actions menu','Explore menu','Close explore menu','Garden map','Close map','Zoom out','Zoom in','Your position','Close','Enter FuYaLa','Generate a random name'],['福呀啦のゲーム','散策できる山の庭','近くの場所','散策の種類','地図を開く','散策メニューを開く','ジョイスティックで移動','動作メニューを開く','散策メニュー','散策メニューを閉じる','山居の地図','地図を閉じる','縮小','拡大','現在地','閉じる','山居へ入る','名前をランダムに選ぶ'],['푸야라 게임','산속 정원','가까운 장소','둘러보기 분류','정원 지도 열기','둘러보기 메뉴 열기','조이스틱을 끌어 이동','동작 메뉴 열기','둘러보기 메뉴','메뉴 닫기','정원 지도','지도 닫기','축소','확대','내 위치','닫기','정원 입장','이름 무작위 생성']],
  mapLabels:[['清和殿','福缘殿','月华堂','清风殿','长乐殿','望云殿','听雨阁','丹香房','钟亭','观云亭','打小人','乐台','香庭','锦鲤池','心愿树','茶摊'],['清和殿','福緣殿','月華堂','清風殿','長樂殿','望雲殿','聽雨閣','丹香房','鐘亭','觀雲亭','打小人','樂台','香庭','錦鯉池','心願樹','茶攤'],['Serenity Hall','Blessing Hall','Moon Hall','Breeze Hall','Joy Hall','Cloud Hall','Rain Pavilion','Incense Room','Bell Pavilion','Cloud Pavilion','Paper figure','Music Stage','Incense Court','Koi Pond','Wish Tree','Tea Stand'],['清和殿','福縁殿','月華堂','清風殿','長楽殿','望雲殿','聴雨閣','香の部屋','鐘の亭','雲見の亭','紙人形','音楽広場','香の庭','鯉の池','願いの木','茶屋'],['청화전','복연전','월화당','청풍전','장락전','망운전','청우각','향방','종각','구름 정자','종이 인형','음악 무대','향 뜰','비단잉어 연못','소원 나무','찻집']],
  toolbar:[['收藏簿','个人设置','切换日夜','切换环境与互动声音','切换俯瞰','拍照'],['收藏簿','個人設定','切換日夜','切換環境與互動聲音','切換俯瞰','拍照'],['Collection','Settings','Toggle day and night','Toggle sound','Toggle overview','Take a photo'],['コレクション','設定','昼夜を切り替える','音の切り替え','俯瞰表示','写真を撮る'],['컬렉션','설정','낮과 밤 전환','소리 전환','전체 보기','사진 찍기']]
};
let language='zh-CN';
try { const saved=localStorage.getItem('yunxi-language'); if(languages.includes(saved)) language=saved; } catch {}
export function t(key){ const value=ui[key]; return value ? value[languages.indexOf(language)] : key; }
export function currentLanguage(){return language;}
function text(selector,value){const node=document.querySelector(selector);if(node)node.textContent=value;}
function nodeText(selector,value){const el=document.querySelector(selector);if(!el)return;const last=[...el.childNodes].findLast(node=>node.nodeType===Node.TEXT_NODE && node.textContent.trim());if(last)last.textContent=value;}
export function setLanguage(next){
 if(!languages.includes(next))return false; language=next; let saved=true;try{localStorage.setItem('yunxi-language',next);}catch{saved=false;}
 document.documentElement.lang=next;
 const select=document.getElementById('language-select');if(select)select.value=next;
 text('label[for="language-select"]',t('chooseLanguage'));text('.language-note',t('languageNote'));
 nodeText('.welcome-overline',' '+t('welcome-overline'));  const welcome=document.querySelector('.welcome-copy p');if(welcome){welcome.replaceChildren(document.createTextNode(t('welcome-line1')),document.createElement('br'),document.createTextNode(t('welcome-line2')));}
 text('.form-row .field-title',t('choose'));text('.form-row small',t('swipe'));text('label[for="name-input"]',t('call'));text('#random-name',t('random')+' ✦');nodeText('#enter-game',t('enter')+' ');nodeText('.welcome-foot',t('foot')+' ');
 document.querySelectorAll('[data-category]').forEach((el,i)=>el.textContent=t('categories')[i]);
 document.querySelectorAll('.section-label').forEach((el,i)=>nodeText('.menu-section:nth-child('+(i+1)+') .section-label',' '+t('categories')[i]+' '));
 document.querySelectorAll('[data-action]:not([data-action=queue]):not([data-action=release-queue]):not([data-action=meditation]):not([data-action=zodiac])').forEach((el,i)=>{const n=[...el.childNodes].findLast(n=>n.nodeType===Node.TEXT_NODE);if(n)n.textContent=t('actions')[i];});
 nodeText('[data-action=zodiac]',t('zodiacMenu'));
 nodeText('[data-action=meditation]', ({'zh-CN':'山间静心','zh-TW':'山間靜心',en:'Mountain pause',ja:'山でひと休み',ko:'산속에서 잠시 쉬기'})[next]);
 text('#action-menu h2',t('menuTitle'));text('#action-menu .panel-heading p',t('menuDesc'));text('#map-panel h2',t('mapTitle'));text('#map-panel .panel-heading p',t('mapDesc'));text('#map-center',t('mapCenter'));text('#map-reset',t('mapReset'));text('.map-caption',t('mapCaption'));text('#menu-toggle span:last-child',t('tour'));text('#emote-toggle span:last-child',t('emote'));document.querySelectorAll('[data-emote]').forEach((el,i)=>el.textContent=t('emotes')[i]);
 document.querySelectorAll('.top-actions button:not(#room-toggle)').forEach((el,i)=>{el.title=t('toolbar')[i];el.setAttribute('aria-label',t('toolbar')[i]);});
 const ariaSelectors=['#game','#scene','#world-hotspots','.desktop-categories','#map-toggle','#menu-toggle','#joystick','#emote-toggle','#action-menu','#menu-close','#map-panel','#map-close','#map-zoom-out','#map-zoom-in','#world-map-player','#modal-close','#welcome','#random-name'];ariaSelectors.forEach((selector,i)=>document.querySelector(selector)?.setAttribute('aria-label',t('aria')[i]));
 document.dispatchEvent?.(new Event('fuyala:languagechange'));
 document.querySelectorAll('[data-map-action]').forEach((el,i)=>el.textContent=t('mapLabels')[i]); text('.map-label',t('mapTitle')+' ↗');
 return saved;
}
export function languageOptions(){return languages.map((id,i)=>`<option value="${id}"${language===id?' selected':''}>${['简体中文','繁體中文','English','日本語','한국어'][i]}</option>`).join('');}
