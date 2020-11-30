import { Chip } from "@material-ui/core";

const SeatsField = ({ record }) => (
  <ul>
    {record.seats.map((item) => (
      <Chip key={item} label={item} style={{ marginRight: "0.3rem" }} />
    ))}
  </ul>
);
SeatsField.defaultProps = {
  addLabel: true,
};

export default SeatsField;
