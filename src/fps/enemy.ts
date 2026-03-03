import type { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import type { Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import type { Scene } from "@babylonjs/core/scene";
import type { Hud } from "./hud.ts";
import { ENEMY_DIFFUSE_COLOR, ENEMY_EMISSIVE_COLOR } from "./layout.ts";

export function createEnemySystem(scene: Scene, camera: FreeCamera, hud: Hud) {
	const enemies: Mesh[] = [];

	const mat = new StandardMaterial("enemyMat", scene);
	mat.diffuseColor = new Color3(...ENEMY_DIFFUSE_COLOR);
	mat.emissiveColor = new Color3(...ENEMY_EMISSIVE_COLOR);

	function spawn(pos: Vector3) {
		const e = MeshBuilder.CreateSphere(
			`enemy_${Date.now()}_${Math.random()}`,
			{ diameter: 1.2 },
			scene,
		);
		e.position = pos.clone();
		e.material = mat;
		e.metadata = { isShootable: true, hp: 100 };
		enemies.push(e);
	}

	function tick() {
		const dt = scene.getEngine().getDeltaTime() / 1000;

		for (let i = enemies.length - 1; i >= 0; i--) {
			const e = enemies[i];
			if (e.isDisposed()) {
				enemies.splice(i, 1);
				continue;
			}

			const toPlayer = camera.globalPosition.subtract(e.position);
			toPlayer.y = 0;
			const dist = toPlayer.length();

			if (dist > 0.001) {
				const dir = toPlayer.normalize();
				const speed = 2.2;
				e.position.addInPlace(dir.scale(speed * dt));
			}

			if (dist < 1.4) {
				hud.onDamage(12 * dt);
			}
		}
	}

	return { spawn, tick };
}
