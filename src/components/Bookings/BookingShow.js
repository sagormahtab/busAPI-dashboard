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
  NumberField,
} from "react-admin";
import SeatsField from "../CustomFields/SeatsField";
import ConfirmButton from "./ConfirmButton";

const BookingShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

const BookingShow = (props) => (
  <Show {...props} actions={<BookingShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <SeatsField source="seats" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="paymentId" />
      <NumberField source="amount" />
      <DateField source="date" options={{ dateStyle: "full" }} />
      <DateField
        source="time"
        showTime
        options={{ hour12: true, hour: "2-digit", minute: "2-digit" }}
      />
      <TextField source="startingPoint" />
      <TextField source="endingPoint" />
      <TextField source="bus" />
      <TextField source="specialNote" />
      <ConfirmButton />
      <DateField source="createdAt" />
    </SimpleShowLayout>
  </Show>
);

export default BookingShow;
