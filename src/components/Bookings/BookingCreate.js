import React, { useState, useEffect } from "react";
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
  SelectInput,
} from "react-admin";
import TimeInput from "../CustomInputs/TimeInput";
import DateInput from "../CustomInputs/DateInput";
import { FormSpy } from "react-final-form";
import Aside from "./Aside";
import { BUS_API_SERVER } from "../../constants";
import axios from "axios";

const BookingCreate = (props) => {
  const [formValues, setFormValues] = useState(null);
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    (async function () {
      if (formValues) {
        const { token } = JSON.parse(localStorage.getItem("auth"));
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `${BUS_API_SERVER}/api/v1/buses/${formValues.bus}`,
          { headers }
        );
        const locationIds = [];
        res.data.trips.forEach((trp) => {
          if (trp.startingPoint && trp.endingPoint) {
            locationIds.push(trp.startingPoint);
            locationIds.push(trp.endingPoint);
          }
        });
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
    <Create {...props} aside={formValues && <Aside formValues={formValues} />}>
      <SimpleForm>
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
