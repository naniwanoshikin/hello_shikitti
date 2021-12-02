'use strict'; // タブメニュー

{
  const menuItems = document.querySelectorAll('.menu li a');
  const contents = document.querySelectorAll('.content');

  menuItems.forEach(clickedItem => {
    clickedItem.addEventListener('click', e => {
      e.preventDefault();
      // 各タブ
      menuItems.forEach(item => {
        item.classList.remove('active'); // 一旦除去
      })
      clickedItem.classList.add('active');

      // 各コンテンツ
      contents.forEach(content => {
        content.classList.remove('active');
      })
      // クリックしたタブに紐づく内容
      document.getElementById(clickedItem.dataset.id).classList.add('active');
    });
  });
}
