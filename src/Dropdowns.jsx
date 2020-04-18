import React from "react";
import { useStoreState } from "easy-peasy";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownDivider from "react-bootstrap/Dropdown";
import styles from "./mystyle.module.css";
import { allGroups, filterGroupsOnTypes, getEmojis } from "./data/segments";
import { getSortingName } from "./calculation/sorting";
import { writeStorage } from "@rehooks/local-storage";
import * as GA from "./googleAnalytics"

const dateRangeTitle = {
  all: "Gjennom alle tider",
  year: "I år",
  month: "Denne måneden"
};

const Dropdowns = ({ props }) => {
  const {
    segmentGroup,
    dateRange,
    sortMode,
    currentSegments,
    setDateRange,
    setSortMode,
    setSegmentGroup,
    club
  } = props;

  const { segmentRowClicked } = useStoreState(state => state);

  const dateRangeDropwdownItems = Object.entries(dateRangeTitle).map(
    ([k, v]) => (
      <Dropdown.Item
        key={k}
        className={styles.dropdown_item}
        onClick={_ => {
          writeStorage("period", k);
          GA.changePeriod(k)
          setDateRange(k)
        }}
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
        onClick={() => {
          GA.changeSegmentGroup(groupSlug)
          setSegmentGroup(groupSlug)
        }}
      >
        {allGroups[groupSlug].navn + getEmojis(groupSlug)}
      </Dropdown.Item>
    ));
  };

  const sortModes = [{ score: true }, { name: true }, { newest: true }].concat(
    currentSegments.map(x => ({ segmentId: x }))
  );

  const storeSegments = useStoreState(state => state.segments);

  const [points, name, newest, ...segments] = sortModes.map(sortMode => {
    const sortingName = getSortingName(sortMode, storeSegments, segmentRowClicked)
    return (
      <Dropdown.Item
        key={sortingName}
        className={styles.dropdown_item}
        onClick={() => {
          GA.changeSorting(sortingName)
          setSortMode(sortMode)
        }}
      >
        {sortingName}
      </Dropdown.Item>
    )
  }
  );

  const divider = <DropdownDivider key="divider" className={styles.divider} />;

  const sortDropdownItems = [points, name, divider, ...segments];

  const currentSegmentGroups = filterGroupsOnTypes(club);

  const insertDivider = ([a, b, ...rest]) =>
    [a, b, divider, ...rest]

  return (
    <div className={styles.button_row}>
      <DropdownButton
        className={styles.button}
        title={
          "Segmentgruppe : " +
          allGroups[segmentGroup].navn +
          " " +
          getEmojis(segmentGroup)
        }
      >
        {insertDivider(mapGroupsToItems(currentSegmentGroups))}
      </DropdownButton>
      <DropdownButton
        className={styles.button}
        title={"Periode : " + dateRangeTitle[dateRange]}
      >
        {dateRangeDropwdownItems}
      </DropdownButton>
      <DropdownButton
        className={styles.button}
        title={
          "Sortering : " +
          getSortingName(sortMode, storeSegments, segmentRowClicked)
        }
      >
        {sortDropdownItems}
      </DropdownButton>
    </div>
  );
};

export default Dropdowns;
