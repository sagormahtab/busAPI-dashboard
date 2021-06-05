import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  // Box,
  Card,
  CardContent,
  Grid,
  // LinearProgress,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56,
  },
}));

const ProfitsCard = ({ className, profit, ...rest }) => {
  const classes = useStyles();
  // Why? BC fuck js. value 0 will be false in the JSX
  if (profit === 0) {
    profit = profit.toString();
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              PROFIT
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {profit ? (
                <span>{profit} &#2547;</span>
              ) : (
                <Skeleton animation="wave" />
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box mt={3}>
          <LinearProgress value={75.5} variant="determinate" />
        </Box> */}
      </CardContent>
    </Card>
  );
};

ProfitsCard.propTypes = {
  className: PropTypes.string,
};

export default ProfitsCard;
