import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  Filter,
  TextInput,
  ShowButton,
} from "react-admin";
import DateInput from "../CustomInputs/DateInput";
import TimeInput from "../CustomInputs/TimeInput";

const AvailabilityFilter = (props) => (
  <Filter {...props}>
    {/* <TextInput label="Search" source="q" alwaysOn /> */}
    <TextInput label="Bus Id" source="bus" />
    {/* <TextInput label="Email" source="email" defaultValue="" /> */}
    <DateInput name="date" label="Departure Date" source="date" />
    <TimeInput name="time" label="Departure Time" source="time" />
  </Filter>
);

const AvailabilityList = (props) => (
  <List
    {...props}
    filters={<AvailabilityFilter />}
    sort={{ field: "date", order: "DESC" }}
  >
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
      <NumberField source="seatBooked" />
      <NumberField source="remaining" />
      <ShowButton />
    </Datagrid>
  </List>
);

export default AvailabilityList;
