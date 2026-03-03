import { expect, test } from "@playwright/test";

test("page loads and canvas is rendered", async ({ page }) => {
	await page.goto("/");
	const canvas = page.locator("canvas");
	await expect(canvas).toBeVisible();
});
