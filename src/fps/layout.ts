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

/** RGB色定数 [r, g, b] / RGBA色定数 [r, g, b, a] */
export const GROUND_COLOR: readonly [number, number, number] = [
	0.45, 0.5, 0.55,
];
export const GROUND_EMISSIVE_COLOR: readonly [number, number, number] = [
	0.08, 0.08, 0.1,
];
export const WALL_COLOR: readonly [number, number, number] = [0.55, 0.55, 0.6];
export const WALL_EMISSIVE_COLOR: readonly [number, number, number] = [
	0.1, 0.1, 0.12,
];
export const PILLAR_COLOR: readonly [number, number, number] = [0.6, 0.55, 0.5];
export const PILLAR_EMISSIVE_COLOR: readonly [number, number, number] = [
	0.1, 0.09, 0.08,
];
export const ENEMY_DIFFUSE_COLOR: readonly [number, number, number] = [
	0.9, 0.25, 0.28,
];
export const ENEMY_EMISSIVE_COLOR: readonly [number, number, number] = [
	0.35, 0.08, 0.08,
];
export const LIGHT_INTENSITY = 1.5;
export const LIGHT_GROUND_COLOR: readonly [number, number, number] = [
	0.4, 0.4, 0.45,
];
export const CLEAR_COLOR: readonly [number, number, number, number] = [
	0.1, 0.1, 0.15, 1,
];
