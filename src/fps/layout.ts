/** シーンレイアウト定数（createGame / テストで共有） */

export const CAMERA_START_X = 0;
export const CAMERA_START_Z = -10;
export const CAMERA_ELLIPSOID_XZ = 0.4;

export const PILLAR_DIAMETER = 1.8;

/** 柱の (x, z) 座標一覧 */
export const PILLAR_XZ: readonly (readonly [number, number])[] = [
	[-5, -5],
	[5, -5],
	[-5, 5],
	[5, 5],
	[0, -8],
	[0, 8],
];

/** RGB色定数 [r, g, b] */
export const GROUND_COLOR: readonly [number, number, number] = [0.3, 0.35, 0.4];
export const WALL_COLOR: readonly [number, number, number] = [0.4, 0.4, 0.45];
export const PILLAR_COLOR: readonly [number, number, number] = [
	0.45, 0.4, 0.35,
];
export const ENEMY_DIFFUSE_COLOR: readonly [number, number, number] = [
	0.8, 0.2, 0.22,
];
export const ENEMY_EMISSIVE_COLOR: readonly [number, number, number] = [
	0.25, 0.05, 0.05,
];
export const LIGHT_INTENSITY = 1.2;
export const CLEAR_COLOR: readonly [number, number, number, number] = [
	0.08, 0.08, 0.12, 1,
];
