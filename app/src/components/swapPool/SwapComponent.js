import React from "react";
import SwapToEth from "./SwapToEth";
import SwapToToken from "./SwapToToken";

function SwapComponent(props) {
    return(
        <div>
        <SwapToEth 
            token={props.token}
            eth={props.eth}
        />
        <SwapToToken 
            token={props.token}
            eth={props.eth}
        />
        </div>
    );
}

export default SwapComponent;