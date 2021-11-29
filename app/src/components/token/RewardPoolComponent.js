import React, { useState, useEffect, useContext } from "react";
import { useWeb3React } from '@web3-react/core';
import { InstanceContext } from "./MainFrame";

function RewardPoolComponent() {
    const {library: web3} = useWeb3React();
    const covid = useContext(InstanceContext);
    const [rewardPool, setRewardPool] = useState(0);

    let getRewardPool = async () => {
        let result = await covid.methods.rewardPool().call();
        result = web3.utils.fromWei(result, 'ether');
        return result;
    };

    useEffect(() => {
        getRewardPool().then((result) => {
            setRewardPool(result);
        })
    }, []);

    return (
        <div>
            {rewardPool} ETH
        </div>
    );
}

export default RewardPoolComponent;