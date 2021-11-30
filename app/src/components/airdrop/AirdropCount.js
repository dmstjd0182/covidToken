import React, { useEffect, useState } from "react";

let totalAirdropCount = 0;

function AirdropCount(props) {
    const airdrop = props.airdrop;
    const [airdropRemained, setAirdropRemained] = useState(0);

    let getTotalAirdropCount = async() => {
        totalAirdropCount = await airdrop.methods.TOTAL_AIRDROP_NUMBER().call()
    }

    let calRemained = async() => {
        let currentCount = await airdrop.methods.airdropCount().call();
        setAirdropRemained(totalAirdropCount - currentCount);
    }

    useEffect(() => {
        getTotalAirdropCount();
        calRemained();
    },[]);

    return (
        <div>
            남은 에어드랍: {airdropRemained} / {totalAirdropCount}
        </div>
    );
}

export default AirdropCount;