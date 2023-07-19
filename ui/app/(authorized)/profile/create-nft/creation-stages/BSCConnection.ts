import { initWeb3 } from "./initWeb3";

export async function checkBSCConnection() {
  const web3 = await initWeb3();
  const chainId = await web3.eth.getChainId();
  return chainId.toString() === process.env.NEXT_PUBLIC_BSC_NET_ID;
}

export async function connectToBCS() {
  try {
    await initWeb3();
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }],
    });
  } catch (error: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x61",
              chainName: "BCS Test Network",
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
              blockExplorerUrls: ["https://testnet.bscscan.com"],
            },
          ],
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  }
}
