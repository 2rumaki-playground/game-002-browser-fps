import { describe, expect, it } from "vitest";
import {
	CAMERA_ELLIPSOID_XZ,
	CAMERA_START_X,
	CAMERA_START_Z,
	ENEMY_DIFFUSE_COLOR,
	ENEMY_EMISSIVE_COLOR,
	GROUND_COLOR,
	GROUND_EMISSIVE_COLOR,
	LIGHT_GROUND_COLOR,
	LIGHT_INTENSITY,
	PILLAR_COLOR,
	PILLAR_DIAMETER,
	PILLAR_EMISSIVE_COLOR,
	PILLAR_XZ,
	WALL_COLOR,
	WALL_EMISSIVE_COLOR,
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
	const MIN_BRIGHTNESS = 0.35;

	/**
	 * HemisphericLight では横向き面は groundColor 側で照らされる。
	 * 最悪ケース（面がライトと直交）での見え方 =
	 *   diffuse * groundColor * intensity + emissive
	 */
	it.each([
		["地面", GROUND_COLOR, GROUND_EMISSIVE_COLOR],
		["壁", WALL_COLOR, WALL_EMISSIVE_COLOR],
		["柱", PILLAR_COLOR, PILLAR_EMISSIVE_COLOR],
		["敵", ENEMY_DIFFUSE_COLOR, ENEMY_EMISSIVE_COLOR],
	] as const)("%sのマテリアルが視認可能な明るさである", (label, [dr, dg, db], [
		er,
		eg,
		eb,
	]) => {
		// groundColor 側のみで照らされた場合の最低輝度
		const litR = dr * LIGHT_GROUND_COLOR[0] * LIGHT_INTENSITY + er;
		const litG = dg * LIGHT_GROUND_COLOR[1] * LIGHT_INTENSITY + eg;
		const litB = db * LIGHT_GROUND_COLOR[2] * LIGHT_INTENSITY + eb;
		const brightness = perceivedBrightness(litR, litG, litB);
		expect(
			brightness,
			`${label}の最低知覚輝度${brightness.toFixed(3)}が閾値${MIN_BRIGHTNESS}未満`,
		).toBeGreaterThanOrEqual(MIN_BRIGHTNESS);
	});
});
