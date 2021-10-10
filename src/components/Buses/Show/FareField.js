import * as React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { useRecordContext } from "react-admin";
import repeatIcon from "../../../data/images/repeat-icon.png";

const ArrTime = (props) => {
  const source = "trips";
  const { record } = useRecordContext(props);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {record.trips[1]?.fare && (
        <img style={{ width: "32px" }} src={repeatIcon} alt="" />
      )}
      <div>
        <span>{get(record, `${source}[0].fare`)}</span>
        <br />
        {record.trips[1]?.fare && (
          <span>{get(record, `${source}[1].fare`)}</span>
        )}
      </div>
    </div>
  );
};

ArrTime.propTypes = {
  label: PropTypes.string,
  addLabel: true,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

export default ArrTime;
