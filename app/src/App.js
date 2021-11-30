import React from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import TokenMainPage from './pages/token/TokenMainPage';
// import SwapPool from './pages/swapPool/SwapPool';
import './App.css';
import Web3ReactComponent from './components/web3React/Web3ReactComponent';

function App() {
  return(
    <div className="App-header">
    <Web3ReactComponent>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TokenMainPage />} />
          {/* <Route path="/swappool" component={swapPool} /> */}
        </Routes>
      </BrowserRouter>
    </Web3ReactComponent>
    </div>
  )

}

export default App;
