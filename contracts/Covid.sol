//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./SwapPool.sol";
import "./interfaces/ICovid.sol";

contract Covid is ICovid, Ownable {
    using SafeMath for uint256;

    SwapPool public swapPool;

    string private constant _NAME = "COVID";
    string private constant _SYMBOL = "CVDT";
    uint8 private constant _DECIMALS = 8;
    // 최초 1만개 발행, 이후 전염으로 추가 발행
    uint256 private constant _INITIAL_SUPPLY = 10000 * 10**uint256(_DECIMALS);
    //전염(발행)에 드는 비용
    uint256 public constant INFECT_PRICE = 0.02 ether;
    //최대 전염 수
    uint256 public constant MAX_INFECT_NUMBER = 3;
    //전염 가능 주
    uint256 public constant INFECTIOUS_WEEK = 2 weeks;
    //최초 스왑 풀 토큰 잔고 (100 CVDT)
    uint256 public constant INITIAL_SWAP_POOL = 100 * 10**uint256(_DECIMALS);

    uint256 private _totalSupply = _INITIAL_SUPPLY;    //현재 총 발행량
    uint256 public rewardPool = 0;                  //wei
    uint256 public totalInfectingScore = 0;         //모든 감염자의 전염차수 총합
    
    bool public mintingPaused = false;

    address[] public addressArray;  //모든 감염자들 주소 배열
    UserInfo[] public infoArray;    //감염자들 구조체 배열

    struct UserInfo {
        address infected;       //감염자 주소
        uint256 balance;
        uint256 time;           //최초 소유 시간
        uint256 infectingCount; //전염 시킨(발행한) 사람 수 (최대 3명)
        uint256 infectingScore; //전염 차수
        bool isInfected;        //최초 소유 시 true로 변경
        bool canClaimReward;    //보상 지급받을 수 있는가
        address infectedFrom;
    }

    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => UserInfo) public userInfo;
    mapping(address => bool) public pools;

    //토큰 소유중인 주소가 호출할 때만
    modifier whenCallerIsInfected {
        require(userInfo[msg.sender].balance > 0, "You do not have Covid token");
        require(userInfo[msg.sender].isInfected, "You were not infected.");
        _;
    }

    function name() external pure returns (string memory) {
        return _NAME;
    }

    function symbol() external pure returns (string memory) {
        return _SYMBOL;
    }

    function decimals() external pure returns (uint8) {
        return _DECIMALS;
    }

   function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function initialSupply() external pure returns (uint256) {
        return _INITIAL_SUPPLY;
    }

    function getInfoArray() external returns (UserInfo[] memory){
        delete infoArray;
        for (uint256 i = 0; i < addressArray.length; i++) {
            infoArray.push(userInfo[addressArray[i]]);
        }
        return infoArray;
    }

    constructor() {
        swapPool = new SwapPool(address(this));
        //Owner
        userInfo[msg.sender] = UserInfo (
            msg.sender,
            _INITIAL_SUPPLY - INITIAL_SWAP_POOL,
            block.timestamp,
            0,
            0,
            true,
            true,
            address(0)
        );
        addressArray.push(msg.sender);
        //SwapPool 등록
        userInfo[address(swapPool)].balance = INITIAL_SWAP_POOL;
        userInfo[address(swapPool)].isInfected = true;
        pools[address(swapPool)] = true;
    }

    //스왑 풀, 에어드랍 풀 등록
    function registerPool(address pool) public onlyOwner {
        pools[pool] = true;
        userInfo[pool].isInfected = true;
    }

    //CVDT 토큰 잔고
    function balanceOf(address user) public view returns (uint256 balance) {
        return userInfo[user].balance;
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    //전염시키기
    function infectTo(address _to) payable external whenCallerIsInfected returns (bool) {
        require(mintingPaused == false, "TotalSupply is already over.");
        UserInfo storage user = userInfo[msg.sender];
        require(block.timestamp < user.time.add(INFECTIOUS_WEEK), "You are not infectious anymore.");
        require(user.infectingCount < MAX_INFECT_NUMBER, "You already infected 3 people.");
        require(msg.value >= INFECT_PRICE, "Insufficient price.");
        require(_to != address(0), "Infect to Zero Address.");
        require(userInfo[_to].isInfected == false, "That address was already infected.");

        //감염자 정보 등록
        _setInfectedInfo(msg.sender, _to, 1 * 10**uint256(_DECIMALS));
        //해당 전염 경로의 모든 사람 전염 차수 증가
        address from = msg.sender;
        while(from != address(0)) {
            totalInfectingScore = totalInfectingScore.add(1);
            userInfo[from].infectingScore = userInfo[from].infectingScore.add(1);
            from = userInfo[from].infectedFrom;
        }
        //비용 처리
        _calPrice(msg.value);

        _totalSupply += 1 * 10**uint256(_DECIMALS);
        // 총 발행량 1억 달성 시
        if(_totalSupply >= 10**8 * 10**uint256(_DECIMALS)) {
            mintingPaused = true;
            emit AchieveGoalSupply(rewardPool);
        }
        user.infectingCount += 1;

        emit Infect(msg.sender, _to, _totalSupply);
        emit Transfer(address(0), _to, 1 * 10**uint256(_DECIMALS));     //ERC20
        return true;
    }


    //전염 종료 후 보상 청구
    //절반 : 토큰 지분에 따라 분배
    //절반 : 전염 차수에 따라 분배
    //Swap Pool의 CVDT 지분은 제외하여 산출
    function claimReward() public whenCallerIsInfected{
        require(mintingPaused, "Infecting goal is not achieved.");
        require(userInfo[msg.sender].canClaimReward, "You already received.");

        //보상 계산
        uint256 share = _calShare();

        rewardPool = rewardPool.sub(share);
        userInfo[msg.sender].canClaimReward = false;

        if(payable(msg.sender).send(share)){
        emit RewardPaid(msg.sender, share);
        } else {
            rewardPool = rewardPool.add(share);
            userInfo[msg.sender].canClaimReward = true;
            revert RewardPayFailed(msg.sender);
        }
    }

    //스왑 풀, 에어드랍 풀만이 호출 가능
    function poolTransfer(address sender, address recipient, uint256 amount) external returns (bool success) {
        require(pools[msg.sender], "Only pools can call this.");

        //에어드랍이면 감염자 등록
        if(userInfo[recipient].isInfected == false) {
            _setInfectedInfo(address(0), recipient, 0);
        }
        _transfer(sender, recipient, amount);

        return true;
    }

    function transfer(address recipient, uint256 amount) public whenCallerIsInfected returns (bool success){
        _transfer(msg.sender, recipient, amount);

        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public whenCallerIsInfected returns (bool success){
        _transfer(sender, recipient, amount);

        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        _approve(sender, msg.sender, currentAllowance.sub(amount));

        return true;
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) private {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        require(userInfo[spender].isInfected, "approve to uninfected.");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    //비용 분배하여 공급
    //스왑 풀 90%
    //보상 풀 9%
    //오너 1%
    function _calPrice(uint256 price) private {
        uint256 pool_price = price.mul(90).div(100);
        uint256 reward_price = price.mul(9).div(100);
        uint256 owner_price = price.mul(1).div(100);

        payable(swapPool).transfer(pool_price);
        rewardPool = rewardPool.add(reward_price);
        payable(owner()).transfer(owner_price);

        emit PriceDistributed(pool_price, reward_price, owner_price);
    }

    //보상 계산
    function _calShare() view private returns (uint256) {
        //절반 나누기
        uint256 firstHalf = rewardPool.div(2);
        uint256 secondHalf = rewardPool.sub(firstHalf);

        //토큰 지분에 따라 / 전염 차수에 따라
        uint256 tokenShare = firstHalf.mul(userInfo[msg.sender].balance).div(_totalSupply.sub(balanceOf(address(swapPool))));
        uint256 orderShare = secondHalf.mul(userInfo[msg.sender].infectingScore).div(totalInfectingScore);

        return tokenShare.add(orderShare);
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) private {
        require(sender != address(0), "Transfer from the zero address");
        require(recipient != address(0), "Transfer to the zero address");
        require(userInfo[recipient].isInfected, "Recipient is not infected.");

        uint256 senderBalance = userInfo[sender].balance;
        require(senderBalance >= amount, "Transfer amount exceeds balance");

        userInfo[sender].balance = senderBalance.sub(amount);
        userInfo[recipient].balance = userInfo[recipient].balance.add(amount);

        emit Transfer(sender, recipient, amount);
    }

    function _setInfectedInfo(address from, address infected, uint256 balance) private {
        userInfo[infected] = UserInfo(
            infected,
            balance,
            block.timestamp,
            0,
            0,
            true,
            true,
            from
        );
        addressArray.push(infected);
    }
}
