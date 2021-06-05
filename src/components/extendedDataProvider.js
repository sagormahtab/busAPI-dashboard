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
  "https://bus-api-sm.herokuapp.com/api/v1",
  httpClient
);

const apiUrl = "https://bus-api-sm.herokuapp.com/api/v1";

const extendedDataProvider = {
  ...dataProvider,
  getList: (resource, params) => {
    if (resource !== "availability") {
      return dataProvider.getList(resource, params);
    }

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

    const options = {};
    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" });
    }
    const { token } = JSON.parse(localStorage.getItem("auth"));
    options.headers.set("Authorization", `Bearer ${token}`);

    return fetchUtils
      .fetchJson(`${apiUrl}/${resource}?${query}`, options)
      .then(({ headers, json }) => {
        if (!headers.has("x-total-count")) {
          throw new Error(
            "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
          );
        }
        localStorage.setItem("avList", JSON.stringify(json));
        return {
          data: json,
          total: parseInt(headers.get("x-total-count").split("/").pop(), 10),
        };
      });
  },
  getOne: (resource, params) => {
    if (resource !== "availability") {
      // fallback to the default implementation
      return dataProvider.getOne(resource, params);
    }

    const getAvList = (id) => {
      return new Promise((resolve, reject) => {
        const avList = JSON.parse(localStorage.getItem("avList"));
        resolve(avList[id]);
      });
    };

    return getAvList(params.id).then((json) => ({ data: json }));
  },
};

export default extendedDataProvider;
