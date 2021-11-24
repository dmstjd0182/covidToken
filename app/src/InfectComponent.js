import React, {useState} from 'react';

function InfectComponent (props) {

    return (
        <div>
            <button onClick={() => {
                props.infectTo(document.getElementById('to').value);
            }
            }>
                Infect account!
            </button>
            <input id='to' type="text" />
        </div>
    );
}

export default InfectComponent;