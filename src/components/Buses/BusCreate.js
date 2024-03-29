import React from "react";
import {
  SimpleForm,
  BooleanInput,
  TextInput,
  NumberInput,
  Create,
  ImageInput,
  RadioButtonGroupInput,
} from "react-admin";
import PreviewImage from "../CustomFields/PreviewImage";
import SeatsInput from "../CustomInputs/SeatsInput";
import Trips from "./Trips";

const busClassChoice = [
  { id: "Business", name: "Business" },
  { id: "Economy", name: "Economy" },
  { id: "Sleeping Coach", name: "Sleeping Coach" },
];

const BusCreate = ({ permissions, ...props }) => {
  const transform = (data) => {
    const seats = JSON.parse(localStorage.getItem("seats"));
    localStorage.removeItem("seats");
    return {
      ...data,
      numOfSeats: seats.length,
      seats: seats,
    };
  };

  return (
    <Create {...props} transform={transform}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="model" />
        <BooleanInput source="AC" />
        <RadioButtonGroupInput source="busClass" choices={busClassChoice} />
        <Trips source="trips" />
        <NumberInput source="seatsInOneRow" />
        <SeatsInput />
        <ImageInput source="images" accept="image/*" multiple={true}>
          <PreviewImage source="src" />
        </ImageInput>
        {permissions === "admin" && (
          <>
            <NumberInput source="dealPercent" />
            <br />
            <NumberInput source="priority" />
            <BooleanInput source="approved" />
          </>
        )}
        <TextInput source="id" disabled />
      </SimpleForm>
    </Create>
  );
};

export default BusCreate;
