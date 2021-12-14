import { useWeb3React } from "@web3-react/core";
import React, { useContext, useState } from "react";
import { SwapPoolContext } from "../context/ContextComponent";

function LiquidityComponent(props) {
    const {account, library: web3} = useWeb3React();
    const swapPool = useContext(SwapPoolContext);
    const [eth, setEth] = useState('');

    function handleEthChange(e) {
        setEth(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await swapPool.methods.addLiquidity().send({from: account, value: web3.utils.toWei(eth, 'ether')});
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>
                ETH:
                <input type='text' value={eth} onChange={handleEthChange} />
            </label>
            <input type='submit' value='유동성 공급!' />
        </form>
        </>
    );
}

export default LiquidityComponent;