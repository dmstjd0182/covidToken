import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";

function EthComponent() {
    const {account, library: web3} = useWeb3React();
    const [eth, setEth] = useState(0);

    let getEth = async () => {
        let wei = await web3.eth.getBalance(account);
        let _eth = web3.utils.fromWei(wei, 'ether');
        setEth(1 * _eth);
    };

    useEffect(() => {
        getEth();
    },[]);

    return(
        <div>
            내 ETH: {eth.toFixed(6).toLocaleString()} ETH
        </div>
    );
}

export default EthComponent;