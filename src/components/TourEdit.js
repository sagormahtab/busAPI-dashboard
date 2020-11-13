import React from "react";
import {
  Edit,
  SimpleForm,
  BooleanInput,
  TextInput,
  NumberInput,
} from "react-admin";

const TourEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <BooleanInput source="AC" />
        <TextInput source="depTime" />
        <TextInput source="arrTime" />
        <TextInput source="startingPoints" />
        <TextInput source="endingPoints" />
        <NumberInput source="seat" />
        <TextInput source="name" />
        <TextInput source="model" />
        <TextInput source="from" />
        <TextInput source="to" />
        <NumberInput source="fare" />
        <TextInput source="id" disabled />
      </SimpleForm>
    </Edit>
  );
};

export default TourEdit;
