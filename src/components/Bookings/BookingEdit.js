import React from "react";
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  TextInput,
  NumberInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";
import DateInput from "../CustomInputs/DateInput";
import TimeInput from "../CustomInputs/TimeInput";

const BookingEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        {/* <TextInput source="seats" /> */}
        <ReferenceInput source="bus" reference="buses">
          <SelectInput optionText="id" />
        </ReferenceInput>
        <DateInput name="date" label="Date" source="date" />
        <TimeInput name="time" label="Time" source="time" />
        <ArrayInput source="seats">
          <SimpleFormIterator>
            <TextInput label="Seat" />
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput source="startingPoint" />
        <TextInput source="endingPoint" />
        <TextInput source="name" />
        <TextInput source="email" />
        <NumberInput source="price" />
      </SimpleForm>
    </Edit>
  );
};

export default BookingEdit;
