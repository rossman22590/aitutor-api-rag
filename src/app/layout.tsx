import "../styles/globals.css";
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Doc Query App",
  description: "Upload documents and ask questions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-gray-200">
          <nav className="flex space-x-4">
            <Link href="/">Home</Link>
            <Link href="/upload">Upload Document</Link>
            <Link href="/chat">Ask Questions</Link>
          </nav>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
