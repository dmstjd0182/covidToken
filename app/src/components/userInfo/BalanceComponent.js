import { useWeb3React } from "@web3-react/core";
import React, { useState, useContext, useEffect } from "react";
import { CovidContext, TokenInfoContext } from '../context/ContextComponent';

function BalanceComponent(props) {
    const covid = useContext(CovidContext);
    const { decimals, symbol } = useContext(TokenInfoContext);
    const {account} = useWeb3React();
    const [balance, setBalance] = useState(0);
    
    let balanceOf = async (user) => {
        let result = await covid.methods.balanceOf(user).call();
        result /= decimals;
        return result;
    };

    useEffect(() => {
        balanceOf(account).then((result) => {
            setBalance(result);
        });
    });

    return (
        <div>
            내 토큰: {balance.toFixed(6).toLocaleString()} {symbol}
        </div>
    );
}

export default BalanceComponent;