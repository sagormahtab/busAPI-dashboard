import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  colors,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { Fragment } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const PopularReport = ({ className, totalBookings, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  let labels;
  let datas;
  let title;

  function CardContentData({ popularSth }) {
    return (
      <Fragment>
        {popularSth && popularSth.length === 0 ? (
          <Fragment>
            <p style={{ textAlign: "center" }}>No Bookings!</p>
          </Fragment>
        ) : popularSth ? (
          <Fragment>
            <Box height={400} position="relative">
              <Doughnut data={data} options={options} />
              <p style={{ textAlign: "center", color: "gray" }}>
                <small>
                  Data are in <strong>%</strong>
                </small>
              </p>
            </Box>
          </Fragment>
        ) : (
          <Skeleton variant="rect" height={400} animation="wave" />
        )}
      </Fragment>
    );
  }

  if (rest.popularBus) {
    title = "Popular Buses";
    let totalPopularBookings = 0;
    rest.popularBus.forEach((bus) => {
      totalPopularBookings += bus.bookings;
    });

    const otherBookings = totalBookings - totalPopularBookings;
    let otherBookingsPercent =
      Math.round((otherBookings / totalBookings) * 100 * 100) / 100;

    rest.popularBus.forEach((bus) => {
      let ratio = bus.bookings / totalBookings;
      let percent = ratio * 100;
      bus.percent = Math.round(percent * 100) / 100;
    });

    labels = rest.popularBus.map((bus) => bus.bus);
    labels.push("Others");
    datas = rest.popularBus.map((bus) => bus.percent);
    datas.push(otherBookingsPercent);
  }

  if (rest.popularCabin) {
    title = "Popular Cabins";
    let totalPopularBookings = 0;
    rest.popularCabin.forEach((rm) => {
      totalPopularBookings += rm.bookings;
    });

    const otherBookings = totalBookings - totalPopularBookings;
    let otherBookingsPercent =
      Math.round((otherBookings / totalBookings) * 100 * 100) / 100;

    rest.popularCabin.forEach((rm) => {
      let ratio = rm.bookings / totalBookings;
      let percent = ratio * 100;
      rm.percent = Math.round(percent * 100) / 100;
    });

    labels = rest.popularCabin.map((rm) => rm.cabin);
    labels.push("Others");
    datas = rest.popularCabin.map((rm) => rm.percent);
    datas.push(otherBookingsPercent);
  }

  const data = {
    datasets: [
      {
        data: datas,
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.cyan[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: labels,
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: true,
      position: "bottom",
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        {rest.popularBus ? (
          <CardContentData popularSth={rest.popularBus} />
        ) : (
          <CardContentData popularSth={rest.popularCabin} />
        )}
      </CardContent>
    </Card>
  );
};

PopularReport.propTypes = {
  className: PropTypes.string,
};

export default PopularReport;
