export const FRAME_HTML = String.raw`<!doctype html><html lang="en"><head><base href="https://fuyala.com/"><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="referrer" content="no-referrer"><title>Analytics</title></head><body><script>
// Runs in an opaque sandbox; the parent only sends fixed, validated fields.
(() => {
 const acceptedOrigins=new Set(['https://fuyala.com','https://www.fuyala.com']);
 const allowedPages=new Set(['https://fuyala.com/','https://fuyala.com/about']);
 const allowedReferrers=new Set(['','https://chatgpt.com/','https://chat.openai.com/','https://google.com/','https://bing.com/']);
 const allowedSources=new Set(['','chatgpt.com','chat.openai.com','google','bing','fuyala_qa']),allowedMedia=new Set(['','referral','organic','social']);
 let initialized=false,locationValue='',referrerValue='';
 window.addEventListener('message',event=>{
  if(event.source!==parent||!acceptedOrigins.has(event.origin)||!event.data||typeof event.data!=='object')return;
  const data=event.data;
  if(data.type==='initialize'&&!initialized&&allowedPages.has(data.page)&&allowedReferrers.has(data.referrer)&&allowedSources.has(data.campaignSource)&&allowedMedia.has(data.campaignMedium)&&/^\d{1,10}\.\d{1,10}$/.test(data.clientId)){
   initialized=true;locationValue=data.page;referrerValue=data.referrer;
   window.dataLayer=[];window.gtag=function(){window.dataLayer.push(arguments);};
   gtag('js',new Date());
   gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
   const config={send_page_view:false,page_location:locationValue,page_referrer:referrerValue,client_id:data.clientId,allow_google_signals:false,allow_ad_personalization_signals:false};
   if(data.campaignSource)config.campaign_source=data.campaignSource;if(data.campaignMedium)config.campaign_medium=data.campaignMedium;
   gtag('config','G-DZ7WF9VEE9',config);
   gtag('event','page_view',{send_to:'G-DZ7WF9VEE9',page_location:locationValue,page_referrer:referrerValue});
   const script=document.createElement('script');script.async=true;script.referrerPolicy='no-referrer';script.src='https://www.googletagmanager.com/gtag/js?id=G-DZ7WF9VEE9';document.head.appendChild(script);
  }else if(initialized&&data.type==='game_start'){
   gtag('event','game_start',{send_to:'G-DZ7WF9VEE9',page_location:locationValue,page_referrer:referrerValue});
  }
 });
 parent.postMessage({type:'fuyala-analytics-ready'},'*');
})();
</script></body></html>
`;
