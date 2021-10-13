import { useQueryWithStore, Error } from "react-admin";
import Skeleton from "@material-ui/lab/Skeleton";
import SeatsField from "../CustomFields/SeatsField";

const Aside = ({ formValues }) => {
  const { loaded, error, data } = useQueryWithStore({
    type: "getOne",
    resource: "buses",
    payload: { id: formValues.bus },
  });
  if (!loaded) {
    return <Skeleton variant="rect" width={200} height={500} />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div style={{ width: 200, margin: "1em" }}>
      <p>Bus name: {data.name}</p>
      <p>Model: {data.model}</p>
      {data.trips.map((trip, i) => (
        <>
          {i === 0 && <h3>Journey</h3>}
          {i === 1 && <h3>Return</h3>}
          <p>fare: {trip.fare}</p>
          <p>
            Departure Time:{" "}
            {trip.depTime &&
              new Intl.DateTimeFormat("default", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
                timeZone: "Asia/Dhaka",
              }).format(new Date(trip.depTime))}
          </p>
          <p>
            Arrival Time:{" "}
            {trip.arrTime &&
              new Intl.DateTimeFormat("default", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
                timeZone: "Asia/Dhaka",
              }).format(new Date(trip.arrTime))}
          </p>
        </>
      ))}
      <p>Seats</p>
      <SeatsField record={{ seats: data.seats }} />
    </div>
  );
};

export default Aside;
