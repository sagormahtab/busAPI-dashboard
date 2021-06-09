import * as React from "react";
import Done from "@material-ui/icons/Done";
import Button from "@material-ui/core/Button";
import { useUpdate } from "react-admin";

const ConfirmButton = ({ record }) => {
  const [approve, { loading }] = useUpdate(
    "bookings",
    record.id,
    { isConfirmed: true },
    record
  );
  return record && record.isConfirmed ? (
    <p style={{ textAlign: "center", color: "#16a085" }}>Confirmed</p>
  ) : (
    <Button onClick={approve} color="primary" disabled={loading}>
      <Done color="primary" />
      <span style={{ marginLeft: "0.3rem" }}>Confirm</span>
    </Button>
  );
};

export default ConfirmButton;
