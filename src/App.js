import { fetchUtils, Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import TourList from "./components/TourList";
import TourEdit from "./components/TourEdit";
import TourCreate from "./components/TourCreate";
import authProvider from "./components/authProvider";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";

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
const App = () => (
  <Admin
    loginPage={LoginPage}
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
  >
    <Resource
      name="buses"
      list={TourList}
      edit={TourEdit}
      create={TourCreate}
    />
  </Admin>
);
export default App;
