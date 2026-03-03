import { describe, expect, it } from "vitest";
import {
	CAMERA_ELLIPSOID_XZ,
	CAMERA_START_X,
	CAMERA_START_Z,
	PILLAR_DIAMETER,
	PILLAR_XZ,
} from "./layout.ts";

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
