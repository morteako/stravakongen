import React from "react";
import HeaderTh from "./HeaderTh";
import { useStoreActions, useStoreState } from "easy-peasy";

const HeaderRow = props => {
  const { segmentRowMapper } = props;
  const { segmentRowClicked } = useStoreState(state => state);

  const [clicked, setClicked] = React.useState(segmentRowClicked);
  useStoreActions(actions => actions.setSegmentRowClicked)(clicked);

  return (
    <tr onClick={() => setClicked(!clicked)}>
      <HeaderTh child={"Navn"} />
      <HeaderTh child={"# (Poeng)"} />
      {segmentRowMapper(clicked).map(x => (
        <HeaderTh key={x.props.segmentId} child={x} />
      ))}
    </tr>
  );
};

export default HeaderRow;
