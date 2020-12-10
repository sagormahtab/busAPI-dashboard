import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

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
  getList: (resource, params) => {
    if (resource === "availability") {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      let query = {
        ...fetchUtils.flattenObject(params.filter),
        _sort: field,
        _order: order,
        _start: (page - 1) * perPage,
        _end: page * perPage,
      };
      query = stringify(query);
      localStorage.setItem("avQuery", JSON.stringify(query));
    }
    return dataProvider.getList(resource, params);
  },
  getOne: (resource, params) => {
    if (resource !== "availability") {
      // fallback to the default implementation
      return dataProvider.getOne(resource, params);
    }

    const options = {};
    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" });
    }
    const { token } = JSON.parse(localStorage.getItem("auth"));
    const avQuery = JSON.parse(localStorage.getItem("avQuery"));
    options.headers.set("Authorization", `Bearer ${token}`);

    return fetchUtils
      .fetchJson(`${apiUrl}/${resource}?${avQuery}`, options)
      .then(({ json }) => ({
        data: json[params.id],
      }));
  },
};

export default extendedDataProvider;
