import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Bookshelf | Sign in",
  description: "Sign in page for bookshelf",
  icons: ["/favicon.ico?v=4"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className}`}>{children}</body>
    </html>
  );
}
