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
  </Filter>
);

const TourList = (props) => {
  return (
    <List {...props} filters={<BusFilter />}>
      <Datagrid rowClick="show">
        <BooleanField source="AC" />
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
        <TextField source="name" />
        <TextField source="model" />
        <TextField source="from" />
        <TextField source="to" />
        <NumberField source="fare" />
        <TextField source="id" />
        <ShowButton />
        <EditButton source="/buses" />
        <DeleteButton source="/buses" />
      </Datagrid>
    </List>
  );
};

export default TourList;
