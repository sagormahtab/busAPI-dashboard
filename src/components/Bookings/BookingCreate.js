import React from "react";
import {
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
  ReferenceInput,
  SelectInput,
  ArrayInput,
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
        {/* <TextInput source="endingPoint" /> */}
        {/* <TextInput source="seats" /> */}
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
      </SimpleForm>
    </Create>
  );
};

export default BookingCreate;
