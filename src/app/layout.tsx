import { Poppins } from "next/font/google";

import { ThemeProvider } from "@components/theme-provider";
import Header from "@components/header";
import Footer from "@components/footer";

import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

export const generatePageMetadata = (pageTitle?: string, description?: string) => {
  return ({
    title: pageTitle ? `${pageTitle} by Raul Glogovetan` : "Raul Glogovetan's Personal Website",
    description: description || "Raul Glogovetan's personal website",
  });
};

export const metadata = generatePageMetadata();

interface RootLayoutProps {
  children: React.ReactNode,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`text-base antialiased bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-[WhiteSmoke] ${poppins.className} prose-a:tracking-tight hover:prose-a:underline prose-a:font-medium prose-a:text-accent prose-code:text-[0.93rem]`}>
        <ThemeProvider attribute="class" enableSystem>
          <div className="mx-10 sm:mx-10 md:mx-16 lg:mx-28">
            <Header />
            <main className="max-w-3xl">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
