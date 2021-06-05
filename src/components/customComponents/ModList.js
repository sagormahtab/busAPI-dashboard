import React from "react";
import { List } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    minWidth: "fit-content",
  },
});

const ModList = (props) => {
  const classes = useStyles();
  return <List className={classes.list} {...props} />;
};

export default ModList;
