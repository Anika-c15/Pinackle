import { ethers } from 'ethers';
import PinataSDK from '@pinata/sdk';

// Initialize Pinata
const pinata = new PinataSDK(process.env.REACT_APP_PINATA_API_KEY, process.env.REACT_APP_PINATA_API_SECRET);

// Connect to MetaMask
export async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error("User denied account access");
      return null;
    }
  } else {
    console.error("MetaMask not detected");
    return null;
  }
}

// Get contract instance
export function getContract(contractAddress, contractABI) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
}