import React from "react";
import BalanceComponent from "../../components/token/BalanceComponent";
import InfectComponent from "../../components/token/InfectComponent";
import TransferComponent from "../../components/token/TransferComponent";
import RewardPoolComponent from "../../components/token/RewardPoolComponent";
import TotalSupplyComponent from "../../components/token/TotalSupplyComponent";


function TokenMainPage() {
    return (
        <div>
            <p>
            <h1>COVID TOKEN!</h1>
            <div>
                <TotalSupplyComponent />
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