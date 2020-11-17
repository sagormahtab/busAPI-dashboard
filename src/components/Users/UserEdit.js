import React from "react";
import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";

const UserEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="email" />
        <SelectInput
          source="role"
          choices={[
            { id: "user", name: "user" },
            { id: "operator", name: "operator" },
            { id: "admin", name: "admin" },
          ]}
        />
        <TextInput source="id" disabled />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
