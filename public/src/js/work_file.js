'use strict'; // 特徴部
{
  const uploadImageModule = (() => {
    const input = document.getElementById('image')
    const preview = document.getElementById('image-preview')

    input.addEventListener("change", e => {
      e.preventDefault();
      e.stopPropagation();    // イベントのバブリングを防ぐ

      // type="file"を指定されたinput要素のchangeイベントは「ファイルのリスト」を返す
      const file = e.target.files[0];

      // ファイルが存在しないか、"image/*"形式ではない
      if (!file || !file.type.match(/image\/*/)) {
        alert('画像ファイルではありません。')
        return false;
      }

      // インスタンス生成（ローカルファイルを読み込むオブジェクト）
      const reader = new FileReader();

      // FileReaderの読み込みが完了した結果（アップロードした画像ファイルのデータ）を、img要素のsrcにセット
      reader.addEventListener('load', e => {
        // e.target.result: base64エンコードされた画像データ
        preview.setAttribute('src', e.target.result);
      })

      // セットされたオブジェクトを読み込む
      reader.readAsDataURL(file);
    });
  })();
}
