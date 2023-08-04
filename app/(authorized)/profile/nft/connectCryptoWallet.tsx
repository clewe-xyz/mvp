import { initWeb3 } from "./initWeb3";

export async function connectMetaMaskWallet() {
  try {
    const accounts = (await window.ethereum?.request({
      method: "eth_requestAccounts",
    })) as string[];
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
    const accounts = (await window.ethereum?.request({
      method: "eth_accounts",
      params: [],
    })) as string[];
    return accounts[0] ?? null;
  } catch (error) {
    return null;
  }
}
