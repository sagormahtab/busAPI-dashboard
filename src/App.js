import { Admin, Resource } from "react-admin";
import TourList from "./components/Tours/TourList";
import TourShow from "./components/Tours/TourShow";
import TourEdit from "./components/Tours/TourEdit";
import TourCreate from "./components/Tours/TourCreate";
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
import { People, DirectionsBus, CheckCircle } from "@material-ui/icons";
import Dashboard from "./components/Layouts/Dashboard";
import extendedDataProvider from "./components/extendedDataProvider";
import AvailabilityList from "./components/Availability/AvailabilityList";
import AvailabilityShow from "./components/Availability/AvailabilityShow";
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
        <Resource
          name="buses"
          show={TourShow}
          list={TourList}
          edit={TourEdit}
          create={TourCreate}
          icon={DirectionsBus}
        />
        <Resource name="users" list={UserList} edit={UserEdit} icon={People} />
        <Resource
          name="bookings"
          list={BookingList}
          show={BookingShow}
          edit={BookingEdit}
          create={BookingCreate}
        />
        <Resource
          name="availability"
          options={{ label: "Availability" }}
          list={AvailabilityList}
          show={AvailabilityShow}
          icon={CheckCircle}
        />
      </Admin>
    </>
  );
};
export default App;
