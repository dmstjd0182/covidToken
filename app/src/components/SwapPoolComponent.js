import React, { useState, useEffect } from "react";
import Web3 from "web3";

function SwapPoolComponent(props) {

    return (
        <div>
            <h3>현재 SwapPool 정보: </h3>
            {props.swapPoolInfo.eth / 10**18} ETH <br />
            {props.swapPoolInfo.balance / 10**props.tokenInfo.decimals} CVDT
        </div>
    )
}

export default SwapPoolComponent;