import { useWeb3React } from '@web3-react/core';
import React, { useContext, useEffect, useState } from 'react';
import { CovidContext } from '../context/ContextComponent';

function InfectComponent(props) {
    const covid = useContext(CovidContext);
    const {account, library: web3} = useWeb3React();
    const [price, setPrice] = useState();
    const [countRemained, setCountRemained] = useState(0);
    const [value, setValue] = useState();

    let handleSubmit = async (e) => {
        e.preventDefault();
        await covid.methods.infectTo(value).send({from: account, value: web3.utils.toWei(price, 'ether')});
    };

    let handleChange = (e) => {
        setValue(e.target.value);
    }

    async function getPrice(){
        let priceWei = await covid.methods.INFECT_PRICE().call();
        setPrice(web3.utils.fromWei(priceWei.toString(), 'ether'));
    }

    async function getCount(){
        let { infectingCount } = await covid.methods.userInfo(account).call();
        setCountRemained(3 - infectingCount);
    }

    useEffect(() => {
        getPrice();
        getCount();
    }, []);

    return (
        <div>
            {countRemained > 0
            ?<div>
            <h5>전염 비용: {price}</h5>
            <form onSubmit={handleSubmit}>
                <label>
                    전염 가능 횟수: {countRemained} / 3<br />
                    Infect To:
                    <input type='text' value={value} onChange={handleChange} />
                </label>
                <input type='submit' value='전염!' />
            </form>
            </div>
            :<div>
                전염 기회 소진!
            </div>
            }
            
        </div>
    );
}

export default InfectComponent;