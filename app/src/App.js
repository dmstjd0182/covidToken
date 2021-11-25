import React, { useState, useEffect } from "react";
import Covid from "./build/contracts/Covid.json";
import CovidPool from "./build/contracts/CovidPool.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import BalanceComponent from './components/BalanceComponent';
import InfectComponent from "./components/InfectComponent";
import TransferComponent from "./components/TransferComponent";
import TokenInfoComponent from "./components/TokenInfoComponent";
import SwapPoolComponent from "./components/SwapPoolComponent";


function App() {
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState([
    '0x0dF5Ed0a9678C78759Ccf8F43590Ef4Da3625848',
    '0xD103020CA656cdc1Bfd3d422A8080f1136FD5A19',
    '0xf60871E0253c8c7B0446b4e93DB51B71bbD9f7B8',
    '0xAdEd9F7956fA6317aEb15F07817Cc05380700C19',
    '0x5d9331184783a97cD0505Ac90371C88A814C35f3',
    '0x0b712586228E898946E5f61e54D889bFfa34F4f6',
    '0xff05bB3ba090d6e6355f5a7d32598e23ad74C3Ce',
    '0x9A21B56f6114Bae0076C61eC0946aab304c6E6f2', 
    '0x3A5ED8D5A27631F4a4F460f09c2f4ab22def3201',
    '0xE83B2Ce09205b1873dB585DAbd7dA1C3a16201D6'
  ]);
  const [instance, setInstance] = useState();
  const [poolInstance, setPoolInstance] = useState();
  const [balance, setBalance] = useState(0);
  const [tokenInfo, setTokenInfo] = useState({});
  const [swapPoolInfo, setSwapPoolInfo] = useState({});

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

    let poolInstance = new web3.eth.Contract(
      CovidPool.abi,
      deployedNetwork && instance.methods.covidPool().call(),
    )
    setPoolInstance(poolInstance);

    let name = await instance.methods.getName().call();
    let symbol = await instance.methods.getSymbol().call();
    let decimals = await instance.methods.getDecimals().call();
    let initialSupply = await instance.methods.getInitialSupply().call();
    let totalSupply = await instance.methods.getTotalSupply().call();
    let rewardPool = await instance.methods.getRewardPool().call();
    setTokenInfo({
      name: name,
      symbol: symbol,
      decimals: decimals,
      initialSupply: initialSupply,
      totalSupply: totalSupply,
      rewardPool: rewardPool,
    });

    let eth = await instance.methods.getSwapPoolETH().call();
    let balance = await instance.methods.getSwapPoolBalance().call();
    setSwapPoolInfo({
      eth: eth,
      balance: balance,
    })
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

  async function transferTo(recipient, amount) {
    await instance.methods.transferTo(recipient, amount).send({from: accounts[0]});
  }

  return (
    <div className="App">
      <h1>COVID TOKEN!</h1>
      <p>Let's infect all humans.</p>
      <h2>Infect Start</h2>
      <SwapPoolComponent 
        swapPoolInfo = {swapPoolInfo}
        tokenInfo = {tokenInfo}
      />
      <strong>
        주소를 입력하여 전염시키세요!
      </strong>
      <p>당신의 주소: {accounts[0]}
      </p>
      <p>
        <TokenInfoComponent 
          tokenInfo = {tokenInfo}
        />
      </p>
      <p>
      <InfectComponent 
        infectTo = {(i) => {
          infectTo(i);
        }}
      />
      </p>
      <p>
      <TransferComponent
        decimals = {tokenInfo.decimals}
        transferTo = {(recipient, amount) => {
          transferTo(recipient, amount);
        }} 
      />
      </p>
      <p>
      <BalanceComponent 
      balance={balance} 
      symbol={tokenInfo.symbol}
      balanceOf={(i) => {
        balanceOf(i)
        }} 
      />
      </p>
      <p>
        <br />
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
