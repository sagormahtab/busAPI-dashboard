import * as React from "react";
import {
  TabbedShowLayout,
  Tab,
  TextField,
  DateField,
  EditButton,
  TopToolbar,
  DeleteButton,
  ListButton,
  NumberField,
  BooleanField,
  ReferenceField,
  ShowController,
  ShowView,
} from "react-admin";
import { Typography, Chip } from "@material-ui/core";
import ImagesField from "../CustomFields/ImagesField";
import SeatsField from "../CustomFields/SeatsField";
import get from "lodash/get";

const BusTitle = ({ record }) => {
  return <span>Bus {record ? `"${record.name} ${record.model}"` : ""}</span>;
};

const BusShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

const Aside = () => (
  <div style={{ width: 200, margin: "1em" }}>
    <Typography variant="h6">Post details</Typography>
    <Typography variant="body2">
      Posts will only be published one an editor approves them
    </Typography>
  </div>
);

const ArrayChipField = ({ record, source }) => {
  return (
    <ul>
      {get(record, source).map((item) => (
        <Chip key={item} label={item} style={{ marginRight: "0.3rem" }} />
      ))}
    </ul>
  );
};
ArrayChipField.defaultProps = {
  addLabel: true,
};

const titleStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  margin: "0 0",
  marginBottom: "0.5rem",
};

const BusShow = (props) => {
  return (
    <ShowController {...props}>
      {(controllerProps) => (
        <ShowView
          title={<BusTitle />}
          actions={<BusShowActions />}
          aside={<Aside />}
          {...props}
          {...controllerProps}
        >
          <TabbedShowLayout>
            <Tab label="General">
              <TextField source="id" />
              <BooleanField source="AC" />
              <TextField source="name" />
              <TextField source="model" />
              <TextField source="busClass" />
              <p style={titleStyle}>Journey</p>
              <ReferenceField
                label="Starting Point"
                source="trips[0].startingPoint"
                reference="cities/admin"
                link={false}
              >
                <TextField source="locName" />
              </ReferenceField>
              <ReferenceField
                label="Ending Point"
                source="trips[0].endingPoint"
                reference="cities/admin"
                link={false}
              >
                <TextField source="locName" />
              </ReferenceField>
              <DateField
                showTime
                options={{ hour12: true, hour: "2-digit", minute: "2-digit" }}
                source="trips[0].depTime"
                label="Dep Time"
              />
              <DateField
                showTime
                options={{ hour12: true, hour: "2-digit", minute: "2-digit" }}
                source="trips[0].arrTime"
                label="Arr Time"
              />
              <NumberField source="trips[0].fare" label="Fare" />
              <ArrayChipField
                source="trips[0].boardingPoints"
                label="Boarding Point"
              />
              <ArrayChipField
                source="trips[0].droppingPoints"
                label="Dropping Point"
              />
              <ArrayChipField source="trips[0].route" label="Route" />
              {controllerProps.record && controllerProps.record.trips[1] && (
                <p style={titleStyle}>Return Journey</p>
              )}
              {controllerProps.record && controllerProps.record.trips[1] && (
                <ReferenceField
                  label="Starting Point"
                  source="trips[1].startingPoint"
                  reference="cities/admin"
                  link={false}
                >
                  <TextField source="locName" />
                </ReferenceField>
              )}
              {controllerProps.record && controllerProps.record.trips[1] && (
                <ReferenceField
                  label="Ending Point"
                  source="trips[1].endingPoint"
                  reference="cities/admin"
                  link={false}
                >
                  <TextField source="locName" />
                </ReferenceField>
              )}
              {controllerProps.record && controllerProps.record.trips[1] && (
                <DateField
                  showTime
                  options={{ hour12: true, hour: "2-digit", minute: "2-digit" }}
                  source="trips[0].depTime"
                  label="Dep Time"
                />
              )}
              {controllerProps.record && controllerProps.record.trips[1] && (
                <DateField
                  showTime
                  options={{ hour12: true, hour: "2-digit", minute: "2-digit" }}
                  source="trips[0].arrTime"
                  label="Arr Time"
                />
              )}
              {controllerProps.record && controllerProps.record.trips[1] && (
                <NumberField source="trips[0].fare" label="Fare" />
              )}
              {controllerProps.record && controllerProps.record.trips[1] && (
                <ArrayChipField
                  source="trips[0].boardingPoints"
                  label="Boarding Point"
                />
              )}
              {controllerProps.record && controllerProps.record.trips[1] && (
                <ArrayChipField
                  source="trips[0].droppingPoints"
                  label="Dropping Point"
                />
              )}
              {controllerProps.record && controllerProps.record.trips[1] && (
                <ArrayChipField source="trips[0].route" label="Route" />
              )}
            </Tab>

            <Tab label="Seat">
              <NumberField source="seat" />
              <SeatsField source="seats" />
            </Tab>

            <Tab label="Images">
              <ImagesField source="images" />
            </Tab>

            <Tab label="Miscellaneous">
              <TextField label="Created By" source="user.name" />
              <TextField label="User email" source="user.email" />
              <ReferenceField
                label="User Id"
                source="user.id"
                reference="users"
              >
                <TextField source="id" />
              </ReferenceField>
              <DateField source="createdAt" />
              <DateField source="updatedAt" />
            </Tab>
          </TabbedShowLayout>
        </ShowView>
      )}
    </ShowController>
  );
};

export default BusShow;
