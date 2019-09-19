import React from "react";
import styles from "./mystyle.module.css"

const HeaderRow = props => {
    const {segmentRowMapper} = props;
    
    const [clicked, setClicked] = React.useState(false); 
    
    return (
        <tr onClick={() => setClicked(!clicked)}>
            <th className={styles.header}>Navn</th>
            <th className={styles.header}>
                #
                {" "}
                <span>(Poeng)</span>
            </th>
            {segmentRowMapper(clicked)}      
        </tr>
    );
};

export default HeaderRow;