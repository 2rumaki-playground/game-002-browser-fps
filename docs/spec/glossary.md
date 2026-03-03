# 用語集

## FPSカメラ

一人称視点カメラ。Babylon.js の `FreeCamera` で実装。WASD移動とマウスによる視点操作を提供する。

→ [rules.md](./rules.md)

## ポインターロック

ブラウザの Pointer Lock API を使用してマウスカーソルを画面に固定する機能。ロック中のみゲーム操作を受け付ける。

→ [rules.md](./rules.md)

## Raycast

カメラ位置から前方に直線を飛ばし、衝突判定を行う手法。射撃のヒット判定に使用。

→ [weapons.md](./weapons.md)

## クールダウン

射撃後に次の射撃が可能になるまでの待機時間。

→ [weapons.md](./weapons.md), [constants.md](./constants.md)

## isShootable

メッシュの `metadata` に設定されるフラグ。`true` の場合、射撃のRaycastによるヒット対象となる。

→ [weapons.md](./weapons.md)

## DPS（Damage Per Second）

毎秒ダメージ。敵の近接攻撃はDPSとして適用される（フレームごとに `DPS × deltaTime` を減算）。

→ [enemies.md](./enemies.md), [constants.md](./constants.md)

## HUD（Heads-Up Display）

ゲーム画面上に重ねて表示されるUI要素。クロスヘア、HP、キルカウンター、ダメージフラッシュを含む。

→ [rules.md](./rules.md)

## クロスヘア

画面中央に表示される照準マーカー。ヒット時に拡大するフィードバックあり。

→ [rules.md](./rules.md)

## 衝突判定（Collision）

Babylon.js のビルトイン衝突システム。プレイヤーが壁・柱・地面をすり抜けないようにする。

→ [map.md](./map.md)

## アリーナ

現在の唯一のマップ。壁で囲まれた正方形の空間に柱が配置されている。

→ [map.md](./map.md)

## スポーン

敵またはプレイヤーがゲーム世界に出現すること。現在は固定位置に配置。

→ [enemies.md](./enemies.md), [constants.md](./constants.md)
