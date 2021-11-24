import React, {useState} from 'react';

function BalanceComponent(props) {

    return (
        <div>
            <button onClick = {() => {
                props.balanceOf(document.getElementById('address').value);
            }} >
                Balance of :
            </button>
            <input id="address" type='text' />
            <p>
                {props.balance}
            </p>
        </div>
    );
}

export default BalanceComponent;