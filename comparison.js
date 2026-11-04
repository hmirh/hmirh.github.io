document.querySelectorAll('.comparison-group').forEach(group=>{
  const videos=[...group.querySelectorAll('video')];
  const play=()=>videos.forEach(video=>video.play().catch(()=>{}));
  group.querySelector('.group-play').onclick=play;
  group.querySelector('.group-pause').onclick=()=>videos.forEach(video=>video.pause());
  group.querySelector('.group-restart').onclick=()=>{videos.forEach(video=>{video.currentTime=0;});play();};
  new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)videos.forEach(video=>video.pause());}).observe(group);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)videos.forEach(video=>video.pause());});
});
