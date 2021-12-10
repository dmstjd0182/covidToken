//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interfaces/ICovid.sol";

contract FirstcomeAirdrop is Ownable {
    using SafeMath for uint256;

    uint256 public constant AIRDROP_PRICE = 0.02 ether;
    address public swapPoolAddress;
    uint256 public constant TOTAL_AIRDROP_NUMBER = 10000;

    ICovid public covid;
    uint256 public airdropAmount = 1 * 1e8;
    uint256 public airdropCount;
    mapping(address => bool) public dropped;

    event Airdropped(address to, uint256 amount);

    constructor(ICovid _covid, address _swapPoolAddress) {
        covid = _covid;
        swapPoolAddress = _swapPoolAddress;
    }

    //에어드랍 수량 설정
    function setAirdropAmount(uint256 amount) external onlyOwner {
        airdropAmount = amount;
    }

    function airdrop() external payable {
        require(dropped[msg.sender] != true, "You already received.");
        require(msg.value >= AIRDROP_PRICE, "Insufficient price.");
        
        covid.transferFrom(address(this), msg.sender, airdropAmount);
        dropped[msg.sender] = true;

        airdropCount = airdropCount.add(1);

        //에어드랍 끝나면 swap pool로 비용 모두 전송
        if (airdropCount >= TOTAL_AIRDROP_NUMBER) {
            payable(swapPoolAddress).transfer(address(this).balance);
        }
        emit Airdropped(msg.sender, airdropAmount);
    }
}