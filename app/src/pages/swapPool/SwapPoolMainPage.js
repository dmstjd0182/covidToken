import React, { useContext, useEffect, useState } from "react";
import { SwapPoolContext, TokenInfoContext } from "../../components/context/ContextComponent";
import SwapComponent from "../../components/swapPool/SwapComponent";
import SwapPoolBalance from "../../components/swapPool/SwapPoolBalance";
import BalanceComponent from "../../components/userInfo/BalanceComponent";
import EthComponent from "../../components/userInfo/EthComponent";

function SwapPoolMainPage() {
    const swapPool = useContext(SwapPoolContext);
    const {decimals} = useContext(TokenInfoContext);
    const [token, setToken] = useState(0);
    const [eth, setEth] = useState(0);

    let _getSwapPoolInfo = async () => {
        let _token = await swapPool.methods.getSwapPoolBalance().call();
        let _eth = await swapPool.methods.getSwapPoolETH().call();

        _token = _token / decimals;
        _eth = _eth / 10**18;

        setToken(_token);
        setEth(_eth);
    };

    useEffect(() => {
        _getSwapPoolInfo();
    }, []);

    return (
        <div>
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