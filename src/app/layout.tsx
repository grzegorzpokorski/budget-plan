import "./../styles/globals.css";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";

const rubik = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl" className={`${rubik.variable} scrollbar-gutter-stable`}>
      <body>{children}</body>
    </html>
  );
}
