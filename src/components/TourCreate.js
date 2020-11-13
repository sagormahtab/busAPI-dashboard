import React from "react";
import {
  SimpleForm,
  BooleanInput,
  TextInput,
  NumberInput,
  Create,
} from "react-admin";

const TourCreate = (props) => {
  return (
    <Create {...props}>
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
    </Create>
  );
};

export default TourCreate;
