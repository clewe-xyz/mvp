import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

export async function initWeb3() {
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
  }
  return new Web3(window.ethereum);
}
