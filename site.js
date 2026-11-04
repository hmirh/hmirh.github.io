// Filter publication records without hiding content when JavaScript is unavailable.
const filters=[...document.querySelectorAll('[data-filter]')];
const records=[...document.querySelectorAll('.publication-record')];
let selected='all';
const search=document.querySelector('#publication-search');
function applyPublicationFilters(){
  const query=(search?.value||'').trim().toLocaleLowerCase();
  let count=0;
  records.forEach(record=>{record.hidden=(selected!=='all'&&record.dataset.kind!==selected)||(query&&!record.textContent.toLocaleLowerCase().includes(query));if(!record.hidden)count++;});
  const countLabel=document.querySelector('#publication-count');
  if(countLabel)countLabel.textContent=`${count} ${count===1?'entry':'entries'}`;
}
filters.forEach(button=>button.addEventListener('click',()=>{
  selected=button.dataset.filter;
  filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  applyPublicationFilters();
}));
search?.addEventListener('input',applyPublicationFilters);
document.addEventListener('click',event=>{
  document.querySelectorAll('.research-menu[open]').forEach(menu=>{if(!menu.contains(event.target))menu.open=false;});
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape')document.querySelectorAll('.research-menu[open]').forEach(menu=>{menu.open=false;menu.querySelector('summary').focus();});
});
