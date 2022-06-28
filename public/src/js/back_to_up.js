'use strict'; // トップに戻る

{
  // 戻る
  function menuClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // header/footer
  const to_top = document.querySelectorAll('.to_top');

  for (let i = 0; i < to_top.length; i++) {
    to_top[i].addEventListener('click', menuClick);
  }

}
