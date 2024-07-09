export default function profileLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="container flex flex-col m-4 max-h-full">{children}</div>
  );
}
