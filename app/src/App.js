import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import TokenMainPage from './pages/token/TokenMainPage';
// import SwapPool from './pages/swapPool/SwapPool';
import Web3 from 'web3';

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return(
    <Web3ReactProvider getLibrary={getLibrary}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TokenMainPage />} />
        {/* <Route path="/swappool" component={swapPool} /> */}
      </Routes>
    </BrowserRouter>
    </Web3ReactProvider>
  )

}

export default App;
