import React, { useEffect, useState } from "react";
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
  SelectInput,
} from "react-admin";
import DateInput from "../CustomInputs/DateInput";
import TimeInput from "../CustomInputs/TimeInput";
import { FormSpy } from "react-final-form";
import axios from "axios";
import { BUS_API_SERVER } from "../../constants";

const BookingEdit = (props) => {
  const [formValues, setFormValues] = useState(null);
  const [boardingPoints, setBoardingPoints] = useState([]);
  const [droppingPoints, setDroppingPoints] = useState([]);
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    (async function () {
      if (formValues) {
        // getting the bus
        const { token } = JSON.parse(localStorage.getItem("auth"));
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `${BUS_API_SERVER}/api/v1/buses/${formValues.bus}`,
          { headers }
        );

        // setting location ids and boarding, dropping points
        const locationIds = [];
        res.data.trips.forEach((trp, i) => {
          if (trp.startingPoint && trp.endingPoint) {
            locationIds.push(trp.startingPoint);
            locationIds.push(trp.endingPoint);
          }

          if (
            formValues.startingPoint === trp.startingPoint &&
            formValues.endingPoint === trp.endingPoint
          ) {
            const internalBoardingPoints = [];
            const internalDroppingPoints = [];
            trp.boardingPoints.forEach((bp) => {
              internalBoardingPoints.push({ id: bp, name: bp });
            });
            setBoardingPoints(internalBoardingPoints);

            trp.droppingPoints.forEach((bp) => {
              internalDroppingPoints.push({ id: bp, name: bp });
            });
            setDroppingPoints(internalDroppingPoints);
          }
        });

        // calling cities api
        let queryString = "";
        locationIds.forEach((id, i) => {
          if (!queryString) {
            queryString += `id=${id}`;
          } else {
            queryString += `&id=${id}`;
          }
        });
        const res2 = await axios.get(
          `${BUS_API_SERVER}/api/v1/cities/admin?${queryString}`,
          { headers }
        );

        setLocations(res2.data);
      }
    })();
  }, [formValues]);

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
        <SelectInput
          source="startingPoint"
          label="Starting Point"
          choices={locations ? locations : [{ locName: "Loading" }]}
          optionText="locName"
          optionValue="locId"
        />
        <SelectInput
          source="endingPoint"
          label="Ending Point"
          choices={locations ? locations : [{ locName: "Loading" }]}
          optionText="locName"
          optionValue="locId"
        />
        <SelectInput
          source="boardingPoint"
          choices={boardingPoints ? boardingPoints : [{ locName: "Loading" }]}
        />
        <SelectInput
          source="droppingPoint"
          choices={droppingPoints ? droppingPoints : [{ locName: "Loading" }]}
        />
        <TextInput source="name" />
        <TextInput source="email" />
        <NumberInput source="amount" />
        <TextInput source="paymentId" />
        <BooleanInput source="isConfirmed" />
        <BooleanInput source="isPaymentDone" />
        <BooleanInput source="isCancelled" />
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
    </Edit>
  );
};

export default BookingEdit;
