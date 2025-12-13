import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import SWRProvider from "../components/SwrProvider";

const lexend = Lexend_Deca({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kenics Pageant",
  description: "Best Pageantry show in warri delta state",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lexend.className} antialiased`}>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
