import React from "react";
import {
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  TextInput,
  AutocompleteArrayInput,
} from "react-admin";
import TimeInput from "../CustomInputs/TimeInput";
import { useFormState } from "react-final-form";

const Trips = (props) => {
  const { values } = useFormState();

  const locationChoice = (locations) =>
    locations.map((loc) => {
      if (typeof loc === "string") {
        const parsedLoc = JSON.parse(loc);
        delete parsedLoc._id;
        delete parsedLoc.countryCode;
        return {
          id: JSON.stringify(parsedLoc),
          name: parsedLoc.locName,
        };
      }
      return { name: "Loading" };
    });

  const locationChoiceForAutocomplete = (locations) =>
    locations.map((loc) => {
      if (typeof loc === "string") {
        const parsedLoc = JSON.parse(loc);
        return {
          id: parsedLoc.locName,
          name: parsedLoc.locName,
        };
      }
      return { name: "Loading" };
    });

  return (
    <ArrayInput {...props}>
      <SimpleFormIterator {...props}>
        <SelectInput
          source="startingPoint"
          label="Starting Point"
          format={(v) => {
            if (typeof v === "string") {
              return v;
            }
            return JSON.stringify({
              locId: v.locId,
              locName: v.locName,
            });
          }}
          choices={values.stoppages ? locationChoice(values.stoppages) : []}
        />
        <SelectInput
          source="endingPoint"
          label="Ending Point"
          format={(v) => {
            if (typeof v === "string") {
              return v;
            }
            return JSON.stringify({
              locId: v.locId,
              locName: v.locName,
            });
          }}
          choices={values.stoppages ? locationChoice(values.stoppages) : []}
        />
        <AutocompleteArrayInput
          source="route"
          label="Route"
          choices={
            values.stoppages
              ? locationChoiceForAutocomplete(values.stoppages)
              : []
          }
        />
        <NumberInput source="fare" label="Fare" />
        <TimeInput label="Departure Time" source="depTime" />
        <TimeInput label="Arrival Time" source="arrTime" />
        <ArrayInput source="boardingPoints" label="Boarding Points">
          <SimpleFormIterator>
            <TextInput label="Boarding point" />
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="droppingPoints" label="Dropping Points">
          <SimpleFormIterator>
            <TextInput label="Dropping point" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleFormIterator>
    </ArrayInput>
  );
};

export default Trips;
