/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import styles from "./mystyle.module.css"

const HeaderTh = props => {
    const {child} = props;
    
    return (
            <th className={styles.header}>
                {child}
                {" "}
            </th> 
    );
};

export default HeaderTh;