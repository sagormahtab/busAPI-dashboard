import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from "react-admin";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const { token } = JSON.parse(localStorage.getItem("auth"));
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider(
  "http://localhost:4200/api/v1",
  httpClient
);

const apiUrl = "http://localhost:4200/api/v1";

const extendedDataProvider = {
  ...dataProvider,
  getOne: (resource, params) => {
    if (resource !== "availability") {
      // fallback to the default implementation
      return dataProvider.getOne(resource, params);
    }
    return fetchUtils.fetchJson(`${apiUrl}/${resource}`).then(({ json }) => ({
      data: json[params.id],
    }));
  },
};

export default extendedDataProvider;
