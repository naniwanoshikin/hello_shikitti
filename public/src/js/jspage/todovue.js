(function() {
  'use strict'; // two way data binding: dataとUIを結びつける
  // data
  // UIに結びつくモデルをView Modelという
  let vm = new Vue({
    el: '#root0', // このelementと結びつける
    data: {
      name: 'Vue Todos', // key: 値

      newItem: '', // 入力欄
      todos: [
        { // タイトルと完了状態✔︎
          title: 'task1',
          isDone: false,
        },
      ]
       },
    // watch: {
    //   todos: {
    //     handler: function() {
    //       localStorage.setItem('todos', JSON.stringify(this.todos));
    //     },
    //     // deep: true // checkboxに✔︎入れた時
    //   },
    // },
    // mounted: function() { // マウントされる時、
    //   this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    // },
    methods: { // 動作：各メソッドを入れる
      addItem: function() { // li要素を追加した際、
        let item = {
          title: this.newItem,
          isDone: false,
        };
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function(index) { // li要素を削除した際、
        if (confirm('are you sure?')) {
          this.todos.splice(index, 1);
        }
      },
      purge: function() { // purge押した際、
        if (!confirm('delete finished?')) {
          return;
        }
        this.todos = this.remaining;
      },
    },
    computed: { // 算出プロパティ
      remaining: function() {
        return this.todos.filter(function(todo) {
          return !todo.isDone; // まだ終わってないタスク
        });
      }
    }
  });



})();