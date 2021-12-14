import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Covid from "../../build/contracts/Covid.json";
import SwapPool from "../../build/contracts/SwapPool.json";

export const CovidContext = React.createContext();
export const SwapPoolContext = React.createContext();
export const TokenInfoContext = React.createContext();  

let covid;
let swapPool;
let tokenInfo = {};

function ContextComponent(props) {
    const { library: web3 } = useWeb3React();
    const [isLoading, setIsLoading] = useState(true);
    const covidDeployedNetwork = Covid.networks[3];     //Network ID 설정

    async function setContext() {
        covid = await new web3.eth.Contract(Covid.abi, covidDeployedNetwork.address);
        swapPool = new web3.eth.Contract(SwapPool.abi, await covid.methods.swapPool().call());
    }

    async function getTokenInfo() {
        let _symbol = await covid.methods.symbol().call();
        let _decimals = 10 ** (await covid.methods.decimals().call());
        let _totalSupply = await covid.methods.totalSupply().call();
        
        tokenInfo = {
            symbol: _symbol,
            decimals: _decimals,
            totalSupply: _totalSupply,
        };
    }
    
    useEffect(async () => {
        await setContext();
        await getTokenInfo();
        setIsLoading(false);
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