import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./mystyle.module.css";
import { clubs } from "./data/clubs";
import { writeStorage } from "@rehooks/local-storage";
import * as GA from "./googleAnalytics"

const ClubDropdown = props => {
  const items = Object.values(clubs).map(club => (
    <Dropdown.Item
      key={club.id}
      className={styles.dropdown_item}
      onClick={() => {
        GA.changeClub(club)
        writeStorage("club", club);
        //temporary hack to avoid react "looping"
        //and also clear results so that there is only result from current club
        window.location.reload(true);
      }}
    >
      {club.name}
    </Dropdown.Item>
  ));

  const clubName = (props.club && props.club.name) || props.club;

  return (
    <div className={styles.button_row}>
      <DropdownButton className={styles.button} title={"Klubb : " + clubName}>
        {items}
      </DropdownButton>
    </div>
  );
};

export default ClubDropdown;
