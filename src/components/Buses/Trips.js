import React from "react";
import {
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  TextInput,
  AutocompleteArrayInput,
  useNotify,
} from "react-admin";
import TimeInput from "../CustomInputs/TimeInput";
import { T4T_SERVER_BASE_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";
import repeatIcon from "../../data/images/repeat-icon.png";

const Trips = (props) => {
  const notify = useNotify();
  const { data: locations, error } = useFetch(
    `${T4T_SERVER_BASE_URL}/api/v1/locations`
  );

  if (error) {
    notify("An error occurred while fetching locations");
  }

  const locationChoice = (locs) =>
    locs.map((loc) => {
      return { id: loc.locId, name: loc.locName };
    });

  const locationChoiceForAutocomplete = (locs) =>
    locs.map((loc) => {
      return { id: loc.locName, name: loc.locName };
    });

  return (
    <ArrayInput {...props}>
      <SimpleFormIterator
        addButton={<img src={repeatIcon} alt="" />}
        {...props}
      >
        <SelectInput
          source="startingPoint"
          label="Starting Point"
          choices={locations ? locationChoice(locations) : []}
        />
        <SelectInput
          source="endingPoint"
          label="Ending Point"
          choices={locations ? locationChoice(locations) : []}
        />
        <AutocompleteArrayInput
          source="route"
          label="Route"
          choices={locations ? locationChoiceForAutocomplete(locations) : []}
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
