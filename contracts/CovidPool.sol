pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CovidPool {
    using SafeMath for uint256;

    event SwapToEth(address indexed user, uint256 amount);
    event SwapToCovid(address indexed user, uint256 amount);



    function () payable external {}

    function swapToEth() external {
        
    }

    function swapToCovid() external payable {

    }
}