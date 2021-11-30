import { useWeb3React } from "@web3-react/core";
import React, { useContext, useEffect, useState } from "react";
import { SwapPoolContext, TokenInfoContext } from "../context/ContextComponent";

function SwapToEth(props) {
    const {account} = useWeb3React();
    const {symbol, decimals} = useContext(TokenInfoContext);
    const swapPool = useContext(SwapPoolContext);
    const [value, setValue] = useState(''); 
    const [expected, setExpected] = useState(0);
    
    let lastEth = props.eth;
    let lastToken = props.token;

    let handleSubmit = async (e) => {
        e.preventDefault();
        let _amount = (1 * value) * decimals;
        await swapPool.methods.swapToETH(Math.round(_amount)).send({from: account, value: 0});
    }

    let handleChange = (e) => {
        setValue(e.target.value);
    }

    function getExpected() {
        if (1 * value) {
            let newEth = lastToken * lastEth /(lastToken + (1 * value));
            setExpected(lastEth - newEth);
        } else {
            setExpected(0);
        }
    }

    useEffect(() => {
        getExpected();
    }, [value]);

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <label>
                {symbol} -&gt; {expected.toFixed(6)} ETH :
                <input type='text' value={value} onChange={handleChange} />
            </label>
            <input type='submit' value='Swap!' />
        </form>
        </div>
    );
}

export default SwapToEth;