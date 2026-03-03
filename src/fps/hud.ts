export type Hud = ReturnType<typeof createHud>;

export function createHud() {
	const root = document.createElement("div");
	root.style.cssText = "position:fixed;inset:0;pointer-events:none;";

	// Crosshair
	const cross = document.createElement("div");
	cross.style.cssText =
		"position:absolute;left:50%;top:50%;width:10px;height:10px;transform:translate(-50%,-50%);border:2px solid rgba(255,255,255,0.85);border-radius:2px;";

	// HP display
	const hp = document.createElement("div");
	hp.style.cssText =
		"position:absolute;left:12px;top:12px;color:white;font:14px/1.2 system-ui,sans-serif;background:rgba(0,0,0,0.35);padding:8px 10px;border-radius:10px;backdrop-filter:blur(6px);";

	// Damage flash
	const flash = document.createElement("div");
	flash.style.cssText =
		"position:absolute;inset:0;background:rgba(255,0,0,0);transition:background 80ms linear;";

	// Kill counter
	const msg = document.createElement("div");
	msg.style.cssText =
		"position:absolute;right:12px;top:12px;color:white;font:14px/1.2 system-ui,sans-serif;background:rgba(0,0,0,0.35);padding:8px 10px;border-radius:10px;backdrop-filter:blur(6px);";
	msg.textContent = "Kills: 0";

	root.appendChild(flash);
	root.appendChild(cross);
	root.appendChild(hp);
	root.appendChild(msg);
	document.body.appendChild(root);

	let playerHp = 100;
	let kills = 0;
	let hitPulse = 0;

	const render = () => {
		hp.textContent = `HP: ${Math.max(0, Math.floor(playerHp))}`;
		cross.style.transform =
			hitPulse > 0
				? "translate(-50%,-50%) scale(1.08)"
				: "translate(-50%,-50%) scale(1)";
	};

	render();

	return {
		tick() {
			hitPulse = Math.max(0, hitPulse - 0.02);
			render();

			if (playerHp <= 0) {
				flash.style.background = "rgba(255,0,0,0.35)";
			}
		},
		onDamage(amount: number) {
			playerHp -= amount;
			flash.style.background = "rgba(255,0,0,0.22)";
			window.setTimeout(() => (flash.style.background = "rgba(255,0,0,0)"), 70);
		},
		onHit() {
			hitPulse = 1;
		},
		onKill() {
			kills += 1;
			msg.textContent = `Kills: ${kills}`;
		},
	};
}
