'use strict'; // 監視_ヘッダー

{
  // 共通機能: ナビリンクに色がついていれば除去
  function remove_active() {
    const currentActiveIndex = document.querySelector(".iob_active");
    if (currentActiveIndex !== null) {
      currentActiveIndex.classList.remove("iob_active");
    }
  }

  // -----------------------------------------
  // Body先頭に潜む空要素で判定
  function onScrollCallback(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // console.log('先頭から離れた');
        header.classList.add('scrolled_iob'); // 背景色
        nav_ul.classList.add('scrolled_iob');
        header_h1.classList.add('header_h1_iob'); // 文字サイズ小
      } else {
        // console.log('ただいま先頭');
        header.classList.remove('scrolled_iob');
        nav_ul.classList.remove('scrolled_iob');
        header_h1.classList.remove('header_h1_iob');
        remove_active(); // ナビリンク色を除去
      }
    });
  }

  // 監視要素
  const target = document.getElementById('target_iob'); // 先頭に潜む空要素
  const header = document.querySelector('header'); // ヘッダー全体
  const header_h1 = document.querySelector('header > h1'); // しきたにワールド
  const nav_ul = document.querySelector('header > nav > ul'); // ナビ全体

  const onScrollObs = new IntersectionObserver(onScrollCallback);
  onScrollObs.observe(target);


  // -----------------------------------------
  // 監視要素: 各セクション
  const boxes = document.querySelectorAll("section");

  const observer = new IntersectionObserver(doWhenIntersect, {
    root: null, // ビューポート
    rootMargin: "0px 0px -30%", // ビューポートの中心
    threshold: [0.2,]
  });
  // 監視
  boxes.forEach(box => {
    observer.observe(box);
  });

  /**
   * 交差したときに呼び出す
   * @param entries
   */
  function doWhenIntersect(entries) {
    // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // console.log(entry.target.id); // 飛び先のタグid
        activateIndex(entry.target);
      }
    });
    // if (!entries[0].isIntersecting) {
    //   console.log('a');
    // }
    // console.log(entries[0].target.id); // aboutとか
  }

  /**
   * ナビa要素のアクティブ状態で判定 ▶︎ 色を変える
   * @param element
   */
  function activateIndex(element) {
    // アクティブ状態のa要素があれば、activeを除去
    remove_active();
    // 引数で渡されたDOMが飛び先のa要素に、activeを付与
    const newActiveIndex = document.querySelector(`a[href='#${element.id}']`);
    newActiveIndex.classList.add("iob_active");
  }

}
