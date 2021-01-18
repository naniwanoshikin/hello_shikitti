(function() {
  'use strict';

  let likeComponent = Vue.extend({ // コンポーネント
    props: {
      message: { // カスタム属性
        type: String,
        default: 'Like',
      }
    },
    data: function() { // Componentのデータは関数で書かないといけない
      return {
        count: 0, // 初期値
      }
    },
    template: '<button @click="countUp">{{ message }} {{ count }}</button> ', // templeteに要素は１つのみ
    methods: {
      countUp: function() { // いいねボタンを押した際、
        this.count++;
        this.$emit('increment'); // カスタムイベント
      },
    },
  });

  let vm = new Vue({ // totalはこちらで保持する
    el: '#root0',
    components: {
      'like-component': likeComponent
    },
    data: {
      total: 0,
    },
    methods: { // コンポーネントより発火されると、
      incrementTotal: function() {
        this.total++;
      }
    },
  });

})();