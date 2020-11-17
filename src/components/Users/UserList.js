import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
} from "react-admin";

const UserList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
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
