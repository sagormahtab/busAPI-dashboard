import React from "react";
import {
  Edit,
  SimpleForm,
  BooleanInput,
  TextInput,
  NumberInput,
  ImageInput,
  FormDataConsumer,
  Toolbar,
  useNotify,
  RadioButtonGroupInput,
} from "react-admin";
import PreviewImage from "../CustomFields/PreviewImage";
import SeatsInput from "../CustomInputs/SeatsInput";
import useFetchLocation from "../../hooks/useFetchLocation";
import TripsEdit from "./TripsEdit";
import StoppagesEdit from "./StoppagesEdit";
import { T4T_SERVER_BASE_URL } from "../../constants";

const busClassChoice = [
  { id: "Business", name: "Business" },
  { id: "Economy", name: "Economy" },
  { id: "Sleeping Coach", name: "Sleeping Coach" },
];

const BusEdit = ({ permissions, ...props }) => {
  const notify = useNotify();
  const { locations, error } = useFetchLocation(
    `${T4T_SERVER_BASE_URL}/api/v1/locations`
  );

  if (error) {
    notify("An error occurred while fetching locations");
  }

  const transform = (data) => {
    data.stoppages = data.stoppages.map((stp) => JSON.parse(stp));
    data.trips = data.trips.map((trp) => {
      let locStrt = trp.startingPoint;
      let locEnd = trp.endingPoint;
      if (typeof locStrt === "string") {
        locStrt = JSON.parse(locStrt);
      }
      if (typeof locEnd === "string") {
        locEnd = JSON.parse(locEnd);
      }
      trp.startingPoint = {};
      trp.endingPoint = {};

      trp.startingPoint.locId = locStrt.locId;
      trp.startingPoint.locName = locStrt.locName;
      trp.endingPoint.locId = locEnd.locId;
      trp.endingPoint.locName = locEnd.locName;
      return trp;
    });

    const seats = JSON.parse(localStorage.getItem("seats"));
    localStorage.removeItem("seats");
    return {
      ...data,
      numOfSeats: seats.length,
      seats: seats,
    };
  };

  return (
    <Edit {...props} transform={transform}>
      <SimpleForm toolbar={<Toolbar alwaysEnableSaveButton />}>
        <TextInput source="name" />
        <TextInput source="model" />
        <BooleanInput source="AC" />
        <RadioButtonGroupInput source="busClass" choices={busClassChoice} />
        <StoppagesEdit source="stoppages" locations={locations} />
        <TripsEdit source="trips" />
        <NumberInput source="seatsInOneRow" />
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <SeatsInput source="seats" previouslySelected={formData.seats} />
          )}
        </FormDataConsumer>
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
    </Edit>
  );
};

export default BusEdit;
