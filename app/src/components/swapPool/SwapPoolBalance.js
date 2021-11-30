import React, { useContext } from "react";
import { TokenInfoContext } from "../context/ContextComponent";

function SwapPoolBalance(props) {
    const {symbol} = useContext(TokenInfoContext);
    let eth = props.eth
    let token = props.token

    return (
        <div>
            <p>Pool ETH : {eth.toFixed(6).toLocaleString()} ETH</p>
            <p>Pool {symbol} : {token.toFixed(6).toLocaleString()} {symbol}</p>
        </div>
    );
}

export default SwapPoolBalance;