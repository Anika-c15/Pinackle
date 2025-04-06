import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Navbar} from './components/Navbar'
import {Explore} from './components/Explore'
import  Profile  from './components/Profile'
import './App.css'
import abi from "./abis/PinMarket.json"
import { ethers } from 'ethers'
import PinUploader from './components/UploadProfile'


function App() {
  const [state,setState]=useState({
    provider:'',
    signer:'',
    address: '',
    contract: ''
  })
  const [uploadedPins, setUploadedPins] = useState([]);
  const [account,setAccount]=useState("")
  
  const connectWallet=async()=>{
  
    const contractAddress = "0x84341A75C67f436aCa74755FF6f62F1afd13aA0a";
    const contractABI = abi.abi;

    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask is not installed");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length === 0) {
        console.log("No account found");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress()
      setAccount(address)
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log(address)

      setState({ provider, signer, contract,address });
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
    }
  }

  return (
    <Router>
      <div className="app">
        <Navbar connectWallet={connectWallet} state={state} account={account} />
        <Routes>
          <Route path="/explore" element={<Explore state={state} account={account} />} />
          <Route path="/profile" element={<Profile state={state} account={account} />} />
          <Route path="/upload" element={<PinUploader />} />
          <Route path="/" element={<Explore state={state} account={account}/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
