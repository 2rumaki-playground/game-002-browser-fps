import type { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Ray } from "@babylonjs/core/Culling/ray";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core/scene";

import type { Hud } from "./hud.ts";

export function createShooting(scene: Scene, camera: FreeCamera, hud: Hud) {
	let cooldown = 0;

	const shoot = () => {
		const origin = camera.globalPosition.clone();
		const forward = camera.getForwardRay(1).direction.normalize();

		const ray = new Ray(origin, forward, 100);
		const hit = scene.pickWithRay(
			ray,
			(m) => (m as Mesh).metadata?.isShootable === true,
		);

		if (hit?.hit && hit.pickedMesh) {
			const mesh = hit.pickedMesh as Mesh;
			const dmg = 25;
			const hp: number = mesh.metadata.hp ?? 100;
			mesh.metadata.hp = Math.max(0, hp - dmg);
			hud.onHit();

			if (mesh.metadata.hp <= 0) {
				hud.onKill();
				mesh.dispose();
			}
		}
	};

	const onMouseDown = (e: MouseEvent) => {
		if (e.button !== 0) return;
		if (document.pointerLockElement == null) return;
		if (cooldown > 0) return;

		shoot();
		cooldown = 0.12;
	};

	window.addEventListener("mousedown", onMouseDown);

	return {
		tick() {
			cooldown = Math.max(
				0,
				cooldown - scene.getEngine().getDeltaTime() / 1000,
			);
		},
		dispose() {
			window.removeEventListener("mousedown", onMouseDown);
		},
	};
}
