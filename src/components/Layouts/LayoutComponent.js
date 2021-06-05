import { Layout } from "react-admin";
import AppBarComponent from "./AppBarComponent";
import MenuComponent from "./MenuComponent";
import { makeStyles } from "@material-ui/core/styles";

const useLayOutStyle = makeStyles({
  root: {
    minWidth: 0,
  },
  content: {
    minWidth: 0,
  },
});

const LayoutComponent = (props) => {
  const classes = useLayOutStyle();
  return (
    <Layout
      classes={classes}
      {...props}
      appBar={AppBarComponent}
      menu={MenuComponent}
    />
  );
};

export default LayoutComponent;
