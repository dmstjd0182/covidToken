//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICovid{

    event Infect(address indexed from, address indexed to, uint256 totalSupply);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event AchieveGoalSupply(uint256 rewardPool);
    event PriceDistributed(uint256 pool, uint256 reward, uint256 owner);
    event RewardPaid(address indexed to, uint256 reward);

    error RewardPayFailed(address who);

    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function totalSupply() external view returns (uint256);
    function initialSupply() external pure returns (uint256);
    function rewardPool() external view returns (uint256);
    function totalInfectingScore() external view returns (uint256);

    function userInfo(address user) external view returns (address infected, uint256 lastBalance, uint256 time, uint256 infectingCount, uint256 infectingScore, bool isInfected, bool canClaimReward, address infectedFrom);
    function pools(address pool) external view returns (bool);

    function registerPool(address pool, uint256 amount) external;
    function balanceOf(address user) external view returns (uint256 balance);
    function infectTo(address _to) payable external returns (bool);
    function claimReward() external;
    function transfer(address _to, uint256 _value) external returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);
}