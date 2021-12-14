import { useWeb3React } from "@web3-react/core";
import React from "react";
import FirstcomeAirdrop from '../../build/contracts/FirstcomeAirdrop.json';
import LiquidityComponent from "../../components/admin/LiquidityComponent";

function AdminMainPage() {
    const {library: web3} = useWeb3React();
    const airdropDeployedNetwork = FirstcomeAirdrop.networks[3];

    const airdrop = new web3.eth.Contract(FirstcomeAirdrop.abi, airdropDeployedNetwork.address);

    return (
        <>
        <LiquidityComponent />
        </>
    );
}

export default AdminMainPage;