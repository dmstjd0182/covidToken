import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Covid from "../../build/contracts/Covid.json";


const COVIDADDRESS = "0x5312e68deC38B7D1f1a43e6B7B66144E12E917C4";
export const InstanceContext = React.createContext();
export const TokenInfoContext = React.createContext();

let tokenInfo = {};

function MainFrame(props) {
    const {library: web3} = useWeb3React();
    const [isLoading, setIsLoading] = useState(true);

    const covid = new web3.eth.Contract(Covid.abi, COVIDADDRESS);

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
            <InstanceContext.Provider value={covid}>
            <TokenInfoContext.Provider value={tokenInfo}>
                {props.children}
            </TokenInfoContext.Provider>
            </InstanceContext.Provider>
        );
    }
}

export default MainFrame;