//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICovidPool {

    event SwapToCVDT(address indexed user, uint256 ETH, uint256 CVDT);
    event SwapToETH(address indexed user, uint256 CVDT, uint256 ETH);

    function swapToCVDT() external payable;
    function swapToETH(uint256 amount) external;
    function addLiquidity() external payable;
}