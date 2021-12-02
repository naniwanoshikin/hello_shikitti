'use strict'; // テトリス

// １ テトロミノ
// ２ 端
// ３ フィールド
// ４ 当たり判定
// ５ 回転
// ６ 落とす処理
// ７ ブロックの形いろいろ

{
  // フィールドサイズ
  const field_col = 10; // 横10ブロック
  const field_row = 20; // 縦20ブロック
  const block = 30; // ブロックサイズ（ピクセル）
  // スクリーンサイズ
  const screen_w = block * field_col;
  const screen_h = block * field_row;

  // 呼び出し
  let can = document.getElementById('can');
  let con = can.getContext('2d');
  // プロパティ
  can.width = screen_w;
  can.height = screen_h;
  can.style.border = "2px solid #333";
  // ブロックカラー
  const colors = [
    '#6CF',
    '#F92',
    '#66F',
    '#C5C',
    '#FD2',
    '#F44',
    '#5B5',
  ];

  // テトロミノ（初期）
  const tetrosize = 4; // 配列 4✖︎4
  const tetros = [ // 3次元配列
    [ // I
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [ // L
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [  // J
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [ // T
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [ // O
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [ // Z
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [ // S
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ];
  // テトロ番号
  let num;
  num = Math.floor(Math.random() * tetros.length); // ランダムに選択
  // テトロ本体（２次元ブロック）
  let tetro;
  tetro = tetros[num];

  // 元の位置
  const startx = field_col / 2 - tetrosize / 2;
  const starty = 0;
  let tetrox = startx;
  let tetroy = starty;

  // フィールド（初期）
  let field = []; // 1次配列
  // フィールド配列 10✖︎20
  function init() {
    for (let y = 0; y < field_row; y++) {
      field[y] = []; // 1次元を作ってから、
      for (let x = 0; x < field_col; x++) {
        field[y][x] = 0; // 2次配列により200コの0を作った。
      }
    }
    field[10][5] = 1;
    field[19][0] = 1;
    field[19][9] = 1;
  }

  // ゲームオーバーフラグ
  let over = false;

  // 初期表示状態
  init(); // フィールド配列
  drawAll(); // フィールドとテトロミノ

  // 落ちるスピード
  const speed = 500;
  setInterval(dropTetro, speed);


  // ブロック描画（フィールドとテトロミノ）
  function drawBlock(x, y, c) {
    let px = x * block;
    let py = y * block;
    con.fillStyle = colors[c];
    con.fillRect(px, py, block, block);
    con.strokeStyle = 'black';
    con.strokeRect(px, py, block, block);
  }

  function drawAll() {
    // キャンバス全体削除
    con.clearRect(0, 0, screen_w, screen_h);
    // フィールドの作成（こちらが先）
    for (let y = 0; y < field_row; y++) {
      for (let x = 0; x < field_col; x++) {
        if (field[y][x]) { // y, x方向が１の時にブロックを表示します
          drawBlock(x, y, field[y][x]); // ブロック描画
        }
      }
    }
    // テトロミノの作成（こちらが後）
    for (let y = 0; y < tetrosize; y++) {
      for (let x = 0; x < tetrosize; x++) {
        if (tetro[y][x]) { // y, x方向が１の時にブロックを表示します
          drawBlock(tetrox + x, tetroy + y, num); // ブロック描画
        }
      }
    }
    if (over) {
      let s = "GAME OVER";
      let w = con.measureText(s).width;
      let x = screen_w / 2 - w / 2;
      let y = screen_h / 2 - 20;
      con.font = "40px 'MS ゴシック'";
      con.lineWidth = 4;
      con.strokeText(s, x, y);
      con.fillStyle = "white";
      con.fillText(s, x, y);
    }
  }

  // ブロックの当たり判定（４✖︎４の範囲にブロックがあるかどうか調べる）
  function checkMove(mx, my, ntetro) { // 移動？？？？？ここよくわからない。。
    if (ntetro == undefined) ntetro = tetro; // 「ntetroを入れていたら、見ます」
    for (let y = 0; y < tetrosize; y++) {
      for (let x = 0; x < tetrosize; x++) {
        if (ntetro[y][x]) { // 自分のブロックがあるところに
          // 新しい座標
          let ny = tetroy + my + y;
          let nx = tetrox + mx + x;
          if (ny < 0 || nx < 0 || ny >= field_row || nx >= field_col || // 先に範囲をチェック
            field[ny][nx]) {  // その後、フィールド上にあるブロック
            return; // 動けません
          }
        }
      }
    }
    return true; // 動けます
  }

  // 下まで落ちたら固定
  function fixTetro() {
    for (let y = 0; y < tetrosize; y++) {
      for (let x = 0; x < tetrosize; x++) {
        if (tetro[y][x]) { // 各テトロが、
          field[tetroy + y][tetrox + x] = num; // ブロックを置く
        }
      }
    }
  }
  // ラインが揃ったら消す
  function checkLine() {
    let linec = 0;
    for (let y = 0; y < field_row; y++) {
      let flag = true; // 全部入っていたら、
      for (let x = 0; x < field_col; x++) {
        if (!field[y][x]) { // 0があったら、
          flag = false;
          break;
        }
      }
      if (flag) { // ラインを消す処理
        linec++;
        for (let ny = y; ny > 0; ny--) { // 現在のところから、一番上まで １引く
          for (let nx = 0; nx < field_col; nx++) {
            field[ny][nx] = field[ny - 1][nx]; // 消す
          }
        }
      }
    }
  }

  // ブロックが勝手に落ちる
  function dropTetro() {
    if (checkMove(0, 1)) tetroy++;
    else { // 下に行けないならば、
      fixTetro(); // 固定しましょう
      checkLine(); // １列そろった時の処理
      // 再度ランダム操作
      num = Math.floor(Math.random() * tetros.length); // ランダムに選択
      tetro = tetros[num];
      // 元の位置に戻す処理
      tetrox = startx;
      tetroy = starty;

      if (!checkMove(0, 0)) { // 動けなかったら、
        over = true;
      }
    }
    drawAll(); // フィールド＋テトロの表示
  }

  // テトロの回転
  function rotate() {
    let ntetro = [];
    for (let y = 0; y < tetrosize; y++) {
      ntetro[y] = []; // 1次元を作ってから、
      for (let x = 0; x < tetrosize; x++) {
        ntetro[y][x] = tetro[tetrosize - 1 - x][y]; // 2次元を作る
      }
    }
    return ntetro; // 返す
  }

  // キーボードが押されたとき
  document.onkeydown = function (e) {
    switch (e.keyCode) { // keycode 検索
      case 37: // 左
        if (checkMove(-1, 0)) tetrox--;
        break;
      case 38: // 上
        // if(checkMove(0, -1)) tetroy--;
        break;
      case 39: // 右
        if (checkMove(1, 0)) tetrox++;
        break;
      case 40: // 下
        if (checkMove(0, 1)) tetroy++;
        break;
      case 32: // スペース
        let ntetro = rotate(); // ntetroを定義
        if (checkMove(0, 0, ntetro)) { // 回転して動けるならば、
          tetro = ntetro // 回転後の値をtetroに代入
        }
        break;
    }
    // 移動後の表示
    drawAll();
  }
}
