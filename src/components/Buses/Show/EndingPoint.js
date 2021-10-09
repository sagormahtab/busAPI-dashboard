import * as React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { useRecordContext } from "react-admin";
import repeatIcon from "../../../data/images/repeat-icon.png";

const EndingPoint = (props) => {
  const source = "trips";
  const { record } = useRecordContext(props);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {record.trips[1]?.endingPoint && (
        <img style={{ width: "32px" }} src={repeatIcon} alt="" />
      )}
      <div>
        <span>{get(record, `${source}[0].endingPoint`)}</span>
        <br />
        {record.trips[1]?.endingPoint && (
          <span>{get(record, `${source}[1].endingPoint`)}</span>
        )}
      </div>
    </div>
  );
};

EndingPoint.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

export default EndingPoint;
