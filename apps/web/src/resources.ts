import { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto } from "@ayasofyazilim/saas/AccountService";

type LocalizationDto =
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto;
export const defaultResources = (
  {
    resources: {
      Default: {
        texts: {},
        baseResources: [],
      },
      AbpLocalization: {
        texts: {
          "DisplayName:Abp.Localization.DefaultLanguage": "Varsayılan dil",
          "Description:Abp.Localization.DefaultLanguage":
            "Varsayılan uygulama dili.",
        },
        baseResources: [],
      },
      AbpMultiTenancy: {
        texts: {
          TenantNotFoundMessage: "Kiracı bulunamadı!",
          TenantNotFoundDetails:
            "Kiracı kimliğine veya adına sahip bir kiracı yok: {0}",
          TenantNotActiveMessage: "Kiracı aktif değil!",
          TenantNotActiveDetails:
            "Kiracı, kiracı kimliği veya adıyla etkin değil: {0}",
        },
        baseResources: [],
      },
      AbpTiming: {
        texts: {
          "DisplayName:Abp.Timing.Timezone": "saat dilimi",
          "Description:Abp.Timing.Timezone": "Uygulama saat dilimi",
        },
        baseResources: [],
      },
      LeptonX: {
        texts: {
          Login: "Giriş ",
          Appearance: "Görünüm",
          ContainerWidth: "Düzen",
          "ContainerWidth:Boxed": "Kutulu Düzen",
          "ContainerWidth:Fixed": "Sabit Düzen",
          "ContainerWidth:Fluid": "Akışkan Düzen",
          GeneralSettings: "Genel Ayarlar",
          Language: "Dil",
          Settings: "Ayarlar",
          "Theme:dark": "Koyu",
          "Theme:dim": "Yarı Koyu",
          "Theme:light": "Açık",
          "Theme:system": "Sistem",
          Welcome: "Hoşgeldiniz",
          FilterMenu: "Menü Bul",
          "Authentication:YouAreLoggedOut": "Çıkış Yaptınız.",
          GivenTenantIsNotExist: "İstenilen müşteri bulunamadı: {0}",
          GivenTenantIsNotAvailable: "İstenilen müşteri bulunamadı: {0}",
          Tenant: "Müşteri",
          Switch: "değiştir",
          Name: "İsim",
          SwitchTenantHint:
            "Host tarafına geçmek için isim alanını boş bırakın.",
          SwitchTenant: "Müşteri değiştir",
          NotSelected: "Seçili değil",
        },
        baseResources: [],
      },
      AbpAuthorization: {
        texts: {
          "Volo.Authorization:010001":
            "Yetkilendirme başarısız! Belirtilen izin sağlanmamış.",
          "Volo.Authorization:010002":
            "Yetkilendirme başarısız! Bu izin sağlanmamış: {PolicyName}",
          "Volo.Authorization:010003":
            "Yetkilendirme başarısız! Bu izin, bu kaynak için sağlanmamış: {ResourceName}",
          "Volo.Authorization:010004":
            "Yetkilendirme başarısız! Bu kaynak belirtilen gerekliliği sağlamamış: {ResourceName}",
          "Volo.Authorization:010005":
            "Yetkilendirme başarısız! Bu kaynak belirtilen gereklilikleri sağlamamış: {ResourceName}",
        },
        baseResources: [],
      },
      AbpValidation: {
        texts: {
          "'{0}' and '{1}' do not match.": "'{0}' ve '{1}' eşleşmiyor.",
          "The {0} field is not a valid credit card number.":
            "{0} alanı geçerli bir kredi kartı numarası olmalıdır.",
          "{0} is not valid.": "{0} geçerli değil.",
          "The {0} field is not a valid e-mail address.":
            "{0} alanı geçerli bir e-posta adresi olmalıdır.",
          "The {0} field only accepts files with the following extensions: {1}":
            "{0} alanı sadece şu uzantılarda dosyaları kabul eder: {1}",
          "The field {0} must be a string or array type with a maximum length of '{1}'.":
            "{0} alanı en fazla '{1}' uzunluğunda bir metin ya da dizi olmalıdır.",
          "The field {0} must be a string or array type with a minimum length of '{1}'.":
            "{0} alanı en az '{1}' uzunluğunda bir metin ya da dizi olmalıdır.",
          "The {0} field is not a valid phone number.":
            "{0} alanı geçerli bir telefon numarası olmalıdır.",
          "The field {0} must be between {1} and {2}.":
            "{0} değeri {1} ile {2} arasında olmalıdır.",
          "The field {0} must match the regular expression '{1}'.":
            "{0} alanı istenilen biçimde değil.",
          "The {0} field is required.": "{0} alanı zorunludur.",
          "The field {0} must be a string with a maximum length of {1}.":
            "{0} alanı en fazla {1} uzunluğunda bir metin olmalıdır.",
          "The field {0} must be a string with a minimum length of {2} and a maximum length of {1}.":
            "{0} alanı en az {2}, en fazla {1} uzunluğunda bir metin olmalıdır.",
          "The {0} field is not a valid fully-qualified http, https, or ftp URL.":
            "{0} alanı geçerli bir http, https, ya da ftp adresi olmalıdır.",
          "The field {0} is invalid.": "{0} alanı geçerli değil.",
          "The value '{0}' is invalid.": "{0} değeri geçerli değil.",
          "The field {0} must be a number.": "{0} alanı bir sayı olmalıdır.",
          "The field must be a number.": "Bu alan bir sayı olmalıdır.",
          "ThisFieldIsNotAValidCreditCardNumber.":
            "Bu alan geçerli bir kredi kartı numarası olmalıdır.",
          "ThisFieldIsNotValid.": "Bu alan geçerli değil.",
          "ThisFieldIsNotAValidEmailAddress.":
            "Bu alan geçerli bir e-posta adresi olmalıdır.",
          "ThisFieldOnlyAcceptsFilesWithTheFollowingExtensions:{0}":
            "Bu alan sadece şu uzantılarda dosyaları kabul eder: {0}",
          "ThisFieldMustBeAStringOrArrayTypeWithAMaximumLengthOf{0}":
            "Bu alan en fazla '{0}' uzunluğunda bir metin ya da dizi olmalıdır.",
          "ThisFieldMustBeAStringOrArrayTypeWithAMinimumLengthOf{0}":
            "Bu alan en az '{0}' uzunluğunda bir metin ya da dizi olmalıdır.",
          "ThisFieldIsNotAValidPhoneNumber.":
            "Bu alan geçerli bir telefon numarası olmalıdır.",
          "ThisFieldMustBeBetween{0}And{1}":
            "Bu alanın değeri {0} ile {1} arasında olmalıdır.",
          "ThisFieldMustBeGreaterThanOrEqual{0}":
            "Bu alan {0}'dan büyük veya eşit olmalıdır.",
          "ThisFieldMustBeLessOrEqual{0}":
            "Bu alan {0}'dan küçük veya eşit olmalıdır.",
          "ThisFieldMustMatchTheRegularExpression{0}":
            "Bu alan şu düzenli ifadeye uymalıdır: '{0}'.",
          "ThisFieldIsRequired.": "Bu alan zorunludur.",
          "ThisFieldMustBeAStringWithAMaximumLengthOf{0}":
            "Bu alan en fazla {0} uzunluğunda bir metin olmalıdır.",
          "ThisFieldMustBeAStringWithAMinimumLengthOf{1}AndAMaximumLengthOf{0}":
            "Bu alan en az {1}, en fazla {0} uzunluğunda bir metin olmalıdır.",
          ThisFieldIsNotAValidFullyQualifiedHttpHttpsOrFtpUrl:
            "Bu alan geçerli bir http, https, ya da ftp adresi olmalıdır.",
          "ThisFieldIsInvalid.": "Bu alan geçerli değil.",
        },
        baseResources: [],
      },
      AbpExceptionHandling: {
        texts: {
          InternalServerErrorMessage:
            "Sayfa işlenirken sunucu tarafında beklenmedik bir hata oluştu!",
          ValidationErrorMessage: "İşleminiz geçerli değil!",
          ValidationNarrativeErrorMessageTitle:
            "Aşağıdaki hatalar doğrulama sırasında tespit edilmiştir.",
          DefaultErrorMessage: "Bir hata oluştu!",
          DefaultErrorMessageDetail:
            "Hatanın ne olduğu sunucu tarafından gönderilmedi.",
          DefaultErrorMessage401: "Giriş yapılmamış!",
          DefaultErrorMessage401Detail:
            "Bu işlemi gerçekleştirmek için uygulamaya giriş yapmalısınız.",
          DefaultErrorMessage403: "İzinsiz işlem!",
          DefaultErrorMessage403Detail:
            "Bu işlemi gerçekleştirmek için gereken izne sahip değilsiniz.",
          DefaultErrorMessage404: "Kaynak bulunamadı!",
          DefaultErrorMessage404Detail: "İstenilen kaynak sunucuda bulunamadı.",
          EntityNotFoundErrorMessage:
            "Id değeri {1} olan {0} türünden bir nesne bulunamadı!",
          AbpDbConcurrencyErrorMessage:
            "Gönderdiğiniz veri başka bir kullanıcı/istemci tarafından değiştirilmiş. Lütfen işlemi iptal edip baştan deneyin.",
          Error: "Hata",
          UnhandledException: "Yakalanmamış hata!",
          "401Message": "Yetkisiz İşlem",
          "403Message": "İzinsiz",
          "404Message": "Sayfa bulunamadı",
          "500Message": "Sunucu tarafında hata",
          "403MessageDetail":
            "Bu işlemi gerçekleştirmek için gereken yetkiye sahip değilsiniz!",
          "404MessageDetail": "Üzgünüz, bu adreste bir şey yok.",
        },
        baseResources: [],
      },
      AbpDddApplicationContracts: {
        texts: {
          MaxResultCountExceededExceptionMessage:
            "{0} en fazla {1} olabilir, daha büyük olamaz! Daha fazla sonuca izin vermek için {2}.{3}'ü sunucu tarafında artırın.",
        },
        baseResources: [],
      },
      AbpUi: {
        texts: {
          Languages: "Diller",
          AreYouSure: "Emin misiniz?",
          Cancel: "Vazgeç",
          Clear: "Temizle",
          Yes: "Evet",
          No: "Hayır",
          Ok: "Tamam",
          Close: "Kapat",
          Save: "Kaydet",
          SavingWithThreeDot: "Kaydediliyor...",
          Actions: "İşlemler",
          Delete: "Sil",
          SuccessfullyDeleted: "Başarıyla silindi",
          Edit: "Düzenle",
          Refresh: "Yenile",
          Language: "Dil",
          LoadMore: "Daha fazla yükle",
          ProcessingWithThreeDot: "İşleniyor...",
          LoadingWithThreeDot: "Yükleniyor...",
          Welcome: "Hoşgeldiniz",
          Login: "Giriş",
          Register: "Kaydol",
          Logout: "Çıkış",
          Submit: "Gönder",
          Back: "Geri",
          PagerSearch: "Ara",
          PagerNext: "Sonraki",
          PagerPrevious: "Önceki",
          PagerFirst: "İlk",
          PagerLast: "Son",
          PagerInfo: "_TOTAL_ kayıttan _START_ ile _END_ arası gösteriliyor.",
          "PagerInfo{0}{1}{2}": "{2} kayıttan {0} ile {1} arası gösteriliyor.",
          PagerInfoEmpty: "0 kayıttan 0 ile 0 arası gösteriliyor.",
          PagerInfoFiltered: "(_MAX_ kayıt arasından filtrelendi)",
          NoDataAvailableInDatatable: "Tabloda kayıt mevcut değil.",
          Total: "toplam",
          Selected: "seçilen",
          PagerShowMenuEntries: "Sayfada _MENU_ kayıt göster.",
          DatatableActionDropdownDefaultText: "İşlemler",
          ChangePassword: "Şifre değiştir",
          PersonalInfo: "Profilim",
          AreYouSureYouWantToCancelEditingWarningMessage:
            "Kaydedilmemiş değişiklikler var.",
          GoHomePage: "Ana sayfaya git",
          GoBack: "Geri dön",
          Search: "Arama",
          ItemWillBeDeletedMessageWithFormat: "{0} silinecektir!",
          ItemWillBeDeletedMessage: "Bu nesne silinecektir!",
          ManageYourAccount: "Hesap yönetimi",
          OthersGroup: "Diğer",
          Today: "Bugün",
          Apply: "Uygula",
          InternetConnectionInfo:
            "İşlem gerçekleştirilemedi. İnternet bağlantısı mevcut değil.",
          CopiedToTheClipboard: "Panoya kopyalandı",
          AddNew: "Yeni ekle",
          ProfilePicture: "Profil resmi",
          Theme: "Tema",
          NotAssigned: "Atanmadı",
        },
        baseResources: ["AbpExceptionHandling"],
      },
      AbpUiNavigation: {
        texts: {
          "Menu:Administration": "Yönetim",
        },
        baseResources: [],
      },
      AbpGlobalFeature: {
        texts: {
          "Volo.GlobalFeature:010001":
            "'{ServiceName}' hizmetinin '{GlobalFeatureName}' özelliğini etkinleştirmesi gerekiyor.",
        },
        baseResources: [],
      },
      AbpFeature: {
        texts: {
          "Volo.Feature:010001": "Bu özellik etkin değil: {FeatureName}",
          "Volo.Feature:010002":
            "Gerekli özellikler etkinleştirilmemiş. Bu özelliklerin tümü etkinleştirilmelidir: {FeatureNames}",
          "Volo.Feature:010003":
            "Gerekli özellikler etkinleştirilmemiş. Bu özelliklerden en az birinin etkinleştirilmesi gerekir: {FeatureNames}",
        },
        baseResources: [],
      },
      AbpUiMultiTenancy: {
        texts: {
          GivenTenantIsNotExist: "İstenilen müşteri bulunamadı: {0}",
          GivenTenantIsNotAvailable: "İstenilen müşteri bulunamadı: {0}",
          Tenant: "Müşteri",
          Switch: "değiştir",
          Name: "İsim",
          SwitchTenantHint:
            "Host tarafına geçmek için isim alanını boş bırakın.",
          SwitchTenant: "Müşteri değiştir",
          NotSelected: "Seçili değil",
        },
        baseResources: [],
      },
      AbpIdentity: {
        texts: {
          "Menu:IdentityManagement": "Kimlik yönetimi",
          Users: "Kullanıcılar",
          NewUser: "Yeni kullanıcı",
          UserName: "Kullanıcı adı",
          Surname: "Soyad",
          EmailAddress: "E-posta adresi",
          PhoneNumber: "Telefon numarası",
          UserInformations: "Kullanıcı Bilgileri",
          "DisplayName:IsDefault": "Varsayılan",
          "DisplayName:IsStatic": "Sabit",
          "DisplayName:IsPublic": "Herkese Görünür",
          Roles: "Roller",
          Password: "Şifre",
          PersonalInfo: "Profilim",
          PersonalSettings: "Kişisel Ayarlar",
          UserDeletionConfirmationMessage:
            "{0} kullanıcısı silinecektir. Onaylıyor musunuz?",
          RoleDeletionConfirmationMessage:
            "'{0}' rolü silinecektir. Onaylıyor musunuz?",
          "DisplayName:RoleName": "Rol adı",
          "DisplayName:UserName": "Kullanıcı adı",
          "DisplayName:Name": "Ad",
          "DisplayName:Surname": "Soyad",
          "DisplayName:Password": "Şifre",
          "DisplayName:Email": "Email",
          "DisplayName:PhoneNumber": "Telefon numarası",
          "DisplayName:TwoFactorEnabled": "İki faktör etkinleştirildi",
          "DisplayName:IsActive": "Aktif",
          "DisplayName:LockoutEnabled":
            "Başarısız giriş denemeleri sonrası hesabı kilitleme",
          NewRole: "Yeni rol",
          RoleName: "Rol adı",
          CreationTime: "Oluşturma zamanı",
          Permissions: "İzinler",
          "DisplayName:CurrentPassword": "Mevcut şifre",
          "DisplayName:NewPassword": "Yeni Şifre",
          "DisplayName:NewPasswordConfirm": "Yeni şifre (tekrar)",
          PasswordChangedMessage: "Şifreniz başarıyla değiştirildi.",
          PersonalSettingsSavedMessage:
            "Kişisel bilgileriniz başarıyla kaydedildi.",
          "Volo.Abp.Identity:DefaultError": "Bilinmeyen bir hata oluştu.",
          "Volo.Abp.Identity:ConcurrencyFailure":
            "İyimser eşzamanlılık denetimi başarısız oldu. Üzerinde çalıştığınız varlık başka bir kullanıcı tarafından değiştirildi. Lütfen değişikliklerinizi geri alın ve tekrar deneyin.",
          "Volo.Abp.Identity:DuplicateEmail":
            "'{0}' email adresi zaten alınmış.",
          "Volo.Abp.Identity:DuplicateRoleName":
            "'{0}' rol ismi zaten alınmış.",
          "Volo.Abp.Identity:DuplicateUserName":
            "'{0}' kullanıcı adı zaten alınmış.",
          "Volo.Abp.Identity:InvalidEmail": "'{0}' email adresi hatalı.",
          "Volo.Abp.Identity:InvalidPasswordHasherCompatibilityMode":
            "Belirtilen PasswordHasherCompatibilityMode geçersiz.",
          "Volo.Abp.Identity:InvalidPasswordHasherIterationCount":
            "Iterasyon sayısı sıfırdan büyük bir sayı olmalı.",
          "Volo.Abp.Identity:InvalidRoleName": "'{0}' rol ismi geçersizdir.",
          "Volo.Abp.Identity:InvalidToken": "Geçersiz token.",
          "Volo.Abp.Identity:InvalidUserName":
            "'{0}' kullanıcı adı geçersiz, sadece harf ve rakamlardan oluşmalı.",
          InvalidUserName: "'{0}' kullanıcı adı geçersiz.",
          "Volo.Abp.Identity:LoginAlreadyAssociated":
            "Bu giriş bilgilerine sahip bir kullanıcı zaten var.",
          "Volo.Abp.Identity:PasswordMismatch": "Hatalı şifre.",
          "Volo.Abp.Identity:PasswordRequiresDigit":
            "Şifre en az bir sayı içermeli ('0'-'9').",
          "Volo.Abp.Identity:PasswordRequiresLower":
            "Şifre en az bir küçük harf içermeli ('a'-'z').",
          "Volo.Abp.Identity:PasswordRequiresNonAlphanumeric":
            "Şifre en az bir sayı ya da harf olmayan karakter içermeli.",
          "Volo.Abp.Identity:PasswordRequiresUpper":
            "Şifre en az bir büyük harf içermeli ('A'-'Z').",
          "Volo.Abp.Identity:PasswordTooShort":
            "Şifre en az {0} karakter uzunluğunda olmalı.",
          "Volo.Abp.Identity:PasswordRequiresUniqueChars":
            "Şifre en az {0} farklı karakter içermeli.",
          "Volo.Abp.Identity:RoleNotFound": "{0} rolü bulunamadı.",
          "Volo.Abp.Identity:UserAlreadyHasPassword":
            "Kullanıcının zaten bir şifresi var.",
          "Volo.Abp.Identity:UserAlreadyInRole":
            "Kullanıcı zaten '{0}' rolünde.",
          "Volo.Abp.Identity:UserLockedOut": "Kullanıcı hesabı kilitlenmiş.",
          "Volo.Abp.Identity:UserLockoutNotEnabled":
            "Bu kullanıcı için hesap kilitleme etkin değil.",
          "Volo.Abp.Identity:UserNameNotFound": "{0} kullanıcısı bulunamadı.",
          "Volo.Abp.Identity:UserNotInRole": "Kullanıcı '{0}' rolünde değil.",
          "Volo.Abp.Identity:PasswordConfirmationFailed":
            "Yeni şifre ile onay şifresi uyuşmuyor.",
          "Volo.Abp.Identity:NullSecurityStamp":
            "Kullanıcı güvenlik damgası boş olamaz.",
          "Volo.Abp.Identity:RecoveryCodeRedemptionFailed":
            "Kurtarma kodu kullanılamadı.",
          "Volo.Abp.Identity:010001": "Kendi hesabınızı silemezsiniz!",
          "Volo.Abp.Identity:010002":
            "Bir kullanıcı en fazla {MaxUserMembershipCount} organizasyon birimine üye olabilir!",
          "Volo.Abp.Identity:010003":
            "Kimliği dışarıdan alınan kullanıcıların şifresi değiştirilemez!",
          "Volo.Abp.Identity:010004":
            "{0} isminde bir birim zaten var. Aynı seviyede aynı isimli iki birim olamaz.",
          "Volo.Abp.Identity:010005": "Bir Sabit rolün ismi değiştirilemez.",
          "Volo.Abp.Identity:010006": "Bir Sabit rol silinemez.",
          "Volo.Abp.Identity:010007":
            "İki faktörlü ayarınızı değiştiremezsiniz.",
          "Volo.Abp.Identity:010008":
            "İki faktörlü ayarın değiştirilmesine izin verilmez.",
          "Volo.Abp.Identity:010009": "Kendinizi yetkilendiremezsiniz.",
          "Volo.Abp.Identity:010021": "{0} isminde bir birim zaten var.",
          "Identity.OrganizationUnit.MaxUserMembershipCount":
            "Bir kullanıcı için izin verilen en fazla organizasyon birimi sayısı",
          ThisUserIsNotActiveMessage: "Bu kullanıcı aktif değil.",
          "Permission:IdentityManagement": "Kimlik yönetimi",
          "Permission:RoleManagement": "Rol yönetimi",
          "Permission:Create": "Oluşturma",
          "Permission:Edit": "Düzenleme",
          "Permission:Delete": "Silme",
          "Permission:ChangePermissions": "İzinleri değiştirme",
          "Permission:UserManagement": "Kullanıcı yönetimi",
          "Permission:UserLookup": "Kullanıcı sorgulama",
          "DisplayName:Abp.Identity.Password.RequiredLength": "Uzunluk gerekli",
          "DisplayName:Abp.Identity.Password.RequiredUniqueChars":
            "Tekil karakter gerekli",
          "DisplayName:Abp.Identity.Password.RequireNonAlphanumeric":
            "Alfasayısal olmayan karakter gerekli",
          "DisplayName:Abp.Identity.Password.RequireLowercase":
            "Küçük harf gerekli",
          "DisplayName:Abp.Identity.Password.RequireUppercase":
            "Büyük harf gerekli",
          "DisplayName:Abp.Identity.Password.RequireDigit": "Rakam gerekli",
          "DisplayName:Abp.Identity.Password.ForceUsersToPeriodicallyChangePassword":
            "Kullanıcıların periyodik olarak şifrelerini değiştirmelerini zorla",
          "DisplayName:Abp.Identity.Password.PasswordChangePeriodDays":
            "Şifre değiştirme periyodu (gün)",
          "DisplayName:Abp.Identity.Lockout.AllowedForNewUsers":
            "Yeni kullanıcılar için aktif",
          "DisplayName:Abp.Identity.Lockout.LockoutDuration":
            "Kilitli kalma süresi (saniye)",
          "DisplayName:Abp.Identity.Lockout.MaxFailedAccessAttempts":
            "Maksimum başarısız giriş denemesi",
          "DisplayName:Abp.Identity.SignIn.RequireConfirmedEmail":
            "Onaylı e-posta gerekli",
          "DisplayName:Abp.Identity.SignIn.EnablePhoneNumberConfirmation":
            "Telefon numarası onayını etkin",
          "DisplayName:Abp.Identity.SignIn.RequireConfirmedPhoneNumber":
            "Onaylı telefon numarası gerekli",
          "DisplayName:Abp.Identity.User.IsUserNameUpdateEnabled":
            "Kullanıcı adı güncellenebilir",
          "DisplayName:Abp.Identity.User.IsEmailUpdateEnabled":
            "E-posta güncellenebilir",
          "Description:Abp.Identity.Password.RequiredLength":
            "Minimum parola uzunluğu.",
          "Description:Abp.Identity.Password.RequiredUniqueChars":
            "Bir parolanın içermesi gereken minimum tekil karakter sayısı.",
          "Description:Abp.Identity.Password.RequireNonAlphanumeric":
            "Parolaların alfasayısal olmayan bir karakter içermesi gerekiyorsa.",
          "Description:Abp.Identity.Password.RequireLowercase":
            "Parolaların küçük harfli bir ASCII karakteri içermesi gerekiyorsa.",
          "Description:Abp.Identity.Password.RequireUppercase":
            "Parolaların büyük harfli bir ASCII karakteri içermesi gerekiyorsa.",
          "Description:Abp.Identity.Password.RequireDigit":
            "Parolaların bir rakam içermesi gerekiyorsa.",
          "Description:Abp.Identity.Password.ForceUsersToPeriodicallyChangePassword":
            "Kullanıcıların periyodik olarak şifrelerini değiştirmelerini zorla.",
          "Description:Abp.Identity.Password.PasswordChangePeriodDays":
            "Kullanıcıların şifrelerini değiştirmeleri gereken gün sayısı.",
          "Description:Abp.Identity.Lockout.AllowedForNewUsers":
            "Yeni kullanıcılar kilitlenebilir.",
          "Description:Abp.Identity.Lockout.LockoutDuration":
            "Kilitlenme olduğunda, ne kadar kilitli kalacağı.",
          "Description:Abp.Identity.Lockout.MaxFailedAccessAttempts":
            "Kilitleme etkin olduğunda, kullanıcıya kilitlenmeden önce izin verilen başarısız giriş sayısı.",
          "Description:Abp.Identity.SignIn.RequireConfirmedEmail":
            "Oturum açmak için onaylanmış bir e-posta adresinin gerekli olup olmadığı.",
          "Description:Abp.Identity.SignIn.EnablePhoneNumberConfirmation":
            "Oturum açmak için telefon numarası gerekli",
          "Description:Abp.Identity.SignIn.RequireConfirmedPhoneNumber":
            "Oturum açmak için onaylanmış bir telefon numarasının gerekli olup olmadığı.",
          "Description:Abp.Identity.User.IsUserNameUpdateEnabled":
            "Kullanıcı adının, kullanıcının kendisi tarafından güncellenebilirliği.",
          "Description:Abp.Identity.User.IsEmailUpdateEnabled":
            "E-posta alanının, kullanıcının kendisi tarafından güncellenebilirliği",
          Details: "Detaylar",
          CreatedBy: "Oluşturan",
          ModifiedBy: "Düzenleyen",
          ModificationTime: "Düzenleme zamanı",
          PasswordUpdateTime: "Şifre güncelleme zamanı",
          LockoutEndTime: "Kilitlenme bitiş zamanı",
          FailedAccessCount: "Başarısız giriş denemesi sayısı",
          "Feature:IdentityGroup": "Kimlik",
          "Feature:TwoFactor": "İki faktörlü kimlik doğrulama",
          "Feature:TwoFactorDescription":
            "İki faktörlü kimlik doğrulamanın talep edileceği durumu seçin",
          "Feature:TwoFactor.Optional": "İsteğe bağlı",
          "Feature:TwoFactor.Disabled": "Asla",
          "Feature:TwoFactor.Forced": "Her zaman",
          "Feature:EnableLdapLogin": "Ldap girişini etkinleştir",
          "Feature:EnableLdapLoginDescription": "Ldap girişini etkinleştir",
          "Feature:EnableOAuthLogin": "OAuth girişini etkinleştir",
          "Feature:EnableOAuthLoginDescription": "OAuth girişini etkinleştir",
          "DisplayName:Abp.Identity.TwoFactorBehaviour":
            "İki faktörlü kimlik doğrulama davranışı",
          "Description:Abp.Identity.TwoFactorBehaviour":
            "İki faktörlü kimlik doğrulama davranışı",
          "DisplayName:Abp.Identity.UsersCanChange":
            "Kullanıcıların iki faktörlü kimlik doğrulama davranışını değiştirmelerine izin verin.",
          "Description:Abp.Identity.UsersCanChange":
            "Kullanıcıların iki faktörlü kimlik doğrulama davranışını değiştirmelerine izin verin",
          "DisplayName:Abp.Identity.EnableLdapLogin": "Ldap girişi",
          "Description:Abp.Identity.EnableLdapLogin":
            "Ldap girişini etkinleştir",
          "DisplayName:Abp.Identity.EnableOAuthLogin":
            "OAuth girişini etkinleştir",
          "Description:Abp.Identity.EnableOAuthLogin": "OAuth girişi",
          "DisplayName:Abp.Identity.Authority": "Yetki",
          "Description:Abp.Identity.Authority": "Yetki",
          "DisplayName:Abp.Identity.ClientId": "Müşteri Kimliği",
          "Description:Abp.Identity.ClientId": "Müşteri Kimliği",
          "DisplayName:Abp.Identity.ClientSecret": "İstemci Sırrı",
          "Description:Abp.Identity.ClientSecret": "İstemci Sırrı",
          "DisplayName:Abp.Identity.Scope": "Kapsam",
          "Description:Abp.Identity.Scope": "Kapsam",
          "DisplayName:Abp.Identity.RequireHttpsMetadata":
            "Https Meta Verileri Gerektir",
          "Description:Abp.Identity.RequireHttpsMetadata":
            "Https Meta Verileri Gerektir",
          "DisplayName:Abp.Identity.ValidateEndpoints":
            "Uç Noktalarını Doğrula",
          "Description:Abp.Identity.ValidateEndpoints":
            "Uç Noktalarını Doğrula",
          "DisplayName:Abp.Identity.ValidateIssuerName": "Veren Adını Doğrula",
          "Description:Abp.Identity.ValidateIssuerName": "Veren Adını Doğrula",
          "Feature:MaximumUserCount": "Kullanıcı sayısı limiti",
          "Feature:MaximumUserCountDescription": "0 = limitsiz",
          "Volo.Abp.Identity:010015":
            "İzin verilen kullanıcı sayısına ulaşıldı! Bu müşteri için en fazla {MaxUserCount} kullanıcı oluşturulabilir.",
          LdapPasswordPlaceholder: "Şifreyi güncellemek için girin",
          LdapLoginSettings: "Ldap login ayarları",
          OAuthLoginSettings: "OAuth login ayarları",
          "Menu:Identity:Ldap": "Hesap Ldap",
          IdentitySettingsLdap: "Ldap",
          IdentitySettingsOAuth: "OAuth",
          IdentitySettingsGeneral: "Genel",
          ClaimValueCanNotBeBlank: "Claim değeri boş bırakılamaz!",
          ClaimValue: "Değer",
          Date: "Tarih",
          ThereIsNoUsersCurrentlyInThisRole: "Bu rolde şu anda kullanıcı yok.",
          UserCount: "Kullanıcı sayısı",
          ThereIsNoUsersCurrentlyInThisOrganizationUnit:
            "Bu birimde şu anda kullanıcı yok.",
          ClaimValueIsInvalid: "'{0}' claim değeri geçersizdir.",
          "Permission:ClaimManagement": "Talep yönetimi",
          "Permission:ViewChangeHistory": "Değişiklik geçmişini görüntüleme",
          "Permission:Impersonation": "Kimliğe bürünme",
          "Permission:SettingManagement": "Ayar yönetimi",
          "Permission:OrganizationUnitManagement":
            "Organizasyon Birimleri yönetimi",
          "Permission:ManageOU": "Organizasyon ağacını yönetme",
          "Permission:ManageUsers": "Kullanıcıları yönetme",
          "Permission:ManageRoles": "Rolleri yönetme",
          "Permission:SecurityLogs": "Güvenlik günlükleri",
          "Permission:Import": "İçe aktar",
          "Menu:SecurityLogs": "Güvenlik günlükleri",
          Lock: "Hesabı kilitle",
          Unlock: "Kilidi kaldır",
          "UserLockoutNotEnabled{0}":
            "Kullanıcı '{0}' kilitleme işlevi etkin değil!",
          TwoFactor: "İki aşamalı doğrulama",
          HideShow: "Gizle / Göster",
          Name: "İsim",
          UserInformation: "Kullanıcı bilgisi",
          ClaimTypes: "Talep tipleri",
          "Roles{0}": "Roller ({0})",
          Members: "Üyeler",
          OrganizationUnits: "Organizasyon Birimleri",
          "OrganizationUnits{0}": "Org. birimleri ({0})",
          "OrganizationUnit:Parent{0}": "Üst birim: {0}",
          "OrganizationUnit:Root": "Kök birim",
          Type: "Tür",
          Claims: "Talepler",
          NewClaimType: "Yeni Talep Tipi",
          ValueType: "Veri türü",
          Description: "Açıklama",
          Required: "Gerekli",
          Regex: "Regex",
          RegexDescription: "Regex açıklaması",
          RegexDescriptionFormText: "Localization key kullanın",
          IsStatic: "Değişmez",
          ClaimTypeDeletionConfirmationMessage:
            "'{0}' talep tipi silinecektir. Onaylıyor musunuz?",
          ChooseAnActionForRole:
            "Silmek istediğiniz role ait {0} kullanıcı vardır. Lütfen bu kullanıcılar için bir işlem seçin:",
          UnassignTheRoleFromTheUsers: "Kullanıcılardan bu rolü kaldır",
          AssignUsersToOtherRole: "Kullanıcıları başka bir role taşı",
          SelectAnRoleToAssign: "Atamak için bir rol seçin",
          MoveAllUsers: "Kullanıcıları taşı",
          MoveAllUsersWithRoleTo:
            "<b>{0}</b> rolündeki kullanıcıları şu role taşı:",
          UnassignRole: "Rolü Kaldır",
          OrganizationUnitDeletionConfirmationMessage:
            "'{0}' organizasyon birimi silinecektir. Onaylıyor musunuz?",
          ChooseAnActionForOrganizationUnit:
            "There are {0} users assigned to the organization unit you are trying to delete. Please choose an action for these users:",
          UnassignTheOrganizationUnitFromTheUsers:
            "Unassign the organization unit from the users",
          AssignUsersToOtherOrganizationUnit:
            "Assign users to other organization unit",
          SelectAnOrganizationUnitToAssign:
            "Select an organization unit to assign",
          MoveAllUsersWithOrganizationUnitTo:
            "Move all users with <b>{0}</b> organization unit to:",
          UnassignOrganizationUnit: "Unassign organization unit",
          OrganizationUnitMoveSameParentMessage:
            "Birim aynı birim altına taşınamaz.",
          SelectUsers: "Kullanıcıları seçin",
          SelectRoles: "Rolleri seçin",
          "DisplayName:AccessFailedCount": "Hatalı Erişim Sayısı",
          "DisplayName:EmailConfirmed": "Email Onaylandı",
          "DisplayName:EmailAddress": "E-posta adresi",
          "DisplayName:ShouldChangePasswordOnNextLogin":
            "İlk girişte şifre değiştirilmesi zorunlu olsun",
          "DisplayName:SendConfirmationEmail": "Onay e-postası gönder",
          SelectAnOrganizationUnitToSeeMembers:
            "Üyelerini görebilmek için bir birim seçiniz",
          SelectAnOrganizationUnitToSeeRoles:
            "Rolleri görebilmek için bir birim seçiniz",
          RemoveUserFromOuWarningMessage:
            "{0} isimli kullanıcıyı {1} biriminden çıkartmak istediğinizden emin misiniz?",
          RemoveRoleFromOuWarningMessage:
            "{0} isimli rolü {1} biriminden çıkartmak istediğinizden emin misiniz?",
          OrganizationTree: "Organizasyon ağacı",
          AddRootUnit: "Kök birim ekle",
          AddSubUnit: "Alt birim ekle",
          AddRole: "Rol ekle",
          AddMember: "Üye ekle",
          LastModificationTime: "Son düzenlenme zamanı",
          GenerateRandomPasswordTooltip: "Rastgele şifre oluştur",
          SavedSuccessfully: "Başarıyla kaydedildi",
          DeletedSuccessfully: "Başarıyla silindi",
          PasswordStrengthSettings: "Şifre gücü ayarları",
          PasswordRenewingSettings: "Şifre Yenileme Ayarları",
          SetPassword: "Şifre Belirle",
          PasswordsAreNotSame: "Girilen şifreler eşit değil",
          UserNotFound: "Kullanıcı mevcut değil",
          LockoutSettings: "Kilit Ayarları",
          SignInSettings: "Giriş Yapma Ayarları",
          PasswordSettings: "Şifre Ayarları",
          UserSettings: "Kullanıcı Ayarları",
          "DisplayName:LockoutEnd": "Kilitleme bitiş tarihi",
          ThisUserIsLockedOutMessage:
            'Bu kullanıcı kilitlenmiş. Kilidi açmak için önce Aksiyonlar\'a, sonra da "Kilidi aç" butonuna tıklayınız.',
          UserUnlocked: "Kullanıcının üzerindeki kilit kaldırıldı.",
          NotActive: "Aktif değil",
          AddClaim: "Talep ekle",
          ClaimAlreadyExist: "Talep zaten mevcut",
          ChangeHistory: "Değişiklik Geçmişi",
          LoginWithThisUser: "Bu kullanıcıyla giriş yap",
          NewOrganizationUnit: "Yeni birim",
          DisplayName: "Ad",
          OrganizationUnitMoveConfirmMessage:
            "'{0}' birimini '{1}' altına taşımayı onaylıyor musunuz?",
          NoOrganizationUnits: "Organizasyon birimleri yok!",
          OrganizationUnitDuplicateDisplayNameWarning:
            "Organizasyonun görüntülünen isim alanı zaten mevcut. Lütfen farklı bir tane yazınız.",
          SecurityLogs: "Güvenlik Logları",
          "SecurityLogs:StartTime": "Başlangıç Zamanı",
          "SecurityLogs:EndTime": "Bitiş Zamanı",
          "SecurityLogs:Application": "Uygulama",
          "SecurityLogs:ApplicationDescription": "Uygulama Adı",
          "SecurityLogs:Identity": "Kimlik",
          "SecurityLogs:IdentityDescription":
            "Günlüklerin kaynağı. Örneğin: Identity, IdentityExternal, IdentityServer, OpenIddict",
          "SecurityLogs:Action": "Aksiyon",
          "SecurityLogs:ActionDescription":
            "Güvenlik eylemi. eg:login_successful, login_failed, logout",
          "SecurityLogs:UserName": "Kullanıcı adı",
          "SecurityLogs:Client": "Client",
          "SecurityLogs:CorrelationId": "Korelasyon Id",
          "SecurityLogs:Date": "Tarih",
          "SecurityLogs:IpAddress": "Ip Adresi",
          "SecurityLogs:Browser": "Tarayıcı",
          InvalidLinkToken: "Geçersiz bağlantı belirteci",
          SelectedOrganizationUnit: "Seçilen Organizasyon Birimi",
          Move: "Taşı",
          MoveOrganizationUnit: "Taşı: {0}",
          SeeAdvancedFilters: "Gelişmiş Filtreler",
          Role: "Rol",
          OrganizationUnit: "Organizasyon birimi",
          UserNameOrEmailAddress: "Kullanıcı adı veya e-posta",
          Provider: "Sağlayıcı",
          NoExternalLoginProviderAvailable:
            "Harici oturum açma sağlayıcısı yok",
          ExternalUser: "Harici kullanıcı",
          "Volo.Abp.Identity:010010": "Geçersiz harici oturum açma sağlayıcısı",
          "Volo.Abp.Identity:010011":
            "Harici oturum açma sağlayıcısı kimlik doğrulaması başarısız oldu",
          "Volo.Abp.Identity:010012": "Bu kullanıcı adı zaten mevcut",
          Import: "İçe aktar",
          True: "Doğru",
          False: "YANLIŞ",
          Tenant: "Müşteri",
          CreationStartDate: "Oluşturma başlangıç tarihi",
          CreationEndDate: "Oluşturma bitiş tarihi",
          CreationDate: "Oluşturulma tarihi",
          ModificationStartDate: "Değiştirme başlangıç tarihi",
          ModificationEndDate: "Değiştirme bitiş tarihi",
          ModificationDate: "Değiştirme tarihi",
          EmailConfirmed: "Email onaylandı",
          IsExternal: "Harici",
          External: "Harici",
          ViewDetails: "Detayları görüntüle",
          "Permission:ViewDetails": "Detayları görüntüle",
          Dash: "-",
          Export: "Dışa aktar",
          ToExcel: "Excel'e aktar",
          ToCSV: "CSV'ye aktar",
          UploadFile: "Dosya yükle",
          ChooseFile: "Dosya seç",
          Upload: "Yükle",
          ClickHereToDownloadSampleImportFile:
            "İçe aktarma için örnek dosyayı indirmek için buraya tıklayın",
          PleaseSelectFile: "Lütfen Dosya Seçin",
          DownloadTemplateFile: "Şablon dosyasını indir",
          ImportSuccessMessage: "İçe aktarma işlemi başarıyla tamamlandı.",
          ImportFailedMessage:
            "Tüm kullanıcılar içe aktarılmadı, başarılı: {0} başarısız: {1}. Geçersiz kullanıcı dosyasını indirmek ister misiniz?",
          "Permission:Export": "Dışa aktar",
          "Volo.Abp.Identity:010013": "Dosyada kullanıcı bulunamadı.",
          FromExcel: "Excel'den aktar",
          FromCSV: "CSV'den aktar",
          Active: "Aktif",
          PleaseSelectAFile: "Lütfen bir dosya seçin",
          "Volo.Abp.Identity:010014": "Geçersiz dosya biçimi",
          "{0}IsStaticRoleCanNotBeRenamed":
            "{0} rolü sabit rol olduğu için adı değiştirilemez",
        },
        baseResources: ["AbpValidation", "AbpLdap"],
      },
      AbpLdap: {
        texts: {
          "DisplayName:Abp.Ldap.Ldaps": "SSL üzerinden LDAP",
          "Description:Abp.Ldap.Ldaps": "SSL üzerinden LDAP",
          "DisplayName:Abp.Ldap.ServerHost": "Sunucu Ana Bilgisayarı",
          "Description:Abp.Ldap.ServerHost": "Sunucu Ana Bilgisayarı",
          "DisplayName:Abp.Ldap.ServerPort": "Sunucu portu",
          "Description:Abp.Ldap.ServerPort": "Sunucu portu",
          "DisplayName:Abp.Ldap.BaseDc": "Temel alan bileşeni",
          "Description:Abp.Ldap.BaseDc": "Temel alan bileşeni",
          "DisplayName:Abp.Ldap.Domain": "Alan adı",
          "Description:Abp.Ldap.Domain": "Alan adı",
          "DisplayName:Abp.Ldap.UserName": "Kullanıcı adı",
          "Description:Abp.Ldap.UserName": "Kullanıcı adı",
          "DisplayName:Abp.Ldap.Password": "Parola",
          "Description:Abp.Ldap.Password": "Parola",
        },
        baseResources: [],
      },
      AbpPermissionManagement: {
        texts: {
          Permissions: "İzinler",
          OnlyProviderPermissons: "Sadece bu sağlayıcı",
          All: "Hepsi",
          SelectAllInAllTabs: "Tüm izinleri ver",
          SelectAllInThisTab: "Hepsini seç",
          SaveWithoutAnyPermissionsWarningMessage:
            "Hiçbir izin olmadan kaydetmek istediğinize emin misiniz?",
        },
        baseResources: ["AbpValidation"],
      },
      AbpAccount: {
        texts: {
          "Volo.Account:InvalidEmailAddress": "Email adresi bulunamadı:{0}",
          "Volo.Account:SelfRegistrationDisabled":
            "Kendi kendine kayıt olma devre dışı!",
          "Volo.Account:PhoneNumberEmpty": "Telefon numarası boş!",
          "Volo.Account:PhoneNumberConfirmationDisabled":
            "Telefon numarası doğrulama devre dışı!",
          "Volo.Account:InvalidUserToken": "Invalid user token!",
          "Volo.Account:UnsupportedTwoFactorProvider":
            "Unsupported Two factor provider!",
          "Volo.Account:ImpersonateTenantOnlyAvailableForHost":
            "Impersonate tenant only available for host!",
          "Volo.Account:RequirePermissionToImpersonateTenant":
            "Require {PermissionName} permission to impersonate tenant!",
          "Volo.Account:ThereIsNoUserWithUserName":
            "There is no user with username: {UserName}!",
          "Volo.Account:YouCanNotImpersonateYourself":
            "You can't impersonate yourself!",
          "Volo.Account:NestedImpersonationIsNotAllowed":
            "Nested impersonation is not allowed!",
          "Volo.Account:RequirePermissionToImpersonateUser":
            "Require {PermissionName} permission to impersonate user!",
          "Volo.Account:ThereIsNoUserWithId":
            "There is no user with id:{UserId}!",
          "Volo.Account:InvalidAccessToken": "Invalid access_token!",
          "Volo.Account:InvalidTenantIdOrUserId": "Invalid TenantId or UserId!",
          "Volo.Account:InvalidUserDelegationId": "Invalid UserDelegationId!",
          "Volo.Account:DelegatedImpersonationIsDisabled":
            "Yetki devretme devre dışı!",
          "Volo.Account:UserDelegationIsNotAvailableForImpersonatedUsers":
            "Yetki devretme kullanıcılar için kullanılamaz!",
          "Volo.Account:ImpersonateError": "Yetki devretme hatası!",
          "Volo.Account:StartTimeMustBeLessThanEndTime":
            "Başlangıç zamanı bitiş zamanından önce olmalıdır!",
          DelegatedImpersonation: "Yetki devretme",
          BackToImpersonator: "Kendi hesabına dön",
          SwitchToUser: "Kullanıcıya geç",
          ExpiresAt: "Bitiş tarihi",
          AuthorityDelegation: "Yetki devretme",
          DelegateNewUser: "Yeni kullanıcıya yetki devret",
          DelegatedUsers: "Yetki devretmiş kullanıcılar",
          MyDelegatedUsers: "Yetki devretmiş kullanıcılarım",
          DelegationDateRange: "Yetki devretme tarih aralığı",
          StartTime: "Başlangıç zamanı",
          EndTime: "Bitiş zamanı",
          Status: "Durum",
          StatusActive: "Aktif",
          StatusExpired: "Süresi dolmuş",
          StatusFuture: "Gelecek",
          DeleteUserDelegationConfirmationMessage:
            "Bu yetki devretme işlemini silmek istediğinize emin misiniz '{0}'?",
          "AuthorityDelegation:PleaseSelectUser": "Lütfen bir kullanıcı seçin",
          "AuthorityDelegation:PleaseSelectDelegationDateRange":
            "Lütfen bir yetki devretme tarih aralığı seçin",
          PasswordReset: "Şifre Sıfırlama",
          PasswordResetInfoInEmail:
            "Şifrenizi sıfırlamanız için bir talep aldık! Eğer bu talebi siz gerçekleştirmişseniz, şifrenizi sıfırlamak için bağlantıya tıklayın.",
          ResetMyPassword: "Şifremi sıfırla",
          NotAMemberYet: "Üye değil misiniz?",
          OrSignInWith: "Ya da bunlardan biriyle giriş yapın",
          EmailConfirmation: "E-posta Doğrulama",
          EmailConfirmationInfoInEmail:
            "Lütfen bağlantıya tıklayarak e-posta adresinizi doğrulayın.",
          ConfirmMyEmail: "E-posta adresimi doğrula",
          UserName: "Kullanıcı adı",
          EmailAddress: "E-posta adresi",
          UserNameOrEmailAddress: "Kullanıcı adı veya e-posta",
          Password: "Şifre",
          RememberMe: "Beni hatırla",
          SelectedProvider: "Seçilen sağlayıcı",
          UseAnotherServiceToLogin: "Başka bir servisle giriş yap",
          UserLockedOut: "Kilitli!",
          UserLockedOutMessage:
            "Hesabınız yönetici tarafından veya geçersiz giriş denemeleri nedeniyle kilitlendi. Lütfen daha sonra tekrar deneyin. Bunun bir hata olduğunu düşünüyorsanız, sistem yöneticinize başvurun.",
          InvalidUserNameOrPassword: "Kullanıcı adı ya da şifre geçersiz!",
          LoginIsNotAllowed:
            "Giriş yapmanıza izin verilmiyor! Hesabınız etkin değil veya e-postanızı/telefon numaranızı onaylamanız gerekiyor.",
          SelfRegistrationDisabledMessage:
            "Bu uygulama için kullanıcıların kendi kendilerine kaydolmaları engellenmiştir. Yeni bir kullanıcı kaydetmek için lütfen uygulama yöneticisi ile iletişime geçin.",
          VerifySecurityCodeNotLoggedInErrorMessage:
            "Kendinizi doğrulamadan önce giriş yapmalısınız. Muhtemelen zaman aşımı olmuş olabilir. Lütfen giriş sayfasına gidip tekrar deneyin.",
          InvalidSecurityCode: "Geçersiz güvenlik kodu!",
          EmailSecurityCodeBody: "Güvenlik kodunuz: {0}",
          EmailSecurityCodeSubject: "Güvenlik Kodu",
          VerifySecurityCode_Information:
            "Lütfen size gönderilen doğrulama kodunu girin.",
          SendSecurityCode_Information:
            "Giriş yapabilmeniz için siz olduğunuzu doğrulamanız gerekmektedir. Lütfen bir doğrulama türü seçin. Seçmiş olduğunuz türe göre size bir doğrulama kodu gönderilecektir.",
          ForgotPassword: "Şifremi unuttum",
          SendPasswordResetLink_Information:
            "E-posta adresinize bir şifre sıfırlama bağlantısı gönderilecektir. Birkaç dakika içerisinde bir e-posta almazsanız lütfen tekrar deneyin.",
          PasswordResetMailSentMessage:
            "E-posta adresinize bir şifre sıfırlama bağlantısı gönderilmiştir. Lütfen e-posta adresinizi kontrol ediniz. Eğer 15 dakika içinde, bu e-postayı gelen kutusunda bulamazsanız, gereksiz veya istenmeyen e-posta kutularına bakınız.",
          ResetPassword: "Şifre Yenileme",
          ConfirmPassword: "Şifre (tekrar)",
          ResetPassword_Information: "Lütfen yeni şifrenizi belirleyin.",
          YourPasswordIsSuccessfullyReset: "Şifreniz başarıyla sıfırlandı.",
          YourEmailAddressIsSuccessfullyConfirmed:
            "E-posta adresiniz başarıyla doğrulandı. Teşekkürler!",
          GoToTheHomePage: "Ana sayfaya git",
          TwoFactorVerification: "İki fazlı doğrulama",
          BackToLogin: "Girişe dön",
          AlreadyRegistered: "Zaten kayıtlı mısınız?",
          "Permission:Account": "Hesap",
          "Permission:SettingManagement": "Ayar yönetimi",
          TwoFactorAuthentication: "İki Faktörlü Kimlik Doğrulama",
          "DisplayName:IsSelfRegistrationEnabled": "Kendi kendine kayıt etkin",
          "Description:IsSelfRegistrationEnabled":
            "Kullanıcının hesabını kendi kendine kayıt edip edemeyeceğini belirtir",
          "DisplayName:IsRememberBrowserEnabled": "Tarayıcıyı hatırlama etkin",
          "Menu:Account": "Hesap",
          "Menu:Account.ExternalProvider": "Hesap Harici Sağlayıcı",
          AccountSettingsGeneral: "Genel",
          AccountSettingsTwoFactor: "iki faktör",
          TwoFactorHasBeenDisabled: "İki faktör devre dışı bırakıldı.",
          "DisplayName:CurrentPassword": "Mevcut şifre",
          "DisplayName:NewPassword": "Yeni Şifre",
          "DisplayName:NewPasswordConfirm": "Yeni şifre onay",
          PasswordChangedMessage: "Şifreniz başarıyla değiştirildi.",
          "DisplayName:UserName": "Kullanıcı adı",
          "DisplayName:Email": "Email",
          "DisplayName:Name": "İsim",
          "DisplayName:Surname": "Soyisim",
          "DisplayName:Password": "Şifre",
          "DisplayName:EmailAddress": "Email adresi",
          "DisplayName:PhoneNumber": "Telefon numarası",
          "DisplayName:Timezone": "Zaman dilimi",
          PersonalSettings: "Kişisel ayarlar",
          PersonalSettingsSaved: "Kişisel ayarlar kaydedildi",
          PersonalSettingsChangedConfirmationModalTitle:
            "Kişisel ayarlar değişti",
          PersonalSettingsChangedConfirmationModalDescription:
            "Eğer güncel bilgilerin sisteme uygulanmasını istiyorsanız, oturumunuzu kapatıp, tekrar açmalısınız. Oturumu kapatmak ister misiniz?",
          PasswordChanged: "Şifre değiştirildi",
          TwoFactorChanged: "İki faktörlü ayar kaydedildi",
          "DisplayName:TwoFactorEnabled": "İki faktör etkin",
          TwoFactorEnabledInfo:
            "Tüm iki faktör sağlayıcılarını kaldırırsanız, iki faktör devre dışı bırakılır.",
          YouHaveToEnableAtLeastOneTwoFactorProvider:
            "İki faktörü etkinleştirmek için en az bir iki faktör sağlayıcıyı etkinleştirmelisiniz!",
          NewPasswordConfirmFailed: "Lütfen yeni şifreyi onaylayın.",
          NewPasswordSameAsOld: "Yeni şifre eski şifre ile aynı olamaz.",
          Manage: "Yönet",
          MyAccount: "Hesabım",
          UserInformation: "Kullanıcı bilgisi",
          "DisplayName:EnableLocalLogin":
            "Yerel hesapla giriş yapabilmeye izin ver",
          "Description:EnableLocalLogin":
            "Sunucunun kullanıcıların yerel hesaplarla giriş yapabilmesine izin verip vermediğini belirtir",
          "Feature:AccountGroup": "Hesap",
          DoYouWantToVerifyPhoneNumberMessage:
            "Telefon numarası bilginizi değiştirdiniz. Şimdi doğrulamak ister misiniz?",
          InvalidPhoneConfirmationToken: "Doğrulama kodu yanlış!",
          ConfirmYourPhoneNumber: "Telefon numaranızı doğrulayın",
          Verify: "Doğrula",
          Verified: "Doğrulandı",
          NotVerified: "Doğrulanmadı",
          FirstlySubmitToVerify:
            "Yeni bilgilerinizi kaydettikten sonra doğrulayabilirsiniz.",
          EmailConfirmationSentMessage:
            "Eposta adresinizie doğrulama kodu gönderilmiştir ({0}).",
          ConfirmationTokenSentMessage:
            "Telefon numaranıza bir doğrulama kodu gönderildi.",
          PhoneConfirmationToken:
            "Lütfen bu kodu aşağıdaki alana girerek telefon numaranızı doğrulayın:",
          PhoneConfirmationSms:
            "Selam {0}! Telefon numaranı doğrulamak için bu kodu kullan: {1}",
          ConfirmUser: "E-postanızı/telefon numaranızı onaylayın",
          PhoneNumberEmptyHelpText:
            "Telefon numaranız yok, Doğrula onu ayarlayacak.",
          "TextTemplate:Abp.Account.Layout": "Hesap e-posta şablonu",
          "TextTemplate:Abp.Account.PasswordResetLink":
            "Şifre sıfırlama e-postası",
          "TextTemplate:Abp.Account.EmailConfirmationLink":
            "E-posta doğrulama e-postası",
          "TextTemplate:Abp.Account.EmailSecurityCode": "E-posta güvenlik kodu",
          LoggedOutTitle: "Çıkış Yaptınız",
          LoggedOutText: "Çıkış yaptınız ve birazdan yönlendirileceksiniz.",
          ReturnToText: "Uygulamaya dönmek için tıklayın",
          MySecurityLogs: "Güvenlik loglarım",
          "MySecurityLogs:StartTime": "Başlangıç Zamanı",
          "MySecurityLogs:EndTime": "Bitiş Zamanı",
          "MySecurityLogs:Application": "Uygulama",
          "MySecurityLogs:Identity": "Kimlik",
          "MySecurityLogs:Action": "Aksiyon",
          "MySecurityLogs:Client": "Client",
          "MySecurityLogs:Time": "Zaman",
          "MySecurityLogs:CorrelationId": "Korelasyon Id",
          "MySecurityLogs:IpAddress": "Ip Adresi",
          "MySecurityLogs:Browser": "Tarayıcı",
          LoginToTheApplication: "Uygulamaya git",
          RememberBrowser: "Bu tarayıcıyı hatırla",
          Code: "Kod",
          ProfilePicture: "Profil Fotoğrafı",
          MoveCursorOnExamples:
            "Daire stildeki hallerini görmek için işaretçinizi resimlerin üstüne getiriniz.",
          ProfilePictureWillBeChanged: "Profil fotoğrafınız değişecek.",
          CurrentProfilePicture: "Aktif Profil Fotoğrafı",
          ChangeProfilePicture: "Profil Resminizi Değiştirin",
          SelectNewImage: "Yeni Bir Resim Seçin",
          "DisplayName:UseGravatar": "Gravatar Kullan",
          "Description:UseGravatar":
            "Profil fotoğrafınız için Gravatar servisini kullanın.",
          SaveChanges: "Değişiklikleri Kaydet",
          UploadFile: "Dosya Yükle",
          UseDefault: "Varsayılanı Kullan",
          UseGravatarConfirm:
            "Gravatar'ı profil fotoğrafınız olarak kullacaksınız.",
          NoProfilePictureConfirm:
            "Varsayılan avatar'ı profil fotoğrafınız olarak kullanacaksınız.",
          PPUploadConfirm:
            "Seçtiğiniz resmi profil fotoğrafı olarak kullanacaksınız.",
          PleaseSelectImage: "Lütfen bir resim seçiniz.",
          UploadFailedMessage: "Yükleme başarısız!",
          "AccountPro:0001": "Bir resim yüklemelisiniz.",
          "ProfileTab:Picture": "Profil resmi",
          "ProfileTab:Password": "Şifre değiştir",
          "ProfileTab:PersonalInfo": "Kişisel bilgiler",
          "ProfileTab:TwoFactor": "İki faktörlü kimlik doğrulama etkin",
          "ProfileTab:AuthenticatorApp": "Doğrulayıcı uygulaması",
          "DisplayName:UseCaptchaOnLogin":
            "Kullanıcı girişi sırasında güvenlik resmi doğrulaması (captcha) kullan.",
          "Description:UseCaptchaOnLogin":
            "Kullanıcı girişi sırasında güvenlik resmi doğrulaması (captcha) kullan.",
          "DisplayName:UseCaptchaOnRegistration":
            "Kullanıcı kaydı sırasında güvenlik resmi doğrulaması (captcha) kullan.",
          "Description:UseCaptchaOnRegistration":
            "Kullanıcı kaydı sırasında güvenlik resmi doğrulaması (captcha) kullan.",
          Captcha: "Captcha",
          "DisplayName:VerifyBaseUrl": "Doğrulama adresi",
          "DisplayName:SiteKey": "Site key (anahtar)",
          "DisplayName:SiteSecret": "Site secret (şifre)",
          "DisplayName:Version": "Versiyon",
          "DisplayName:Score": "Puan",
          InvalidSiteKeyOrSiteSecret: "Geçersiz site anahtarı ya da şifresi",
          CaptchaCanNotBeEmpty: "reCAPTCHAyı tamamlamanız gerekmektedir",
          IncorrectCaptchaAnswer: "Geçersiz reCAPTCHA değeri!",
          ScoreBelowThreshold:
            "Doğrulama başarısız, puanınız eşiğin altındadır.",
          SetNullWillUseGlobalSettings:
            "Site varsayılanlarını kullanmak için boş bırakınız.",
          ReturnToApplication: "Uygulamaya geri dön",
          AccountExternalProviderSettings: "Harici sağlayıcı",
          ExternalProviderUseHostSettings: "Ana bilgisayar ayarlarını kullan",
          ExternalProviderEnabled: "Etkinleştirilmiş",
          LinkedAccounts: "Bağlı hesaplar",
          LoginAsThisAccount: "Bu hesabı olarak giriş yapın",
          DeleteLinkAccountConfirmationMessage:
            "'{0}' bağlantı hesaplar silmek istediğinizden emin misiniz?",
          NewLinkAccount: "Yeni bağlantı hesabı",
          NewLinkAccountWarning:
            "Mevcut hesaptan çıkış yapacaksınız ve başka bir hesapla giriş yapacaksınız. Bunu yaptığınızda, iki hesap birbirine bağlanacaktır.",
          TenantAndUserName: "Kullanıcı adı",
          DirectlyLinked: "Doğrudan bağlantılı",
          BackToMyAccount: "Geri dön: {0}",
          LinkLogged: "Hesaplar bağlandı",
          StayWithCurrentAccount: "Mevcut hesapla kalın",
          ReturnToPreviousAccount: "{0} hesabına dön",
          TheTargetAccountIsNotLinkedToYou:
            "Hedef hesabı sizinle bağlantılı değil!",
          LinkAccountWarning:
            'Lütfen diğer hesaplara bağlantı oluşturduğunuzu unutmayın, bağlantı girişini iptal etmek için <a href="{0}">burayı tıklayın</a>!',
          SavedSuccessfully: "Başarıyla kaydedildi",
          AccessDenied: "Erişim reddedildi!",
          AccessDeniedMessage: "Bu kaynağa erişiminiz yok.",
          RequestingYourPermission: "izninizi istiyor",
          UncheckThePermissionsYouDoNotWishToGrant:
            "Vermek istemediğiniz izinlerin işaretini kaldırın.",
          ConsentPersonalInformation: "Kişisel bilgi",
          ConsentApplicationAccess: "Uygulama Erişimi",
          ScopeRequired: "gereklidir",
          RememberConsent: "Kararımı Hatırla",
          UserDecisionYes: "Evet, İzin Ver",
          UserDecisionNo: "Hayır, İzin Verme",
          DeviceAuthorization: "Cihaz Yetkilendirmesi",
          UserCode: "Kullanıcı kodu",
          UserCodeInvalid: "Kullanıcı Kodu geçersiz!",
          DeviceAuthorizationSuccessfully: "Başarı!",
          DeviceAuthorizationSuccessfullyInfo:
            "Cihazı başarıyla yetkilendirdiniz!",
          LocalLoginIsNotEnabled: "Yerel giriş etkin değil!",
          SignIn: "Oturum aç",
          SignOut: "Oturumu kapat",
          Date: "Tarih",
          ResetAuthenticator: "Doğrulayıcıyı sıfırla",
          ResetAuthenticator_Information:
            "Doğrulayıcı uygulamanızı değiştirmek isterseniz, buradan sıfırlayabilirsiniz.",
          ResetAuthenticatorWarningMessage:
            "Doğrulayıcı anahtarınızı sıfırlayın, doğrulayıcı uygulamanız siz yeniden yapılandırana kadar çalışmayacaktır.",
          UseTwoFactorAuthenticatorApp_Information:
            "İki faktörlü kimlik doğrulama uygulamanızı açın ve aşağıdaki işlemlerden birini yapın:",
          UseTwoFactorAuthenticatorApp_Code:
            "İki faktörlü kimlik doğrulama uygulamanız bir kod oluşturacaktır, bu kodu aşağıdaki kutuya girin ve onaylayın.",
          RecoveryCode: "Kurtarma kodu",
          RecoveryCodes: "Kurtarma kodları",
          RecoveryCodes_Information:
            "Bu kodları güvenli bir yere koyun. Cihazınızı kaybederseniz ve kurtarma kodlarına sahip değilseniz, hesabınıza erişimi kaybedersiniz.",
          CopyToClipboard: "Panoya kopyala",
          PrintCodes: "Kodları yazdır",
          LoginWithRecoveryCode: "Kurtarma kodu ile giriş yapın",
          LoginWithRecoveryCode_Information:
            " Bir kurtarma koduyla giriş yapmak istediniz. Bu giriş, siz oturum açarken bir doğrulayıcı uygulama kodu sağlayana veya 2FA'yı devre dışı bırakıp tekrar oturum açana kadar hatırlanmayacaktır.",
          LoginWithRecoveryCode_URL:
            "Doğrulayıcı cihazınıza erişiminiz yok mu? Bir kurtarma kodu ile giriş yapabilirsiniz",
          UseQrCode: "QR Kodunu Kullan",
          ManuallyEnterCode: "Veya kodu manuel olarak girin",
          TwoFactorAuthenticationProviders:
            "İki Faktörlü Kimlik Doğrulama Sağlayıcıları",
          AuthenticatorApp: "Doğrulayıcı uygulama",
          VerifyTheAuthenticator: "Doğrulayıcıyı doğrula",
          Step: "Adım  {0}",
          NextStep: "Sonraki adım",
          Done: "Tamamlandı",
          ShowPassword: "Şifreyi göster",
          HidePassword: "Şifreyi gizle",
          CapsLockOn: "Caps lock açık",
          TakePhoto: "Fotoğraf çek",
          ChoosePhoto: "Fotoğraf seç",
          Strength: "Güvenlik Düzeyi",
          Weak: "Zayıf!",
          Fair: "Makul.",
          Normal: "Normal.",
          Good: "İyi.",
          Strong: "Güçlü!",
          "Authentication:YouAreLoggedOut": "Çıkış yaptınız.",
          OrRegisterWith: "Ya da bunlardan biriyle kaydolun",
        },
        baseResources: ["AbpValidation", "AbpIdentity", "AbpUi"],
      },
      AbpEmailing: {
        texts: {
          "DisplayName:Abp.Mailing.DefaultFromAddress":
            "Varsayılan gönderici adresi",
          "DisplayName:Abp.Mailing.DefaultFromDisplayName":
            "Varsayılan gönderici adı",
          "DisplayName:Abp.Mailing.Smtp.Host": "Sunucu",
          "DisplayName:Abp.Mailing.Smtp.Port": "Port",
          "DisplayName:Abp.Mailing.Smtp.UserName": "Kullanıcı adı",
          "DisplayName:Abp.Mailing.Smtp.Password": "Şifre",
          "DisplayName:Abp.Mailing.Smtp.Domain": "Domain",
          "DisplayName:Abp.Mailing.Smtp.EnableSsl": "SSL aktif",
          "DisplayName:Abp.Mailing.Smtp.UseDefaultCredentials":
            "Varsayılan kimlik kullan",
          "Description:Abp.Mailing.DefaultFromAddress":
            "Varsayılan gönderici adresi",
          "Description:Abp.Mailing.DefaultFromDisplayName":
            "Varsayılan gönderici adı",
          "Description:Abp.Mailing.Smtp.Host":
            "SMTP üzerinden e-posta göndermek için kullanılacak sunucunun IP adresi ya da adı.",
          "Description:Abp.Mailing.Smtp.Port": "Sunucunun SMTP portu.",
          "Description:Abp.Mailing.Smtp.UserName":
            "Varsayılan kimlik kullanılmaması durumunda kullanılacak kullanıcı adı.",
          "Description:Abp.Mailing.Smtp.Password":
            "Varsayılan kimlik kullanılmaması durumunda kullanılacak şifre.",
          "Description:Abp.Mailing.Smtp.Domain":
            "Kimlik bilgilerinin doğrulanacağı sunucu/domain.",
          "Description:Abp.Mailing.Smtp.EnableSsl":
            "Email gönderiminde SSL kullanılıp kullanılmayacağı.",
          "Description:Abp.Mailing.Smtp.UseDefaultCredentials":
            "Varsayılan kimlik bilgilerinin kullanılıp kullanılmayacağı.",
          "TextTemplate:StandardEmailTemplates.Layout":
            "Varsayılan e-posta layout şablonu",
          "TextTemplate:StandardEmailTemplates.Message":
            "Basit bir mesaj göndermek için e-posta şablonu",
        },
        baseResources: [],
      },
      AbpOpenIddict: {
        texts: {
          TheOpenIDConnectRequestCannotBeRetrieved:
            "OpenID Connect isteği alınamıyor.",
          TheUserDetailsCannotBbeRetrieved: "Kullanıcı ayrıntıları alınamıyor.",
          TheApplicationDetailsCannotBeFound: "Başvuru detayları bulunamadı.",
          DetailsConcerningTheCallingClientApplicationCannotBeFound:
            "Çağıran istemci uygulamasıyla ilgili ayrıntılar bulunamıyor.",
          TheSpecifiedGrantTypeIsNotImplemented:
            "Belirtilen hibe türü {0} uygulanmadı.",
          Authorization: "Yetki",
          DoYouWantToGrantAccessToYourData:
            "Do you want to grant {0} access to your data?",
          ScopesRequested: "İstenen kapsamlar",
          Accept: "Kabul etmek",
          Deny: "Reddetmek",
          Permissions: "İzinler",
          "Permission:OpenIddictPro": "OpenId",
          "Permission:Edit": "Düzenle",
          "Permission:Create": "Yarat",
          "Permission:Delete": "Sil",
          "Permission:Application": "Uygulama",
          "Permission:ManagePermissions": "Yetkileri yönet",
          "Permission:ViewChangeHistory": "Değişiklik geçmişini görüntüle",
          ChangeHistory: "Değişiklik Geçmişi",
          "Permission:Scope": "Scope",
          InvalidRedirectUri: "Geçersiz RedirectUri: {0}",
          InvalidPostLogoutRedirectUri: "Geçersiz PostLogoutRedirectUri: {0}",
          NoClientSecretCanBeSetForPublicApplications:
            "Public uygulamalar için hiçbir client secret ayarlanamaz.",
          TheClientSecretIsRequiredForConfidentialApplications:
            "Client secret, gizli uygulamalar için gereklidir.",
          TheClientIdentifierIsAlreadyTakenByAnotherApplication:
            "Client identifier zaten başka bir uygulama tarafından alınmış.",
          TheScopeNameCannotContainSpaces: "Scope adı boşluk içeremez.",
          TheNameIsAlreadyTakenByAnotherScope:
            "Ad zaten başka bir scope tarafından alınmış.",
          "Menu:OpenIddict": "OpenId",
          Scopes: "Scopes",
          ScopeDeletionWarningMessage:
            "'{0}' scope'ını silmek istediğinizden emin misiniz?",
          Name: "Ad",
          DisplayName: "Görüntülenecek Ad",
          Description: "Açıklama",
          Resources: "Resources",
          NewScope: "Yeni Scope",
          Applications: "Uygulamalar",
          ApplicationDeletionWarningMessage:
            "'{0}' uygulamasını silmek istediğinizden emin misiniz?",
          NoAvailableScopes: "Erişelebilir scope yok",
          NewApplication: "Yeni uygulama",
          ApplicationType: "Uygulama Tipi",
          ClientId: "Client Id",
          ClientType: "Client Tipi",
          ClientSecret: "Client Secret",
          ClientSecretHelpText:
            "Mevcut gizli anahtarı değiştirmek için yeni bir değer girin",
          ClientUri: "Client Uri",
          LogoUri: "Logo Uri",
          AllowAuthorizationCodeFlow: "Authorization Code Flow'a İzin Ver",
          AllowImplicitFlow: "Implicit Flow'a İzin Ver",
          AllowPasswordFlow: "Password Flow'a İzin Ver",
          AllowClientCredentialsFlow: "Client Credentials Flow'a İzin Ver",
          AllowHybridFlow: "Hybrid Flow'a İzin Ver",
          AllowRefreshTokenFlow: "Refresh Token Flow'a İzin Ver",
          AllowDeviceEndpoint: "Device Endpoint'a İzin Ver",
          AllowLogoutEndpoint: "Logout Endpoint'a İzin Ver",
          ExtensionGrantTypes: "Uzatma Hibe Türleri",
          RedirectUris: "Uris'i Yönlendir",
          PostLogoutRedirectUris: "Çıkış Sonrası Yeniden Yönlendirme Uris",
          ConsentType: "Onay Türü",
          NotAvailableForThisType: "Bu tip için mevcut değil",
          TokenLifetime: "Token Ömrü",
          TokenLifetimeHit:
            "Belirteç ömrünün birimi saniyedir ve varsayılan yaşam süresini kullanmak için boş bırakılır.",
          AccessTokenLifetime: "AccessToken Ömrü",
          AuthorizationCodeLifetime: "AuthorizationCode Ömrü",
          DeviceCodeLifetime: "DeviceCode Ömrü",
          IdentityTokenLifetime: "IdentityToken Ömrü",
          RefreshTokenLifetime: "RefreshToken Ömrü",
          UserCodeLifetime: "UserCode Ömrü",
        },
        baseResources: ["AbpValidation"],
      },
      AbpSettingManagement: {
        texts: {
          Settings: "Ayarlar",
          SuccessfullySaved: "Başarıyla Kaydedildi",
          "Permission:SettingManagement": "Ayarlar yönetimi",
          "Permission:Emailing": "Email",
          "Permission:EmailingTest": "Email testi",
          "Permission:TimeZone": "Zaman dilimi",
          SendTestEmail: "Test emaili gönder",
          SenderEmailAddress: "Gönderen email adresi",
          TargetEmailAddress: "Hedef email adresi",
          Subject: "Konu",
          Body: "Gövde",
          TestEmailSubject: "Test email {0}",
          TestEmailBody: "E-posta gövdesi mesajını burada test edin",
          SuccessfullySent: "Başarıyla gönderildi",
          Send: "Gönder",
          "Menu:Emailing": "Email",
          "Menu:TimeZone": "Zaman Dilimi",
          "DisplayName:Timezone": "Zaman dilimi",
          TimezoneHelpText:
            "Bu ayar uygulama genelinde veya kiracı tabanlı olarak kullanılır.",
          SmtpHost: "Sunucu",
          SmtpPort: "Port",
          SmtpUserName: "Kullanıcı adı",
          SmtpPassword: "Şifre",
          SmtpDomain: "Domain",
          SmtpEnableSsl: "Ssl'i aktif et",
          SmtpUseDefaultCredentials: "Varsayılan yetkilendirmeleri kullan",
          DefaultFromAddress: "Varsayılan gönderici email adresi",
          DefaultFromDisplayName: "Varsayılan gönderici görünen isim",
          "Feature:SettingManagementGroup": "Ayar yönetimi",
          "Feature:SettingManagementEnable": "Ayar yönetimini etkinleştir",
          "Feature:SettingManagementEnableDescription":
            "Uygulamada ayar yönetim sistemini etkinleştirin.",
          "Feature:AllowChangingEmailSettings":
            "E-posta ayarlarını değiştirmeye izin verin.",
          "Feature:AllowChangingEmailSettingsDescription":
            "E-posta ayarlarını değiştirmeye izin verin.",
        },
        baseResources: ["AbpValidation"],
      },
      AbpFeatureManagement: {
        texts: {
          Features: "Özellikler",
          NoFeatureFoundMessage: "Hiç özellik yok.",
          ManageHostFeatures: "Host Özelliklerini Yönetin",
          ManageHostFeaturesText:
            "Aşağıdaki butona tıklayarak host özelliklerini yönetebilirsiniz.",
          "Permission:FeatureManagement": "Özellik Yönetimi",
          "Permission:FeatureManagement.ManageHostFeatures":
            "Host özelliklerini düzenle",
          "Volo.Abp.FeatureManagement:InvalidFeatureValue":
            "{0} özellik değeri geçerli değil!",
          "Menu:FeatureManagement": "Özellik Yönetimi",
          ResetToDefault: "Varsayılana sıfırla",
          ResetedToDefault: "Varsayılana sıfırlandı",
          AreYouSure: "Emin misiniz?",
          AreYouSureToResetToDefault:
            "Varsayılana sıfırlamak istediğinizden emin misiniz?",
        },
        baseResources: ["AbpValidation"],
      },
      Payment: {
        texts: {
          Delete: "Sil",
          "DisplayName:Code": "Kod",
          "DisplayName:CreationTime": "Oluşturulma Zamanı",
          "DisplayName:Count": "Adet",
          "DisplayName:Currency": "Para Birimi",
          "DisplayName:ExternalId": "Harici Id",
          "DisplayName:FailReason": "Hata",
          "DisplayName:Gateway": "Sağlayıcı",
          "DisplayName:Name": "İsim",
          "DisplayName:PaymentType": "Ödeme Tipi",
          "DisplayName:State": "Durum",
          "DisplayName:TotalPrice": "Toplam Fiyat",
          "DisplayName:UnitPrice": "Birim Fiyatı",
          "DisplayName:ExternalSubscriptionId": "Harici Abonelik Kimliği",
          Edit: "Güncelle",
          "Enum:PaymentRequestState:0": "Beklemede",
          "Enum:PaymentRequestState:1": "Tamamlandı",
          "Enum:PaymentRequestState:2": "Başarısız",
          "Enum:PaymentRequestState:3": "İade Edildi",
          GatewayPlanDeletionConfirmationMessage:
            "Ödeme sağlayıcı silinecektir. Emin misiniz?",
          GatewayPlans: "Ödeme Sağlayıcı Planlarını Yönet",
          "Menu:PaymentManagement": "Ödeme",
          "Menu:PaymentRequests": "Ödeme İşlemleri",
          "Menu:Plans": "Ödeme Planları",
          NewGatewayPlan: "Yeni Ödeme Sağlayıcısı",
          NewPlan: "Yeni Plan",
          "Payment:Request:0001": "Var olan Harici Plan Id güncellenemiyor.",
          "PaymentRequests:Search": "Ara",
          "PaymentRequests:CreationDateMax": "Tarihten önce",
          "PaymentRequests:CreationDateMin": "Tarihten sonra",
          "PaymentRequests:PaymentType": "Ödeme Türü",
          "PaymentRequests:Status": "Durum",
          paypal: "PayPal",
          payu: "PayU",
          PayWithGateway: "{0} ile öde",
          "Permission:Payment": "Ödeme",
          "Permission:PaymentGatewayPlanManagement":
            "Ödeme Sağlayıcı Plan Yönetimi",
          "Permission:PaymentGatewayPlanManagement.Create": "Oluştur",
          "Permission:PaymentGatewayPlanManagement.Delete": "Sil",
          "Permission:PaymentGatewayPlanManagement.Update": "Güncelle",
          "Permission:PaymentPlanManagement": "Ödeme Planları Yönetimi",
          "Permission:PaymentPlanManagement.Create": "Oluştur",
          "Permission:PaymentPlanManagement.Delete": "Sil",
          "Permission:PaymentPlanManagement.Update": "Güncelle",
          "Permission:PaymentRequests": "Ödeme İşlemleri",
          PlanDeletionConfirmationMessage: "Plan silinecektir. Emin misiniz?",
          Plans: "Planlar",
          Products: "Ürünler",
          Search: "Ara",
          stripe: "Stripe",
          "two-checkout": "2Checkout",
          "Iyzico:NOT_SUFFICIENT_FUNDS": "Yeterli paranız yok.",
          "Iyzico:DO_NOT_HONOUR": "İşlem onaylanmadı.",
          "Iyzico:INVALID_TRANSACTION": "Geçersiz işlem.",
          "Iyzico:LOST_CARD": "Kart kayıp olarak işaretlendi.",
          "Iyzico:STOLEN_CARD": "Kart çalıntı olarak işaretlendi.",
          "Iyzico:EXPIRED_CARD": "Kartın süresi doldu.",
          "Iyzico:INVALID_CVC2": "Geçersiz CVC2.",
          "Iyzico:NOT_PERMITTED_TO_CARDHOLDER":
            "Kart sahibinin işlem yapmasına izin verilmez.",
          "Iyzico:NOT_PERMITTED_TO_TERMINAL": "Terminale izin verilmiyor.",
          "Iyzico:FRAUD_SUSPECT":
            "Bir dolandırıcılık zanlısının kimliği belirlendi.",
          "Iyzico:RESTRICTED_BY_LAW":
            "Kartınız e-ticaret işlemlerine kapatılmıştır. Lütfen bankanızla iletişime geçin.",
          "Iyzico:CARD_NOT_PERMITTED": "Kart işleme izin vermedi.",
          "Iyzico:UNKNOWN": "Ödeme işlenirken bir hata oluştu.",
          "Iyzico:INVALID_CVC2_LENGTH": "Geçersiz CVC2 uzunluğu",
          "Iyzico:REFER_TO_CARD_ISSUER": "Bankadan onay alınması gerekiyor.",
          "Iyzico:INVALID_MERCHANT_OR_SP": "Geçersiz banka satıcı kategorisi",
          "Iyzico:BLOCKED_CARD": "Kartın bloke olduğu belirlendi.",
          "Iyzico:INVALID_CAVV": "Geçersiz CAVV.",
          "Iyzico:INVALID_ECI": "Geçersiz ECI.",
          "Iyzico:BIN_NOT_FOUND": "Bin bulunamadı.",
          "Iyzico:COMMUNICATION_OR_SYSTEM_ERROR":
            "İletişim veya sistem hatası oluştu.",
          "Iyzico:INVALID_CARD_NUMBER": "Kart numarası geçersiz.",
          "Iyzico:NO_SUCH_ISSUER": "Kartı veren kuruluş kartı bulamadı.",
          "Iyzico:DEBIT_CARDS_REQUIRES_3DS":
            "Banka kartları 3D-Secure gerektirir.",
          "Iyzico:REQUEST_TIMEOUT": "İstek zaman aşımına uğradı.",
          "Iyzico:NOT_PERMITTED_TO_INSTALLMENT":
            "Terminal için taksit seçeneğine izin verilmiyor.",
          "Iyzico:REQUIRES_DAY_END": "Gün sonu gerektirir",
          "Iyzico:RESTRICTED_CARD": "Kartın kısıtlı olduğu belirlendi.",
          "Iyzico:EXCEEDS_ALLOWABLE_PIN_TRIES": "Maksimum PIN denemesi aşıldı.",
          "Iyzico:INVALID_PIN": "Geçersiz PIN.",
          "Iyzico:ISSUER_OR_SWITCH_INOPERATIVE":
            "Banka veya terminal işlemi gerçekleştirmiyor.",
          "Iyzico:INVALID_EXPIRE_YEAR_MONTH":
            "Son kullanma yılı veya ayı geçersiz.",
          "Iyzico:INVALID_AMOUNT": "Geçersiz miktar",
          "Iyzico:REFUND_NOT_ALLOWED_FOR_THIS_DEBIT_CARD":
            "Kartta yeterli bakiye yok.",
          "Iyzico:APPROVED_COMPLETED": "Bu işlem zaten onaylandı.",
          "Iyzico:INVALID_CHARS_IN_EMAIL": "E-posta geçerli biçimde değil.",
          "Iyzico:CVC2_MAX_ATTEMPT": "Maks. CVC2 denemesi aşıldı.",
          "Iyzico:DEBIT_CARDS_INSTALLMENT_NOT_ALLOWED":
            "Banka kartlarına taksit yapılamaz.",
          "Iyzico:DECLINED": "Ödeme alınmadı.",
          "Iyzico:NOT_PERMITTED_TO_FOREIGN_CARD":
            "Terminal yabancı/uluslararası kartlara kapalıdır.",
          "Iyzico:EXCEEDS_WITHDRAWAL_AMOUNT_LIMIT": "Para çekme limiti aşıldı.",
          "Iyzico:REQUEST_BLOCKED_BY_BANK":
            "Talep banka tarafından bloke edilmiştir.",
          "Iyzico:SALES_AMOUNT_LESS_THAN_AWARD":
            "Satış tutarı ödül puanlarından düşük olamaz.",
          "Iyzico:INVALID_CARD_TYPE": "Geçersiz kart türü.",
          "Iyzico:NOT_SUFFICIENT_AWARD": "Yetersiz ödül puanı.",
          "Iyzico:AMEX_CAN_USE_ONLY_MR": "American Express (AMEX) kart hatası.",
          PriceSubscriptionTooltip:
            "Abonelik fiyatlandırması ödeme sağlayıcı tarafından yönetilmektedir.",
          "PaymentType:OneTime": "Tek Ödeme",
          "PaymentType:Subscription": "Abonelik",
        },
        baseResources: ["AbpValidation"],
      },
      Saas: {
        texts: {
          "Volo.Saas:DuplicateTenantName": "Müşteri ismi zaten mevcut: {Name}",
          "Volo.Saas:DuplicateEditionDisplayName":
            "Paket adı zaten mevcut: {Name}",
          "Menu:Saas": "SaaS",
          Tenants: "Müşteriler",
          NewTenant: "Yeni müşteri",
          EditTenant: "Müşteri düzenle",
          TenantBaseInfo: "Temel bilgi",
          TenantName: "Müşteri adı",
          "DisplayName:TenantName": "Müşteri adı",
          TenantCount: "Müşteri sayısı",
          TenantDeletionConfirmationMessage:
            "'{0}' isimli müşteri silinecektir. Onaylıyor musunuz?",
          EditionDeletionConfirmationMessage:
            "{0} isimli sürüm silinecektir. Bunu onaylıyor musunuz? ",
          ChooseAnAction:
            "There are {0} tenants assigned to the edition you are trying to delete. Please choose an action for these tenants:",
          UnassignTheEditionFromTheTenants:
            "Müşterilerden sürüm atamasını kaldır",
          AssignTenantsToOtherEdition: "Müşterileri başka bir sürüme ata",
          SelectAnEditionToAssign: "Atamak için bir sürüm seçin",
          MoveAllTenants: "Müşterileri taşıyın",
          ThereIsNoTenantsCurrentlyInThisEdition:
            "Bu sürümde bir müşteri bulunmuyor.",
          MoveAllTenantsWithEditionTo:
            "<b>{0}</b> sürümüne sahip tüm müşterileri şuraya taşıyın:",
          UnassignEdition: "Sürüm atamasını kaldır",
          ConnectionStrings: "Veritabanı Bağlantı Cümleleri",
          AddDatabaseConnectionString: "Ekle",
          "DisplayName:Default": "Varsayılan bağlantı cümlesi",
          "DisplayName:DatabaseName": "Modül",
          "DisplayName:ConnectionString": "Veritabanı bağlantı cümlesi",
          "DisplayName:UseSharedDatabase": "Paylaşılan veritabanını kullan",
          "DisplayName:UseSpecificDatabase":
            "Modüle özel veritabanı bağlantı cümlesi kullan",
          "DisplayName:EditionId": "Paket",
          Edition: "Paket",
          Editions: "Paketler",
          EditionEndDateUtc: "Paket Sonu (UTC)",
          NewEdition: "Yeni paket",
          EditionName: "Paket adı",
          Name: "Adı",
          LatestTenants: "Son müşteriler",
          EditionUsageStatistics: "Paket Kullanım İstatistiği",
          "DisplayName:AdminEmailAddress": "Admin Eposta Adresi",
          "DisplayName:AdminEmailAddressFormText":
            "Kiracının e-posta adresi oluşturulduktan sonra değiştirilemez",
          "DisplayName:AdminPassword": "Admin Şifresi",
          "DisplayName:ActivationState": "Müşteri Aktiflik Durumu",
          "DisplayName:ActivationEndDate":
            "Müşterinin Pasif Duruma Geçeceği Tarih",
          "DisplayName:ExpirationDate": "Son kullanma tarihi",
          ActivationState: "Aktiflik Durumu",
          "Enum:TenantActivationState.Active": "Aktif",
          "Enum:TenantActivationState.ActiveWithLimitedTime":
            "Kısıtlı süre ile aktif",
          "Enum:TenantActivationState.Passive": "Pasif",
          ChangeHistory: "Değişiklik Geçmişi",
          SetPassword: "Şifre Belirle",
          LoginWithThisTenant: "Bu müşteri ile giriş yap",
          ApplyDatabaseMigrations: "Veritabanı güncellemelerini uygula",
          DatabaseMigrationQueuedAndWillBeApplied:
            "Veritabanı güncellemeleri kuyruğa alındı. Kısa zamanda uygulanmış olacaktır.",
          "Saas:Edition:0001": "Paketin bir planı bulunmuyor!",
          "Saas:Edition:0002":
            "'{EditionName}' silinemiyor, kiracılar tarafından kullanılıyor.",
          PlanId: "Plan",
          PlanName: "Plan",
          SeeAdvancedFilters: "Gelişmiş Filtreler",
          ValidConnectionString: "Geçerli bağlantı cümlesi ",
          InvalidConnectionString: "Geçersiz bağlantı cümlesi",
          CheckConnectionString: "Ölçek",
          NoDataAvailable: "Veri yok",
          GenerateRandomPasswordTooltip:
            "Rastgele şifre oluşturun veya kendi şifrenizi belirleyin",
          Password: "Şifre",
          UserName: "Kullanıcı adı",
          UserNameTooltip:
            "Şifresini değiştirmek istediğiniz müşterinin adını giriniz",
          GeneratePassword: "Şifre oluştur",
          EditionEndDateToolTip:
            "Bu tarih harici ödeme sağlayıcısı tarafından yönetilir. Ödeme sonrasında otomatik olarak ayarlanacak ve her tekrarlayan ödeme sonrasında güncellenecektir.",
          Dash: "-",
          "Permission:Saas": "Saas",
          "Permission:TenantManagement": "Müşteri yönetimi",
          "Permission:EditionManagement": "Paket yönetimi",
          "Permission:Create": "Oluşturma",
          "Permission:Edit": "Düzenleme",
          "Permission:Delete": "Silme",
          "Permission:ManageConnectionStrings": "Bağlantı cümlelerini yönet",
          "Permission:SetPassword": "Şifre ayarla",
          "Permission:ManageFeatures": "Özellikleri yönet",
          "Permission:ViewChangeHistory": "Değişiklik geçmişini görüntüleme",
          "Permission:Impersonation": "Kimliğe bürünme",
          CheckYourProviderDashboard:
            "Bu aboneliği iptal etmek için ödeme sağlayıcınızın kontrol panelini kontrol edin.",
        },
        baseResources: ["AbpValidation"],
      },
      AbpAuditLogging: {
        texts: {
          "Permission:AuditLogging": "İşlem Kayıtları",
          "Permission:AuditLogs": "İşlem Kayıtlarına erişim",
          "Menu:AuditLogging": "Kullanıcı işlem logları",
          AuditLogs: "Kullanıcı işlem logları",
          HttpStatus: "Http Durumu",
          HttpMethod: "Http Metodu",
          HttpMethodFilter: "Http Method Filtresi",
          HttpRequest: "Http İstemi",
          User: "Kullanıcı",
          UserNameFilter: "Kullanıcı Filtresi",
          HasException: "Hata var mı?",
          IpAddress: "Ip Adresi",
          Time: "Tarih",
          Date: "Tarih",
          Duration: "Süre",
          Detail: "Detay",
          Overall: "Genel",
          Actions: "Aksiyonlar",
          ClientIpAddress: "İstemci Ip Adresi",
          ClientName: "İstemci Adı",
          BrowserInfo: "Tarayıcı Bilgisi",
          Url: "Url",
          UserName: "Kullanıcı adı",
          TenantImpersonator: "Kiracı Taklitçisi",
          UserImpersonator: "Kullanıcı Taklitçisi",
          UrlFilter: "Url Filtresi",
          Exceptions: "Hatalar",
          Comments: "Yorumlar",
          HttpStatusCode: "Http Durum Kodu",
          HttpStatusCodeFilter: "Http Durum Kodu Filtresi",
          ServiceName: "Servis",
          MethodName: "Method",
          CorrelationId: "Korelasyon ID",
          ApplicationName: "Uygulama ismi",
          ExecutionDuration: "Geçen Süre",
          ExtraProperties: "Ekstra özellikler",
          MaxDuration: "Max. süre",
          MinDuration: "Min. süre",
          MinMaxDuration: "Duration (Min. - Max.)",
          "{0}Milliseconds": "{0} milisaniye",
          ExecutionTime: "İşlem Tarihi",
          Parameters: "Parametreler",
          EntityTypeFullName: "Entity Tipi",
          Entity: "Entity",
          ChangeType: "Değişiklik Türü",
          ChangeTime: "Değişiklik Tarihi",
          NewValue: "Yeni Değer",
          OriginalValue: "İlk Değer",
          PropertyName: "Property Adı",
          PropertyTypeFullName: "Property Türü",
          Yes: "Evet",
          No: "Hayır",
          Changes: "Değişiklikler",
          AverageExecutionDurationInLogsPerDay: "Ortalama işlem süresi",
          AverageExecutionDurationInMilliseconds:
            "Milisaniye cinsinden ortalama işlem süresi",
          ErrorRateInLogs: "Loglardaki hata oranı",
          Success: "Başarılı",
          Fault: "Hatalı",
          NoChanges: "Değişiklik yok",
          EntityChanges: "Entity Değişiklikleri",
          EntityId: "Entity Id",
          EntityChangeStartTime: "Min Değişiklik Tarihi",
          EntityChangeEndTime: "Max Değişiklik Tarihi",
          EntityHistory: "Entity Geçmişi",
          DaysAgoTitle: "{1} {0}.",
          DaysAgoWithUserTitle: "{1} {2} tarafından {0}.",
          Created: "Oluşturuldu",
          Updated: "Güncellendi",
          Deleted: "Silindi",
          ChangeHistory: "Değişiklik Geçmişi",
          FullChangeHistory: "Tüm Değişiklik Geçmişi",
          ChangeDetails: "Değişiklik Detayı",
          DurationMs: "Süre (ms)",
          StartDate: "Başlangıç Tarihi",
          EndDate: "Bitiş Tarihi",
          "Feature:AuditLoggingGroup": "İşlem Kayıtları",
          "Feature:AuditLoggingEnable":
            "İşlem kayıtları sayfasını etkinleştirin",
          "Feature:AuditLoggingEnableDescription":
            "Uygulamadanızdaki işlem kayıtları sayfasını etkinleştirir.",
        },
        baseResources: ["AbpValidation"],
      },
      LanguageManagement: {
        texts: {
          LanguageManagement: "Dil Yönetimi",
          Languages: "Diller",
          OnlyEmptyValues: "Sadece Boş Değerler",
          All: "Hepsi",
          BaseValue: "Baz Değer",
          LanguageTexts: "Çeviriler",
          BaseCultureName: "Baz Kültür İsmi",
          BaseCultureValue: "Baz Kültür Değeri",
          TargetCultureValue: "Hedef Kültür Değeri",
          TargetCultureName: "Hedef Kültür İsmi",
          CultureName: "Kültür İsmi",
          UiCultureName: "Arayüz Kültür İsmi",
          ResourceName: "Kaynak İsmi",
          RestoreToDefault: "Varsayılan Değere Döndür",
          SaveAndNext: "Kaydet ve sonraki",
          TargetValue: "Hedef Değer",
          Value: "Değer",
          Key: "Anahtar",
          Edit: "Düzenle",
          CreateNewLanguage: "Yeni Dil Yarat",
          Delete: "Sil",
          DisplayName: "Gösterim İsmi",
          FlagIcon: "Bayrak İkonu",
          IsEnabled: "Etkin",
          SetAsDefaultLanguage: "Varsayılan Dil Yap",
          DefaultLanguage: "Varsayılan Dil",
          "Menu:Languages": "Dil yönetimi",
          LanguageDeletionConfirmationMessage:
            "{0} dili silinecektir. Onaylıyor musunuz?",
          DefaultLanguageDeletionConfirmationMessage:
            "Varsayılan dil '{0}' silinecektir. Bunu onaylıyor musunuz?",
          Filter: "Filtre",
          "Feature:LanguageManagementGroup": "Dil yönetimi",
          "Feature:LanguageManagementEnable": "Dil yönetimini etkinleştirin",
          "Feature:LanguageManagementEnableDescription":
            "Uygulamanızdaki dil yönetim sistemini etkinleştirir.",
          "Volo.Abp.LanguageManagement:010001":
            "Kültür adı {CultureName} zaten mevcut.",
          NewLanguageMightRequireRestartInformation:
            "Yeni bir dil eklediniz. Uygulamayı yeniden başlatmanız gerekebilir.",
          "Permission:LanguageManagement": "Dil Yönetimi",
          "Permission:LanguageTexts": "Çeviriler",
          "Permission:LanguageTextsEdit": "Çeviriyi düzenleyebilme",
          "Permission:Languages": "Diller",
          "Permission:LanguagesEdit": "Dil düzenleyebilme",
          "Permission:LanguagesCreate": "Yeni Dil Oluşturabilme",
          "Permission:LanguagesChangeDefault": "Varsayılan Dili Değiştirebilme",
          "Permission:LanguagesDelete": "Dil silebilme",
        },
        baseResources: ["AbpValidation"],
      },
      TextTemplateManagement: {
        texts: {
          "Menu:TextTemplates": "Metin Şablonları",
          "Menu:TextTemplates:TemplateDefinitions": "Şablon Betimlemeleri",
          "Permission:TextTemplateManagement": "Metin Şablonları Yönetimi",
          "Permission:TextTemplates": "Metin Şablonları",
          "Permission:EditContents": "İçerikleri Değiştirme",
          TemplateContents: "Şablon İçerikleri",
          Name: "İsim",
          Layout: "Anahat",
          IsLayout: "Anahat?",
          LocalizationResource: "Lokalizasyon Kaynağı",
          DefaultCultureName: "Temel Kültür İsmi",
          Contents: "İçerikler",
          SeeContents: "İçeriklere Bak",
          EditContents: "İçerikleri Düzenle",
          BaseCultureName: "Referans Kültür İsmi",
          TargetCultureName: "Hedef Kültür İsmi",
          BaseContent: "Referans İçerik",
          TargetContent: "Hedef İçerik",
          SaveContent: "İçeriği Kaydet",
          RestoreToDefault: "Varsayılan Değere Döndür",
          RestoreToDefaultMessage:
            "Emin misiniz? Bu işlem içeriği varsayılan değerine döndürecektir.",
          IsInlineLocalized: "Sayfa İçi Lokalizasyon?",
          Success: "Başarılı",
          TemplateContentUpdated: "Şablon içeriği güncellendi.",
          TemplateContentRestoredToDefault:
            "Şablon içeriği varsayılan değere döndürüldü.",
          TemplateContent: "Şablon İçeriği",
          InlineContentDescription:
            'Bu şablon satır içi lokalizasyon kullanmaktadır. Metinlerinizi lokilize etmek için <b>L</b> methodunu kullanabilirsiniz, örnek: <b>{{L "Hello"}}</b>. Bir kültür için yeni bir şablon oluşturmak istiyorsanız, "Her Kültür İçin Özelleştir" butonunu kullanınız. <br /> Sözdizimi ve diğer detaylar için daha fazla bilgi almak istiyorsanız <a href="https://docs.abp.io/en/abp/latest/Text-Templating" target="_blank">Text Template dökümantasyonu</a>\'na göz atabilirsiniz.',
          CustomizePerCulture: "Her Kültür İçin Özelleştir",
          DisplayName: "Görünür İsim",
          Search: "Ara",
          ReturnToTemplates: "Şablonlara Geri Dön",
          "Feature:TextManagementGroup": "Metin Şablonları Yönetimi",
          "Feature:TextManagementEnable":
            "Metin şablonu yönetimini etkinleştirin",
          "Feature:TextManagementEnableDescription":
            "Uygulamanızdaki metin şablonu yönetim sistemini etkinleştirir.",
        },
        baseResources: ["AbpValidation"],
      },
      AbpGdpr: {
        texts: {
          "Volo.Abp.Gdpr:010001":
            "Daha önce kişisel verileri indirme talebinde bulundunuz. Verilen istek süresi geçtikten sonra yeni bir istekte bulunabilirsiniz.",
          "Volo.Abp.Gdpr:010002":
            "Kişisel verileriniz hazırlanmaya devam etmektedir. {GdprDataReadyTime}'da bu verileri indirebilirsiniz.",
          PersonalData: "Kişisel Veri",
          "Menu:PersonalData": "Kişisel veri",
          PersonalDataDescription:
            "Hesabınız, bize verdiğiniz kişisel verileri içerir. Bu sayfa, bu verileri indirmenize veya silmenize izin verir.",
          RequestPersonalData: "Kişisel Veri Talep Et",
          DeletePersonalData: "Kişisel Veri Sil",
          CreationTime: "Oluşturulma Zamanı",
          Action: "Aksiyon",
          Preparing: "Hazırlanıyor",
          Download: "İndir",
          ReadyTime: "Hazır Olma Zamanı",
          DeletePersonalDataWarning:
            "Bu verileri silmek, hesabınızın silinmesine sebep olacak ve artık uygulamaya giriş yapmayacaksınız! Devam etmek istediğinizden emin misiniz?",
          PersonalDataDeleteRequestReceived:
            "Kişisel veri silme talebiniz işleniyor... Veri silme işleminin sonunda hesabınız silinecek ve artık kullanamayacaksınız.",
          PersonalDataPrepareRequestReceived:
            "Kişisel veri hazırlama talebiniz işleniyor. Hazır olduğunda bu sayfadan indirebilirsiniz!",
          NoDataAvailable: "Veri bulunmuyor.",
          Accept: "Kabul Et",
          CookiePolicy: "Çerez Politikası",
          PrivacyPolicy: "Gizlilik Politikası",
          ThisWebsiteUsesCookie:
            "Bu web sitesi, web sitesinde en iyi deneyimi yaşamanızı sağlamak için çerezleri kullanır.",
          CookieConsentAgreePolicies:
            "Göz atmaya devam ederseniz, {0} ve {1} şartlarını kabul etmiş olursunuz.",
          CookieConsentAgreePolicy:
            "Göz atmaya devam ederseniz, {0} şartını kabul etmiş olursunuz.",
          CanNotGetDownloadToken: "Bu istek için indirme jetonu alamazsınız!",
        },
        baseResources: [],
      },
      AdministrationService: {
        texts: {
          "Permission:Dashboard": "Gösterge Paneli",
        },
        baseResources: ["AbpValidation"],
      },
      BlobStoringDatabase: {
        texts: {
          MyAccount: "Hesabım",
        },
        baseResources: ["AbpValidation"],
      },
      IdentityService: {
        texts: {
          "Permission:IdentityService": "Kimlik hizmeti",
        },
        baseResources: ["AbpValidation"],
      },
      SaasService: {
        texts: {
          "Permission:SaasService": "Saas hizmeti",
        },
        baseResources: ["AbpValidation"],
      },
      AbpForDeploy: {
        texts: {
          "Menu:Home": "Ana Sayfa",
          Login: "Giriş",
          "Menu:Dashboard": "Genel görünüm",
        },
        baseResources: ["AbpValidation"],
      },
    },
  } as LocalizationDto
).resources;
