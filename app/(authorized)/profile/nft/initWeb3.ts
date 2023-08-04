import Web3 from "web3";

export async function initWeb3() {
  return new Web3(window.ethereum);
}
