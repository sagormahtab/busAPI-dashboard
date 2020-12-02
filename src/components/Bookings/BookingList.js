import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  EmailField,
  NumberField,
  Filter,
  TextInput,
  EditButton,
  DeleteButton,
  ShowButton,
} from "react-admin";

const BookingFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <TextInput label="Name" source="name" defaultValue="" />
    <TextInput label="Email" source="email" defaultValue="" />
  </Filter>
);

const BookingList = (props) => {
  return (
    <List
      {...props}
      filters={<BookingFilter />}
      sort={{ field: "createdAt", order: "DESC" }}
    >
      <Datagrid>
        <DateField source="createdAt" />
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
        <ShowButton />
        <EditButton source="/bookings" />
        <DeleteButton source="/bookings" />
      </Datagrid>
    </List>
  );
};

export default BookingList;
