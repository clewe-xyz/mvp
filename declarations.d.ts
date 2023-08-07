import { SDKProvider } from "@metamask/sdk-react";

declare global {
  interface Window {
    ethereum?: SDKProvider;
  }
}
