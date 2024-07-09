import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test.describe("Login page main functionalities", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Unirefund/);
  });

  test("Visbiility of profile and langauge buttons", async ({ page }) => {
    await page.goto("/");
    await page.url();
    await page.getByRole("heading", { name: "admin", exact: true }).click();
    await expect(page.locator("body")).toContainText("admin");
    await expect(page.getByRole("button", { name: "English" })).toBeVisible();
    await expect(page.locator("h6")).toContainText("admin@abp.io");
    await expect(page.getByRole("button", { name: "English" })).toBeVisible();
  });
});
