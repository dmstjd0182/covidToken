import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";

function Airdrop(props) {
    const {account, library: web3} = useWeb3React();
    const airdrop = props.airdrop;
    const [price, setPrice] = useState();

    async function getPrice() {
        let priceWei = await airdrop.methods.AIRDROP_PRICE().call();
        setPrice(web3.utils.fromWei(priceWei.toString(), 'ether'));
        
    }
    async function handleClick(){
        await airdrop.methods.airdrop().send({from: account, value: web3.utils.toWei(price, 'ether')});
    };

    useEffect(() => {
        getPrice();
    }, []);
    return(
        <div>
        <h4>에어드랍 비용: {price} ETH</h4>
        <button onClick={handleClick}>Airdrop!</button>
        </div>
    );
}

export default Airdrop;