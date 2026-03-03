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
