import React from "react";
import { Fragment } from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  EmailField,
  NumberField,
  Filter,
  TextInput,
  EditButton,
  DeleteButton,
  ShowButton,
} from "react-admin";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import ConfirmButton from "./ConfirmButton";

const BookingFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <TextInput label="Name" source="name" defaultValue="" />
    <TextInput label="Email" source="email" defaultValue="" />
  </Filter>
);

const SpecialNoteField = ({ record }) => {
  const specialNote = record.specialNote;
  let hasSpecialNote = false;
  if (specialNote && specialNote.length > 0) {
    hasSpecialNote = true;
  }

  return <Fragment>{hasSpecialNote ? <DoneIcon /> : <CloseIcon />}</Fragment>;
};

SpecialNoteField.defaultProps = {
  addLabel: true,
};

const BookingList = (props) => {
  return (
    <List
      {...props}
      filters={<BookingFilter />}
      sort={{ field: "createdAt", order: "DESC" }}
    >
      <Datagrid>
        <DateField source="createdAt" />
        <ReferenceField source="bus" reference="buses">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="name" />
        <EmailField source="email" />
        <NumberField source="amount" />
        <DateField source="depDate" />
        <DateField
          source="depTime"
          showTime
          options={{ hour12: true, hour: "2-digit", minute: "2-digit" }}
        />
        <SpecialNoteField source="specialNote" label="Note" />
        <TextField source="id" />
        <ConfirmButton />
        <ShowButton />
        <EditButton source="/bookings" />
        <DeleteButton source="/bookings" />
      </Datagrid>
    </List>
  );
};

export default BookingList;
