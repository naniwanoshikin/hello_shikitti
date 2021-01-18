$(function () {

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // headerへ
  $('header h1').click(function () {
    $('html, body').animate(
      { 'scrollTop': 0 },
      350); // 速さ
  });
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // 各navリンクへ
  $('header a').click(function () {
    let id = $(this).attr('href'); // 各id取得
    let position = $(id).offset().top; // 高さ取得
    $('html,body').animate({
      'scrollTop': position - 100 // その高さへ
    }, 'fast');
  });
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // ドロップダウンメニュー（アコーディオン）
  $('nav > p').click(function () {
    let $answer = $('nav').find('ul'); // nav直下のul
    if ($answer.hasClass('open')) { // openしていたら、
      $answer.removeClass('open'); // openやめて
      $answer.slideUp(); // 隠す。
      // $('nav').find('nav > p').text('[+]'); // 書き換え
    } else {
      $answer.addClass('open'); // openして
      $answer.slideDown(); // 表示。
      // $('nav').find('nav > p').text('[-]'); // 書き換え
    }
  });
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // 地域紹介
  //◀️▶️ボタン表示の状態について定義（下記1, 2に適用）
  function toggleChange() {
    let slideIndex = $('.slide').index($('.active')); //アクティブ状態になっている番号を取得
    $('.change').show(); // ◀️ボタン表示
    if (slideIndex === 0) {  // 最初の時
      $('.prev').hide(); // ◀️ボタン消す
    } else if (slideIndex === $('.slide').length - 1) { //最後
      $('.next').hide(); // ▶️ボタン消す
    }
    // 番号の色
    $('.hide').css('background', '#e0f5ff');
    $('.hide').eq(slideIndex).css('background', '#e2eba3');
  }

  // １、クリックした番号をアクティブにする
  $('.hide').click(function () {
    $('.active').removeClass('active'); // active状態を全て削除
    let Index = $('.hide').index($(this)); // clickした番号の
    $('.slide').eq(Index).addClass('active'); // 画像をactiveにする。
    // ◀️▶️ボタン表示
    toggleChange();
  });
  //２、◀️▶とアクティブクラス
  $('.change').click(function () {
    let $activer = $('.active'); // active状態を
    $activer.removeClass('active'); // 全て削除
    if ($(this).hasClass('next')) { // ▶️ボタンを押した時、
      $activer.next().addClass('active'); // その次をactiveにする
    } else {
      $activer.prev().addClass('active'); // その前をactiveにする
    }
    // ◀️▶️ボタン表示
    toggleChange();
  });

});
