import { injected } from "./Connectors";
import { useWeb3React } from "@web3-react/core";
import React from 'react';
import {Route, Link}

function ConnectComponents({match}) {
    const {active, account, activate, deactivate} = useWeb3React();
    // const isUnspportedChainIdError = error instanceof UnsupportedChainIdError;
    // const isUserRejectedRequestError = error instanceof UserRejectedRequestError;

    async function connect() {
        try {
            await activate(injected);
        } catch(ex) {
            console.log(ex);
        }
    }

    async function disconnect() {
        try {
            await deactivate();
        } catch(ex) {
            console.log(ex);
        }
    }

    return (
        <div>
            <button onClick={connect}>Connect to wallet</button><button onClick={disconnect}>Disconnect</button><br />
            {active ? <span>당신의 주소: {account}</span> : <span>지갑을 연결하세요.</span>}
        </div>
    )
}

export default ConnectComponents;