import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Covid from "../../build/contracts/Covid.json";


const COVIDADDRESS = "0x3869Cc46CF529778172A39423D1054C208BD039d";
export const InstanceContext = React.createContext();
export const TokenInfoContext = React.createContext();

let tokenInfo = {};

function MainFrame(props) {
    const {library: web3} = useWeb3React();
    const [isLoading, setIsLoading] = useState(true);

    const covid = new web3.eth.Contract(Covid.abi, COVIDADDRESS);

    async function getTokenInfo() {
        let _name = await covid.methods.name().call();
        let _symbol = await covid.methods.symbol().call();
        let _decimals = 10 ** (await covid.methods.decimals().call());
        let _initialSupply = await covid.methods.initialSupply().call();
        let _totalSupply = await covid.methods.totalSupply().call();
        let _rewardPool = await covid.methods.rewardPool().call();
        
        tokenInfo = {name: _name,
            symbol: _symbol,
            decimals: _decimals,
            initialSupply: _initialSupply,
            totalSupply: _totalSupply,
            rewardPool: _rewardPool,
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