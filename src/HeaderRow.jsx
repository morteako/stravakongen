import React from "react";
// import styles from "./mystyle.module.css"
import HeaderTh from "./HeaderTh";
import { sortingModes } from "./sorting";


const HeaderRow = props => {
    const {segmentRowMapper,setSortingMode} = props;
    
    const [clicked, setClicked] = React.useState(false); 
    
    return (
        <tr onClick={() => setClicked(!clicked)}>
            <HeaderTh sortingFunc={() => setSortingMode({name:true})} child={"Navn"}/>
            <HeaderTh sortingFunc={() => setSortingMode({score:"hei"})} child={"# (Poeng)"}/>
            {segmentRowMapper(clicked).map(x => 
                <HeaderTh 
                sortingFunc={() => setSortingMode({segmentId : x.props.segmentId})}
                    key={x.props.segmentId} child={x}
                />
            )}      
        </tr>
    );
};

export default HeaderRow;