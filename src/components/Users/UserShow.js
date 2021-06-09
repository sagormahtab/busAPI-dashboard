import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  DateField,
  EditButton,
  TopToolbar,
  DeleteButton,
  ListButton,
  UrlField,
  BooleanField,
} from "react-admin";

const UserShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

const UserShow = (props) => (
  <Show {...props} actions={<UserShowActions />}>
    <SimpleShowLayout>
      <DateField source="createdAt" />
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="role" />
      <BooleanField source="confirmed" />
      <UrlField source="documents" target="_blank" />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
