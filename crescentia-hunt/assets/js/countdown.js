(function(){
  const display = document.getElementById('count');
  const club = document.getElementById('clubReveal');

  let n = 5;

  const tick = () => {
    display.textContent = String(n);
    display.style.animation = 'none';
    // retrigger CSS keyframe
    // eslint-disable-next-line no-unused-expressions
    display.offsetHeight; 
    display.style.animation = '';

    if (n === 1){
      // After showing "1", reveal club name, then go to game page
      setTimeout(() => {
        club.classList.add('show');
        setTimeout(() => {
          window.location.href = 'game.html';
        }, 1300); // duration of glow + a beat
      }, 700);
    } else {
      n--;
      setTimeout(tick, 900);
    }
  };

  tick();
})();
