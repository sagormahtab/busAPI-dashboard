import * as React from "react";
import PropTypes from "prop-types";
import { useRecordContext } from "react-admin";
import repeatIcon from "../../../data/images/repeat-icon.png";
import { ReferenceField, TextField } from "react-admin";

const EndingPoint = (props) => {
  const { record, basePath } = useRecordContext(props);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {record.trips[1]?.endingPoint && (
        <img style={{ width: "32px" }} src={repeatIcon} alt="" />
      )}
      <div>
        {record.trips[0]?.endingPoint && (
          <ReferenceField
            basePath={basePath}
            record={record}
            source="trips[0].endingPoint"
            reference="cities/admin"
            link={false}
          >
            <TextField source="locName" />
          </ReferenceField>
        )}
        <br />
        {record.trips[1]?.endingPoint && (
          <ReferenceField
            basePath={basePath}
            record={record}
            source="trips[1].endingPoint"
            reference="cities/admin"
            link={false}
          >
            <TextField source="locName" />
          </ReferenceField>
        )}
      </div>
    </div>
  );
};

EndingPoint.propTypes = {
  label: PropTypes.string,
  addLabel: true,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

export default EndingPoint;
