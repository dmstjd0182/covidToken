import React, { useContext, useEffect, useState } from "react";
import { CovidContext } from "../context/ContextComponent";
import SortArrayComponent from "./SortArrayComponent";

function InfectRankingComponent(props) {
    const covid = useContext(CovidContext);
    let [infoArray, setInfoArray] = useState([]);

    async function _getInfoArray(){
        let _infoArray = await covid.methods.getInfoArray().call();
        setInfoArray(_infoArray);
    }
    
    useEffect(() => {
        _getInfoArray();
    }, []);

    return (
        <div>
            <h3> !!전염 랭킹!!</h3>
            <SortArrayComponent 
                infoArray={infoArray}
            />
        </div>
    );
}

export default InfectRankingComponent;