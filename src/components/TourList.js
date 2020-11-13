import React from "react";
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  NumberField,
  EditButton,
  DeleteButton,
} from "react-admin";

const TourList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <BooleanField source="AC" />
        <TextField source="depTime" />
        <TextField source="arrTime" />
        <NumberField source="seat" />
        <TextField source="name" />
        <TextField source="model" />
        <TextField source="from" />
        <TextField source="to" />
        <NumberField source="fare" />
        <TextField source="id" />
        <EditButton source="/buses" />
        <DeleteButton source="/buses" />
      </Datagrid>
    </List>
  );
};

export default TourList;
