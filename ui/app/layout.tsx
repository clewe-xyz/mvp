import "./globals.css";
import "../assets/styles/theme/main.scss";

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
      <body className="uni-body">{children}</body>
    </html>
  );
}
