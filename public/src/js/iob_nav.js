'use strict'; // 監視_ナビ

{

  function onScrollCallback(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) { // 空要素が画面から消えたとき
        header.classList.add('scrolled_iob');
        nav_ul.classList.add('scrolled_iob');
        header_h1.classList.add('header_h1_iob');
      } else {
        header.classList.remove('scrolled_iob');
        nav_ul.classList.remove('scrolled_iob');
        header_h1.classList.remove('header_h1_iob');
      }
    });
  }

  // 監視要素
  const header = document.querySelector('header');
  const header_h1 = document.querySelector('header > h1');
  const nav_ul = document.querySelector('header > nav > ul');
  // 空要素
  const target = document.getElementById('target_iob');

  const onScrollObs = new IntersectionObserver(onScrollCallback);
  onScrollObs.observe(target);


  // -----------------------------------------
  // 監視要素
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
        activateIndex(entry.target);
        console.log(entry.target.id); // 飛び先のタグid
      }
    });
    // if (!entries[0].isIntersecting) {
    //   console.log('a');
    // }
    // console.log(entries[0].target.id); // about
  }

  /**
   * 目次の色を変える
   * @param element
   */
  function activateIndex(element) {
    // アクティブになっている目次を選択
    const currentActiveIndex = document.querySelector(".index_iob .iob_active");
    // すでにアクティブになっている要素があれば、activeを除去
    if (currentActiveIndex !== null) {
      currentActiveIndex.classList.remove("iob_active");
    }
    // 引数で渡されたDOMが飛び先のaタグを選択
    const newActiveIndex = document.querySelector(`a[href='#${element.id}']`);
    // activeクラスを付与
    newActiveIndex.classList.add("iob_active");
  }

}
