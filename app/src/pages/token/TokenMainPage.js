import React from "react";
import BalanceComponent from "../../components/userInfo/BalanceComponent";
import InfectComponent from "../../components/token/InfectComponent";
import TransferComponent from "../../components/token/TransferComponent";
import RewardPoolComponent from "../../components/token/RewardPoolComponent";
import TotalSupplyComponent from "../../components/token/TotalSupplyComponent";
import EthComponent from "../../components/userInfo/EthComponent";


function TokenMainPage() {
    return (
        <div>
        <p>
            <h1>COVID TOKEN!</h1>
            <div>
                <TotalSupplyComponent />
                <EthComponent />
                <BalanceComponent />
                <InfectComponent />
                <TransferComponent />
                <RewardPoolComponent />
            </div>
        </p>
        </div>
    );
}

export default TokenMainPage;