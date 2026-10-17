(()=>{
  'use strict';
  const questions=[["What can the system do?", "Establish observable capability first, then assess authority, evidence and the remaining governance conditions separately. Capability cannot substitute for the others.", "CAPABILITY / COMPETENCE"], ["Who authorizes the action?", "Being able to do something is not being entitled to do it. Authorization, scope and validity must be explicit rather than inferred from ability.", "AUTHORITY / PERMISSION"], ["What supports the claim?", "Distinguish a source, a claim and verified evidence. Retrieval alone does not authorize information as current, action-bearing state.", "EVIDENCE / GROUNDS"], ["How are consequences repaired?", "Correction is more than apology or deletion. It must address downstream effects and read back the state after repair.", "ROLLBACK / RECOVERY"], ["Who can declare completion?", "A generated file, successful tool call or agent assertion is only a candidate signal. Closure requires evidence matched to the original goal.", "COMPLETION / CLOSURE"]];
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
  const openLabel='Open menu',closeLabel='Close menu';
  const setMenuState=(open)=>{
    if(!menu||!toggle)return;
    menu.classList.toggle('open',open);
    document.body.classList.toggle('menu-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?closeLabel:openLabel);
  };
  const closeMenu=()=>setMenuState(false);
  if(menu&&toggle){
    toggle.addEventListener('click',()=>setMenuState(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    window.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
    window.addEventListener('resize',()=>{if(window.innerWidth>860)closeMenu();},{passive:true});
  }
  let queued=false;
  function scrollUpdate(){
    queued=false;
    const max=document.documentElement.scrollHeight-window.innerHeight;
    const progress=document.getElementById('readProgress');
    const header=document.getElementById('siteHeader');
    if(progress)progress.style.width=(max>0?Math.min(100,window.scrollY/max*100):0)+'%';
    if(header)header.classList.toggle('scrolled',window.scrollY>26);
  }
  window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(scrollUpdate);}},{passive:true});
  scrollUpdate();
})();