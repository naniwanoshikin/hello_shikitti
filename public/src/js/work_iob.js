'use strict'; // 特徴部 画像がふわっと表示

{
  function callback(entries, obs) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('appear');
      obs.unobserve(entry.target)
    });
  }

  const options = {
    threshold: [0.2,],
    rootMargin: '0px 0px -100px',
  }

  // 画像
  const targets = document.querySelectorAll('.pic');

  const observer = new IntersectionObserver(callback, options);

  targets.forEach(target => {
    observer.observe(target);
  });

}