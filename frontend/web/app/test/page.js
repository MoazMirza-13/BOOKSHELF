"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div>
          <p>Logged in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      )}
    </div>
  );
}
