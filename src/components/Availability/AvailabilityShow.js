import * as React from "react";
import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  DateField,
  NumberField,
  TopToolbar,
  ListButton,
  ReferenceField,
  ReferenceArrayField,
  ShowButton,
  Datagrid,
} from "react-admin";
import SeatsField from "../CustomFields/SeatsField";

const AvailabilityShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

const TourShow = (props) => (
  <Show {...props} actions={<AvailabilityShowActions />}>
    <TabbedShowLayout>
      <Tab label="General">
        <TextField label="Bus Id" source="bus" />
        <ReferenceField label="Bus Name" source="bus" reference="buses">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="route" />
        <DateField source="date" options={{ dateStyle: "full" }} />
        <DateField
          label="Departure Time"
          showTime
          options={{ hour12: true, hour: "2-digit", minute: "2-digit" }}
          source="time"
        />
        <SeatsField label="Booked Seats" source="seats" />
        <NumberField source="totalSeat" />
        <NumberField source="booked" />
        <NumberField source="remaining" />
        <TextField source="id" />
      </Tab>
      <Tab label="Bookings" path="bookings">
        <ReferenceArrayField
          addLabel={false}
          reference="bookings"
          source="bookings"
          sort={{ field: "createdAt", order: "DESC" }}
        >
          <Datagrid>
            <DateField source="createdAt" />
            <TextField source="email" />
            <TextField source="name" />
            <NumberField source="price" />
            <DateField source="date" />
            <DateField
              source="time"
              showTime
              options={{ hour12: true, hour: "2-digit", minute: "2-digit" }}
            />
            <TextField source="id" />
            <ShowButton />
          </Datagrid>
        </ReferenceArrayField>
        {/* <AddCommentButton /> */}
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default TourShow;
