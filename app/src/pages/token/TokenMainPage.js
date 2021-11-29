import ConnectComponents from "../../components/wallet/ConnectComponent";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import MainFrame from "../../components/token/MainFrame";


function TokenMainPage() {
    const {active} = useWeb3React();

    return (
        <div>
            <h1>COVID TOKEN!</h1>
            <ConnectComponents />
            {active && <MainFrame />}
        </div>
    );
}

export default TokenMainPage;