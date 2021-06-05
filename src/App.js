import { Admin, Resource } from "react-admin";
import BusList from "./components/Buses/BusList";
import BusShow from "./components/Buses/BusShow";
import BusEdit from "./components/Buses/BusEdit";
import BusCreate from "./components/Buses/BusCreate";
import authProvider from "./components/Auth/authProvider";
import LoginPage from "./components/Layouts/LoginPage";
import customRoutes from "./components/customRoutes";
import LayoutComponent from "./components/Layouts/LayoutComponent";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import UserList from "./components/Users/UserList";
import UserEdit from "./components/Users/UserEdit";
import BookingList from "./components/Bookings/BookingList";
// import dataProvider from "./components/dataProvider";
import { People, DirectionsBus } from "@material-ui/icons";
import Dashboard from "./components/Layouts/Dashboard/Dashboard";
import extendedDataProvider from "./components/extendedDataProvider";
import BookingShow from "./components/Bookings/BookingShow";
import BookingEdit from "./components/Bookings/BookingEdit";
import BookingCreate from "./components/Bookings/BookingCreate";

const messages = {
  en: englishMessages,
};

const i18nProvider = polyglotI18nProvider((locale) => messages[locale], "en", {
  allowMissing: true,
});

const App = () => {
  return (
    <>
      <Admin
        loginPage={LoginPage}
        dashboard={Dashboard}
        dataProvider={extendedDataProvider}
        authProvider={authProvider}
        customRoutes={customRoutes}
        layout={LayoutComponent}
        locale="en"
        i18nProvider={i18nProvider}
      >
        {(permissions) => [
          <Resource
            name="buses"
            show={BusShow}
            list={BusList}
            edit={BusEdit}
            create={BusCreate}
            icon={DirectionsBus}
          />,
          permissions === "admin" ? (
            <Resource
              name="users"
              list={UserList}
              edit={UserEdit}
              icon={People}
            />
          ) : null,
          ["admin", "operator"].includes(permissions) ? (
            <Resource
              name="bookings"
              list={BookingList}
              show={BookingShow}
              edit={BookingEdit}
              create={BookingCreate}
            />
          ) : null,
        ]}
      </Admin>
    </>
  );
};
export default App;
