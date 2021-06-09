import React from "react";
import {
  Datagrid,
  TextField,
  EmailField,
  DateField,
  Filter,
  BooleanField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  List,
} from "react-admin";

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <TextInput label="Id" source="id" />
    <TextInput label="Name" source="name" />
    <TextInput label="Email" source="email" />
    <TextInput label="Role" source="role" />
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
        <BooleanField source="confirmed" />
        <ShowButton />
        <EditButton source="/users" />
        <DeleteButton source="/users" />
      </Datagrid>
    </List>
  );
};

export default UserList;
