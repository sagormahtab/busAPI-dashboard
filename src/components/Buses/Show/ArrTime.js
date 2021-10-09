import * as React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { useRecordContext } from "react-admin";
import format from "date-fns/format";
import repeatIcon from "../../../data/images/repeat-icon.png";

const ArrTime = (props) => {
  const source = "trips";
  const { record } = useRecordContext(props);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {record.trips[1]?.arrTime && (
        <img style={{ width: "32px" }} src={repeatIcon} alt="" />
      )}
      <div>
        <span>
          {format(new Date(get(record, `${source}[0].arrTime`)), "hh:MM a")}
        </span>
        <br />
        {record.trips[1]?.arrTime && (
          <span>
            {format(new Date(get(record, `${source}[1].arrTime`)), "hh:MM a")}
          </span>
        )}
      </div>
    </div>
  );
};

ArrTime.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

export default ArrTime;
