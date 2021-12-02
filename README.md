# Todoリスト
<!-- 手書きの手帳だと、字の乱立やスペース確保のしづらさなど修正が面倒です。そこで -->
お手軽に管理できるTodoリストを作りました。

![A43CE8CA-2C4B-4145-BBC1-BDC463E53278](https://user-images.githubusercontent.com/67915047/100023253-fa20fc00-2e27-11eb-9a4f-e74bfaa29d3a.jpeg)

# description
リストの追加・削除、ストックや保存が出来ます。

# Hosting
firebaseを用いて[Webページ](https://myfirstlp.web.app)を公開しています。

# 実装機能
```
- ログイン認証（Firebase Authentication）
- 保存・削除（Cloud Firestore, LocalStrage）
- Slack通知（お問い合わせ部）
```

# 使用技術
- HTML & CSS
- JavaScript （Todoリスト, 交差監視API, ほか）
- Sass
- jQuery (ヘッダーやナビのスクロール)
- Chart.js
- React.js (お問い合わせ)
- Git, Github
- Firebase 9.23.0

# Future Tasks
- 更新機能（firestore）
- リファクタリング（Todolist）



<!-- 2020.11.08 作成 -->
<!-- 2021 -->
<!-- 11/16: リファクタ translate.js 行数減(135 -> 126) -->
<!-- 11/16: 交差監視を実装 -->
<!-- 11/16: リファクタ chart.js 行数減(30%) -->
<!-- 11/22: リファクタ READE.md（リンク実装など） -->
<!-- 11/22: リファクタ headタグ内 faviconをファイル先頭へ -->
<!-- 11/23: リファクタ quiz.js ほぼ出来上がり -->
<!-- 11/24: リファクタ 脳トレHP_体裁, LPのCSS + 画像貼付 -->
<!-- 11/28: リファクタ LPカルーセル jQuery -> JSにした -->
<!-- 12/2: push リポジトリ名修正 -->
