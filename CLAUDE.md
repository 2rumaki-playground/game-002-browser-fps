# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PvE（Player vs Environment）のブラウザFPSゲーム技術検証（PoC）。
Vite + TypeScript + Babylon.js で構築。

## Tech Stack

- **Runtime**: Browser (ES2022)
- **Language**: TypeScript (~5.9)
- **Build**: Vite 7
- **3D Engine**: Babylon.js 7
- **Package Manager**: pnpm 10
- **Linter/Formatter**: Biome (tab indent, double quotes)
- **Test**: Vitest (unit), Playwright (e2e)

## Commands

- `pnpm dev` — 開発サーバー起動（port 3000）
- `pnpm build` — tsc + vite build
- `pnpm test:run` — ユニットテスト実行
- `pnpm test:e2e` — E2Eテスト実行
- `pnpm lint` — Biome lint
- `pnpm format` — Biome format

## Architecture

```
src/
  main.ts          — エントリーポイント
  fps/
    createGame.ts  — シーン構築・メインループ
    input.ts       — キーボード入力管理
    shooting.ts    — Raycast射撃システム
    enemy.ts       — 敵AI（追跡・攻撃）
    hud.ts         — クロスヘア・HP・キルカウンター
e2e/
  smoke.test.ts    — ブラウザ起動確認
```

## Conventions

- game-001-dungeon-cards と同じ構成規約に従う
- Biome: タブインデント、ダブルクォート
- TypeScript strict mode
- CI: PR時に lint + test + build + e2e
