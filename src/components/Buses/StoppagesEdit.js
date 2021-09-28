import React from "react";
import { AutocompleteArrayInput } from "react-admin";
import { useForm } from "react-final-form";

const StoppagesEdit = ({ locations, ...props }) => {
  const form = useForm();
  form.change(
    "stoppages",
    props.record.stoppages.map((v) =>
      JSON.stringify({
        locId: v.locId,
        locName: v.locName,
        countryCode: v.countryCode,
      })
    )
  );

  return (
    <>
      {locations ? (
        <AutocompleteArrayInput source="stoppages" choices={locations} />
      ) : (
        <AutocompleteArrayInput
          source="stoppages"
          choices={[{ name: "Loading" }]}
        />
      )}
    </>
  );
};

export default StoppagesEdit;
