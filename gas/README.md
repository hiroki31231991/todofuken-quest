# 都道府県クエスト（GAS版）

教育委員会の許可の都合で GitHub Pages が使えないため、**Google Apps Script（GAS）の Webアプリ**として
公開できるようにしたものです。ゲーム本体は GitHub 版（`../index.html`）と同じで、PWA 用の
`manifest` と Service Worker だけを取り除いてあります。アイコンは HTML 内にデータ URI で埋め込み済みです。

## 構成

| ファイル | 役割 |
| --- | --- |
| `Code.gs` | `doGet()` でゲーム画面（Index.html）を返す。Googleサイト埋め込み用に `XFrameOptions = ALLOWALL` を設定 |
| `Index.html` | ゲーム本体（HTML/CSS/JS 一体）。セーブは各端末の `localStorage` に保存 |
| `appsscript.json` | タイムゾーン（Asia/Tokyo）と Webアプリの公開設定 |

## 公開設定

`appsscript.json` の `webapp` で以下を指定しています。

- `executeAs`: `USER_DEPLOYING`（実行ユーザーは「自分」＝公開した人）
- `access`: `ANYONE`（**Googleアカウントを持っている人なら誰でも**利用可能）

> 学校アカウント限定にしたい場合は `access` を `DOMAIN` に変更してください。
> ログイン不要で誰でも開けるようにする場合は `ANYONE_ANONYMOUS` にします。

## デプロイ手順（ブラウザ操作）

1. <https://script.google.com/> を開き、新しいプロジェクトを作成
2. エディタの `コード.gs` を、このフォルダの `Code.gs` の内容に置き換える
3. 「ファイル＋」→「HTML」で `Index` という名前のファイルを作り、`Index.html` の内容を貼り付ける
   （拡張子 `.html` は付けない。ファイル名は **Index** にする）
4. 左の歯車「プロジェクトの設定」→「`appsscript.json` マニフェスト ファイルをエディタで表示する」にチェック
5. 表示された `appsscript.json` を、このフォルダの内容に置き換える
6. 右上「デプロイ」→「新しいデプロイ」→種類は「ウェブアプリ」
   - 次のユーザーとして実行：**自分**
   - アクセスできるユーザー：**Googleアカウントを持つ全員**
7. デプロイすると `https://script.google.com/macros/s/.../exec` の公開 URL が発行される

## デプロイ手順（clasp / CLI）

```bash
npm i -g @google/clasp        # もしくは npx -y @google/clasp@latest
clasp login                    # Googleアカウントで認可
cd gas
clasp create --type standalone --title "都道府県クエスト（GAS版）" --rootDir .
clasp push --force             # Code.gs / Index.html / appsscript.json を同期
clasp deploy --description "都道府県クエスト GAS版"
clasp deployments              # 公開URL（/exec）を確認
```

## メモ

- セーブデータは Webアプリを開いた**端末のブラウザ**に保存されます（端末をまたいだ共有はされません）。
- 未ログイン状態で開くと Google ログイン画面に転送されます（`ANYONE` 設定のため）。
- Googleサイトに埋め込む場合は、公開 URL を「埋め込み」→「URL」で貼り付けてください。
