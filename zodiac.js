// Original zodiac-themed reflection prompts. Choices stay in this open interaction only.
const localeOrder=['zh-CN','zh-TW','en','ja','ko'];
const copy={
  title:['十二生肖 · 心笺','十二生肖 · 心箋','Zodiac reflection','十二支の心の便り','십이지 마음 쪽지'],
  intro:['选一个生肖，翻开一张给自己的思考笺。每张笺都是温柔的提问，不预测运势。','選一個生肖，翻開一張給自己的思考箋。每張箋都是溫柔的提問，不預測運勢。','Choose an animal to reveal a question for reflection. This is not a prediction.','干支を一つ選び、自分への問いを開きましょう。運勢を予測するものではありません。','띠 동물을 골라 자신에게 건네는 질문을 열어 보세요. 운세를 예측하지 않아요.'],
  label:['选择生肖','選擇生肖','Choose an animal','干支を選ぶ','동물 선택'],
  placeholder:['请选择','請選擇','Please choose','選んでください','선택해 주세요'],
  confirm:['打开心笺','打開心箋','Open reflection','便りを開く','쪽지 열기'],
  leave:['离开','離開','Leave','閉じる','나가기'],
  back:['重新选择','重新選擇','Choose again','選び直す','다시 선택'],
  done:['收好心笺','收好心箋','Finish','しまう','쪽지 닫기'],
  hint:['生肖只是思考的起点，每个人都可以有自己的答案。','生肖只是思考的起點，每個人都可以有自己的答案。','The animal is only a starting point; your answer is your own.','干支は考えるきっかけです。答えは人それぞれです。','동물은 생각의 시작일 뿐, 답은 사람마다 달라요.'],
  invalid:['请先选择一个生肖。','請先選擇一個生肖。','Please choose an animal first.','先に干支を選んでください。','먼저 동물을 선택해 주세요.'],
  dailyTitle:['今日福笺','今日福箋','Your daily note','今日の福便り','오늘의 복 쪽지'],
  dailyDo:['今日宜','今日宜','A gentle idea','今日のおすすめ','오늘의 작은 제안'],
  dailyMind:['留心','留心','A reminder','心に留めて','마음에 두기'],
  closed:['心笺已收好','心箋已收好','Reflection closed','便りをしまいました','쪽지를 닫았어요'],
};
const animals=[
 ['鼠','鼠','Rat','子（ね）','쥐'],['牛','牛','Ox','丑（うし）','소'],['虎','虎','Tiger','寅（とら）','호랑이'],['兔','兔','Rabbit','卯（う）','토끼'],['龙','龍','Dragon','辰（たつ）','용'],['蛇','蛇','Snake','巳（み）','뱀'],['马','馬','Horse','午（うま）','말'],['羊','羊','Goat','未（ひつじ）','양'],['猴','猴','Monkey','申（さる）','원숭이'],['鸡','雞','Rooster','酉（とり）','닭'],['狗','狗','Dog','戌（いぬ）','개'],['猪','豬','Pig','亥（い）','돼지']
];
const questions=[
 ['最近有什么细小的变化值得你留心？','最近有什麼細小的變化值得你留心？','What small change deserves your attention lately?','最近、気に留めたい小さな変化はありますか？','요즘 눈여겨볼 작은 변화는 무엇인가요?'],
 ['哪件事值得你按自己的步调慢慢坚持？','哪件事值得你按自己的步調慢慢堅持？','What is worth pursuing steadily at your own pace?','自分のペースで続けたいことは何ですか？','자신의 속도로 꾸준히 이어가고 싶은 일은 무엇인가요?'],
 ['面对一件在意的事，你想迈出怎样的小步？','面對一件在意的事，你想邁出怎樣的小步？','What small step could you take toward something you care about?','大切なことへ向けて、どんな小さな一歩を踏み出せますか？','소중한 일을 위해 어떤 작은 한 걸음을 내디딜 수 있나요?'],
 ['怎样为今天留出一点安心与休息？','怎樣為今天留出一點安心與休息？','How could you make a little room for rest today?','今日、安心して休む時間をどう作れますか？','오늘 편히 쉴 시간을 어떻게 조금 만들 수 있을까요?'],
 ['如果暂时不设限制，你想尝试什么新事物？','如果暫時不設限制，你想嘗試什麼新事物？','If you set limits aside for a moment, what would you try?','制限をひとまず忘れるなら、何に挑戦したいですか？','잠시 제약을 내려놓는다면 무엇을 시도하고 싶나요?'],
 ['遇到不确定的事情，你还需要了解什么？','遇到不確定的事情，你還需要了解什麼？','When something is uncertain, what would you like to learn?','分からないことに出会ったとき、何を知りたいですか？','불확실한 일을 마주했을 때 무엇을 더 알고 싶나요?'],
 ['你的生活里，哪里可以多一点自由和空间？','你的生活裡，哪裡可以多一點自由和空間？','Where in your life could you make more room for freedom?','暮らしのどこに、もう少し自由な余白を作れますか？','삶의 어디에 자유로운 여유를 더할 수 있을까요?'],
 ['今天你愿意怎样温柔地照顾自己？','今天你願意怎樣溫柔地照顧自己？','How would you like to care for yourself today?','今日、自分をどんなふうにいたわりたいですか？','오늘 자신을 어떻게 다정하게 돌보고 싶나요?'],
 ['最近有什么事情，可以换个角度试一试？','最近有什麼事情，可以換個角度試一試？','What could you approach from a different angle?','別の角度から試せることは何ですか？','다른 관점으로 시도해 볼 일은 무엇인가요?'],
 ['有什么小安排能让明天更从容？','有什麼小安排能讓明天更從容？','What small preparation could make tomorrow easier?','明日を楽にするために、どんな小さな準備ができますか？','내일을 더 편안하게 할 작은 준비는 무엇인가요?'],
 ['你想感谢或联系哪位陪伴过你的人？','你想感謝或聯繫哪位陪伴過你的人？','Is there someone you would like to thank or reach out to?','感謝を伝えたり、連絡したりしたい人はいますか？','고마움을 전하거나 연락하고 싶은 사람이 있나요?'],
 ['今天有什么平常的小事让你感到满足？','今天有什麼平常的小事讓你感到滿足？','What ordinary moment brought you contentment today?','今日、心が満たされた何気ない瞬間はありましたか？','오늘 마음을 채워 준 평범한 순간은 무엇인가요?']
];
// Original daily notes are a playful prompt, not an actual prediction. No choice is stored.
const dailyIdeas=[
 ['整理一处小角落','整理一處小角落','Tidy a small corner','小さな場所を整える','작은 공간 정리하기'],
 ['给朋友送一句问候','給朋友送一句問候','Send a kind greeting','誰かに挨拶を届ける','친구에게 안부 전하기'],
 ['开始一件小事','開始一件小事','Start one small thing','小さなことを始める','작은 일 하나 시작하기'],
 ['走走看看','走走看看','Take a gentle walk','ゆっくり歩いてみる','가볍게 산책하기'],
 ['留一刻给自己','留一刻給自己','Make a little time for yourself','自分の時間を作る','나를 위한 시간 만들기'],
 ['记下一点灵感','記下一點靈感','Write down a small idea','ひらめきを書き留める','떠오른 생각 적어두기'],
 ['享用一杯暖茶','享用一杯暖茶','Enjoy a warm drink','温かい飲み物を味わう','따뜻한 차 한 잔 마시기'],
 ['赞许自己的努力','讚許自己的努力','Acknowledge your effort','自分の頑張りを認める','스스로의 노력을 칭찬하기']
];
const dailyReminders=[
 ['不必事事赶在今天完成。','不必事事趕在今天完成。','Not everything has to be finished today.','すべてを今日終える必要はありません。','모든 일을 오늘 끝내지 않아도 괜찮아요.'],
 ['先听见自己的需要。','先聽見自己的需要。','Listen to what you need.','自分の気持ちにも耳を傾けて。','내게 필요한 것을 먼저 들어 주세요.'],
 ['慢一点，也是在前进。','慢一點，也是在前進。','Going slowly is still moving forward.','ゆっくりでも前に進んでいます。','천천히 가도 앞으로 나아가는 거예요.'],
 ['给变化留一点时间。','給變化留一點時間。','Give change a little time.','変化には少し時間を。','변화에 조금 시간을 주세요.'],
 ['可以向信任的人求助。','可以向信任的人求助。','It is okay to ask someone you trust for help.','信頼できる人に頼っても大丈夫。','믿을 수 있는 사람에게 도움을 청해도 좋아요.'],
 ['休息也是重要的安排。','休息也是重要的安排。','Rest is a worthwhile plan too.','休むことも大切な予定です。','쉬는 것도 중요한 일정이에요.'],
 ['选择适合自己的节奏。','選擇適合自己的節奏。','Choose a pace that suits you.','自分に合うペースを選んで。','자신에게 맞는 속도를 골라요.'],
 ['认真做好眼前的一小步。','認真做好眼前的一小步。','Give attention to the next small step.','目の前の小さな一歩を大切に。','눈앞의 작은 한 걸음에 집중해요.']
];
export function dailyZodiacNote(animal, date=new Date(), language=0){
  const index=Number.isInteger(animal)&&animal>=0&&animal<12?animal:0;
  const locale=Number.isInteger(language)&&language>=0&&language<5?language:0;
  const day=Math.floor(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())/86400000);
  const seed=((day*13+index*7)%8+8)%8;
  return {idea:dailyIdeas[seed][locale],reminder:dailyReminders[(seed+index+3)%8][locale]};
}
export function zodiacActivity(api,{view,button,bind,byId,finish}) {
  const language=localeOrder.indexOf(document.documentElement.lang);
  const i=language<0?0:language, t=key=>copy[key][i];
  let selected='';
  function close(){finish(api,t('closed'));}
  function choose(){
    view(api,t('title'),`<p>${t('intro')}</p><label for="zodiac-select">${t('label')}</label><select id="zodiac-select" class="zodiac-select"><option value="">${t('placeholder')}</option>${animals.map((animal,n)=>`<option value="${n}">${animal[i]}</option>`).join('')}</select><p id="zodiac-error" class="ritual-caption" role="alert"></p><div class="ritual-actions">${button(t('confirm'),'zodiac-confirm')}${button(t('leave'),'zodiac-leave',true)}</div>`);
    const select=byId('zodiac-select');select.value=selected;
    bind('zodiac-confirm',()=>{const value=select.value;if(!/^(?:[0-9]|1[01])$/.test(value)){byId('zodiac-error').textContent=t('invalid');select.focus();return;}selected=value;result(Number(value));});
    bind('zodiac-leave',close);
  }
  function result(n){
    const note=dailyZodiacNote(n,new Date(),i);
    view(api,t('title'),`<div class="ritual-stage"><div class="ritual-glow"></div><span class="ritual-icon" aria-hidden="true">✦</span><small>${animals[n][i]}</small></div><div class="ritual-paper"><h3>${animals[n][i]}</h3><p>${questions[n][i]}</p></div><div class="zodiac-daily"><strong>${t('dailyTitle')}</strong><p><b>${t('dailyDo')}：</b>${note.idea}</p><p><b>${t('dailyMind')}：</b>${note.reminder}</p></div><p class="ritual-caption">${t('hint')}</p><div class="ritual-actions">${button(t('back'),'zodiac-back',true)}${button(t('done'),'zodiac-done')}</div>`);
    bind('zodiac-back',choose);bind('zodiac-done',close);
  }
  choose();
}
