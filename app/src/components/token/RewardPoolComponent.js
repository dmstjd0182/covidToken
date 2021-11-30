import React, { useState, useEffect, useContext } from "react";
import { useWeb3React } from '@web3-react/core';
import { CovidContext, TokenInfoContext } from "../context/ContextComponent";
import InfectScoreComponent from "./InfectScoreComponent";

let infectingScore = 0;
let totalInfectingScore = 0;

function RewardPoolComponent() {
    const {account, library: web3} = useWeb3React();
    const covid = useContext(CovidContext);
    const { totalSupply } = useContext(TokenInfoContext);
    const [rewardPool, setRewardPool] = useState(0);
    const [myReward, setMyReward] = useState(0);

    let getRewardPool = async () => {
        let result = await covid.methods.rewardPool().call();
        result = web3.utils.fromWei(result, 'ether');

        setRewardPool(result);
    };

    let calMyReward = async () => {
        ({ infectingScore } = await covid.methods.userInfo(account).call());
        totalInfectingScore = await covid.methods.totalInfectingScore().call();
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
            <InfectScoreComponent 
                infectingScore={infectingScore} 
                totalInfectingScore={totalInfectingScore}
            />
            내 보상: {isNaN(myReward) 
            ? 0 
            : myReward.toFixed(8) || 0 } ETH
        </div>
    );
}

export default RewardPoolComponent;