import { MyCoolNavbar } from "./components/MyCoolNavbar/MyCoolNavbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meals generator",
  description: "Generate meals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto p-4">
          <div className="text-3xl uppercase tracking-wide py-4">
            Meals generator
          </div>
          <MyCoolNavbar />
          {children}
        </main>
      </body>
    </html>
  );
}
