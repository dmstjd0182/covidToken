import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {useWeb3React} from '@web3-react/core';
import { SwapPoolContext, TokenInfoContext } from "../../components/context/ContextComponent";
import SwapComponent from "../../components/swapPool/SwapComponent";
import SwapPoolBalance from "../../components/swapPool/SwapPoolBalance";
import BalanceComponent from "../../components/userInfo/BalanceComponent";
import EthComponent from "../../components/userInfo/EthComponent";

function SwapPoolMainPage() {
    const {library: web3} = useWeb3React();
    const {decimals} = useContext(TokenInfoContext);
    const swapPool = useContext(SwapPoolContext);
    const [token, setToken] = useState(0);
    const [eth, setEth] = useState(0);

    let _getSwapPoolInfo = async () => {
        let _token = await swapPool.methods.getSwapPoolBalance().call();
        let _wei = await swapPool.methods.getSwapPoolETH().call();

        _token = _token / decimals;
        let _eth = web3.utils.fromWei(_wei.toString(), 'ether');

        setToken(_token);
        setEth(1*_eth);
    };

    useEffect(() => {
        _getSwapPoolInfo();
    }, []);

    return (
        <div>
        <Link to='/'>메인 페이지</Link>
        <p>
            <SwapPoolBalance
                token={token}
                eth={eth}
            />
            <EthComponent />
            <BalanceComponent />
            <SwapComponent 
                token = {token}
                eth={eth}
            />
        </p>
        </div>
    );
}

export default SwapPoolMainPage;