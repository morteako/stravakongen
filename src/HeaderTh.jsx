import React from "react";
import styles from "./mystyle.module.css"

const HeaderTh = props => {
    const {child, sortingFunc} = props;
    
    return (    
            <th className={styles.header}>
                {child}
                {" "}
                <button onClick={sortingFunc}>sorter</button>
            </th> 
    );
};

export default HeaderTh;