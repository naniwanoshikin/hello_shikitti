'use strict';
{
  //タブメニュー
  const menuItems = document.querySelectorAll('.menu li a');
  const contents = document.querySelectorAll('.content');

  menuItems.forEach(clickedItem => {
    clickedItem.addEventListener('click', e => {
      // a要素のリンク先に飛ばない
      e.preventDefault();
      // 各itemからactive除去
      menuItems.forEach(item => {
        item.classList.remove('active');
      })
      // クリックしたitemにactive付与
      clickedItem.classList.add('active');
      // 各contentからactive除去
      contents.forEach(content => {
        content.classList.remove('active');
      })
      // クリックしたitemに紐づくcontentにactiveクラス付与
      document.getElementById(clickedItem.dataset.id).classList.add('active');
    });
  });


}