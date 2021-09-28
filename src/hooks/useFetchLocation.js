import { useEffect, useState } from "react";
import axios from "axios";

function useFetchLocation(url) {
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        const formattedLocations = response.data.map((loc) => {
          const filteredLocationsField = {
            locId: loc.locId,
            locName: loc.locName,
            countryCode: loc.countryCode,
          };
          return {
            id: JSON.stringify(filteredLocationsField),
            name: loc.locName,
          };
        });
        setLocations(formattedLocations);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { locations, loading, error };
}

export default useFetchLocation;
