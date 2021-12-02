import React from "react";
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import FirstcomeAirdrop from '../../build/contracts/FirstcomeAirdrop.json';
import AirdropCount from "../../components/airdrop/AirdropCount";
import Airdrop from "../../components/airdrop/Airdrop";

const AIRDROP_ADDRESS = '0x3c985ca1d1Bc97341089A869a70E4c274f3e48ab';

function AirdropMainPage() {
    const {library: web3} = useWeb3React();

    const airdrop = new web3.eth.Contract(FirstcomeAirdrop.abi, AIRDROP_ADDRESS);

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