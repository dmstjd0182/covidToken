import React, { useState, useEffect } from "react";

function TransferComponent(props) {
    return (
        <div>
            <button onClick={() => {
                props.transferTo(document.getElementById('recipient').value, document.getElementById('amount').value * (10 ** props.decimals));
            }
            }>
                Transfer CVDT!
            </button>
            <input id='recipient' type="text" />
            <input id='amount' type='text' />
        </div>
    );
}

export default TransferComponent;