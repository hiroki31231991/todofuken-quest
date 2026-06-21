/**
 * 都道府県クエスト（GAS版）
 * Webアプリとして公開し、ゲーム画面（Index.html）を返す。
 * Googleサイトへの埋め込みを許可するため XFrameOptions を ALLOWALL に設定。
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('都道府県クエスト ～47の宝をさがす旅～')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
