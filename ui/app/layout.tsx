import gradientCircle from "@/images/gradient-circle.svg";
import { mabryPro, spaceGrotesk, stolzl } from "@/ui-kit/fonts";
import classNames from "classnames";
import Image from "next/image";
import "./globals.css";

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
      className={classNames(
        spaceGrotesk.variable,
        mabryPro.variable,
        stolzl.variable
      )}
    >
      <body>
        <div className="bg-attributes">
          <Image
            className="bg-circle bg-circle-top"
            src={gradientCircle}
            alt="Circle"
            width="390"
          />
          <Image
            className="bg-circle bg-circle-bottom"
            src={gradientCircle}
            alt="Circle"
            width="390"
          />
        </div>
        {children}
      </body>
    </html>
  );
}
