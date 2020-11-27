import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  EmailField,
  NumberField,
  EditButton,
  DeleteButton,
} from "react-admin";

const BookingList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <ReferenceField source="bus" reference="buses">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="name" />
        <EmailField source="email" />
        <NumberField source="price" />
        <DateField source="date" />
        <DateField
          source="time"
          showTime
          options={{ hour12: true, hour: "2-digit", minute: "2-digit" }}
        />
        <TextField source="id" />
        <EditButton source="/bookings" />
        <DeleteButton source="/bookings" />
      </Datagrid>
    </List>
  );
};

export default BookingList;
