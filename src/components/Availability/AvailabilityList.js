import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  ShowButton,
} from "react-admin";

const AvailabilityList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField label="Bus Id" source="bus" />
      <ReferenceField label="Bus Name" source="bus" reference="buses">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="route" />
      <DateField source="date" options={{ dateStyle: "medium" }} />
      <DateField
        label="Departure Time"
        showTime
        options={{ hour12: true, hour: "2-digit", minute: "2-digit" }}
        source="time"
      />
      <NumberField source="booked" />
      <NumberField source="remaining" />
      <ShowButton />
    </Datagrid>
  </List>
);

export default AvailabilityList;
