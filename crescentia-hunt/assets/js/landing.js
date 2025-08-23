// Generate scattered "ERRORS" labels with flicker
(function(){
  const container = document.getElementById('errors-cloud');
  const COUNT = 50;

  const rect = () => container.getBoundingClientRect();

  for (let i = 0; i < COUNT; i++){
    const chip = document.createElement('div');
    chip.className = 'error-chip';
    chip.textContent = 'ERROR';

    const r = rect();
    const x = Math.random() * (r.width - 60);
    const y = Math.random() * (r.height - 30);
    const scale = 0.7 + Math.random() * 1.1;

    chip.style.left = `${x}px`;
    chip.style.top  = `${y}px`;
    chip.style.transform = `scale(${scale})`;
    chip.style.opacity = String(0.55 + Math.random() * 0.35);
    chip.style.setProperty("--rand", Math.random().toFixed(2));

    container.appendChild(chip);
  }

  // Reveal both buttons when user scrolls
  const startWrap = document.getElementById('startWrap');
  const btnStart = document.getElementById('btnStart');
  const btnStop = document.getElementById('btnStop');

  const onScroll = () => {
    if (window.scrollY > 40) {
      startWrap.classList.remove('hidden');
      btnStart.classList.add('revealed');
      btnStop.classList.add('revealed');
      window.removeEventListener('scroll', onScroll);
    }
  };
  window.addEventListener('scroll', onScroll, { passive:true });

  // Fake start button just alerts
  btnStart.addEventListener('click', (e) => {
    e.preventDefault();
    alert("⚠️ Start button malfunction! Use STOP to exit game.");
  });
})();
