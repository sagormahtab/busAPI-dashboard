import React from "react";
import { useGetManyReference } from "react-admin";

const GetBookingReference = ({ _id }) => {
  const { data, ids, loading, error } = useGetManyReference(
    "bookings",
    "_id",
    _id,
    { page: 1, perPage: 10 },
    { field: "createdAt", order: "DESC" },
    {},
    "bookings"
  );
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  return (
    <ul>
      {ids.map((id) => (
        <li key={id}>{data[id]._id}</li>
      ))}
    </ul>
  );
};

export default GetBookingReference;
