import React, { useState, useRef } from "react";
import { Fragment } from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const ARow = ["A1", "A2", "A3", "A4", "A5", "A6"];
const BRow = ["B1", "B2", "B3", "B4", "B5", "B6"];
const CRow = ["C1", "C2", "C3", "C4", "C5", "C6"];
const DRow = ["D1", "D2", "D3", "D4", "D5", "D6"];
const ERow = ["E1", "E2", "E3", "E4", "E5", "E6"];
const FRow = ["F1", "F2", "F3", "F4", "F5", "F6"];
const GRow = ["G1", "G2", "G3", "G4", "G5", "G6"];
const HRow = ["H1", "H2", "H3", "H4", "H5", "H6"];
const IRow = ["I1", "I2", "I3", "I4", "I5", "I6"];
const JRow = ["J1", "J2", "J3", "J4", "J5", "J6"];

const RowPrinter = ({ theRow, seats, setSeats }) => {
  const classes = useStyles();

  const handleClick = (seat) => {
    if (seats.includes(seat)) {
      const filteredSeats = seats.filter((st) => st !== seat);
      setSeats(filteredSeats);
      localStorage.setItem("seats", JSON.stringify(filteredSeats));
    } else {
      const updatedSeats = [...seats, seat];
      setSeats(updatedSeats);
      localStorage.setItem("seats", JSON.stringify(updatedSeats));
    }
  };

  return (
    <Fragment>
      <p>
        {theRow.map((data, i) => {
          return (
            <span key={i}>
              <Chip
                label={data}
                className={classes.chip}
                onClick={() => handleClick(data)}
                color={seats.includes(data) ? "primary" : ""}
              />
            </span>
          );
        })}
      </p>
    </Fragment>
  );
};

const SeatsInput = ({ previouslySelected }) => {
  const [seats, setSeats] = useState([]);
  const firstTime = useRef(true);

  if (previouslySelected && firstTime.current === true) {
    setSeats(previouslySelected);
    localStorage.setItem("seats", JSON.stringify(previouslySelected));
    firstTime.current = false;
  }
  return (
    <div>
      <RowPrinter theRow={ARow} seats={seats} setSeats={setSeats} />
      <RowPrinter theRow={BRow} seats={seats} setSeats={setSeats} />
      <RowPrinter theRow={CRow} seats={seats} setSeats={setSeats} />
      <RowPrinter theRow={DRow} seats={seats} setSeats={setSeats} />
      <RowPrinter theRow={ERow} seats={seats} setSeats={setSeats} />
      <RowPrinter theRow={FRow} seats={seats} setSeats={setSeats} />
      <RowPrinter theRow={GRow} seats={seats} setSeats={setSeats} />
      <RowPrinter theRow={HRow} seats={seats} setSeats={setSeats} />
      <RowPrinter theRow={IRow} seats={seats} setSeats={setSeats} />
      <RowPrinter theRow={JRow} seats={seats} setSeats={setSeats} />
    </div>
  );
};

export default SeatsInput;
