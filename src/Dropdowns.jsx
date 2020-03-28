import React from "react";
import { useStoreState } from "easy-peasy";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownDivider from "react-bootstrap/Dropdown";
import styles from "./mystyle.module.css";
import { allGroups } from "./data/segments";
import { getSortingName } from "./sorting";

const dateRangeTitle = {
  all: "Gjennom alle tider",
  year: "I år"
};

const Dropdowns = ({ props }) => {
  const {
    segmentGroup,
    dateRange,
    sortMode,
    currentSegments,
    setDateRange,
    setSortMode,
    setSegmentGroup
  } = props;

  const dateRangeDropwdownItems = Object.entries(dateRangeTitle).map(
    ([k, v]) => (
      <Dropdown.Item
        key={k}
        className={styles.dropdown_item}
        onClick={_ => setDateRange(k)}
      >
        {v}
      </Dropdown.Item>
    )
  );

  const mapGroupsToItems = groups => {
    return groups.map(groupSlug => (
      <Dropdown.Item
        key={groupSlug}
        className={styles.dropdown_item}
        onClick={() => setSegmentGroup(groupSlug)}
      >
        {allGroups[groupSlug].navn +
          " " +
          (allGroups[groupSlug] && allGroups[groupSlug].emoji)}
      </Dropdown.Item>
    ));
  };

  const sortModes = [{ score: true }, { name: true }, { newest: true }].concat(
    currentSegments.map(x => ({ segmentId: x }))
  );

  const storeSegments = useStoreState(state => state.segments);

  const sortDropdownItems = sortModes.map(sortMode => (
    <Dropdown.Item
      key={getSortingName(sortMode, storeSegments)}
      className={styles.dropdown_item}
      onClick={() => setSortMode(sortMode)}
    >
      {getSortingName(sortMode, storeSegments)}
    </Dropdown.Item>
  ));

  const restOfGroups = Object.keys(allGroups).filter(
    x => !["klatrekongen", "lopekongen", "bml"].includes(x)
  );

  return (
    <div className={styles.button_row}>
      <DropdownButton
        className={styles.button}
        title={
          "Segmentgruppe : " +
          allGroups[segmentGroup].navn +
          " " +
          allGroups[segmentGroup].emoji
        }
      >
        {mapGroupsToItems(["bml", "klatrekongen", "lopekongen"])}
        <DropdownDivider className={styles.divider} />
        {mapGroupsToItems(restOfGroups)}
      </DropdownButton>
      <DropdownButton
        className={styles.button}
        title={"Periode : " + dateRangeTitle[dateRange]}
      >
        {dateRangeDropwdownItems}
      </DropdownButton>
      <DropdownButton
        className={styles.button}
        title={"Sortering : " + getSortingName(sortMode, storeSegments)}
      >
        {sortDropdownItems}
      </DropdownButton>
    </div>
  );
};

export default Dropdowns;
