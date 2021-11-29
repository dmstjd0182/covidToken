//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICovid{

    event Infect(address indexed from, address indexed to, uint256 totalSupply);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event AchieveGoalSupply(uint256 rewardPool);
    event PriceDistributed(uint256 pool, uint256 reward, uint256 owner);
    event RewardPaid(address indexed to, uint256 reward);

    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function initialSupply() external pure returns (uint256);
    function totalSupply() external view returns (uint256);
    function rewardPool() external view returns (uint256);
    function totalInfectingScore() external view returns (uint256);

    function getInfectedArray() external view returns (address[] memory);
    function userInfo(address user) external view returns (uint256 lastBalance, uint256 time, uint256 infectingCount, uint256 infectingScore, bool isInfected, bool canClaimReward, address infectedFrom);
    function pools(address pool) external view returns (bool);

    function registerPool(address pool, uint256 amount) external;
    function balanceOf(address user) external view returns (uint256 balance);
    function infectTo(address _to) payable external returns (bool);
    function claimReward() external;
    function transferTo(address recipient, uint256 amount) external;
    function poolTransfer(address from, address to, uint256 amount) external;
}