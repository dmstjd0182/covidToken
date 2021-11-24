//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interfaces/ICovid.sol";

contract Airdrop is Ownable {
    using SafeMath for uint256;

    ICovid public covid;

    constructor (ICovid _covid) {
        covid = _covid;
    }

    //address: 토큰 받을 주소 배열
    //amount: 에어드랍 토큰 수량(decimal 주의)
    function airdrop(address[] calldata to, uint amount) payable external onlyOwner {
        uint256 len = to.length;
        for (uint256 i = 0; i < len; i = i.add(1)) {
            covid.poolTransfer(msg.sender, to[i], amount);
        }
        //TODO 스왑 풀에 에어드랍 비용(ETH) 보내야 함.
    }
}