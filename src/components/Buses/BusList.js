import React, { cloneElement } from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  NumberField,
  EditButton,
  DeleteButton,
  ShowButton,
  Filter,
  TextInput,
  useListContext,
  TopToolbar,
  sanitizeListRestProps,
  CreateButton,
  ExportButton,
  usePermissions,
  ReferenceField,
} from "react-admin";
import DepTime from "./Show/DepTime";
import ArrTime from "./Show/ArrTime";
import StartingPoint from "./Show/StartingPoint";
import EndingPoint from "./Show/EndingPoint";

const BusFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <TextInput label="Name" source="name" defaultValue="" />
    <TextInput label="From" source="from" defaultValue="" />
    <TextInput label="To" source="to" defaultValue="" />
  </Filter>
);

const BusListActions = (props) => {
  const { className, permissions, exporter, filters, maxResults, ...rest } =
    props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    basePath,
    showFilter,
    total,
  } = useListContext();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: "button",
        })}
      <CreateButton basePath={basePath} />
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filterValues={filterValues}
        maxResults={maxResults}
      />
    </TopToolbar>
  );
};

// const ArrayList = (fieldName) => {
//   return (<>

//   </>)
// }

const BusList = ({ permissions, ...props }) => {
  const { loaded, permissions: permission } = usePermissions();
  return (
    loaded &&
    (["admin", "operator"].includes(permission) ? (
      <List
        {...props}
        filters={<BusFilter />}
        actions={<BusListActions permissions={permissions} {...props} />}
        sort={{ field: "createdAt", order: "DESC" }}
      >
        <Datagrid>
          <DateField source="createdAt" />
          <BooleanField source="AC" />
          <TextField source="name" />
          <TextField source="model" />
          <StartingPoint source="trips" />
          {/* <ReferenceField
            label="Starting Point"
            source="trips[0].startingPoint"
            reference="cities/admin"
            link={false}
          >
            <TextField source="locName" />
          </ReferenceField> */}
          <EndingPoint source="endingPoint" />
          <DepTime source="depTime" />
          <ArrTime source="arrTime" />
          <NumberField source="seat" />
          <NumberField source="fare" />
          <TextField source="id" />
          <ShowButton />
          <EditButton source="/buses" />
          <DeleteButton source="/buses" />
        </Datagrid>
      </List>
    ) : (
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <h1>Fill up the form from the link on the dashboard</h1>
        <p>After that you'll be able to add your bus informations here</p>
      </div>
    ))
  );
};

export default BusList;
