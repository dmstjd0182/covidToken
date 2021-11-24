import React, { useState, useEffect } from "react";
import Covid from "./build/contracts/Covid.json";
import getWeb3 from "./getWeb3";
import BalanceComponent from './BalanceComponent';

import "./App.css";
import InfectComponent from "./InfectComponent";


function App() {
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState([
    '0x9e487C45b129F5fF38388a7342Eb9d88070f205A',
    '0x9122dC50F1EBf4706009f0B23aae326c4047865E',
    '0x87fD894658E390B83eAC39575b47E13350afedfB',
    '0x22e975D0CDc1077A2A0227125c6C74D3aa83d6cc',
    '0x7e8a21f685d7088Bc7b60fCf961c63C3450Df835',
    '0x93D36a9BC5C2F11D59cE020e6B0b31c84D04E97F',
    '0x3735eC18Fa3Aac36ed4AFe01ed978dcE1956df0A',
    '0xBf900EaD293DCA7330B5E2484f234E526521FaaE',
    '0x743f0566Ab084c582678a89dc996677998182861',
    '0x508915cb2b3Efc5c600337D24FCEa9602fFD945b'
  ]);
  const [instance, setInstance] = useState();
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    let web3 = await getWeb3();
    setWeb3(web3);
    let networkId = await web3.eth.net.getId();
    let deployedNetwork = Covid.networks[networkId];
    let instance = new web3.eth.Contract(
      Covid.abi,
      deployedNetwork && deployedNetwork.address,
    );
    setInstance(instance);
  }, []);

  async function infectTo(_to) {
    await instance.methods.infectTo(_to).send({from: accounts[0], value: 2*10**16});
  }

  function getAccounts() {
    return accounts.map((account, idx) => {
      return(
        <li>
          user #{idx+1}: {account}
        </li>
      )
    });
  }
  const accountArray = getAccounts();

  async function balanceOf(address) {
    let balance = await instance.methods.balanceOf(address).call();
    balance = balance / 10**8;
    setBalance(balance);
  }

  return (
    <div className="App">
      <h1>COVID TOKEN!</h1>
      <p>Let's infect all humans.</p>
      <h2>Infect Start</h2>
      <p>
        주소를 입력하여 전염시키세요!
      </p>
      <p>당신의 주소: {accounts[0]}
      </p>
      <InfectComponent 
        infectTo = {(i) => {
          infectTo(i);
        }}
      />
      <BalanceComponent 
      balance={balance} 
      balanceOf={(i) => {
        balanceOf(i)
        }} 
      />
      <p>
        UserList : 
      </p>
      <div> {accountArray}</div>
    </div>
    );
}

/*
class App extends React.Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Covid.networks[networkId];
      const instance = new web3.eth.Contract(
        Covid.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    await contract.methods.infectTo('0x9122dC50F1EBf4706009f0B23aae326c4047865E').send({from:accounts[0],value: 2*10**16});

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
        {this.state.accounts[0]}
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}
*/

export default App;
