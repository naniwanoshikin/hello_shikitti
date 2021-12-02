$(function () { // スクロール (jQuery)

  // 先頭に戻る ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  $('header > h1').click(function () {
    $('html, body').animate(
      { 'scrollTop': 0 },
      350); // 速さ
  });

  // 各nav先へ飛ぶ ＝＝＝＝＝＝＝＝＝＝＝＝＝
  $('nav a').click(function () {
    let id = $(this).attr('href'); // 各id
    let position = $(id).offset().top; // 高さ
    $('html,body').animate({
      'scrollTop': position - 100 // そこへ跳ぶ
    }, 'fast');
  });

  // ナビ_ドロップダウン ＝＝＝＝＝＝＝＝＝＝＝
  $('nav > p').click(function () {
    let $answer = $('nav').children('ul'); // ul
    if ($answer.hasClass('open')) { // openしていたら、
      $answer.removeClass('open');
      $answer.slideUp();
      // $('nav').find('nav > p').text('[+]');
    } else {
      $answer.addClass('open'); // openして
      $answer.slideDown(); // 表示
      // $('nav').find('nav > p').text('[-]');
    }
  });
});
