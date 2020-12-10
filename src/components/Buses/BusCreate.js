import React from "react";
import {
  SimpleForm,
  BooleanInput,
  TextInput,
  NumberInput,
  Create,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";
import TimeInput from "../CustomInputs/TimeInput";

const BusCreate = (props) => {
  return (
    <Create {...props}>
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
        <BooleanInput source="hasThreeInRow" />
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

export default BusCreate;
