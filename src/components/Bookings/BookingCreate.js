import React from "react";
import {
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
  ReferenceInput,
  SelectInput,
  ArrayInput,
  BooleanInput,
  SimpleFormIterator,
} from "react-admin";
import TimeInput from "../CustomInputs/TimeInput";
import DateInput from "../CustomInputs/DateInput";

const BookingCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="bus" reference="buses">
          <SelectInput optionText="id" />
        </ReferenceInput>
        <DateInput name="date" label="Date" source="date" />
        <TimeInput name="time" label="Time" source="time" />
        <TextInput source="startingPoint" label="Boarding Point" />
        <ArrayInput source="seats">
          <SimpleFormIterator>
            <TextInput label="Seat" />
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput source="paymentId" />
        <TextInput source="name" />
        <TextInput source="email" />
        <TextInput source="phone" />
        <NumberInput source="amount" />
        <BooleanInput source="isConfirmed" />
        <TextInput source="specialNote" />
      </SimpleForm>
    </Create>
  );
};

export default BookingCreate;
