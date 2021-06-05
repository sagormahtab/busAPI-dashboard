import React from "react";
import { useGetMany, Link } from "react-admin";
import LinearProgress from "@material-ui/core/LinearProgress";

const ShowReferenceCabins = ({ source, record = {} }) => {
  const { data, loading, error } = useGetMany("cabins", record.cabins);
  if (loading) {
    return <LinearProgress />;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  return (
    <div>
      {data.map((cabin) => (
        <Link to={`/cabins/${cabin.id}/show`}>
          <p key={cabin.id}>{cabin.type}</p>
        </Link>
      ))}
    </div>
  );
};
ShowReferenceCabins.defaultProps = {
  addLabel: true,
};

export default ShowReferenceCabins;
