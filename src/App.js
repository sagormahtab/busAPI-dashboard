import { fetchUtils, Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import TourList from "./components/Tours/TourList";
import TourEdit from "./components/Tours/TourEdit";
import TourCreate from "./components/Tours/TourCreate";
import authProvider from "./components/Auth/authProvider";
import Dashboard from "./components/Layouts/Dashboard";
import LoginPage from "./components/Layouts/LoginPage";
import customRoutes from "./components/customRoutes";
import LayoutComponent from "./components/Layouts/LayoutComponent";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import UserList from "./components/Users/UserList";
import UserEdit from "./components/Users/UserEdit";
// import dataProvider from "./components/dataProvider";
import { People, DirectionsBus } from "@material-ui/icons";

const messages = {
  en: englishMessages,
};

const i18nProvider = polyglotI18nProvider((locale) => messages[locale], "en", {
  allowMissing: true,
});

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
const App = () => {
  return (
    <>
      <Admin
        loginPage={LoginPage}
        dataProvider={dataProvider}
        authProvider={authProvider}
        dashboard={Dashboard}
        customRoutes={customRoutes}
        layout={LayoutComponent}
        locale="en"
        i18nProvider={i18nProvider}
      >
        <Resource
          name="buses"
          list={TourList}
          edit={TourEdit}
          create={TourCreate}
          icon={DirectionsBus}
        />
        <Resource name="users" list={UserList} edit={UserEdit} icon={People} />
      </Admin>
    </>
  );
};
export default App;
