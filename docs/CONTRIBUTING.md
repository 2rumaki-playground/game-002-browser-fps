# 開発ガイド

## 技術スタック

| 項目               | 技術                          |
| ------------------ | ----------------------------- |
| Language           | TypeScript ~5.9               |
| Build              | Vite 7                        |
| 3D Engine          | Babylon.js 7                  |
| Package Manager    | pnpm 10                       |
| Linter / Formatter | Biome (tab indent, `"` quote) |
| Unit Test          | Vitest                        |
| E2E Test           | Playwright                    |
| Dev Tool管理       | mise                          |

## セットアップ

```bash
mise install        # Node.js / pnpm をインストール
pnpm install        # 依存パッケージをインストール
```

## 開発コマンド

| コマンド             | 説明                         |
| -------------------- | ---------------------------- |
| `pnpm dev`           | 開発サーバー起動（port 3000）|
| `pnpm build`         | tsc + vite build             |
| `pnpm preview`       | ビルド結果のプレビュー       |
| `pnpm lint`          | Biome lint                   |
| `pnpm format`        | Biome format                 |
| `pnpm test:run`      | ユニットテスト実行           |
| `pnpm test:coverage` | カバレッジ付きテスト         |
| `pnpm test:e2e`      | E2Eテスト実行                |

## CI/CD

| ワークフロー | トリガー | 内容                          |
| ------------ | -------- | ----------------------------- |
| CI           | PR       | lint + test + build + e2e     |

## Claude Code カスタムコマンド

| コマンド                       | 説明                            |
| ------------------------------ | ------------------------------- |
| `/pr:create-from-issue`        | Issue対応ブランチ・PR作成       |
| `/pr:create-from-local`        | 現在の作業をcommit・push・PR作成|
| `/pr:resolve-review-comments`  | PRレビューコメント解決          |
| `/issue:create`                | Issue作成                       |
| `/issue:create-refactor`       | リファクタリング課題の調査・起票|

## ディレクトリ構成

```
src/
  main.ts              — エントリーポイント
  fps/
    createGame.ts       — シーン構築・メインループ
    input.ts            — キーボード入力管理
    shooting.ts         — Raycast射撃システム
    enemy.ts            — 敵AI（追跡・攻撃）
    hud.ts              — クロスヘア・HP・キルカウンター
e2e/
  smoke.test.ts         — ブラウザ起動確認
docs/
  CONTRIBUTING.md       — 本ファイル
  spec/                 — 仕様書
```
