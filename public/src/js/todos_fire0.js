'use strict';
// Initialize Firebase: プロジェクト設定
const config = {
  apiKey: "AIzaSyD_Ybfk9vP0r9gOH9LImXdVz2aUZCgPJBo", // auth用
  // authDomain: "myfirstlp.firebaseapp.com",
  // databaseURL: "https://myfirstlp.firebaseio.com",
  projectId: "myfirstlp", // cloud firestoreのcollectionに保存
  // storageBucket: "myfirstlp.appspot.com",
  // messagingSenderId: "408425213048", // プロジェクト番号 ※流用禁止
  // appId: "1:65211879909:web:3ae38ef1cdcb2e01fe5f0c",
  // measurementId: "G-8GSGZQ44ST"
};
firebase.initializeApp(config);
const db = firebase.firestore();

// export default db;