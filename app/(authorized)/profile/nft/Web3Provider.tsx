"use client";

import { MetaMaskProvider } from "@metamask/sdk-react";
import { ReactNode } from "react";

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <MetaMaskProvider
      sdkOptions={{
        dappMetadata: {},
        checkInstallationImmediately: false,
      }}
    >
      {children}
    </MetaMaskProvider>
  );
}
