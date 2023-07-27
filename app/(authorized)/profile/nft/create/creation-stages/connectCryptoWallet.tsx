import { initWeb3 } from "./initWeb3";

export async function connectMetaMaskWallet() {
  try {
    const web3 = await initWeb3();
    const activeAccounts = await web3.eth.getAccounts();
    if (activeAccounts[0]) {
      return activeAccounts[0];
    }
    const accounts = await web3.eth.requestAccounts();
    return accounts[0];
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error("Please accept connection to MetaMask by CleWe");
    } else {
      throw new Error(error.message);
    }
  }
}

export async function getActiveMetaMaskAccount() {
  try {
    const web3 = await initWeb3();
    const accounts = await web3.eth.getAccounts();
    return accounts[0] ?? null;
  } catch (error) {
    return null;
  }
}
