import { Hammersmith_One } from "next/font/google";
import { Lora } from "next/font/google";
import NavBar from "./components/NavBar";
import "./globals.css";

const hammersmithOne = Hammersmith_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-hammersmith-one",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-lora",
});

export const metadata = {
  title: "Dwaine Brannon Music / Gaming / Software Portfolio / Writing",
  description: "Portfolio of software projects, writing, original music, and gaming content.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${hammersmithOne.className} ${hammersmithOne.variable} ${lora.variable}`}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}