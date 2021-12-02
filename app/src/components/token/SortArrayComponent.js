import React, { useContext, useEffect, useState } from "react";
import InfectedInfoComponent from "./InfectedInfoComponent";

function SortArrayComponent(props){
    const [isLoading, setIsLoading] = useState(true);

    const infoArray = props.infoArray;

    function sortInfoArray() {
        //infectingScore 기준 내림차순 정렬
        infoArray.sort((a, b) =>  b[4] - a[4] );
        setIsLoading(false);
    }
    
    useEffect(() => {
        sortInfoArray();
    }, []);

    return (
        <div>
        {isLoading
        ?<div>Loading...</div>
        : 
        <div>
            <InfectedInfoComponent
                infoArray={infoArray}
            />
        </div>
        }
        </div>
    )
}

export default SortArrayComponent;