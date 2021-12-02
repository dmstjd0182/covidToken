import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Covid from "../../build/contracts/Covid.json";
import SwapPool from "../../build/contracts/SwapPool.json";

const COVID_ADDRESS = "0xb3f84b294C8b9f29231a3471dc40a620D8b018ED";
const SWAP_POOL_ADDRESS = "0xF678D54ef1F5A070620F099f72868C3b0bCABb7a";

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