import SignInCard from "../../components/signin-card";
import "../../globals.css";

export default function Page() {
  return (
    <main className="min-h-dvh grid grid-cols-1 md:grid-cols-2 h-screen">
      <section className="flex items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-border bg-black">
        <h1 className="text-balance text-5xl md:text-6xl font-semibold tracking-tight text-white">
          Bookshelf
        </h1>
      </section>

      <section className="flex flex-col justify-center p-8 md:p-12">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Your Books Await
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to add your books in your shelf.
          </p>

          <div className="mt-6">
            <SignInCard />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Note: As a guest, your books will be temporarily added only for 24h.
          </p>
        </div>
      </section>
    </main>
  );
}
