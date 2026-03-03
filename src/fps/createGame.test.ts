import { describe, expect, it } from "vitest";
import {
	CAMERA_ELLIPSOID_XZ,
	CAMERA_START_X,
	CAMERA_START_Z,
	ENEMY_DIFFUSE_COLOR,
	GROUND_COLOR,
	LIGHT_INTENSITY,
	PILLAR_COLOR,
	PILLAR_DIAMETER,
	PILLAR_XZ,
	WALL_COLOR,
} from "./layout.ts";

/** 知覚輝度を計算する（ITU-R BT.601） */
function perceivedBrightness(r: number, g: number, b: number): number {
	return 0.299 * r + 0.587 * g + 0.114 * b;
}

describe("scene layout", () => {
	it("カメラの初期位置が全ての柱の衝突範囲外にある", () => {
		const pillarRadius = PILLAR_DIAMETER / 2;
		const minClearance = CAMERA_ELLIPSOID_XZ + pillarRadius;

		for (const [px, pz] of PILLAR_XZ) {
			const dist = Math.hypot(CAMERA_START_X - px, CAMERA_START_Z - pz);
			expect(
				dist,
				`カメラ(${CAMERA_START_X},${CAMERA_START_Z})と柱(${px},${pz})の距離${dist.toFixed(2)}が最小距離${minClearance}未満`,
			).toBeGreaterThan(minClearance);
		}
	});
});

describe("scene brightness", () => {
	const MIN_BRIGHTNESS = 0.25;

	it.each([
		["地面", GROUND_COLOR],
		["壁", WALL_COLOR],
		["柱", PILLAR_COLOR],
		["敵", ENEMY_DIFFUSE_COLOR],
	] as const)("%sのマテリアルが視認可能な明るさである", (label, [r, g, b]) => {
		const brightness = perceivedBrightness(r, g, b) * LIGHT_INTENSITY;
		expect(
			brightness,
			`${label}の知覚輝度${brightness.toFixed(3)}が最小値${MIN_BRIGHTNESS}未満`,
		).toBeGreaterThanOrEqual(MIN_BRIGHTNESS);
	});
});
