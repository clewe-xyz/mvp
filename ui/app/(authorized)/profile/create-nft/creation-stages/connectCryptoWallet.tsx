import detectEthereumProvider from "@metamask/detect-provider";

export async function connectMetaMaskWallet() {
  let provider = await detectEthereumProvider();
  if (!provider) {
    throw new Error("Please install MetaMask browser extension");
  }
  if (typeof window !== "undefined") {
    if (provider !== window.ethereum) {
      throw new Error(
        "Seems like MetaMask is not your primary provider. Switch into MetaMask to proceed"
      );
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error("Please accept connection to MetaMask by CleWe");
      } else {
        throw new Error(error);
      }
    }
  }
}
