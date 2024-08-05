import { test, expect, Page } from "@playwright/test";
import { expectStatusMessage } from "./utils";

async function clickOrganizationImage(
  page: Page,
  organizationName: string,
  imageIndex: number,
) {
  await page
    .locator("li")
    .filter({ hasText: organizationName })
    .getByRole("img")
    .nth(imageIndex)
    .click();
}

async function expectOrganizationVisible(page: Page, organizationName: string) {
  await expect(
    page.locator("li").filter({ hasText: organizationName }),
  ).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/en/app/admin");
  await page.getByRole("link", { name: "Identity Management" }).click();
  await page.getByRole("link", { name: "organization" }).click();
});

test("adding new organization", async ({ page }) => {
  await page.getByRole("button", { name: "+ Add root unit" }).click();
  await page.getByLabel("Display Name *").fill("Test Organization");
  await page.getByText("Save Changes").click();
  await expectOrganizationVisible(page, "Test Organization");
  await expectStatusMessage(page, "Organization unit added successfully");
});

test("add users and roles to organization", async ({ page }) => {
  await page.locator("button").filter({ hasText: "Test Organization" }).click();
  await page.getByRole("button", { name: "+ Add user" }).click();
  await page.getByLabel("Select all").click();
  await page.getByRole("button", { name: "Save" }).click();
  const userStatusMessage = page
    .locator("li")
    .filter({ hasText: "Users added successfully" });
  await userStatusMessage.waitFor({ state: "visible" });
  await expect(userStatusMessage).toContainText("Users added successfully");
  await expect(
    page.getByRole("cell", { name: "admin", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "admin@abp.io" })).toBeVisible();
  await page.getByRole("button", { name: "Roles" }).click();
  await page.getByRole("button", { name: "+ Add role" }).click();
  await page.getByLabel("Select all").click();
  await page.getByRole("button", { name: "Save" }).click();
  const roleStatusMessage = page
    .locator("li")
    .filter({ hasText: "Roles added successfully" });
  await roleStatusMessage.waitFor({ state: "visible" });
  await expect(roleStatusMessage).toContainText("Roles added successfully");
  await expect(page.getByRole("cell", { name: "admin" })).toBeVisible();
});

test("delete users and roles from organization", async ({ page }) => {
  await page.locator("button").filter({ hasText: "Test Organization" }).click();
  const userRow = page.getByRole("row", { name: "admin admin@abp.io" });
  await userRow.waitFor({ state: "visible" });
  await userRow.getByRole("button").click();
  await page.getByRole("button", { name: "Yes" }).click();
  const userStatusMessage = page
    .locator("li")
    .filter({ hasText: "User deleted successfully" });
  await userStatusMessage.waitFor({ state: "visible" });
  await expect(userStatusMessage).toContainText("User deleted successfully");
  await page.getByRole("button", { name: "Roles" }).click();
  const roleRow = page.getByRole("row", { name: "admin" });
  await roleRow.waitFor({ state: "visible" });
  await roleRow.getByRole("button").click();
  await page.getByRole("button", { name: "Yes" }).click();
  const roleStatusMessage = page
    .locator("li")
    .filter({ hasText: "Role deleted successfully" });
  await roleStatusMessage.waitFor({ state: "visible" });
  await expect(roleStatusMessage).toContainText("Role deleted successfully");
});

test("add sub unit to organization", async ({ page }) => {
  await clickOrganizationImage(page, "Test Organization", 1);
  await page.getByRole("menuitem", { name: "Add Sub-unit" }).click();
  await page.getByLabel("Display Name *").click();
  await page.getByLabel("Display Name *").fill("Test Organization sub");
  await page.getByText("Save Changes").click();
  await expectStatusMessage(page, "Organization unit added successfully");
});

test("add users and roles to sub-unit organization", async ({ page }) => {
  await page.getByRole("button", { name: "Test Organization" }).click();
  await page
    .locator("button")
    .filter({ hasText: "Test Organization sub" })
    .click();
  await page.getByRole("button", { name: "+ Add user" }).click();
  await page.getByLabel("Select all").click();
  await page.getByRole("button", { name: "Save" }).click();
  const userStatusMessage = page
    .locator("li")
    .filter({ hasText: "Users added successfully" });
  await userStatusMessage.waitFor({ state: "visible" });
  await expect(userStatusMessage).toContainText("Users added successfully");
  await expect(
    page.getByRole("cell", { name: "admin", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "admin@abp.io" })).toBeVisible();
  await page.getByRole("button", { name: "Roles" }).click();
  await page.getByRole("button", { name: "+ Add role" }).click();
  await page.getByLabel("Select all").click();
  await page.getByRole("button", { name: "Save" }).click();
  const roleStatusMessage = page
    .locator("li")
    .filter({ hasText: "Roles added successfully" });
  await roleStatusMessage.waitFor({ state: "visible" });
  await expect(roleStatusMessage).toContainText("Roles added successfully");
  await expect(page.getByRole("cell", { name: "admin" })).toBeVisible();
});

test("delete users and roles from sub-unit organization", async ({ page }) => {
  await page.getByRole("button", { name: "Test Organization" }).click();
  await page
    .locator("button")
    .filter({ hasText: "Test Organization sub" })
    .click();
  const userRow = page.getByRole("row", { name: "admin admin@abp.io" });
  await userRow.waitFor({ state: "visible" });
  await userRow.getByRole("button").click();
  await page.getByRole("button", { name: "Yes" }).click();
  const userStatusMessage = page
    .locator("li")
    .filter({ hasText: "User deleted successfully" });
  await userStatusMessage.waitFor({ state: "visible" });
  await expect(userStatusMessage).toContainText("User deleted successfully");
  await page.getByRole("button", { name: "Roles" }).click();
  const roleRow = page.getByRole("row", { name: "admin" });
  await roleRow.waitFor({ state: "visible" });
  await roleRow.getByRole("button").click();
  await page.getByRole("button", { name: "Yes" }).click();
  const roleStatusMessage = page
    .locator("li")
    .filter({ hasText: "Role deleted successfully" });
  await roleStatusMessage.waitFor({ state: "visible" });
  await expect(roleStatusMessage).toContainText("Role deleted successfully");
});

test("delete sub unit from organization", async ({ page }) => {
  await page.getByRole("button", { name: "Test Organization" }).click();
  await page
    .getByLabel("folder Test Organization")
    .getByRole("img")
    .nth(1)
    .click();
  await page.getByRole("menuitem", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expectStatusMessage(page, "Organization unit deleted successfully");
});

test("add a new sub unit to organization", async ({ page }) => {
  await clickOrganizationImage(page, "Test Organization", 1);
  await page.getByRole("menuitem", { name: "Add Sub-unit" }).click();
  await page.getByLabel("Display Name *").click();
  await page.getByLabel("Display Name *").fill("Test Organization sub");
  await page.getByText("Save Changes").click();
  await expectStatusMessage(page, "Organization unit added successfully");
});

test("move all users from organization", async ({ page }) => {
  await clickOrganizationImage(page, "Test Organization", 2);
  await page.getByRole("menuitem", { name: "Move all Users" }).click();
  await page.getByRole("combobox").click();
  await page
    .getByLabel("Test Organization sub Parent")
    .getByText("Test Organization sub Parent")
    .click();
  await page.getByText("Save Changes").click();
  await expectStatusMessage(page, "Users moved successfully");
});

test("edit organization", async ({ page }) => {
  await clickOrganizationImage(page, "Test Organization", 2);
  await page.getByRole("menuitem", { name: "Edit" }).click();
  await page.getByLabel("Display Name *").click();
  await page.getByLabel("Display Name *").fill("Test Organization edit");
  await page.getByText("Save Changes").click();
  await expectOrganizationVisible(page, "Test Organization edit");
  await expectStatusMessage(page, "Organization unit updated successfully");
});

test("delete organization", async ({ page }) => {
  await clickOrganizationImage(page, "Test Organization", 2);
  await page.getByRole("menuitem", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(
    page.locator("li").filter({ hasText: "Test Organization" }),
  ).not.toBeVisible();
  await expectStatusMessage(page, "Organization unit deleted successfully");
});
