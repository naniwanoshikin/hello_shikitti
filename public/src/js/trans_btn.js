'use strict'; // 英語 ⇄ 日本語

{
  // 切替ボタン
  const e_btn = document.getElementById('e_btn');
  const j_btn = document.getElementById('j_btn');

  // 切替
  class Toenglish {
    constructor(id, word) {
      this.id = id;
      this.word = word; // 用語
      this.i = 0; // 色の変化回数
    }
    // 英訳
    setTranslate() {
      // 文字
      let target_letter = document.getElementById(this.id);
      // 書き換え
      target_letter.textContent = this.word;
      // titleつける
      target_letter.title = `id="${this.id}"`;
      // ふわっと表示
      target_letter.classList.add('fade_in');
      function fadeIn() {
        target_letter.classList.remove('fade_in');
      }
      setTimeout(fadeIn, 500); // 1s後にクラスを除去
    }

    /**
     * 繰り返し挙動
     * @param className // クラス名
     */
    toggleTag(className) {
      document.getElementById(this.id).classList.toggle(className);
      const Id = setTimeout(() => {
        this.toggleTag(className);
      }, 500); // 秒数
      this.i++;
      // 繰り返し回数
      if (this.i === 6) {
        clearTimeout(Id); // カウント終了
        this.i = 0;
      }
    }
    /**
     * <h1> 点滅
     * @param instance // インスタンス名
     */
    static blinking(instance) {
      [
        5,
        6, // 自己紹介
        7, // コンテンツ
        8, // 地域紹介
        9, // お問い合わせ
      ].forEach(e => {
        setTimeout(() => {
          instance[e].toggleTag('blinking');
        }, 300);
      });
    }
    // ボタン表記切替
    static switch() {
      e_btn.classList.toggle('hidden');
      j_btn.classList.toggle('hidden');
    }
  }

  // 日本語訳
  class Tojapanese extends Toenglish {
  }

  // FV_背景画像
  const mainVisual = document.querySelector('.first_view');

  // 実行
  e_btn.addEventListener('click', () => {
    for (let i = 0; i < e_words.length; i++) {
      e_words[i].setTranslate();
    }
    Toenglish.switch();
    Toenglish.blinking(e_words);

    // スマホメニュー開くと詰まる為下げた
    document.getElementById('shiki').style.fontSize = '16px';

    // 画像切替
    mainVisual.style.backgroundImage = 'url(src/img/aich1.JPG)';
  });

  j_btn.addEventListener('click', () => {
    for (let i = 0; i < j_words.length; i++) {
      j_words[i].setTranslate();
    }
    Tojapanese.switch();
    Tojapanese.blinking(j_words);
    document.getElementById('shiki').style.fontSize = '18px';
    mainVisual.style.backgroundImage = 'url(src/img/aich0.JPG)';
  });


  // (id, 英語, 日本語)
  const words = [
    ['shiki', 'SHIKITANI WORLD', 'しきっちワールド'], // 0
    ['nav1', 'ABOUT', '自己紹介'], // 1
    ['nav2', 'WORK', '作品'], // 2
    ['nav3', 'TOWN', '第二の故郷'], // 3
    ['nav4', 'CONTACT', 'お問い合わせ'], // 4
    ['hello_world', 'This is my world', 'Hello World'], // FV
    ['h1_about', 'ABOUT', '自己紹介'], // 6
    ['h1_work', 'WORKs', '私の作品集'], // 7
    ['h1_town', 'THE TOWN', '第二の故郷'], // 8
    ['h1_contact', 'CONTACT', 'お問い合わせ'], // 9
    ['dsc1', 'Let me introduce myself.', '自己紹介します'], // 10
    ['dsc2', 'Click the photo to jump to the link.', 'ちょくちょく更新します'], // 11
    ['dsc3', 'Remain in my memory world.', '私の記憶の中の田舎'], // 12
    ['dsc4', 'Contact me if anething!', 'ご連絡ください'], // 13
    ['profile', 'PROFILE', 'プロフィール'], // 14
    ['hobby', 'HOBBY', '趣味'], // 15
    ['skill', 'SKILL', 'スキル'], // 16
    ['back_world', 'Back World', '裏の世界'], // 17 <a>
    ['todo', 'Todo', 'todoリスト'], // 18 <a>
    ['tet', 'Tetris', 'テトリス'], // 18 <a>
    ['logic', 'Diagnose', '診断チェック'], // 19 <a>
  ];

  const e_words = [];
  const j_words = [];
  for (let i = 0; i < words.length; i++) {
    // インスタンス生成
    const eng = new Toenglish();
    const jpn = new Tojapanese();
    // 英訳用
    eng.id = words[i][0];
    eng.word = words[i][1];
    e_words[i] = eng;
    // 日本語訳用
    jpn.id = words[i][0];
    jpn.word = words[i][2];
    j_words[i] = jpn;
    // console.log(eng); // 各オブジェクト
  }

}
