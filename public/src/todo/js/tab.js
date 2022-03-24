'use strict'; { // Todoリストのタブ

  // タブ
  const lis = document.querySelectorAll('.tab li');
  // タブの内容
  const contents = document.querySelectorAll('.content_td');

  lis.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      // 全itemに対して
      lis.forEach(li => {
        li.classList.remove('active');
      })
      // クリックしたitemに対して
      item.classList.add('active');

      // 全contentに対して
      contents.forEach(content => {
        content.classList.remove('active');
      })
      // そのタブに紐づいたcontentに対して
      document.getElementById(item.dataset.id).classList.add('active');
    });
  });
}
