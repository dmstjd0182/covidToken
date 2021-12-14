//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISwapPool {

    event SwapToCVDT(address indexed user, uint256 ETH, uint256 CVDT);
    event SwapToETH(address indexed user, uint256 CVDT, uint256 ETH);

    function getSwapPoolETH() external view returns (uint256);
    function getSwapPoolBalance() external view returns (uint256);

    function swapToCVDT() external payable;
    function swapToETH(uint256 amount) external;
}