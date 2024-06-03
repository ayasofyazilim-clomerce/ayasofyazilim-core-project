const navbarItems = [
  {
    name: "Profil",
    id: "profile",
  },
  {
    name: "Hesap Ayarları",
    id: "test",
  },
  {
    name: "Ödeme Yöntemleri",
    id: "test2",
  },
  {
    name: "Bildirim Tercihleri",
    id: "test3",
  },
  {
    name: "İşlem Geçmişi",
    id: "test4",
  },
];

type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
