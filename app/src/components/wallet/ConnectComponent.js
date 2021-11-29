import { injected } from "./Connectors";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from 'react';

function ConnectComponents() {
    const {account, activate, deactivate} = useWeb3React();
    const [isConnected, setIsConnected] = useState(false);

    async function connect() {
        try {
            await activate(injected);
            window.localStorage.setItem('active', true);
            setIsConnected(true);
        } catch(ex) {
            console.log(ex);
        }
    }

    function disconnect() {
        try {
            deactivate();
            window.localStorage.setItem('active', false);
            setIsConnected(false);
        } catch(ex) {
            console.log(ex);
        }
    }

    useEffect(() => {
        let active = JSON.parse(window.localStorage.getItem('active'));
        if(active) {
            connect();
        } else {
            disconnect();
        }
        setIsConnected(active);
    }, []);

    return (
        <div>
            {isConnected ? 
            <span>
                <button onClick={disconnect}>Disconnect</button><br />
                내 주소: {account}
            </span> : 
            <span>
                <button onClick={connect}>Connect to wallet</button><br />
                지갑을 연결하세요.
            </span>}
        </div>
    )
}

export default ConnectComponents;