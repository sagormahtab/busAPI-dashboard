import React from "react";
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  TextInput,
  NumberInput,
  AutocompleteInput,
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
        <ReferenceInput source="bus" reference="buses" perPage={100}>
          <AutocompleteInput optionText="id" />
        </ReferenceInput>
        <DateInput name="depDate" label="Dep Date" source="depDate" />
        <TimeInput name="depTime" label="Dep Time" source="depTime" />
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
