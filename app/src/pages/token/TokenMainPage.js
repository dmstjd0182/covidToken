import ConnectComponents from "../../components/wallet/ConnectComponent";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import MainFrame from "../../components/token/MainFrame";
import BalanceComponent from "../../components/token/BalanceComponent";
import InfectComponent from "../../components/token/InfectComponent";
import TransferComponent from "../../components/token/TransferComponent";
import RewardPoolComponent from "../../components/token/RewardPoolComponent";


function TokenMainPage() {
    const {active} = useWeb3React();

    return (
        <div>
            <h1>COVID TOKEN!</h1>
            <ConnectComponents />
            
            {active && 
            <MainFrame>
                <BalanceComponent />
                <InfectComponent />
                <TransferComponent />
                <RewardPoolComponent />
            </MainFrame>}
        </div>
    );
}

export default TokenMainPage;