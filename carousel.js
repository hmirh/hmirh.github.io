document.querySelectorAll('.carousel').forEach(c => {
  const slides=[...c.querySelectorAll('.slide')], dots=[...c.querySelectorAll('.dots button')], videos=[...c.querySelectorAll('video')], motion=c.querySelector('.motion');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let index=0, wantsPlayback=!reduced.matches, visible=false;
  const activeVideos=()=>[...slides[index].querySelectorAll('video')];
  const activeVideo=()=>activeVideos()[0];
  const label=()=>{const list=activeVideos(),playing=list.some(v=>!v.paused);motion.textContent=(playing?'Pause':'Play')+(list.length>1?' videos':' video');};
  const playback=()=>{const active=activeVideos();videos.forEach(v=>{if(active.includes(v)&&visible&&!document.hidden&&wantsPlayback)v.play().catch(label);else v.pause();});label();};
  function show(next){index=(next+slides.length)%slides.length;slides.forEach((s,i)=>s.hidden=i!==index);dots.forEach((d,i)=>d.setAttribute('aria-current',String(i===index)));c.querySelector('.label').textContent=slides[index].dataset.label;c.querySelector('.count').textContent=`${index+1} / ${slides.length}`;motion.hidden=!activeVideo();playback();}
  c.querySelector('.prev').onclick=()=>show(index-1);c.querySelector('.next').onclick=()=>show(index+1);dots.forEach((d,i)=>d.onclick=()=>show(i));
  c.addEventListener('keydown',e=>{if(e.target.closest('video'))return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(index+(e.key==='ArrowRight'?1:-1));}});
  let x,y;const stage=c.querySelector('.stage');stage.addEventListener('touchstart',e=>{x=e.touches[0].clientX;y=e.touches[0].clientY;},{passive:true});stage.addEventListener('touchend',e=>{if(x===undefined)return;const dx=e.changedTouches[0].clientX-x,dy=e.changedTouches[0].clientY-y;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)show(index+(dx<0?1:-1));x=undefined;},{passive:true});
  motion.onclick=()=>{wantsPlayback=!activeVideos().some(v=>!v.paused);playback();};videos.forEach(v=>{v.addEventListener('play',label);v.addEventListener('pause',label);});
  new IntersectionObserver(e=>{visible=e[0].isIntersecting;playback();},{threshold:.15}).observe(c);document.addEventListener('visibilitychange',playback);reduced.addEventListener('change',()=>{wantsPlayback=!reduced.matches;playback();});show(0);
});
