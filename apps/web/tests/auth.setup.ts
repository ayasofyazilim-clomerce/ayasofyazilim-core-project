import { test as setup, expect } from "@playwright/test";

let directory = __dirname;
if (!directory.endsWith("apps/web")) {
  directory = directory + "/apps/web/";
}
const authFile = directory + "/playwright/.auth/user.json";

setup("Authenticate/Login", async ({ page }) => {
  await page.goto("/");
  await page.url();
  await page.getByPlaceholder("name@example.com").click();
  await page
    .getByPlaceholder("name@example.com")
    .fill(process.env.TEST_USERNAME as string);
  await page.getByPlaceholder("name@example.com").press("Tab");
  await page
    .getByPlaceholder("Password")
    .fill(process.env.TEST_PASSWORD as string);
  await page.getByRole("button", { name: "Login" }).click();
  await page.url();
  await page.getByRole("heading", { name: "admin", exact: true }).click();
  await page.context().storageState({ path: authFile });
});
