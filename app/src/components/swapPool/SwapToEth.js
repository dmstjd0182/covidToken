import React, { useContext, useState } from "react";
import { SwapPoolContext, TokenInfoContext } from "../context/ContextComponent";

function SwapToEth(props) {
    const {symbol, decimals} = useContext(TokenInfoContext);
    const swapPool = useContext(SwapPoolContext);
    const [value, setValue] = useState(); 

    let handleSubmit = async (e) => {
        e.preventDefault();
        await swapPool.methods.swapToETH(Math.round(value * decimals)).call();
    }

    let handleChange = (e) => {
        setValue(e.target.value);
    }

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <label>
                {symbol} -&gt; ETH :
                <input type='text' value={value} onChange={handleChange} />
            </label>
            <input type='submit' value='Swap!' />
        </form>
        </div>
    );
}

export default SwapToEth;