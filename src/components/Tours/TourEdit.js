import React from "react";
import {
  Edit,
  SimpleForm,
  BooleanInput,
  TextInput,
  NumberInput,
  SimpleFormIterator,
  ArrayInput,
} from "react-admin";
import TimeInput from "../CustomInputs/TimeInput";

const TourEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <BooleanInput source="AC" />
        <TimeInput name="depTime" label="Departure Time" source="depTime" />
        <TimeInput name="arrTime" label="Arrival Time" source="arrTime" />
        <ArrayInput source="startingPoints">
          <SimpleFormIterator>
            <TextInput label="Starting point" />
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="endingPoints">
          <SimpleFormIterator>
            <TextInput label="Ending point" />
          </SimpleFormIterator>
        </ArrayInput>
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
