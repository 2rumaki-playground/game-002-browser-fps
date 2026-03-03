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
