import React from "react";
import { getSortingName, getSortingMode } from "./sorting";
import { useStoreState } from "easy-peasy";
import styles from "./mystyle.module.css";
import Dropdown from "react-bootstrap/Dropdown";

export const SortDropdownItem = sortMode => {
    const storeSegments = [] // useStoreState( state => state.segments); 
    return (
      <Dropdown.Item
        key={getSortingName(sortMode,storeSegments)}
        className={styles.dropdown_item}
        onClick={() => []}
      >
        {getSortingName(sortMode,storeSegments)}
      </Dropdown.Item>
    );
    
}

export default SortDropdownItem;