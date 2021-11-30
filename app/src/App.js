import React from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import './App.css';
import Web3ReactComponent from './components/web3React/Web3ReactComponent';
import TokenMainPage from './pages/token/TokenMainPage';
import SwapPoolMainPage from './pages/swapPool/SwapPoolMainPage';
import AirdropMainPage from './pages/airdrop/AirdropMainPage';

function App() {
  return(
    <div className="App-header">
    <Web3ReactComponent>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TokenMainPage />} />
          <Route path="/swap" element={<SwapPoolMainPage />} />
          <Route path='/airdrop' element={<AirdropMainPage />} />
        </Routes>
      </BrowserRouter>
    </Web3ReactComponent>
    </div>
  )

}

export default App;
