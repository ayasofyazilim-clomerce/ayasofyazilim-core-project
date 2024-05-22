"use server";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "auth";

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      Yeahh
      <form
        action={async () => {
          "use server";
          await signIn("credentials", {
            username: "eren12",
            password: "123Aa!",
            redirect: false,
          });
          redirect("/");
        }}
      >
        <button type="submit">Sign in</button>
        {session ? (
          <p>signed in {JSON.stringify(session)}</p>
        ) : (
          <p>Not signed in</p>
        )}
      </form>
      <form
        action={async () => {
          "use server";
          await signOut({ redirect: false });
          redirect("/");
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </main>
  );
}
