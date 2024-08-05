import { test, expect } from "@playwright/test";

test("create update and delete project", async ({ page }) => {
  test.setTimeout(120000);
  const name = "Test Project #" + Date.now();
  const tiptap =
    "Deneme deneme deneme deneme deneme deneme deneme deneme deneme deneme deneme deneme deneme deneme deneme deneme";
  await page.goto("http://localhost:3000/en/public");
  await page
    .locator("div")
    .filter({ hasText: /^Bursaİlerleyin$/ })
    .getByRole("link")
    .click();
  await page.getByRole("button", { name: "Giriş Yap" }).click();
  await expect(page.getByPlaceholder("name@example.com")).toBeVisible({
    timeout: 15000,
  });
  await page.getByPlaceholder("name@example.com").click();
  await page.getByPlaceholder("name@example.com").fill("admin");
  await page.getByPlaceholder("name@example.com").press("Tab");
  await page.getByPlaceholder("Şifre").fill("123Aa!");
  await page.getByPlaceholder("Şifre").press("Enter");
  await page
    .locator("div")
    .filter({ hasText: /^Bursaİlerleyin$/ })
    .getByRole("link")
    .click();

  await page.getByRole("button", { name: "admin admin@abp.io" }).click();
  await page.getByRole("link", { name: "Girişimci Merkezi" }).click();
  await expect(page.getByRole("link", { name: "Kampanyalar" })).toBeVisible({
    timeout: 15000,
  });
  await page.getByRole("link", { name: "Kampanyalar" }).click();
  await page.getByRole("button", { name: "Yeni Proje" }).click();
  await expect(page.getByText("Proje AdıProjenizin adı")).toBeVisible({
    timeout: 15000,
  });

  await page.getByText("Proje AdıProjenizin adı").click();
  await page.getByLabel("Proje Adı").fill(name);

  await page.locator("textarea").click();
  await page.locator("textarea").fill("deneme açıklama");
  await page.getByLabel("Proje Adı").fill(name);
  await page.getByRole("button", { name: "Sonraki" }).click();
  await page.getByRole("combobox").click();
  await expect(page.getByLabel("Hisse bazlı")).toBeVisible({ timeout: 15000 });
  await page.getByLabel("Hisse bazlı").click();
  await page.locator("div:nth-child(2) > span").first().click();
  await page.getByRole("button", { name: "Sonraki" }).click();
  await page.getByRole("combobox").click();
  await page.getByLabel("Hayır").click();
  await page.getByRole("button", { name: "Sonraki" }).click();
  await page.getByRole("button", { name: "Yeni Proje" }).click();
  await page.getByRole("link", { name: "Projeyi İncele" }).click();

  await expect(page.getByLabel("Temel Bilgiler")).toBeVisible({
    timeout: 15000,
  });
  await page.getByLabel("Temel Bilgiler").getByText("deneme açıklama").click();
  await page
    .getByLabel("Temel Bilgiler")
    .getByText("deneme açıklama")
    .fill("deneme açıklama.");
  await page.getByRole("button", { name: "Temel Bilgiler" }).click();
  await page.getByRole("button", { name: "Başlangıç Tarihi" }).click();
  await page.getByRole("button", { name: "Tarih Seçin" }).click();
  await page.getByRole("gridcell", { name: "30" }).nth(1).click();
  await page.getByRole("button", { name: "Projeyi Kaydet" }).click();
  await page.getByRole("link", { name: "Proje Bölümleri" }).click();

  await expect(page.locator(".tiptap")).toBeVisible({ timeout: 15000 });

  await page.getByRole("paragraph").click();
  await page.locator(".tiptap").fill(tiptap);
  await page.getByLabel("Save").click();

  await page.getByRole("button", { name: "Proje Hakkında" }).click();
  await page.getByRole("paragraph").click();
  await page.locator(".tiptap").fill(tiptap);
  await page.getByLabel("Save").click();

  await page.getByRole("button", { name: "Takım" }).click();
  await page.getByRole("paragraph").click();
  await page.locator(".tiptap").fill(tiptap);
  await page.getByLabel("Save").click();

  await page.getByRole("button", { name: "Ürün ve Üretim" }).click();
  await page.getByRole("paragraph").click();
  await page.locator(".tiptap").fill(tiptap);
  await page.getByLabel("Save").click();

  await page
    .getByRole("button", { name: "Pazar, Rekabet, Hedef Kitle" })
    .click();
  await page.getByRole("paragraph").click();
  await page.locator(".tiptap").fill(tiptap);
  await page.getByLabel("Save").click();

  await page.getByRole("button", { name: "Analizler ve İş Planı" }).click();
  await page.getByRole("paragraph").click();
  await page.locator(".tiptap").fill(tiptap);
  await page.getByLabel("Save").click();

  await page.getByRole("button", { name: "Riskler" }).click();
  await page.getByRole("paragraph").click();
  await page.locator(".tiptap").fill(tiptap);
  await page.getByLabel("Save").click();

  await page.getByRole("button", { name: "Fonlama" }).click();
  await page.getByRole("paragraph").click();
  await page.locator(".tiptap").fill(tiptap);
  await page.getByLabel("Save").click();

  await page.getByRole("button", { name: "Finansal Tablolar" }).click();
  await page.getByRole("paragraph").click();
  await page.locator(".tiptap").fill(tiptap);
  await page.getByLabel("Save").click();

  await page.getByRole("link", { name: "Genel Bilgiler" }).click();
  await page.getByRole("button", { name: "Onaya Gönder" }).click();
  await page.getByRole("button", { name: "admin admin@abp.io" }).click();
  await page.getByRole("link", { name: "Yönetim Merkezi" }).click();
  await expect(page.getByRole("link", { name: "Kampanyalar" })).toBeVisible({
    timeout: 15000,
  });

  await page.getByRole("link", { name: "Kampanyalar" }).click();
  await page.getByRole("button", { name: "Onay bekleyen projeler" }).click();
  await page.getByRole("link", { name: name }).click();

  await expect(page.getByRole("button", { name: "Reddet" })).toBeVisible({
    timeout: 15000,
  });
  await page.getByRole("button", { name: "Reddet" }).click();
  await expect(page.getByRole("button", { name: "Reddet" }).nth(1)).toBeVisible(
    {
      timeout: 15000,
    },
  );
  await page.getByRole("button", { name: "Reddet" }).nth(1).click();

  await expect(
    page.getByLabel("Ek Fonlama").getByText("Ek Fonlama"),
  ).toBeVisible({
    timeout: 15000,
  });
  await page
    .getByLabel("Ek Fonlama")
    .getByRole("button", { name: "Reddet" })
    .click();

  await expect(page.getByLabel("Tarih").getByText("Tarih")).toBeVisible({
    timeout: 15000,
  });
  await page
    .getByLabel("Tarih")
    .getByRole("button", { name: "Reddet" })
    .click();

  await expect(
    page.getByRole("button", { name: "Değerlendirmeyi Tamamla" }),
  ).toBeVisible({
    timeout: 15000,
  });
  await page.getByRole("button", { name: "Değerlendirmeyi Tamamla" }).click();

  await page.getByRole("button", { name: "admin admin@abp.io" }).click();
  await page.getByRole("link", { name: "Girişimci Merkezi" }).click();
  await page.getByRole("link", { name: "Kampanyalar" }).click();
  await expect(page.getByRole("link", { name: "Kampanyalar" })).toBeVisible({
    timeout: 15000,
  });

  await page.getByRole("button", { name: "Reddedilen projeler" }).click();
  await page.getByRole("link", { name: name }).click();
  await page.getByLabel("Temel Bilgiler").getByText("deneme açıklama.").click();
  await page
    .getByLabel("Temel Bilgiler")
    .getByText("deneme açıklama.")
    .fill("deneme açıklama..");

  await page.getByRole("button", { name: "Temel Bilgiler" }).click();
  await page.getByRole("button", { name: "Projeyi Kaydet" }).click();
  await page.getByRole("button", { name: "Onaya Gönder" }).click();

  await page.getByRole("button", { name: "admin admin@abp.io" }).click();
  await page.getByRole("link", { name: "Yönetim Merkezi" }).click();
  await page.getByRole("link", { name: "Kampanyalar" }).click();
  await expect(page.getByRole("link", { name: "Kampanyalar" })).toBeVisible({
    timeout: 15000,
  });
  await page.getByRole("button", { name: "Kampanyalar" }).click();
  await page.getByRole("button", { name: "Onay bekleyen projeler" }).click();
  await page.getByRole("link", { name: name }).click();
  await page
    .getByLabel("Temel Bilgiler")
    .getByRole("button", { name: "Onayla" })
    .click();
  await page
    .getByLabel("Bütçe")
    .getByRole("button", { name: "Onayla" })
    .click();
  await page
    .getByLabel("Ek Fonlama")
    .getByRole("button", { name: "Onayla" })
    .click();
  await page
    .getByLabel("Tarih")
    .getByRole("button", { name: "Onayla" })
    .click();
  await page.getByRole("button", { name: "Değerlendirmeyi Tamamla" }).click();
  await page.getByRole("button", { name: "admin admin@abp.io" }).click();
  await page.getByRole("link", { name: "Girişimci Merkezi" }).click();
  await page.getByRole("link", { name: "Kampanyalar" }).click();
  await page.getByRole("button", { name: "Onaylanan projeler" }).click();
  await page.getByRole("link", { name: name }).click();
  await page.getByRole("button", { name: "Temel Bilgiler" }).click();
  await page.getByRole("button", { name: "Projeyi Sil" }).click();
  await page.getByRole("button", { name: "Projeyi Sil" }).click();
});
