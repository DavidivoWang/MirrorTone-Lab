(()=>{
  'use strict';
  const questions=[["系統能做到什麼？", "先辨識系統具備哪些可觀察的能力，再分別追問授權、證據與其他治理條件；能力高低不能替代其餘判斷。", "CAPABILITY / 能力"], ["誰授權它採取行動？", "任務可行與行動有權是兩個不同命題。權限、範圍與有效時間必須清楚，不能由模型能力自行推定。", "AUTHORITY / 授權"], ["憑什麼相信這個判斷？", "區分來源、主張與驗證結果。能檢索到資訊，不代表它已取得現況或決策上的承重資格。", "EVIDENCE / 證據"], ["錯誤發生後如何修復？", "修正不只是道歉或刪除來源，也必須處理已受影響的結果，並核對修復後的實際狀態。", "ROLLBACK / 回退"], ["由誰確認任務完成？", "產生檔案、工具回傳成功、代理宣稱完成，都只是候選訊號；收口需要符合目標的驗收證據。", "COMPLETION / 完成"]];
  const tabs=[...document.querySelectorAll('.principle-tab')];
  const panel=document.getElementById('principlePanel');
  const panelTitle=document.getElementById('panelTitle');
  const panelDescription=document.getElementById('panelDescription');
  const panelEnglish=document.getElementById('panelEnglish');
  const panelNumber=document.getElementById('panelNumber');
  function selectQuestion(index,moveFocus=false){
    if(!questions[index])return;
    tabs.forEach((tab,i)=>{
      const selected=i===index;
      tab.classList.toggle('active',selected);
      tab.setAttribute('aria-selected',String(selected));
      tab.tabIndex=selected?0:-1;
    });
    panelTitle.textContent=questions[index][0];
    panelDescription.textContent=questions[index][1];
    panelEnglish.textContent=questions[index][2];
    panelNumber.textContent=String(index+1).padStart(2,'0')+' / 05';
    panel.setAttribute('aria-labelledby','tab-'+index);
    if(moveFocus)tabs[index].focus();
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>selectQuestion(i));
    tab.addEventListener('keydown',event=>{
      let next=i;
      if(event.key==='ArrowRight')next=(i+1)%tabs.length;
      else if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=tabs.length-1;
      else return;
      event.preventDefault();
      selectQuestion(next,true);
    });
  });
  const menu=document.getElementById('nav');
  const toggle=document.getElementById('menuToggle');
  const openLabel='開啟選單',closeLabel='關閉選單';
  toggle.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?closeLabel:openLabel);
  });
  const closeMenu=()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label',openLabel);};
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  window.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
  let queued=false;
  function scrollUpdate(){
    queued=false;
    const max=document.documentElement.scrollHeight-window.innerHeight;
    document.getElementById('readProgress').style.width=(max>0?Math.min(100,window.scrollY/max*100):0)+'%';
    document.getElementById('siteHeader').classList.toggle('scrolled',window.scrollY>26);
  }
  window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(scrollUpdate);}},{passive:true});
  scrollUpdate();
})();