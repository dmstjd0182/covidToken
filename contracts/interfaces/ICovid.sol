//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICovid{

    event Infect(address indexed from, address indexed to, uint256 totalSupply);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event AchieveGoalSupply(uint256 rewardPool);
    event PriceDistributed(uint256 pool, uint256 reward, uint256 owner);
    event RewardPaid(address indexed to, uint256 reward);

    function getName() external pure returns (string memory);
    function getSymbol() external pure returns (string memory);
    function getDecimals() external pure returns (uint8);
    function getInitialSupply() external pure returns (uint256);
    function getTotalSupply() external view returns (uint256);
    function getRewardPool() external view returns (uint256);
    function getSwapPoolETH() external view returns (uint256);
    function getSwapPoolBalance() external view returns (uint256);

    function userInfo(address user) external view returns (uint256 lastBalance, uint256 time, uint256 infectingCount, bool isInfected, bool canClaimReward);

    function balanceOf(address user) external view returns (uint256 balance);
    function infectTo(address _to) payable external returns (bool);
    function claimReward() external;
    function transferTo(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint amount) external returns (bool);
}