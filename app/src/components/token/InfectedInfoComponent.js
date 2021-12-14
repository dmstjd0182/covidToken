import React from "react";

function InfectedInfoComponent(props) {
    let infoArray = props.infoArray;

    let result = infoArray.map((user) => {
        return(
            <li key={user.infected}>
                {user.infected} : {user.infectingScore}
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