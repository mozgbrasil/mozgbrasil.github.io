(function(){
  const root = document.documentElement;
  const key = 'theme';
  const saved = localStorage.getItem(key);
  if(saved==='light'){root.classList.add('light');}
  document.getElementById('theme-toggle')?.addEventListener('click',()=>{
    const isLight = root.classList.toggle('light');
    localStorage.setItem(key, isLight ? 'light' : 'dark');
  });
  const y = document.getElementById('year');
  if(y) y.textContent = String(new Date().getFullYear());
})();
