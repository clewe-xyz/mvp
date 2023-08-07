import { useSDK } from "@metamask/sdk-react";
import { Web3Provider } from "./Web3Provider";

export default function NFTLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <Web3Provider>{children}</Web3Provider>;
}
