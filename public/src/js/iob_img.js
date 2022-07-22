'use strict'; // 監視_コンテンツ画像

{
  function inViewCallback(entries, obs) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('appear_iob'); // ふわっと表示
      obs.unobserve(entry.target); // 監視を止める
    });
  }

  // 画像に対して
  const inViewObs = new IntersectionObserver(inViewCallback, {
    threshold: [0.2,],
    rootMargin: '0px 0px -100px',
  });
  document.querySelectorAll('.img_iob').forEach(el => {
    inViewObs.observe(el);
  });
}
