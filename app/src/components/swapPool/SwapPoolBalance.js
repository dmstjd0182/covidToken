import React, { useContext } from "react";
import { TokenInfoContext } from "../context/ContextComponent";

function SwapPoolBalance(props) {
    const {symbol} = useContext(TokenInfoContext);
    return (
        <div>
            <p>Pool ETH : {props.eth.toLocaleString()} ETH</p>
            <p>Pool {symbol} : {props.token.toLocaleString()} {symbol}</p>
        </div>
    );
}

export default SwapPoolBalance;