import { initWeb3 } from "./initWeb3";

export async function checkBSCConnection() {
  const web3 = await initWeb3();
  const chainId = await web3.eth.getChainId();
  return chainId.toString() === process.env.NEXT_PUBLIC_BSC_NET_ID;
}

export async function connectToBCS() {
  const chainId = `0x${parseInt(
    process.env.NEXT_PUBLIC_BSC_NET_ID as string
  ).toString(16)}`;
  try {
    await initWeb3();
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  } catch (error: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId,
              chainName: process.env.NEXT_PUBLIC_BSC_NET_NAME,
              nativeCurrency: {
                name: process.env.NEXT_PUBLIC_BSC_SYMBOL,
                symbol: process.env.NEXT_PUBLIC_BSC_SYMBOL,
                decimals: 18,
              },
              rpcUrls: [process.env.NEXT_PUBLIC_BSC_RPC_URL],
              blockExplorerUrls: [process.env.NEXT_PUBLIC_BSC_EXPLORER_URL],
            },
          ],
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  }
}
