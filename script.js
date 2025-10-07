(function () {
  const slider = document.querySelector('.fasilitas .fasilitas-icon-slide');
  if (!slider) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // duplicate content for seamless scroll
  if (slider.children.length > 0) {
    slider.innerHTML += slider.innerHTML;
  }
  const parent = slider.parentElement;
  while (slider.scrollWidth < parent.clientWidth * 2) {
    slider.innerHTML += slider.innerHTML;
    if (slider.children.length > 1024) break;
  }

  const singleWidth = slider.scrollWidth / 2;
  let pos = 0;
  let lastTime = performance.now();

  const BASE_SPEED = 50;  // px/sec
  let currentSpeed = BASE_SPEED;
  let targetSpeed = BASE_SPEED;
  let braking = false;

  const MAX_DT = 50;

  function frame(now) {
    const dtRaw = now - lastTime;
    const dt = Math.min(MAX_DT, dtRaw);
    lastTime = now;

    // Smooth braking effect
    if (braking && targetSpeed > 0) {
      targetSpeed -= BASE_SPEED * 0.015; // reduce by 1.5% each frame
      if (targetSpeed < 0) targetSpeed = 0;
    }

    // smooth interpolation
    currentSpeed += (targetSpeed - currentSpeed) * 0.05; // slower easing

    pos -= currentSpeed * (dt / 1000);
    if (pos <= -singleWidth) pos += singleWidth;
    if (pos > 0) pos -= singleWidth;

    slider.style.transform = `translate3d(${pos}px,0,0)`;

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // Hover starts braking
  slider.addEventListener('pointerenter', () => {
    braking = true;
  });

  // On leave, accelerate smoothly back to BASE_SPEED
  slider.addEventListener('pointerleave', () => {
    braking = false;
    targetSpeed = BASE_SPEED;
  });

  slider.addEventListener('touchstart', () => { braking = true; }, { passive: true });
  slider.addEventListener('touchend', () => {
    braking = false;
    targetSpeed = BASE_SPEED;
  });
})();


document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".room-image");
  const buttons = document.querySelectorAll(".room-selector button");

  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      // deactivate all
      images.forEach(img => img.classList.remove("active"));
      buttons.forEach(b => b.classList.remove("active"));

      // activate selected
      images[i].classList.add("active");
      btn.classList.add("active");
    });
  });
});

//toggle sidenav @media max-width 477px
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector('.hamburger');
  const sideNav = document.querySelector('.navbar');

  if (hamburger && sideNav) {
    hamburger.addEventListener('click', () => {
      sideNav.classList.toggle('activate');
    });
  }

  const close = document.querySelector('.close');

  if(close){
    close.addEventListener('click', () => {
        sideNav.classList.toggle('activate');
    })
  }
});