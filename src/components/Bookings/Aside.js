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
      <p>Starting Points:</p>
      <ul>
        {data.startingPoints.map((sp, i) => (
          <li key={i}>{sp}</li>
        ))}
      </ul>
      <p>Ending Points:</p>
      <ul>
        {data.endingPoints.map((ep, i) => (
          <li key={i}>{ep}</li>
        ))}
      </ul>
      <p>from: {data.from}</p>
      <p>to: {data.to}</p>
      <p>fare: {data.fare}</p>
      <p>
        Departure Time:{" "}
        {new Intl.DateTimeFormat("default", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "Asia/Dhaka",
        }).format(new Date(data.depTime))}
      </p>
      <p>
        Arrival Time:{" "}
        {new Intl.DateTimeFormat("default", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "Asia/Dhaka",
        }).format(new Date(data.arrTime))}
      </p>
      <p>Seats</p>
      <SeatsField record={{ seats: data.seats }} />
    </div>
  );
};

export default Aside;
