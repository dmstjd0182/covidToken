import React from 'react';

function TokenInfoComponent(props) {
    return (
        <div>
            <p>
                최초 발행량: {(props.tokenInfo.initialSupply / 10 ** props.tokenInfo.decimals).toLocaleString()}
            </p>
            <p>
                현재 총 발행량: {(props.tokenInfo.totalSupply / 10 ** props.tokenInfo.decimals).toLocaleString()} / 100,000,000
            </p>
        </div>
    );
}

export default TokenInfoComponent;