import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Covid from "../../build/contracts/Covid.json";
import SwapPool from "../../build/contracts/SwapPool.json";

const COVID_ADDRESS = "0x563c6b83350141CE8236c780699e9F2c85C7199C";
const SWAP_POOL_ADDRESS = "0x30309cf2d858d34B0Ab75920D260C65d8CFE67a5";

export const CovidContext = React.createContext();
export const SwapPoolContext = React.createContext();
export const TokenInfoContext = React.createContext();  

let tokenInfo = {};

function ContextComponent(props) {
    const { library: web3 } = useWeb3React();
    const [isLoading, setIsLoading] = useState(true);

    const covid = new web3.eth.Contract(Covid.abi, COVID_ADDRESS);
    const swapPool = new web3.eth.Contract(SwapPool.abi, SWAP_POOL_ADDRESS);

    async function getTokenInfo() {
        let _symbol = await covid.methods.symbol().call();
        let _decimals = 10 ** (await covid.methods.decimals().call());
        let _totalSupply = await covid.methods.totalSupply().call();
        
        tokenInfo = {
            symbol: _symbol,
            decimals: _decimals,
            totalSupply: _totalSupply,
            };
        setIsLoading(false);
    }
    
    useEffect(() => {
        getTokenInfo();
    }, []);

    if (isLoading) {
        return(
            <div>Loading...</div>
        );
    } else {
        return(
            <CovidContext.Provider value={covid}>
            <SwapPoolContext.Provider value={swapPool}>
            <TokenInfoContext.Provider value={tokenInfo}>
                {props.children}
            </TokenInfoContext.Provider>
            </SwapPoolContext.Provider>
            </CovidContext.Provider>
        );
    }
}

export default ContextComponent;