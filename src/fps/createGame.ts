import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";

import "@babylonjs/core/Collisions/collisionCoordinator";

import { createEnemySystem } from "./enemy.ts";
import { createHud } from "./hud.ts";
import { configureWasdKeys, createInput } from "./input.ts";
import {
	CAMERA_ELLIPSOID_XZ,
	CAMERA_START_X,
	CAMERA_START_Z,
	CLEAR_COLOR,
	GROUND_COLOR,
	LIGHT_INTENSITY,
	PILLAR_COLOR,
	PILLAR_DIAMETER,
	PILLAR_XZ,
	WALL_COLOR,
} from "./layout.ts";
import { createShooting } from "./shooting.ts";

export function createGame(canvas: HTMLCanvasElement) {
	const engine = new Engine(canvas, true, { stencil: true });
	const scene = new Scene(engine);
	scene.clearColor = new Color4(...CLEAR_COLOR);
	scene.collisionsEnabled = true;
	scene.gravity = new Vector3(0, -9.81 / 60, 0);

	// --- Light ---
	const light = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
	light.intensity = LIGHT_INTENSITY;

	// --- Ground ---
	const ground = MeshBuilder.CreateGround(
		"ground",
		{ width: 60, height: 60 },
		scene,
	);
	const gmat = new StandardMaterial("gmat", scene);
	gmat.diffuseColor = new Color3(...GROUND_COLOR);
	ground.material = gmat;
	ground.checkCollisions = true;

	// --- Walls ---
	const wallMat = new StandardMaterial("wmat", scene);
	wallMat.diffuseColor = new Color3(...WALL_COLOR);

	const wallThickness = 1;
	const wallHeight = 6;
	const roomSize = 26;

	const mkWall = (name: string, w: number, d: number, pos: Vector3) => {
		const wall = MeshBuilder.CreateBox(
			name,
			{ width: w, height: wallHeight, depth: d },
			scene,
		);
		wall.position = pos;
		wall.material = wallMat;
		wall.checkCollisions = true;
	};

	mkWall(
		"wall_n",
		roomSize,
		wallThickness,
		new Vector3(0, wallHeight / 2, roomSize / 2),
	);
	mkWall(
		"wall_s",
		roomSize,
		wallThickness,
		new Vector3(0, wallHeight / 2, -roomSize / 2),
	);
	mkWall(
		"wall_e",
		wallThickness,
		roomSize,
		new Vector3(roomSize / 2, wallHeight / 2, 0),
	);
	mkWall(
		"wall_w",
		wallThickness,
		roomSize,
		new Vector3(-roomSize / 2, wallHeight / 2, 0),
	);

	// --- Pillars ---
	const pmat = new StandardMaterial("pmat", scene);
	pmat.diffuseColor = new Color3(...PILLAR_COLOR);
	for (let i = 0; i < PILLAR_XZ.length; i++) {
		const [px, pz] = PILLAR_XZ[i];
		const p = MeshBuilder.CreateCylinder(
			`pillar_${i}`,
			{ height: 6, diameter: PILLAR_DIAMETER },
			scene,
		);
		p.position = new Vector3(px, 3, pz);
		p.material = pmat;
		p.checkCollisions = true;
	}

	// --- FPS Camera ---
	const camera = new FreeCamera(
		"fpsCam",
		new Vector3(CAMERA_START_X, 1.8, CAMERA_START_Z),
		scene,
	);
	camera.minZ = 0.1;
	camera.maxZ = 200;
	camera.speed = 0.65;
	camera.angularSensibility = 3200;
	camera.checkCollisions = true;
	camera.applyGravity = true;
	camera.ellipsoid = new Vector3(CAMERA_ELLIPSOID_XZ, 0.9, CAMERA_ELLIPSOID_XZ);
	configureWasdKeys(camera);
	camera.attachControl(canvas, true);

	// --- Overlay: click to lock ---
	const overlay = document.createElement("div");
	overlay.style.cssText =
		"position:fixed;inset:0;display:grid;place-items:center;color:#fff;font:16px/1.4 system-ui,sans-serif;background:rgba(0,0,0,0.5);pointer-events:none;";
	overlay.innerHTML =
		"<div>Click to play<br/><small>WASD: move / Mouse: look / Click: shoot / ESC: unlock</small></div>";
	document.body.appendChild(overlay);

	const updateOverlay = () => {
		overlay.style.display =
			document.pointerLockElement === canvas ? "none" : "grid";
	};
	document.addEventListener("pointerlockchange", updateOverlay);
	updateOverlay();

	canvas.addEventListener("click", () => {
		if (document.pointerLockElement !== canvas) {
			canvas.requestPointerLock();
		}
	});

	// --- Systems ---
	const hud = createHud();
	const input = createInput(canvas);
	const shooting = createShooting(scene, camera, hud);
	const enemies = createEnemySystem(scene, camera, hud);

	enemies.spawn(new Vector3(6, 1, 6));
	enemies.spawn(new Vector3(-8, 1, 4));
	enemies.spawn(new Vector3(0, 1, 10));

	// --- Main loop ---
	engine.runRenderLoop(() => {
		input.tick();
		enemies.tick();
		shooting.tick();
		hud.tick();
		scene.render();
	});

	window.addEventListener("resize", () => engine.resize());

	return { engine, scene, camera };
}
