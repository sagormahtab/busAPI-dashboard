import * as React from "react";
import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  DateField,
  EditButton,
  TopToolbar,
  DeleteButton,
  ListButton,
  NumberField,
  BooleanField,
} from "react-admin";
import { Typography, Chip } from "@material-ui/core";

const BusTitle = ({ record }) => {
  return <span>Bus {record ? `"${record.name} ${record.model}"` : ""}</span>;
};

const BusShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

const Aside = () => (
  <div style={{ width: 200, margin: "1em" }}>
    <Typography variant="h6">Post details</Typography>
    <Typography variant="body2">
      Posts will only be published one an editor approves them
    </Typography>
  </div>
);

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

const StartingPointsField = ({ record }) => (
  <ul>
    {record.startingPoints.map((item) => (
      <Chip key={item} label={item} style={{ marginRight: "0.3rem" }} />
    ))}
  </ul>
);
StartingPointsField.defaultProps = {
  addLabel: true,
};

const EndingPointsField = ({ record }) => (
  <ul>
    {record.endingPoints.map((item) => (
      <Chip key={item} label={item} style={{ marginRight: "0.3rem" }} />
    ))}
  </ul>
);
EndingPointsField.defaultProps = {
  addLabel: true,
};

const BusShow = (props) => (
  <Show
    title={<BusTitle />}
    actions={<BusShowActions />}
    aside={<Aside />}
    {...props}
  >
    <TabbedShowLayout>
      <Tab label="General">
        <TextField source="id" />
        <BooleanField source="AC" />
        <TextField source="name" />
        <TextField source="model" />
        <TextField source="from" />
        <TextField source="to" />
        <DateField source="depTime" />
        <DateField source="arrTime" />
        <NumberField source="fare" />
        <StartingPointsField source="startingPoints" />
        <EndingPointsField source="endingPoints" />
      </Tab>

      <Tab label="Seat">
        <NumberField source="seat" />
        <BooleanField source="hasThreeInRow" />
        <SeatsField source="seats" />
      </Tab>

      <Tab label="Miscellaneous">
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default BusShow;
