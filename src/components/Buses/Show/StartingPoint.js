import * as React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { useRecordContext } from "react-admin";
import repeatIcon from "../../../data/images/repeat-icon.png";
import { ReferenceField, TextField } from "react-admin";

const StartingPoint = (props) => {
  const { source } = props;
  const { record } = useRecordContext(props);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {record.trips[1]?.startingPoint && (
        <img style={{ width: "32px" }} src={repeatIcon} alt="" />
      )}
      <div>
        <ReferenceField
          //   label="StartingPoint"
          source="trips[0].startingPoint"
          reference="cities/admin"
          link={false}
        >
          <TextField source="locName" />
        </ReferenceField>
        <span>{get(record, `${source}[0].startingPoint`)}</span>
        <br />
        {record.trips[1]?.startingPoint && (
          <span>{get(record, `${source}[1].startingPoint`)}</span>
        )}
      </div>
    </div>
  );
};

StartingPoint.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

export default StartingPoint;
