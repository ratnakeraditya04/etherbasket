import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Etherbasket from './abis/Etherbasket.json'

// Config
import config from './config.json'

function App() {
  const loadBlockchainData = async () => {
    const accounts = await window.ethereum.request({method : 'eth_requestAccounts'}); 
    const account = ethers.utils.getAddress(accounts[0]);

    console.log(account); 
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])
  return (
    <div>

      <h2>Welcome to Etherbasket!</h2>

    </div>
  );
}

export default App;
