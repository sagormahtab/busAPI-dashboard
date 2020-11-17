import { Layout } from "react-admin";
import AppBarComponent from "./AppBarComponent";

const LayoutComponent = (props) => (
  <Layout {...props} appBar={AppBarComponent} />
);

export default LayoutComponent;
