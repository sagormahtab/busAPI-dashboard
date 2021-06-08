import React from "react";
import {
  SimpleForm,
  BooleanInput,
  TextInput,
  NumberInput,
  Create,
  ArrayInput,
  SimpleFormIterator,
  ImageInput,
} from "react-admin";
import TimeInput from "../CustomInputs/TimeInput";
import PreviewImage from "../CustomFields/PreviewImage";
import SeatsInput from "../CustomInputs/SeatsInput";

const BusCreate = (props) => {
  const transform = (data) => {
    const seats = JSON.parse(localStorage.getItem("seats"));
    localStorage.removeItem("seats");
    return {
      ...data,
      seat: seats.length,
      seats: seats,
    };
  };

  return (
    <Create {...props} transform={transform}>
      <SimpleForm>
        <BooleanInput source="AC" />
        <TextInput source="name" />
        <TextInput source="model" />
        <TextInput source="from" />
        <TextInput source="to" />
        <NumberInput source="fare" />
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
        <SeatsInput />
        <NumberInput source="dealPercent" />
        <ImageInput source="images" accept="image/*" multiple={true}>
          <PreviewImage source="src" />
        </ImageInput>
        <TextInput source="id" disabled />
      </SimpleForm>
    </Create>
  );
};

export default BusCreate;
