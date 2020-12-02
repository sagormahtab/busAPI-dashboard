import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  Filter,
  TextInput,
  EditButton,
  DeleteButton,
} from "react-admin";

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <TextInput label="Name" source="name" defaultValue="" />
    <TextInput label="Email" source="email" defaultValue="" />
    <TextInput label="Role" source="role" defaultValue="" />
  </Filter>
);

const UserList = (props) => {
  return (
    <List
      {...props}
      filters={<UserFilter />}
      sort={{ field: "createdAt", order: "DESC" }}
    >
      <Datagrid>
        <DateField source="createdAt" />
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="role" />
        {/* <BooleanField source="active" /> */}
        <EditButton source="/users" />
        <DeleteButton source="/users" />
      </Datagrid>
    </List>
  );
};

export default UserList;
