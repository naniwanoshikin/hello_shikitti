'use strict';  // メニュー

{
  // メニューボタン
  const open = document.getElementById('open');
  // メニュー画面
  const lay = document.querySelector('.overlay');
  // ✖️ボタン
  const close = document.getElementById('close');

  open.addEventListener('click', () => {
    lay.classList.add('show'); // 一覧表示
    open.classList.add('hide'); // 隠す
  });
  close.addEventListener('click', () => {
    lay.classList.remove('show'); // 元の画面へ
    open.classList.remove('hide');
  });
}
