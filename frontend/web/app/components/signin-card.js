"use client";
import { signIn } from "next-auth/react";

export default function SignInCard() {
  const handleGoogleSignIn = () => {
    try {
      signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section aria-label="Sign in" className="mx-auto w-full max-w-sm">
      <div className="grid gap-3">
        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-[0.85] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/50"
          aria-label="Login with Google"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>

        <div className="relative my-1" aria-hidden="true">
          <div className="h-px bg-border" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-background px-2 text-xs text-muted-foreground">
            or
          </span>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/50"
          aria-label="Continue as Guest"
        >
          Continue as Guest
        </button>
      </div>
    </section>
  );
}
