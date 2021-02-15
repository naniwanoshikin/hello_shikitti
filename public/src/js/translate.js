'use strict'; {

  // 英訳クラス
  class Toenglish {
    constructor(id, word) {
      this.id = id;
      this.word = word; // 英語
      this.i = 0; // 色の変化回数
    }
    translate() { // 英訳
      document.getElementById(this.id).textContent = this.word;
    }
    translateNeo() {
      document.getElementById(this.id).title = `id="${this.id}"`; // title属性
      this.translate() // カプセル化
    }
    reColor(thecolor) { // 色を変える
      document.getElementById(this.id).style.color = thecolor;
    }
    toggleTag(className) { // 挙動
      document.getElementById(this.id).classList.toggle(className);
      const Id = setTimeout(() => {
        this.toggleTag(className);
      }, 500);
      this.i++; // iプロパティ
      if (this.i === 6) {
        clearTimeout(Id); // カウント終了
        this.i = 0;
      }
    }
    static syutu() { // <button>表示切り替え 英語⇄日本語
      document.getElementById('english').classList.toggle('hidden');
      document.getElementById('japanese').classList.toggle('hidden');
    }
    static data(comment) { // デバック
      console.log(comment);
    }
  }

  // インスタンス(id, 英語)
  const englishwords = [
    new Toenglish('shikitti', 'SHIKITTI WORLD'), // 0 header <h1>
    new Toenglish('nav1', 'ABOUT'), // 1 <nav>
    new Toenglish('nav2', 'WORK'), // 2 <nav>
    new Toenglish('nav3', 'TOWN'), // 3 <nav>
    new Toenglish('nav4', 'CONTACT'), // 4 <nav>
    new Toenglish('world', 'Welcome to my Portfolio!'), // 5 見出し
    new Toenglish('about', 'ABOUT'), // 6 自己紹介
    new Toenglish('myself', 'Let me introduce myself.'), // 7 <p>
    new Toenglish('profile', 'PROFILE'), // 8 プロフィール
    new Toenglish('hobby', 'HOBBY'), // 9 趣味
    new Toenglish('skill', 'SKILL'), // 10 スキル
    new Toenglish('feat', 'WORK'), // 11 特徴
    new Toenglish('see1', 'Press these images to jump to the link destination.'), // 12 <p>
    new Toenglish('cafe', 'Cafe'), // 13 <a>
    new Toenglish('tet', 'Tetris'), // 14 <a>
    new Toenglish('logic', 'Logics'), // 15 <a>
    new Toenglish('town', 'THE TOWN'), // 16 地域紹介
    new Toenglish('see2', 'Please click below.'), // 17 <p>
    new Toenglish('contact', 'CONTACT'), // 18 お問い合わせ
    new Toenglish('free', 'Please feel free to contact us!'), // 19 <p>
  ];

  // 実行
  document.getElementById('english').addEventListener('click', () => {
    // 英語 + title機能
    for (let i = 0; i < englishwords.length; i++) {
      englishwords[i].translateNeo();
    }
    // header色
    englishwords[0].reColor('yellowgreen');
    // 色つけ外し cover h1など
    const lists = [5, 6, 11, 16, 18];
    lists.forEach(e => {
      setTimeout(() => {
        englishwords[e].toggleTag('tgcolor');
      }, 300);
    });
    // Toenglish.data('英語版です');
    Toenglish.syutu();
  });


  // 日本語訳クラス
  class Tojapanese extends Toenglish {
  }
  const japanesewords = [ // id, 英語
    new Tojapanese('shikitti', 'しきっちワールド'), // 0 header <h1>
    new Tojapanese('nav1', '自己紹介'), // 1 <nav>
    new Tojapanese('nav2', '特徴'), // 2 <nav>
    new Tojapanese('nav3', '地域紹介'), // 3 <nav>
    new Tojapanese('nav4', 'お問い合わせ'), // 4 <nav>
    new Tojapanese('world', 'Hello World'), // 5 見出し
    new Tojapanese('about', '自己紹介'), // 6 自己紹介
    new Tojapanese('myself', '自己紹介をします'), // 7 <p>
    new Tojapanese('profile', 'プロフィール'), // 8 プロフィール
    new Tojapanese('hobby', '趣味'), // 9 趣味
    new Tojapanese('skill', 'スキル'), // 10 スキル
    new Tojapanese('feat', '特徴'), // 11 特徴
    new Tojapanese('see1', '観てください'), // 12 <p>
    new Tojapanese('cafe', 'カフェ'), // 13 <a>
    new Tojapanese('chat', 'お話'), // 14 <a>
    new Tojapanese('trash', 'JSです'), // 15 <a>
    new Tojapanese('town', '地域'), // 16 地域紹介
    new Tojapanese('see2', '下をご覧ください'), // 17 <p>
    new Tojapanese('contact', 'お問い合わせ'), // 18 お問い合わせ
    new Tojapanese('free', 'ご覧ください'), // 19 <p>
  ];

  document.getElementById('japanese').addEventListener('click', () => {
    // 日本語 + title機能
    for (let i = 0; i < japanesewords.length; i++) {
      japanesewords[i].translateNeo();
    }
    // header色
    japanesewords[0].reColor('DarkOrange');
    // 色つけ外し
    const lists = [5, 6, 11, 16, 18];
    lists.forEach(e => {
      setTimeout(() => {
        japanesewords[e].toggleTag('tgcolor');
      }, 300);
    });
    // Tojapanese.data('日本語版です');
    Tojapanese.syutu();
  });
}
