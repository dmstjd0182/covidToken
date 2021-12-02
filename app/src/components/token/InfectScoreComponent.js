import React from "react";

function InfectScoreComponent(props) {
    return (
        <div>
            내 전염 점수: {props.infectingScore} / {props.totalInfectingScore.toLocaleString()}
        </div>
    );
}

export default InfectScoreComponent;