import { useWeb3React } from "@web3-react/core";
import React, { useContext, useEffect, useState } from "react";
import { SwapPoolContext, TokenInfoContext } from "../context/ContextComponent";

function SwapToToken(props) {
    const {account, library: web3} = useWeb3React();
    const {symbol} = useContext(TokenInfoContext);
    const swapPool = useContext(SwapPoolContext);
    const [value, setValue] = useState(''); 
    const [expected, setExpected] = useState(0);
    
    let lastEth = props.eth;
    let lastToken = props.token;

    let handleSubmit = async (e) => {
        e.preventDefault();
        let wei = web3.utils.toWei(value, 'ether');
        await swapPool.methods.swapToCVDT().send({from: account, value: wei});
    }

    let handleChange = (e) => {
        setValue(e.target.value);
    }

    function getExpected() {
        if (1 * value) {
            let newToken = lastEth * lastToken / (lastEth + (1 * value));
            setExpected(lastToken - newToken);
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
                ETH -&gt; {expected.toFixed(6)} {symbol} :
                <input type='text' value={value} onChange={handleChange} />
            </label>
            <input type='submit' value='Swap!' />
        </form>
        </div>
    );
}

export default SwapToToken;