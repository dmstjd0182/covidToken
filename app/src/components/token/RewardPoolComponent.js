import React, { useState, useEffect, useContext } from "react";
import { useWeb3React } from '@web3-react/core';
import { InstanceContext, TokenInfoContext } from "./MainFrame";

function RewardPoolComponent() {
    const {account, library: web3} = useWeb3React();
    const covid = useContext(InstanceContext);
    const { totalSupply } = useContext(TokenInfoContext);
    const [rewardPool, setRewardPool] = useState(0);
    const [myReward, setMyReward] = useState(0);

    let getRewardPool = async () => {
        let result = await covid.methods.rewardPool().call();
        result = web3.utils.fromWei(result, 'ether');

        setRewardPool(result);
    };

    let calMyReward = async () => {
        let { infectingOrder } = await covid.methods.userInfo(account).call();
        let totalInfectingOrder = await covid.methods.totalInfectingOrder().call();
        let myBalance = await covid.methods.balanceOf(account).call();

        let _myReward = (rewardPool / 2) * myBalance / totalSupply + (rewardPool / 2) * infectingOrder / totalInfectingOrder;
        setMyReward(_myReward);
    }

    useEffect(() => {
        getRewardPool();
    }, []);

    useEffect(() => {
        calMyReward();
    }, [rewardPool]);

    return (
        <div>
            보상 풀: {rewardPool} ETH <br />
            내 보상: {myReward} ETH
        </div>
    );
}

export default RewardPoolComponent;