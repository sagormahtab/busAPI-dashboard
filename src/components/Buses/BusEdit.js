import React from "react";
import {
  Edit,
  SimpleForm,
  BooleanInput,
  TextInput,
  NumberInput,
  SimpleFormIterator,
  ArrayInput,
  ImageInput,
  FormDataConsumer,
  Toolbar,
} from "react-admin";
import TimeInput from "../CustomInputs/TimeInput";
import PreviewImage from "../CustomFields/PreviewImage";
import SeatsInput from "../CustomInputs/SeatsInput";

const BusEdit = (props) => {
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
    <Edit {...props} transform={transform}>
      <SimpleForm toolbar={<Toolbar alwaysEnableSaveButton />}>
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
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <SeatsInput source="seats" previouslySelected={formData.seats} />
          )}
        </FormDataConsumer>
        <NumberInput source="dealPercent" />
        <ImageInput source="images" accept="image/*" multiple={true}>
          <PreviewImage source="src" />
        </ImageInput>
        <TextInput source="id" disabled />
      </SimpleForm>
    </Edit>
  );
};

export default BusEdit;
