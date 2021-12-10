import { useWeb3React } from '@web3-react/core';
import React, { useContext, useState } from 'react';
import { CovidContext, TokenInfoContext } from '../context/ContextComponent';

function TransferComponent() {
    const covid = useContext(CovidContext);
    const { decimals } = useContext(TokenInfoContext);
    const {account} = useWeb3React();
    const [recipient, setRecipient] = useState();
    const [amount, setAmount] = useState();

    let handleSubmit = async (e) => {
        e.preventDefault();
        await covid.methods.transfer(recipient, Math.round(amount * decimals) ).send({from: account});
    };

    let handleRecipientChange = (e) => {
        setRecipient(e.target.value);
    }

    let handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Transfer To: 
                    <input type='text' value={recipient} onChange={handleRecipientChange} />
                </label>
                <label>
                    Amount:
                    <input type='text' value={amount} onChange={handleAmountChange} />
                </label>
                <input type='submit' value='전송!' />
            </form>
        </div>
    );
}

export default TransferComponent;