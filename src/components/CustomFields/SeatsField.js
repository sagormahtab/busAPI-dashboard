import { Chip } from "@material-ui/core";

const SeatsField = ({ record }) => {
  const ARow = [],
    BRow = [],
    CRow = [],
    DRow = [],
    ERow = [],
    FRow = [],
    GRow = [],
    HRow = [],
    IRow = [],
    JRow = [];
  const seats = record.seats;
  seats.forEach((st) => {
    if (st.startsWith("A")) {
      ARow.push(st);
    } else if (st.startsWith("B")) {
      BRow.push(st);
    } else if (st.startsWith("C")) {
      CRow.push(st);
    } else if (st.startsWith("D")) {
      DRow.push(st);
    } else if (st.startsWith("E")) {
      ERow.push(st);
    } else if (st.startsWith("F")) {
      FRow.push(st);
    } else if (st.startsWith("G")) {
      GRow.push(st);
    } else if (st.startsWith("H")) {
      HRow.push(st);
    } else if (st.startsWith("I")) {
      IRow.push(st);
    } else if (st.startsWith("J")) {
      JRow.push(st);
    }
  });

  return (
    <div>
      <div>
        {ARow &&
          ARow.map((item) => (
            <Chip
              key={item}
              label={item}
              style={{ margin: "0 0.3rem 0.3rem 0" }}
            />
          ))}
      </div>
      <div>
        {BRow &&
          BRow.map((item) => (
            <Chip
              key={item}
              label={item}
              style={{ margin: "0 0.3rem 0.3rem 0" }}
            />
          ))}
      </div>
      <div>
        {CRow &&
          CRow.map((item) => (
            <Chip
              key={item}
              label={item}
              style={{ margin: "0 0.3rem 0.3rem 0" }}
            />
          ))}
      </div>
      <div>
        {DRow &&
          DRow.map((item) => (
            <Chip
              key={item}
              label={item}
              style={{ margin: "0 0.3rem 0.3rem 0" }}
            />
          ))}
      </div>
      <div>
        {ERow &&
          ERow.map((item) => (
            <Chip
              key={item}
              label={item}
              style={{ margin: "0 0.3rem 0.3rem 0" }}
            />
          ))}
      </div>
      <div>
        {FRow &&
          FRow.map((item) => (
            <Chip
              key={item}
              label={item}
              style={{ margin: "0 0.3rem 0.3rem 0" }}
            />
          ))}
      </div>
      <div>
        {GRow &&
          GRow.map((item) => (
            <Chip
              key={item}
              label={item}
              style={{ margin: "0 0.3rem 0.3rem 0" }}
            />
          ))}
      </div>
      <div>
        {HRow &&
          HRow.map((item) => (
            <Chip
              key={item}
              label={item}
              style={{ margin: "0 0.3rem 0.3rem 0" }}
            />
          ))}
      </div>
      <div>
        {IRow &&
          IRow.map((item) => (
            <Chip
              key={item}
              label={item}
              style={{ margin: "0 0.3rem 0.3rem 0" }}
            />
          ))}
      </div>
      <div>
        {JRow &&
          JRow.map((item) => (
            <Chip
              key={item}
              label={item}
              style={{ margin: "0 0.3rem 0.3rem 0" }}
            />
          ))}
      </div>
    </div>
  );
};
SeatsField.defaultProps = {
  addLabel: true,
};

export default SeatsField;
