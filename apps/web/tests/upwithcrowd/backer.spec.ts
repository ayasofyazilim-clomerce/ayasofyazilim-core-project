import { test, expect, Page } from "@playwright/test";
import { expectStatusMessage } from "tests/utils";

async function fillCommonInformation(page: Page) {
  await page.getByLabel("Email Address").click();
  await page.getByLabel("Email Address").fill("abc@asd.com");
  await page.locator('input[type="tel"]').click();
  await page.keyboard.type("5555555555");
  await page
    .locator("div")
    .filter({ hasText: /^Type Code01$/ })
    .getByRole("combobox")
    .click();
  await page.getByLabel("1", { exact: true }).click();
  await page.getByLabel("Address Line").click();
  await page.getByLabel("Address Line").fill("adres");
  await page.getByLabel("Address Line").press("Tab");
  await page.getByLabel("City", { exact: true }).fill("adres");
  await page.getByLabel("City", { exact: true }).press("Tab");
  await page.getByLabel("Terriority").fill("adres");
  await page.getByLabel("Terriority").press("Tab");
  await page.getByLabel("Postal Code").fill("100");
  await page.getByLabel("Postal Code").press("Tab");
  await page.getByLabel("Country", { exact: true }).fill("adres");
  await page.getByLabel("Country", { exact: true }).press("Tab");
  await page.getByLabel("Full Address").fill("adres");
  await page.getByRole("button", { name: "Kaydet" }).click();
  await expectStatusMessage(page, "Profil oluşturuldu.");
}

test.describe("Upwithcrowd Backer test", () => {
  test.setTimeout(120000);
  const name = "Test Backer #" + Date.now();

  test.beforeEach(async ({ page }) => {
    await page.goto("/en/public");
    await page
      .locator("div")
      .filter({ hasText: /^Bursaİlerleyin$/ })
      .getByRole("link")
      .click();
    await page.getByRole("button").first().click();
    await page.getByRole("link", { name: "Yönetim Merkezi" }).click();
    await page.getByRole("link", { name: "Profil" }).click();
  });

  test("create backer company", async ({ page }) => {
    await page.getByRole("button", { name: "Yeni Profil" }).click();
    await page.getByRole("link", { name: "Kurumsal Profil" }).click();
    await page.getByLabel("Company Name").click();
    await page.getByLabel("Company Name").fill(name);
    await page.getByLabel("Company Name").press("Tab");
    await page.getByLabel("Taxpayer Id").fill("12");
    await page.getByLabel("Legal Status Code").click();
    await page.getByLabel("Legal Status Code").fill("1");
    await page.getByLabel("Customer Number").click();
    await page.getByLabel("Customer Number").fill("12");
    await fillCommonInformation(page);
  });

  test("delete backer company", async ({ page }) => {
    console.log(name);
    await page.getByRole("link", { name: name }).click();
    await page.getByRole("button", { name: "Profili Sil" }).click();
    await page.getByRole("button", { name: "Evet" }).click();
    await expectStatusMessage(page, "Profil silindi.");
  });

  test("create backer individual", async ({ page }) => {
    await page.getByRole("button", { name: "Yeni Profil" }).click();
    await page.getByRole("link", { name: "Bireysel Profil" }).click();
    await page.getByLabel("Name", { exact: true }).click();
    await page.getByLabel("Name", { exact: true }).fill(name);
    await fillCommonInformation(page);
  });

  test("delete backer individual", async ({ page }) => {
    await page.getByRole("link", { name: name }).click();
    await page.getByRole("button", { name: "Profili Sil" }).click();
    await page.getByRole("button", { name: "Evet" }).click();
    await expectStatusMessage(page, "Profil silindi.");
  });
});
