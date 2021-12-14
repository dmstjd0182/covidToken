//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ICovid is IERC20 {

    event Infect(address indexed from, address indexed to, uint256 totalSupply);
    event AchieveGoalSupply(uint256 rewardPool);
    event PriceDistributed(uint256 pool, uint256 reward, uint256 owner);
    event RewardPaid(address indexed to, uint256 reward);

    error RewardPayFailed(address who);

    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function initialSupply() external pure returns (uint256);
    function rewardPool() external view returns (uint256);
    function totalInfectingScore() external view returns (uint256);

    function userInfo(address user) external view returns (address infected, uint256 lastBalance, uint256 time, uint256 infectingCount, uint256 infectingScore, bool isInfected, bool canClaimReward, address infectedFrom);
    function pools(address pool) external view returns (bool);

    function registerPool(address pool) external;
    function infectTo(address _to) payable external returns (bool);
    function claimReward() external;
    function poolTransfer(address sender, address recipient, uint256 amount) external returns (bool success);
}