'use strict'; {

  const open = document.getElementById('open');
  const lay = document.querySelector('.overlay');
  const close = document.getElementById('close');

  open.addEventListener('click', () => {
    lay.classList.add('show'); // menu表示
    open.classList.add('hide'); // 隠す
  });
  close.addEventListener('click', () => {
    lay.classList.remove('show'); // 逆
    open.classList.remove('hide');
  });
}
