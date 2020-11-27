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
} from "react-admin";

const TourList = (props) => {
  return (
    <List {...props}>
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
