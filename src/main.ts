import { createGame } from "./fps/createGame.ts";

const app = document.getElementById("app");
if (app) {
	const canvas = document.createElement("canvas");
	app.appendChild(canvas);
	createGame(canvas);
}
