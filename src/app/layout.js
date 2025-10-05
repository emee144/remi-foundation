import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Remi Oseni Foundation",
  description: "Empowering youth and families through food support and community programs.",
  icons: {
    icon: "/remilogo.jpeg", // path in /public
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Force favicon */}
        <link rel="icon" href="/remilogo.jpeg" type="image/jpeg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
