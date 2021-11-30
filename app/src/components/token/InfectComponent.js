import { useWeb3React } from '@web3-react/core';
import React, { useContext, useState } from 'react';
import { CovidContext } from '../context/ContextComponent';

function InfectComponent(props) {
    const covid = useContext(CovidContext);
    const {account, library: web3} = useWeb3React();
    const [value, setValue] = useState();

    let handleSubmit = async (e) => {
        e.preventDefault();
        await covid.methods.infectTo(value).send({from: account, value: web3.utils.toWei('0.02', 'ether')});
    };

    let handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Infect To: 
                    <input type='text' value={value} onChange={handleChange} />
                </label>
                <input type='submit' value='전염!' />
            </form>
        </div>
    );
}

export default InfectComponent;