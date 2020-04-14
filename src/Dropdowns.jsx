import React from "react";
import { useStoreState } from "easy-peasy";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownDivider from "react-bootstrap/Dropdown";
import styles from "./mystyle.module.css";
import { allGroups, filterGroupsOnTypes, getEmojis } from "./data/segments";
import { getSortingName } from "./calculation/sorting";

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
    setSegmentGroup,
    club
  } = props;

  const { segmentRowClicked } = useStoreState(state => state);

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
        {allGroups[groupSlug].navn + getEmojis(groupSlug)}
      </Dropdown.Item>
    ));
  };

  const sortModes = [{ score: true }, { name: true }, { newest: true }].concat(
    currentSegments.map(x => ({ segmentId: x }))
  );

  const storeSegments = useStoreState(state => state.segments);

  const [points, name, newest, ...segments] = sortModes.map(sortMode => (
    <Dropdown.Item
      key={getSortingName(sortMode, storeSegments)}
      className={styles.dropdown_item}
      onClick={() => setSortMode(sortMode)}
    >
      {getSortingName(sortMode, storeSegments, segmentRowClicked)}
    </Dropdown.Item>
  ));

  const divider = <DropdownDivider key="divider" className={styles.divider} />;

  const sortDropdownItems = [points, name, newest, divider, ...segments];

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
