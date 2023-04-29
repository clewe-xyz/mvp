import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CleWe",
  description: "Web 3 education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="uk-background-white dark:uk-background-gray-100 dark:uk-text-gray-20 uk-dark"
    >
      <head>
        <link rel="stylesheet" href="../styles/theme/main.scss" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
