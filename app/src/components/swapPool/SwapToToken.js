import { useWeb3React } from "@web3-react/core";
import React, { useContext, useState } from "react";
import { SwapPoolContext, TokenInfoContext } from "../context/ContextComponent";

function SwapToToken(props) {
    const {account, library: web3} = useWeb3React();
    const {symbol} = useContext(TokenInfoContext);
    const swapPool = useContext(SwapPoolContext);
    const [value, setValue] = useState(); 

    let handleSubmit = async (e) => {
        e.preventDefault();
        await swapPool.methods.swapToCVDT().send({from: account, value: web3.utils.toWei(value, 'ether')});
    }

    let handleChange = (e) => {
        setValue(e.target.value);
    }

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <label>
                ETH -&gt; {symbol} :
                <input type='text' value={value} onChange={handleChange} />
            </label>
            <input type='submit' value='Swap!' />
        </form>
        </div>
    );
}

export default SwapToToken;