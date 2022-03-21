'use strict'; // 監視API

{
  function inViewCallback(entries, obs) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('appear'); // ふわっと表示
      obs.unobserve(entry.target);
    });
  }

  function onScrollCallback(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) { // 空要素が画面から消えたとき
        header.classList.add('scrolled');
        nav_ul.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
        nav_ul.classList.remove('scrolled');
      }
    });
  }

  // ヘッダーナビに対して
  const header = document.querySelector('header');
  const nav_ul = document.querySelector('header > nav > ul');
  const target = document.getElementById('target'); // 空要素
  const onScrollObs = new IntersectionObserver(onScrollCallback);
  onScrollObs.observe(target);

  // 特徴部_画像に対して
  const inViewObs = new IntersectionObserver(inViewCallback, {
    threshold: [0.2,],
    rootMargin: '0px 0px -100px',
  });
  document.querySelectorAll('.pic').forEach(el => {
    inViewObs.observe(el);
  });

}
