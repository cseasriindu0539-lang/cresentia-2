// Generate scattered "ERRORS" labels with tilt + glitch
(function(){
  const container = document.getElementById('errors-cloud');
  const COUNT = 50; // number of labels
  const tilt = 37;  // degrees

  const rect = () => container.getBoundingClientRect();

  for (let i = 0; i < COUNT; i++){
    const chip = document.createElement('div');
    chip.className = 'error-chip';
    chip.textContent = 'ERRORS';

    const r = rect();
    const x = Math.random() * (r.width - 60);
    const y = Math.random() * (r.height - 30);
    const scale = 0.7 + Math.random() * 1.1;
    const rotate = tilt + (Math.random() * 6 - 3); // ±3°

    chip.style.left = `${x}px`;
    chip.style.top  = `${y}px`;
    // chip.style.transform = `rotate(${rotate}deg) scale(${scale})`;
    chip.style.opacity = String(0.55 + Math.random() * 0.35);
    
    // random flicker delay
    chip.style.setProperty("--rand", Math.random().toFixed(2));

    container.appendChild(chip);
  }

  // Reveal Start button when user scrolls
  const btn = document.getElementById('btnStart');
  const onScroll = () => {
    if (window.scrollY > 40) {
      btn.classList.add('revealed');
      btn.setAttribute('tabindex','0');
      window.removeEventListener('scroll', onScroll);
    }
  };
  window.addEventListener('scroll', onScroll, { passive:true });
})();
