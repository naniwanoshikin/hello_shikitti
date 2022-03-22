'use strict'; // 英語 ⇄ 日本語 切り替え

{
  // ボタン
  const e_btn = document.getElementById('english');
  const j_btn = document.getElementById('japanese');

  // 英訳
  class Toenglish {
    constructor(id, word) {
      this.id = id;
      this.word = word; // 用語
      this.i = 0; // 色の変化回数
    }
    translate() { // 英訳
      document.getElementById(this.id).textContent = this.word;
    }
    addTitle() { // titleもつける
      document.getElementById(this.id).title = `id="${this.id}"`;
      this.translate() // カプセル化
    }
    headerColorTo(color) { // 引数: 色
      document.getElementById(this.id).style.color = color;
    }
    toggleTag(className) { // 挙動
      document.getElementById(this.id).classList.toggle(className);
      const Id = setTimeout(() => {
        this.toggleTag(className);
      }, 500);
      this.i++;
      if (this.i === 6) {
        clearTimeout(Id); // カウント終了
        this.i = 0;
      }
    }
    static blinking(instance) { // <h1> 点滅（インスタンス名）
      [
        6, // 自己紹介
        7, // 作品
        8, // 地域紹介
        9, // お問い合わせ
      ].forEach(e => {
        setTimeout(() => {
          instance[e].toggleTag('tgcolor');
        }, 300);
      });
    }
    static switch() { // ボタン表記切替
      e_btn.classList.toggle('hidden');
      j_btn.classList.toggle('hidden');
    }
    static debug(txt) { // その他
      console.log(txt);
    }
  }

  // 日本語訳
  class Tojapanese extends Toenglish {
  }


  // 実行
  e_btn.addEventListener('click', () => {
    for (let i = 0; i < englishWords.length; i++) {
      englishWords[i].addTitle(); // 英訳 + titleつける
    }
    englishWords[0].headerColorTo('yellowgreen'); // header
    Toenglish.blinking(englishWords);
    Toenglish.switch();
    // Toenglish.debug('英訳'); // 英訳
  });

  j_btn.addEventListener('click', () => {
    for (let i = 0; i < japaneseWords.length; i++) {
      japaneseWords[i].addTitle();
    }
    japaneseWords[0].headerColorTo('DarkOrange');
    Tojapanese.blinking(japaneseWords);
    Tojapanese.switch();
  });


  // (id, 英語, 日本語)
  const words = [
    ['shiki', 'SHIKITTI WORLD', 'しきっちワールド'], // 0 header
    ['nav1', 'ABOUT', '自己紹介'], // 1
    ['nav2', 'WORK', '作品'], // 2
    ['nav3', 'TOWN', '第二の故郷'], // 3
    ['nav4', 'CONTACT', 'お問い合わせ'], // 4
    ['world', 'This is my world!', 'Hello World'], // 見出し
    ['about', 'ABOUT', '自己紹介'], // 6
    ['work', 'WORK', '作品'], // 7
    ['town', 'THE TOWN', '第二の故郷'], // 8
    ['contact', 'CONTACT', 'お問い合わせ'], // 9
    ['dsc1', 'Let me introduce myself.', '自己紹介します'], // 10
    ['dsc2', 'Click the photo to jump to the link.', 'ワーク'], //11
    ['dsc3', 'Remain in my memory world.', '私の記憶の中の田舎'], // 12
    ['dsc4', 'Contact me if anething!', 'ご連絡ください'], // 13
    ['profile', 'PROFILE', 'プロフィール'], // 14
    ['hobby', 'HOBBY', '趣味'], // 15
    ['skill', 'SKILL', 'スキル'], // 16
    ['cafe', 'Cafe', 'カフェ'], // 17 <a>
    ['tet', 'Tetris', 'テトリス'], // 18 <a>
    ['logic', 'Diagnose', '診断チェック'], // 19 <a>
  ];

  const englishWords = [];
  const japaneseWords = [];
  for (let i = 0; i < words.length; i++) {
    // インスタンス生成
    const eng = new Toenglish();
    const jpn = new Tojapanese();
    // 英訳用
    eng.id = words[i][0];
    eng.word = words[i][1];
    englishWords[i] = eng;
    // 日本語訳用
    jpn.id = words[i][0];
    jpn.word = words[i][2];
    japaneseWords[i] = jpn;
    // console.log(eng); // 各オブジェクト
  }

}
