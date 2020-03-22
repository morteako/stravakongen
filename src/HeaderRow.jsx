import React from "react";
import HeaderTh from "./HeaderTh";

const HeaderRow = props => {
  const { segmentRowMapper } = props;

  const [clicked, setClicked] = React.useState(false);

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
