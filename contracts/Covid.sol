pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./CovidPool.sol";

contract Covid is Ownable {
    using SafeMath for uint256;

    CovidPool public Pool_instance = new CovidPool();

    string public constant NAME = "Covid";
    string public constant SYMBOL = "CVDT";
    uint8 public constant DECIMALS = 8;
    // 최초 1만개 발행, 이후 전염으로 추가 발행
    uint256 public constant INITIAL_SUPPLY = 10000 * 10**uint256(DECIMALS);
    //전염(발행)에 드는 비용
    uint256 public constant INFECT_PRICE = 0.02 ether;
    //최대 전염 수
    uint256 public constant MAX_INFECT_NUMBER = 3;
    //1주일 (초)
    uint256 public constant WEEK_TO_SECONDS = 604800;

    uint256 public totalSupply = INITIAL_SUPPLY;
    uint256 public rewardPool = 0;  //wei
    
    bool mintingPaused = false;

    struct UserInfo {
        uint256 lastBalance;
        uint256 time;           //최초 소유 시간
        uint256 infectingCount; //전염 시킨(발행한) 사람 수 (최대 3명)
        bool isInfected;        //최초 소유 시 true로 변경
        bool canClaimReward;    //보상 지급받을 수 있는가
    }

    mapping(address => UserInfo) public userInfo;

    event Infect(address indexed from, address indexed to, uint256 totalSupply);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event AchieveGoalSupply(uint256 rewardPool);
    event PriceDistributed(uint256 pool, uint256 reward, uint256 owner);
    event RewardPaid(address indexed to, uint256 reward);

    //토큰 소유중인 주소가 호출할 때만
    modifier whenCallerIsInfected {
        require(userInfo[msg.sender].lastBalance > 0, "You do not have Covid token");
        require(userInfo[msg.sender].isInfected, "You were not infected.");
        _;
    }

    function getName() external pure returns (string memory) {
        return NAME;
    }

    function getSymbol() external pure returns (string memory) {
        return SYMBOL;
    }

    function getDecimals() external pure returns (uint8) {
        return DECIMALS;
    }

    function getInitialSupply() external pure returns (uint256) {
        return INITIAL_SUPPLY;
    }

    constructor() {
        userInfo[msg.sender].lastBalance = INITIAL_SUPPLY;
        userInfo[msg.sender].time = block.timestamp;
        userInfo[msg.sender].isInfected = true;
        userInfo[msg.sender].canClaimReward = true;
    }

    function balanceOf(address user) external view returns (uint256 balance) {
        return userInfo[user].lastBalance;
    }

    //전염시키기
    function infectTo(address _to) payable external whenCallerIsInfected returns (bool) {
        require(mintingPaused == false, "TotalSupply is already over.");
        UserInfo storage user = userInfo[msg.sender];
        require(user.time.add(2*WEEK_TO_SECONDS) > block.timestamp, "You were infected over 2 weeks ago.");
        require(user.infectingCount < MAX_INFECT_NUMBER, "You already infected 3 people.");
        require(msg.value >= INFECT_PRICE, "Insufficient price.");
        require(_to != address(0), "Infect to Zero Address.");
        require(userInfo[_to].isInfected == false, "That address was already infected.");

        //감염자 정보 등록
        userInfo[_to].lastBalance = 1 * 10**uint256(DECIMALS);
        userInfo[_to].time = block.timestamp;
        userInfo[_to].isInfected = true;
        userInfo[_to].canClaimReward = true;

        //비용 처리
        _calPrice(msg.value);

        totalSupply += 1 * 10**uint256(DECIMALS);
        // 총 발행량 1억 달성 시
        if(totalSupply >= 10**8 * 10**uint256(DECIMALS)) {
            mintingPaused = true;
            emit AchieveGoalSupply(rewardPool);
        }
        user.infectingCount += 1;

        emit Infect(msg.sender, _to, totalSupply);
        return true;
    }

    function _calPrice(uint256 price) private {
        uint256 pool_price = price.mul(90).div(100);
        uint256 reward_price = price.mul(9).div(100);
        uint256 owner_price = price.mul(1).div(100);

        payable(Pool_instance).transfer(pool_price);
        rewardPool = rewardPool.add(reward_price);
        payable(owner()).transfer(owner_price);

        emit PriceDistributed(pool_price, reward_price, owner_price);
    }

    function claimReward() public whenCallerIsInfected{
        require(mintingPaused, "Infecting goal is not achieved.");
        require(userInfo[msg.sender].canClaimReward, "You already received.");

        uint256 share = rewardPool.mul(userInfo[msg.sender].lastBalance).div(totalSupply);
        payable(msg.sender).transfer(share);

        rewardPool.sub(share);
        userInfo[msg.sender].canClaimReward = false;
        
        emit RewardPaid(msg.sender, share);
    }

    //amount : decimal 적용해서 입력 (JS 프론트엔드에서 처리)
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) private whenCallerIsInfected {
        require(sender != address(0), "Transfer from the zero address");
        require(recipient != address(0), "Transfer to the zero address");
        require(amount > 0, "Transfer 0 Token.");
        require(userInfo[recipient].isInfected, "Recipient is not infected.");

        uint256 senderBalance = userInfo[sender].lastBalance;
        require(senderBalance >= amount, "Transfer amount exceeds balance");

        userInfo[sender].lastBalance = senderBalance - amount;
        
        userInfo[recipient].lastBalance += amount;

        emit Transfer(sender, recipient, amount);
    }
}