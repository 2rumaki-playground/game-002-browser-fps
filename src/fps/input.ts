export function createInput(canvas: HTMLCanvasElement) {
	const keys = new Set<string>();

	const onKeyDown = (e: KeyboardEvent) => keys.add(e.code);
	const onKeyUp = (e: KeyboardEvent) => keys.delete(e.code);

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);

	const isLocked = () => document.pointerLockElement === canvas;

	return {
		tick() {
			if (!isLocked()) return;
			// Babylon FreeCamera handles WASD + mouse via attachControl.
			// Custom input overrides can be added here later.
		},
		isKeyDown(code: string) {
			return keys.has(code);
		},
		isLocked,
		dispose() {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("keyup", onKeyUp);
		},
	};
}
