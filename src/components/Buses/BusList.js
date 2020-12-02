import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  NumberField,
  EditButton,
  DeleteButton,
  ShowButton,
  Filter,
  TextInput,
} from "react-admin";

const BusFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <TextInput label="Name" source="name" defaultValue="" />
    <TextInput label="From" source="from" defaultValue="" />
    <TextInput label="To" source="to" defaultValue="" />
  </Filter>
);

const BusList = (props) => {
  return (
    <List
      {...props}
      filters={<BusFilter />}
      sort={{ field: "createdAt", order: "DESC" }}
    >
      <Datagrid>
        <DateField source="createdAt" />
        <BooleanField source="AC" />
        <TextField source="name" />
        <TextField source="model" />
        <TextField source="from" />
        <TextField source="to" />
        <DateField
          showTime
          options={{ hour12: true, hour: "2-digit", minute: "2-digit" }}
          source="depTime"
        />
        <DateField
          showTime
          options={{ hour12: true, hour: "2-digit", minute: "2-digit" }}
          source="arrTime"
        />
        <NumberField source="seat" />
        <NumberField source="fare" />
        <TextField source="id" />
        <ShowButton />
        <EditButton source="/buses" />
        <DeleteButton source="/buses" />
      </Datagrid>
    </List>
  );
};

export default BusList;
