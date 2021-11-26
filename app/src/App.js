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
    '0x6003A4eA8975e302D5f49AbFd30305461AaAA89C',
    '0x4F83a717cac7FfBf1acB0375Ba34AA25917164B8',
    '0xb02319a51AC5321e8B99FC701577D95d3CD85aF0',
    '0xb51B3282748728490e7192EE2c44B012d2E02EE5',
    '0xd98Fc2A48B4ED3A32206A267DEaE04928B3c1fB0',
    '0x7d27BCCCe376d41cD49980304494f797f453cA27',
    '0x1530D61a6BFe06Db83956250B8f07e82c6f4C1B7',
    '0x391E8e066554c13E1AcC7050C9914275b85317D8',
    '0x3D3ffc189B194b170c9513f5577ae3A6948c664f',
    '0x4343b677d4b6eF787227bab12844D8496a011e5C',
    '0xC1241C978e31093EA55Ac5413b10eEF53b3d46f8',
    '0xf5361a783A153d60833c77966dDcDD9A379c1835',
    '0x7F2075814aF13D8876d05bf972d684d1e3a0b402',
    '0x1A071fDE748a7c4F1D7c7504c2663e04C5256f1e',
    '0x51aE81940508fdA71626baE8E9B3D206d19B09cA',
    '0xC8b59Eb24d2e22BF3a66dEC0CdF6A222690fBA36',
    '0x88c86308d491E61AF6A3e5303A1702f227928bd8',
    '0xEBf6D514c9Af9761D8d551d85070DeB9A90B2dFB',
    '0xe2D90923212dFb75Ad14B15F05BD941F22373a68',
    '0x8F952363b37C6249F953e6841f6593e255Ce2BbD',
    '0xD8823075f5cf65E430594c47b2B48d6E92e2e0f2',
    '0xCE1b9DA61Dd35aB9dC3410CBD78b1ebf04fb594d',
    '0x00E208F6eBdcb717F91c330d461Ba4d896826c5d',
    '0x24B6DD04F837e69A304C92028824d1874171c289',
    '0xE27956744DCCA3E10289B924c5891825c5DE9881',
    '0x52bad71A0D7B19087E3c5bF2a5208eA1Ce792862',
    '0xcAEe17191bb1A32E9d9A4b824f83062a855a8300',
    '0xf8b4F494B68649854dD9450bBA2E037c2AF00887',
    '0x186c98331e1E79a1e49A70Cb6b505E139E6545A5',
    '0x6b330563C64f00Ab770631d8fC3aB0A438f90853',
    '0x08B8aF2C18cd079e403587eC23015be448575366',
    '0xe59518bc1DEd5983b81e886AC7d03a467Da91eCa',
    '0x30335B1856a1E05B8D87DDf7Eb97abdab1dDDD0e',
    '0x5c1CF73aDBeCf9a27c72b4a90F1F93835F8de622',
    '0x98C7d52772B94bF7B4af486B8F5d8b0Cec150536',
    '0xf70fC1A5d4868AAc34802B6d935618110126a188',
    '0x5562b47CbCd4c63C126F0FF40Cf321BfD7C246A7',
    '0x10255Db7Eb6bEd35378A5381C8F2783D333C256c',
    '0x816833562E87B3d26be5543711581E9B0eD069b6',
    '0x717e5FeEe1790cEf5B867C0AF54C43de80467dcD',
    '0x8eF2d4D397D720530ec71D6E19b78999bFaB9815',
    '0x0715585FC5863Cc4C1D28d9464f00086926C8aF3',
    '0x125E4dEC3416cC5A31Dc638B1b6e09375ed80654',
    '0x0f10820BE993F71672b41EF150B739026aeF8349',
    '0xf382C67eaf84C08B06D24CB4990963825009A798',
    '0xB8B5933757218a7d9C685Db03ab7306117e8B70F',
    '0x5cabaf4E8B555Bdd7be1bc5E33D1B50D854e4367',
    '0x6Afea92AC145AAee08d47904F8d1a993780678E4',
    '0x675fDBE84e7DC043140a01dbB4B25ED3901088FE',
    '0x11e40d61D823FeA8eE2d2d1e7d5a25ad34aBc570',
    '0x14423001a0571f8AC8a9997BE0f312e823374e75',
    '0xeCA5E43442Db2d5c5517c3fB0cC992c409721217',
    '0x441b3323758D58e38C89FdFC0ad3337E357381B2',
    '0xe04885C8eD3699786Afb6CE05BD9705eD42876E5',
    '0x4CfcDde483923E186b6A136f1B04ACe6D7ba3C72',
    '0x1F616DC0885D4D85f796fC5204B8a97aDFF7b282',
    '0xB6De67e8c36f79A66b996176589cdDA46d170eaC',
    '0xc803B0FdC83815E9d9a03cC051B36FE34f6c2D12',
    '0xC7D68B8362Df12e2201be847B405F7F9e6a55e72',
    '0x47377F2BE2A1779accBe2bFA9eb78452063e715F',
    '0xE14D4CE685f8B94988e5585C752204a3EdffEeb1',
    '0xC5704a2969E3D1DdA81Db6e71F04c8d19F269020',
    '0xb0927dA06052cAD3303c214Ec1556a4B1bA0BA98',
    '0x634Cb3649eaa62a1F9DA8c67E6fdf2a7E984762C',
    '0xB45fcFC1898160589de81c82D24ca5031118536c',
    '0x773C26Da448c49Fc774D319582aC9B9d722c11b1',
    '0xF3dc4C2465C89b4Cb5056bef59158642Afb4f787',
    '0x7493C85C3237E3E44aF17DEf9618c46BEcD6de9E',
    '0x1814Af5CF45A426CAF3C3814feD74Cb7e22d7939',
    '0x6fc56c7A238c4BD9AD405CCAA4EAE4575e011f8a',
    '0x74039fB7F9e32159AcF9610EF67cCA58aA0BE85B',
    '0x983b8742270db63ac78A82B6384BD14763ede1fa',
    '0x0458B9a64434ac6898D0CA6E08f0B1111Dc183e0',
    '0xbA061BbB611bCcD90491224ADe1c5b439af77c34',
    '0x1458Eb0FcB2f025B7D5D97627e233330206A0e61',
    '0x067a192F2E3DaC0aeD6f1f77C3CA6CB04f917d18',
    '0xfdDBd7898ff38421a24CF4B38DeB286D583c2C07',
    '0x5F7381145d0D964708D909352dF67d657Bc2D37D',
    '0x2E7a759Af87363029024B4719a85e4f26FCdf951',
    '0x9b843f55837D2E0e631abfC141242b59D73aEf94',
    '0x1F1B0ce6ac64FdaFF7ABA121DBF4b9D9ffAf8fc0',
    '0x9D836993E8Bca72BC7563D0c2c4059783d8c46Ed',
    '0x5A63a6Ef7b90780373ffDe6Bb8b3674DcB774903',
    '0x5C5465c1FA778668D6Cc6052b9D5B27937dBF318',
    '0x72AE736702068eaA176521564174a449CF87A98E',
    '0x9fE67Caba0A59aC8053266266d141500f4AF969D',
    '0x36e342095CB74062E02842c29315Fb4Cc7E21CF8',
    '0x2482D6EfB490d321620184aCE4A55F3E67758b7a',
    '0xfa719F9a0eAE0Fb248c8C4e6BFe7e2A7515BEBE3',
    '0x2c06318b09309d29fDd656e58Cce9aA53Cc4fD90',
    '0x45a1A483966c4bA76EEB278a117F075c4E411BBB',
    '0xD774CCEc35aD96FcCE3dEa4eEc2E217771ffcd0c',
    '0x358eA9dF0c9b2145bae5E5113b5330723E454a00',
    '0xaab74f891Dcd99A139B36De0ad6c2CF774C018dC',
    '0x07C7254c24057cB7EbCD4eE09dB3cDc2880C3A33',
    '0x637C94a3947f683Df2217Dc19DFE1C2aB117c78D',
    '0xed4bb7Ab1d2Be45105bf9C5FC32B0109AC290786',
    '0x597dff95E5DdfEb6fad9ffe57A8A0271725599aA',
    '0x3372d3D5c24957E3b3851b4d1c33cAE37E87EfEF',
    '0xC82D91e67d5dAaA39Ae3ec14b08464d8944d841E'
  ]);
  const [instance, setInstance] = useState(0);
  const [poolInstance, setPoolInstance] = useState(0);
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
