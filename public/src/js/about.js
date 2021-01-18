'use strict'; // プロフィール部
{
  // モーダル
  const open = document.getElementById('open');
  const mask = document.getElementById('mask');
  const modal = document.getElementById('modal');
  open.addEventListener('click', () => {
    // モーダル表示（クラス除去）
    mask.classList.remove('hidden');
    modal.classList.remove('hidden');
  });
  // 元の画面へ（クラス付与）
  // const close = document.getElementById('close');
  // close.addEventListener('click', () => {
  // });
  mask.addEventListener('click', () => {
    mask.classList.add('hidden');
    modal.classList.add('hidden');
      // close.click(); // 上記同様の文。
  });

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // 顔写真
  const face = document.getElementById('face');
  const img = document.createElement('img');
  face.appendChild(img);
  newface();
  function newface() {
    let num = Math.floor(Math.random() * 3) + 1;
    img.src = `src/img/face${num}.jpeg`;
  }
  face.addEventListener('click', () => {
    newface();
  });

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // グラフ部
  // const chart = document.getElementById('jschart');
  // chart.addEventListener('click', () => {
  //   chart.innerHTML = `<p class="adobeskill">Adobe<br>Premiere、Lightroom、Fresco</p>`;
  // });

}
