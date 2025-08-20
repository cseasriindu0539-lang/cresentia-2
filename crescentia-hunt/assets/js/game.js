(function(){
  const inputs = Array.from(document.querySelectorAll('.char'));
  const btnSubmit = document.getElementById('btnSubmit');
  const btnClear = document.getElementById('btnClear');
  const result = document.getElementById('result');

  // EDIT THIS: set your 10-character winning code here.
  // Example: 'CRESC3NT1A' (change to your real answer)
  const ANSWER = 'CRESC3NT1A';

  // Make letters uppercase automatically, auto-advance focus
  inputs.forEach((inp, idx) => {
    inp.addEventListener('input', (e) => {
      const val = inp.value;
      if (!val) return;
      // Keep only first char
      const c = val[0];
      // Uppercase for letters; keep symbols/numbers
      inp.value = c.toUpperCase();

      // Move to next input
      if (idx < inputs.length - 1) inputs[idx + 1].focus();
    });

    // Backspace to previous input if empty
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !inp.value && idx > 0) {
        inputs[idx - 1].focus();
      }
      if (e.key === 'ArrowLeft' && idx > 0){
        inputs[idx - 1].focus();
        e.preventDefault();
      }
      if (e.key === 'ArrowRight' && idx < inputs.length - 1){
        inputs[idx + 1].focus();
        e.preventDefault();
      }
    });
  });

  btnClear.addEventListener('click', () => {
    inputs.forEach(i => i.value = '');
    result.textContent = '';
    result.className = 'result';
    inputs[0].focus();
  });

  btnSubmit.addEventListener('click', () => {
    const guess = inputs.map(i => (i.value || '')).join('');
    if (guess.length < inputs.length){
      result.textContent = 'Fill all 10 characters.';
      result.className = 'result nope';
      return;
    }
    if (guess.toUpperCase() === ANSWER.toUpperCase()){
      confetti();
      result.textContent = 'Unlocked! Welcome to the next stage 🎉';
      result.className = 'result ok';
    } else {
      result.textContent = 'Incorrect sequence. Keep solving!';
      result.className = 'result nope';
      shake(inputs);
    }
  });

  function shake(nodes){
    nodes.forEach(n => {
      n.style.transition = 'transform .05s';
      let t = 0, id = setInterval(()=>{
        n.style.transform = `translateX(${(Math.random()*2-1)*4}px)`;
        if (++t > 10){ clearInterval(id); n.style.transform = ''; }
      }, 40);
    });
  }

  // Minimal confetti without libs
  function confetti(){
    const N = 60;
    for (let i=0;i<N;i++){
      const p = document.createElement('div');
      p.style.position = 'fixed';
      p.style.left = (Math.random()*100)+'vw';
      p.style.top = '-10px';
      p.style.width = '8px';
      p.style.height = '14px';
      p.style.background = `hsl(${Math.random()*360}, 90%, 60%)`;
      p.style.opacity = '.9';
      p.style.zIndex = '9999';
      p.style.transform = `rotate(${Math.random()*360}deg)`;
      document.body.appendChild(p);

      const fall = p.animate([
        { transform: p.style.transform, top: '-10px' },
        { transform: `rotate(${Math.random()*360}deg)`, top: '110vh' }
      ], { duration: 1600 + Math.random()*800, easing: 'cubic-bezier(.2,.8,.2,1)' });

      fall.onfinish = () => p.remove();
    }
  }

  // Autofocus first input
  inputs[0].focus();
})();
