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
        let { infectingScore } = await covid.methods.userInfo(account).call();
        let totalInfectingScore = await covid.methods.totalInfectingScore().call();
        let myBalance = await covid.methods.balanceOf(account).call();

        let _myReward = (rewardPool / 2) * myBalance / totalSupply + (rewardPool / 2) * infectingScore / totalInfectingScore;
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
            내 보상: {myReward || 0} ETH
        </div>
    );
}

export default RewardPoolComponent;