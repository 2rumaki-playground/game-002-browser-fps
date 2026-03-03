import { describe, expect, it } from "vitest";
import { configureWasdKeys } from "./input.ts";

describe("configureWasdKeys", () => {
	it("WASDキーコードをカメラのキー配列に追加する", () => {
		const camera = {
			keysUp: [38],
			keysDown: [40],
			keysLeft: [37],
			keysRight: [39],
		};

		configureWasdKeys(camera);

		expect(camera.keysUp).toContain(87); // W
		expect(camera.keysDown).toContain(83); // S
		expect(camera.keysLeft).toContain(65); // A
		expect(camera.keysRight).toContain(68); // D
	});

	it("複数回呼び出してもキーコードが重複しない", () => {
		const camera = {
			keysUp: [38],
			keysDown: [40],
			keysLeft: [37],
			keysRight: [39],
		};

		configureWasdKeys(camera);
		configureWasdKeys(camera);

		expect(camera.keysUp.filter((k) => k === 87)).toHaveLength(1);
		expect(camera.keysDown.filter((k) => k === 83)).toHaveLength(1);
		expect(camera.keysLeft.filter((k) => k === 65)).toHaveLength(1);
		expect(camera.keysRight.filter((k) => k === 68)).toHaveLength(1);
	});

	it("既存の矢印キー設定を保持する", () => {
		const camera = {
			keysUp: [38],
			keysDown: [40],
			keysLeft: [37],
			keysRight: [39],
		};

		configureWasdKeys(camera);

		expect(camera.keysUp).toContain(38);
		expect(camera.keysDown).toContain(40);
		expect(camera.keysLeft).toContain(37);
		expect(camera.keysRight).toContain(39);
	});
});
