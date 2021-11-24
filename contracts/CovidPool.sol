//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interfaces/ICovidPool.sol";
import "./interfaces/ICovid.sol";

contract CovidPool is ICovidPool {
    using SafeMath for uint256;

    ICovid public covid;

    receive () payable external {}

    constructor(ICovid _covid) {
        covid = _covid;
    }

    modifier whenCallerIsInfected {
        (uint256 lastBalance, , , bool isInfected, ) = covid.userInfo(msg.sender);
        require(isInfected, "You do not have Covid token");
        require(lastBalance > 0, "You were not infected.");
        _;
    }

    function swapToCVDT() external payable whenCallerIsInfected{
        uint256 newETH = address(this).balance;
        uint256 lastCVDT = covid.getSwapPoolBalance();

        uint256 newCVDT = (newETH.sub(msg.value)).mul(lastCVDT).div(newETH);

        covid.transferTo(msg.sender, lastCVDT.sub(newCVDT));

        emit SwapToCVDT(msg.sender, msg.value, lastCVDT.sub(newCVDT));
    }

    function swapToETH(uint256 amount) external whenCallerIsInfected{
        uint256 lastETH = address(this).balance;
        uint256 lastCVDT = covid.getSwapPoolBalance();

        uint256 newETH = lastCVDT.mul(lastETH).div(lastCVDT.add(amount));

        covid.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(lastETH.sub(newETH));

        emit SwapToETH(msg.sender, amount, lastETH.sub(newETH));
    }

    function addLiquidity() external payable whenCallerIsInfected{
        uint256 lastETH = (address(this).balance).sub(msg.value);
        uint256 lastCVDT = covid.getSwapPoolBalance();

        uint256 inputCVDT = lastCVDT.mul(msg.value).div(lastETH);

        covid.transferFrom(msg.sender, address(this), inputCVDT);
    }
}