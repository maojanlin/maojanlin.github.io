(() => {
  const panel = document.querySelector('.research-chapters');
  if (!panel) return;
  const details = panel.querySelector('details');
  const links = [...panel.querySelectorAll('nav a')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1)));
  const compact = window.matchMedia('(max-width: 1000px)');
  const fitPanel = () => { details.open = !compact.matches; };
  fitPanel();
  compact.addEventListener('change', fitPanel);
  let pending = false;
  function update() {
    pending = false;
    const threshold = compact.matches ? Math.max(160, panel.getBoundingClientRect().bottom + 25) : 120;
    let active = 0;
    sections.forEach((section, index) => {
      if (section && section.getBoundingClientRect().top <= threshold) active = index;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) active = links.length - 1;
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    document.getElementById('research-current').textContent = links[active].textContent;
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(update); } }
  document.querySelectorAll('.research-page a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      // Keep native anchors and CSS scroll offsets; bypass the theme's jQuery scroller.
      event.stopImmediatePropagation();
      if (compact.matches) details.open = false;
    }, true);
  });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  window.addEventListener('load', schedule);
  update();

  // Research-only idle header: reveal on scroll, top-edge pointer, or keyboard focus.
  const header = document.querySelector('.masthead');
  if (!header) return;
  document.body.classList.add('research-auto-header');
  let idleTimer;
  let overHeader = false;
  function revealHeader() {
    document.body.classList.remove('research-header-hidden');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (window.scrollY > 40 && !overHeader && !header.contains(document.activeElement)) {
        document.body.classList.add('research-header-hidden');
      }
    }, 1100);
  }
  window.addEventListener('scroll', revealHeader, { passive: true });
  document.addEventListener('pointermove', event => {
    if (event.clientY < 16) revealHeader();
  }, { passive: true });
  header.addEventListener('pointerenter', () => { overHeader = true; revealHeader(); });
  header.addEventListener('pointerleave', () => { overHeader = false; revealHeader(); });
  header.addEventListener('focusin', revealHeader);
  header.addEventListener('focusout', revealHeader);
  revealHeader();
})();

// Enlarge one numbered block while preserving its project links.
(() => {
  const map = document.querySelector('.research-map');
  if (!map || !window.HTMLDialogElement) return;
  const blocks = [
    { title: '0 · Reference bias', crop: [18, 38, 712, 446], circle: [230, 55, 55, 55] },
    { title: '1 · Measuring reference bias', crop: [28, 778, 517, 566], circle: [40, 789, 55, 55] },
    { title: '2 · Personalized references', crop: [830, 5, 952, 562], circle: [847, 13, 55, 55] },
    { title: '3 · Complex immune loci', crop: [634, 778, 950, 566], circle: [650, 789, 55, 55] }
  ];
  const vectorCrops = [[135,80,730,455], [235,18,531,580], [12,20,976,575], [13,18,974,580]];
  const projectAreas = [[], [['biastools',418,115,176,47]], [['impute-first',53,342,177,47],['imput2t',529,342,177,47]], [['igloo',150,415,177,47],['gairr-suite',636,344,183,48]]];
  const vectorURLs = blocks.map((_, i) => new URL(`research-subplot-${i}.svg`, map.querySelector('img').src).href);
  vectorURLs.forEach(url => { const preload = new Image(); preload.src = url; });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeBlock = null;
  let animation = null;
  let closing = false;
  const dialog = document.createElement('dialog');
  dialog.className = 'research-zoom';
  dialog.setAttribute('aria-labelledby', 'research-zoom-title');
  dialog.innerHTML = '<div class="research-zoom-toolbar"><h2 id="research-zoom-title"></h2><button type="button" class="research-zoom-close" aria-label="Close enlarged diagram">×</button></div><div class="research-zoom-stage"></div>';
  document.body.append(dialog);
  const stage = dialog.querySelector('.research-zoom-stage');
  const close = dialog.querySelector('button');
  function originTransform() {
    const bounds = map.getBoundingClientRect();
    const [x,y,w,h] = activeBlock.crop;
    const target = dialog.getBoundingClientRect();
    return `translate(${bounds.left + x / 1800 * bounds.width - target.left}px, ${bounds.top + y / 1350 * bounds.height - target.top}px) scale(${w / 1800 * bounds.width / target.width}, ${h / 1350 * bounds.height / target.height})`;
  }
  async function closeAnimated() {
    if (closing || !dialog.open) return;
    closing = true;
    if (animation) { await animation.finished.catch(() => {}); animation = null; }
    if (!reducedMotion.matches) {
      const zoom = dialog.animate([{ transform: 'none', opacity: 1 }, { transform: originTransform(), opacity: 0 }], { duration: 350, easing: 'cubic-bezier(.4,0,.2,1)' });
      await zoom.finished.catch(() => {});
    }
    dialog.close();
    closing = false;
  }
  close.addEventListener('click', closeAnimated);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeAnimated(); });
  dialog.addEventListener('close', () => document.body.classList.remove('research-zoom-open'));
  const ns = 'http://www.w3.org/2000/svg';
  function openBlock(block) {
    activeBlock = block;
    closing = false;
    const index = blocks.indexOf(block);
    const [cx,cy,w,h] = vectorCrops[index];
    dialog.querySelector('h2').textContent = block.title;
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('aria-label', block.title + ' enlarged diagram');
    const img = document.createElementNS(ns, 'image');
    img.setAttribute('href', vectorURLs[index]);
    img.setAttribute('width', w);
    img.setAttribute('height', h);
    svg.append(img);
    projectAreas[index].forEach(([id,x,y,width,height]) => {
      const a = document.createElementNS(ns, 'a');
      a.setAttribute('href', '#' + id);
      a.setAttribute('aria-label', map.querySelector(`a[href="#${id}"]`).getAttribute('aria-label'));
      const rect = document.createElementNS(ns, 'rect');
      for (const [key,value] of Object.entries({x:x-cx,y:y-cy,width,height,rx:10})) rect.setAttribute(key,value);
      a.append(rect);
      a.addEventListener('click', event => {
        event.preventDefault();
        if (animation) { animation.cancel(); animation = null; }
        dialog.getAnimations().forEach(a => a.cancel());
        dialog.close();
        const hash = '#' + id;
        const target = document.getElementById(id);
        if (location.hash !== hash) history.pushState(null, '', hash);
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({preventScroll:true});
          target.scrollIntoView({block:'start'});
        }
        window.dispatchEvent(new Event('hashchange'));
      });
      svg.append(a);
    });
    stage.replaceChildren(svg);
    document.body.classList.add('research-zoom-open');
    dialog.showModal();
    close.focus({preventScroll:true});
    if (!reducedMotion.matches) {
      animation = dialog.animate([{transform:originTransform(),opacity:.35},{transform:'none',opacity:1}], {duration:480,easing:'cubic-bezier(.16,1,.3,1)'});
    }
  }
  blocks.forEach(block => {
    const [x, y, w, h] = block.circle;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'research-map-enlarge';
    button.setAttribute('aria-label', 'Enlarge ' + block.title);
    button.setAttribute('aria-haspopup', 'dialog');
    button.title = 'Enlarge ' + block.title;
    Object.assign(button.style, { left: `${x / 18}%`, top: `${y / 13.5}%`, width: `${w / 18}%`, height: `${h / 13.5}%` });
    button.addEventListener('click', () => openBlock(block));
    map.append(button);
  });
})();
