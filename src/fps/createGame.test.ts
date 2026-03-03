import { describe, expect, it } from "vitest";

describe("scene layout", () => {
	it("カメラの初期位置が全ての柱の衝突範囲外にある", () => {
		// createGame.ts と同期を保つこと
		const cameraX = 0;
		const cameraZ = -10;
		const cameraEllipsoidXZ = 0.4;
		const pillarRadius = 1.8 / 2;
		const pillars: [number, number][] = [
			[-5, -5],
			[5, -5],
			[-5, 5],
			[5, 5],
			[0, -8],
			[0, 8],
		];

		const minClearance = cameraEllipsoidXZ + pillarRadius;

		for (const [px, pz] of pillars) {
			const dist = Math.hypot(cameraX - px, cameraZ - pz);
			expect(
				dist,
				`カメラ(${cameraX},${cameraZ})と柱(${px},${pz})の距離${dist.toFixed(2)}が最小距離${minClearance}未満`,
			).toBeGreaterThan(minClearance);
		}
	});
});
