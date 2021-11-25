import React from 'react';

function TokenInfoComponent(props) {
    return (
        <div>
            <p>
                <strong>최초 발행량:</strong> {(props.tokenInfo.initialSupply / 10 ** props.tokenInfo.decimals).toLocaleString()}
            </p>
            <p>
                <strong>현재 총 발행량:</strong> {(props.tokenInfo.totalSupply / 10 ** props.tokenInfo.decimals).toLocaleString()} / 100,000,000
            </p>
            <p>
                <strong>보상 Pool:</strong> {(props.tokenInfo.rewardPool / 10 ** 18)} ETH
            </p>
        </div>
    );
}

export default TokenInfoComponent;