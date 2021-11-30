import React from 'react';
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import ConnectComponents from '../wallet/ConnectComponent';
import ContextComponent from '../context/ContextComponent';

function getLibrary(provider) {
    return new Web3(provider);
  }

function Web3ReactComponent(props) {
    return (
        <div>
        <Web3ReactProvider getLibrary={getLibrary}>
            <ConnectComponents>
                <ContextComponent>
                    {props.children}
                </ContextComponent>
            </ConnectComponents>
        </Web3ReactProvider>
        </div>
    );
}

export default Web3ReactComponent;