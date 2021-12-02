import React from "react";

function InfectedInfoComponent(props) {
    let infoArray = props.infoArray;

    let result = infoArray.map((user) => {
        return(
            <li key={user[0]}>
                {user[0]} : {user[4]}
            </li>
        );
    })

    return (
        <div>
        <ol>
            {result}
        </ol>
        </div>
    );
}

export default InfectedInfoComponent;