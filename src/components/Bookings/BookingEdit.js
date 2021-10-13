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
  const [bus, setBus] = useState(null);
  const [startingPoint, setStartingPoint] = useState(null);
  const [endingPoint, setEndingPoint] = useState(null);
  const [locationIds, setLocationIds] = useState(null);
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    (async function () {
      if (formValues && formValues.bus !== bus?.id) {
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

        setLocationIds([
          res.data.trips[0].startingPoint,
          res.data.trips[0].endingPoint,
        ]);
        setBus(res.data);
      }
    })();
  }, [formValues, bus]);

  useEffect(() => {
    if (!formValues) {
      return;
    }
    if (
      formValues &&
      formValues.startingPoint === startingPoint &&
      formValues.endingPoint === endingPoint
    ) {
      return;
    }
    setStartingPoint(formValues.startingPoint);
    setEndingPoint(formValues.endingPoint);
  }, [formValues, startingPoint, endingPoint]);

  useEffect(() => {
    (async function () {
      if (locationIds) {
        let queryString = "";
        locationIds.forEach((id, i) => {
          if (!queryString) {
            queryString += `id=${id}`;
          } else {
            queryString += `&id=${id}`;
          }
        });

        const { token } = JSON.parse(localStorage.getItem("auth"));
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const res = await axios.get(
          `${BUS_API_SERVER}/api/v1/cities/admin?${queryString}`,
          { headers }
        );

        setLocations(res.data);
      }
    })();
  }, [locationIds]);

  useEffect(() => {
    if (bus) {
      // setting location ids and boarding, dropping points
      bus.trips.forEach((trp, i) => {
        if (
          startingPoint === trp.startingPoint &&
          endingPoint === trp.endingPoint
        ) {
          const internalBoardingPoints = [];
          const internalDroppingPoints = [];
          trp.boardingPoints.forEach((bp) => {
            internalBoardingPoints.push({ id: bp, name: bp });
          });
          setBoardingPoints(internalBoardingPoints);

          trp.droppingPoints.forEach((dp) => {
            internalDroppingPoints.push({ id: dp, name: dp });
          });
          setDroppingPoints(internalDroppingPoints);
        }
      });
    }
  }, [bus, endingPoint, startingPoint]);

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <ReferenceInput source="bus" reference="buses" perPage={100}>
          <AutocompleteInput optionText="id" />
        </ReferenceInput>
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
        <DateInput name="depDate" label="Dep Date" source="depDate" />
        <TimeInput name="depTime" label="Dep Time" source="depTime" />
        <TimeInput name="arrTime" label="Arr Time" source="arrTime" />
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
        <TextInput source="phone" />
        <NumberInput source="amount" />
        <TextInput source="paymentGateway" />
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
