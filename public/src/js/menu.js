'use strict'; {

  // タブメニュー
  const lies = document.querySelectorAll('.menu li');
  const contents = document.querySelectorAll('.tdcontent');

  lies.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      // 全itemからactiveを除去
      lies.forEach(li => {
        li.classList.remove('active');
      })
      // クリックしたitemにactiveを付与
      item.classList.add('active');

      // 全contentからactive除去
      contents.forEach(content => {
        content.classList.remove('active');
      })
      // クリックしたaに対応するtodocontentにactiveクラス付与
      document.getElementById(item.dataset.id).classList.add('active');
    });
  });
}
