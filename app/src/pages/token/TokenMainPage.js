import React from "react";
import { Link } from 'react-router-dom';
import BalanceComponent from "../../components/userInfo/BalanceComponent";
import InfectComponent from "../../components/token/InfectComponent";
import TransferComponent from "../../components/token/TransferComponent";
import RewardPoolComponent from "../../components/token/RewardPoolComponent";
import TotalSupplyComponent from "../../components/token/TotalSupplyComponent";
import EthComponent from "../../components/userInfo/EthComponent";


function TokenMainPage(props) {
    return (
        <div>
        <p>
        <p>
        <Link to='/swap'> 거래소로 이동 </Link><br />
        <Link to='/airdrop'> 에어드랍으로 이동 </Link>
        </p>
        <div>
            <p>
            <TotalSupplyComponent />
            </p>
            <EthComponent />
            <BalanceComponent />
            <p>
            <InfectComponent />
            <TransferComponent />
            </p>
            <RewardPoolComponent />
        </div>
        </p>
        </div>
    );
}

export default TokenMainPage;