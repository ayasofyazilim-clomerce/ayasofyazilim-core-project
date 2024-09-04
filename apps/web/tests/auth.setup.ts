import * as path from "node:path";
import { test as setup } from "@playwright/test";
import { loginAsAdmin } from "./utils";
// const authFile = "playwright/.auth/user.json";
const authFile = path.join(__dirname, "playwright", ".auth", "user.json");

// Skip if the file exists and is newer than 1 hour
// setup.skip(() => {
//   if (!fs.existsSync(authFile)) return false;
//   const stats = fs.statSync(authFile);
//   return Date.now() - stats.mtimeMs < 1000 * 60 * 60;
// });

setup("Authenticate/Login", async ({ page }) => {
  await loginAsAdmin(page);
  await page.context().storageState({ path: authFile });
});
