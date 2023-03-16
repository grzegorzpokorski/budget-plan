import "./../styles/globals.css";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import { AppProviders } from "@/providers/AppProviders";

const rubik = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl" className={`${rubik.variable} scrollbar-gutter-stable`}>
      <body className="bg-neutral-200">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
