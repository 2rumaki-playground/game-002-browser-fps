# 仕様書インデックス

ブラウザFPS（PvE）の仕様書群。

## 読む順序

1. [vision.md](./vision.md) — ゲームビジョン・コアコンセプト
2. [gdd.md](./gdd.md) — ゲームデザインドキュメント（体験目標・設計方針）
3. [rules.md](./rules.md) — コアゲームルール
4. [weapons.md](./weapons.md) — 武器仕様
5. [enemies.md](./enemies.md) — 敵タイプ仕様
6. [map.md](./map.md) — マップ仕様
7. [constants.md](./constants.md) — 全数値定数（Single Source of Truth）
8. [glossary.md](./glossary.md) — 用語集
9. [balance-sheet.md](./balance-sheet.md) — パラメータ関連・調整チェックリスト

## 数値定数の管理ルール

**すべての数値パラメータは [constants.md](./constants.md) を Single Source of Truth とする。**

他の仕様書では `[constants.md](./constants.md)` へリンクし、値を直接記載しない。

## 現在のスコープ

PoC（技術検証）フェーズ。以下を検証中：

- Babylon.js によるFPSカメラ・移動
- Raycast射撃
- 敵AIの追跡・近接攻撃
- HUD（クロスヘア・HP・キルカウンター）

## 技術スタック

| 項目      | 技術             |
| --------- | ---------------- |
| Runtime   | Browser (ES2022) |
| Language  | TypeScript ~5.9  |
| Build     | Vite 7           |
| 3D Engine | Babylon.js 7     |
