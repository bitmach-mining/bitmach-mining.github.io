document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-button');
  const nav = document.getElementById('site-nav');
  const yearNodes = document.querySelectorAll('#year');

  yearNodes.forEach((node) => { node.textContent = new Date().getFullYear(); });

  const handleScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const slider = document.getElementById('powerSlider');
  if (slider) {
    const simState = document.getElementById('simState');
    const simCopy = document.getElementById('simCopy');
    const loadValue = document.getElementById('loadValue');
    const curtailValue = document.getElementById('curtailValue');
    const loadBar = document.getElementById('loadBar');
    const curtailBar = document.getElementById('curtailBar');
    const stressPointer = document.getElementById('stressPointer');

    const render = () => {
      const available = Number(slider.value);
      const load = Math.max(10, Math.min(92, Math.round(available * 0.88)));
      const curtail = Math.max(6, Math.min(88, Math.round((100 - available) * 0.84)));
      const stress = 100 - available;

      loadValue.textContent = `${load}%`;
      curtailValue.textContent = `${curtail}%`;
      loadBar.style.width = `${load}%`;
      curtailBar.style.width = `${curtail}%`;
      stressPointer.style.left = `${stress}%`;

      if (available >= 70) {
        simState.textContent = 'SURPLUS DAYTIME POWER';
        simCopy.textContent = 'During periods of strong availability, flexible load can run harder and convert otherwise underutilised electricity into digital output.';
      } else if (available >= 40) {
        simState.textContent = 'BALANCED OPERATING WINDOW';
        simCopy.textContent = 'When conditions are more balanced, BitMach can stay productive while preserving the ability to respond quickly if the system tightens.';
      } else {
        simState.textContent = 'TIGHT SYSTEM CONDITIONS';
        simCopy.textContent = 'As the system becomes more stressed, flexible digital load can ramp down quickly and release power back into the broader network envelope.';
      }
    };

    slider.addEventListener('input', render);
    render();
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((node) => observer.observe(node));
  } else {
    reveals.forEach((node) => node.classList.add('is-visible'));
  }
});
