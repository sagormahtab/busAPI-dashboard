import React from "react";
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  TextInput,
  NumberInput,
  SelectInput,
  ArrayInput,
  BooleanInput,
  SimpleFormIterator,
} from "react-admin";
import DateInput from "../CustomInputs/DateInput";
import TimeInput from "../CustomInputs/TimeInput";

const BookingEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
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
        <NumberInput source="amount" />
        <BooleanInput source="isConfirmed" />
        <TextInput source="specialNote" />
      </SimpleForm>
    </Edit>
  );
};

export default BookingEdit;
