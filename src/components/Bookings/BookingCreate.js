import React, { useState } from "react";
import {
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
  ReferenceInput,
  ArrayInput,
  BooleanInput,
  SimpleFormIterator,
  AutocompleteInput,
} from "react-admin";
import TimeInput from "../CustomInputs/TimeInput";
import DateInput from "../CustomInputs/DateInput";
import { FormSpy } from "react-final-form";
import Aside from "./Aside";

const BookingCreate = (props) => {
  const [formValues, setFormValues] = useState();
  return (
    <Create {...props} aside={formValues && <Aside formValues={formValues} />}>
      <SimpleForm>
        <ReferenceInput source="bus" reference="buses" perPage={100}>
          <AutocompleteInput optionText="id" />
        </ReferenceInput>
        <DateInput name="depDate" label="Dep Date" source="depDate" />
        <TimeInput name="depTime" label="Dep Time" source="depTime" />
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
        <FormSpy
          subscription={{ values: true }}
          onChange={(props) => {
            if (props.values.bus) {
              setFormValues(props.values);
            }
          }}
        />
      </SimpleForm>
    </Create>
  );
};

export default BookingCreate;
