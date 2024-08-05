export default function Layout({ children }: { children: JSX.Element }) {
  return <div className="h-full overflow-auto">{children}</div>;
}
