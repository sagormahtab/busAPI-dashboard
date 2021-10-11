import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from "react-admin";
import { BUS_API_SERVER } from "../constants/index";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const { token } = JSON.parse(localStorage.getItem("auth"));
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider(`${BUS_API_SERVER}/api/v1`, httpClient);

const apiUrl = `${BUS_API_SERVER}/api/v1`;

const extendedDataProvider = {
  ...dataProvider,
  create: (resource, params) => {
    if (!["buses"].includes(resource)) {
      return dataProvider.create(resource, params);
    }

    let formData = new FormData();
    for (const key of Object.keys(params.data)) {
      if (key === "images") {
        params.data[key].forEach((elm, i) => {
          if (typeof elm === "string") {
            formData.append("prevImg", elm);
          } else {
            formData.append(key, elm.rawFile);
          }
        });
      } else {
        formData.append(key, JSON.stringify(params.data[key]));
      }
    }

    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: formData,
    }).then(({ json }) => {
      return {
        data: json,
      };
    });
  },
  update: (resource, params) => {
    if (!["buses"].includes(resource)) {
      return dataProvider.update(resource, params);
    }

    let formData = new FormData();
    let prevImages = [];
    for (const key of Object.keys(params.data)) {
      if (key === "images") {
        params.data[key].forEach((elm, i) => {
          if (typeof elm === "string") {
            prevImages.push(elm);
          } else {
            formData.append(key, elm.rawFile);
          }
        });
      } else {
        formData.append(key, JSON.stringify(params.data[key]));
      }
    }

    if (prevImages.length > 0) {
      formData.append("prevImg", JSON.stringify(prevImages));
    }

    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: formData,
    }).then(({ json }) => {
      return {
        data: json,
      };
    });
  },
};

export default extendedDataProvider;
