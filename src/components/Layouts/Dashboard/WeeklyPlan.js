import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(() => ({
  root: {},
}));

const WeeklyPlan = ({ className, weeklyPlan, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  let data;

  if (weeklyPlan) {
    const bookingDatas = weeklyPlan.map((dt) => dt.bookings);
    const transactionDatas = weeklyPlan.map((dt) => dt.transaction);
    const labels = weeklyPlan.map((dt) => dt.date);
    data = {
      datasets: [
        {
          backgroundColor: colors.indigo[500],
          data: bookingDatas,
          label: "Bookings",
        },
        {
          backgroundColor: colors.purple[500],
          data: transactionDatas,
          label: "Transactions",
        },
      ],
      labels: labels,
    };
  }

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
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
      <CardHeader action={<p>Last 7 days</p>} title="Weekly Reports" />
      <Divider />
      <CardContent>
        {weeklyPlan ? (
          <Box height={400} position="relative">
            <Bar data={data} options={options} />
          </Box>
        ) : (
          <Skeleton variant="rect" height={400} animation="wave" />
        )}
      </CardContent>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

WeeklyPlan.propTypes = {
  className: PropTypes.string,
};

export default WeeklyPlan;
