import React from "react";
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import FirstcomeAirdrop from '../../build/contracts/FirstcomeAirdrop.json';
import AirdropCount from "../../components/airdrop/AirdropCount";
import Airdrop from "../../components/airdrop/Airdrop";

function AirdropMainPage() {
    const {library: web3} = useWeb3React();
    const airdropDeployedNetwork = FirstcomeAirdrop.networks[3];

    const airdrop = new web3.eth.Contract(FirstcomeAirdrop.abi, airdropDeployedNetwork.address);

    return(
        <div>
        <p>
        <Link to='/'> 메인 페이지로 이동</Link>
        <h2>COVID AIRDROP!</h2>
        <AirdropCount 
            airdrop={airdrop}
        />
        <Airdrop 
            airdrop={airdrop}
        />
        </p>
        </div>
    );
}

export default AirdropMainPage;