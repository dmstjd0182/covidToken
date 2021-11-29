import React, { useContext } from "react";
import { TokenInfoContext } from "./MainFrame";

function TotalSupplyComponent() {
    const { totalSupply, decimals, symbol } = useContext(TokenInfoContext);

    return(
        <div>
            현재 총 발행량: {(totalSupply / decimals).toLocaleString()} {symbol} / {(10 ** 8).toLocaleString()} {symbol}
        </div>
    );
}

export default TotalSupplyComponent;