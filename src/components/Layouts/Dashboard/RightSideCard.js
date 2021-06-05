import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import InsertChartIcon from "@material-ui/icons/InsertChartOutlined";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
}));

const RightSideCard = ({ className, ...rest }) => {
  const classes = useStyles();
  let data;
  let title;
  if (rest.busNum) {
    data = rest.busNum.toString();
    title = "TOTAL BUSES";
  }
  if (rest.agentPercent) {
    data = rest.agentPercent.toString();
    title = "OUR PERCENTAGE";
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title ? (
                title
              ) : (
                <Skeleton style={{ width: 100 }} animation="wave" />
              )}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {data ? (
                data
              ) : (
                <Skeleton style={{ width: 100 }} animation="wave" />
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

RightSideCard.propTypes = {
  className: PropTypes.string,
};

export default RightSideCard;
