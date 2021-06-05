import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Title } from "react-admin";
import { usePermissions } from "react-admin";
import TransactionsCard from "./TransactionsCard";
import WeeklyPlan from "./WeeklyPlan";
import ProfitsCard from "./ProfitsCard";
import BookingsCard from "./BookingsCard";
import RightSideCard from "./RightSideCard";
import PopularReport from "./PopularReport";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const { loaded, permissions } = usePermissions();
  const [stats, setStats] = useState(null);
  const [showContent, setShowContent] = useState(true);
  const { token } = JSON.parse(localStorage.getItem("auth"));
  const authHeaders = {
    "Content-type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (!["user", undefined].includes(permissions)) {
      axios
        .get("https://bus-api-sm.herokuapp.com/api/v1/bookings/booking-stats", {
          headers: authHeaders,
        })
        .then((results) => {
          setStats(results.data.data[0]);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.status === "fail") {
              setShowContent(false);
            }
          } else if (err.request) {
            alert(err.request);
          } else {
            alert("ERROR", err.message);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions]);

  return loaded ? (
    <Card style={{ marginTop: "2rem" }}>
      <Title title="Dashboard" />
      <CardHeader
        title={`${permissions === "user" ? "Welcome" : "This Month"}`}
      />
      {showContent ? (
        permissions === "user" ? (
          <CardContent>
            <p>
              You need to fill out a Google form with all the necessary document
              images for getting started with us.
            </p>
            <a
              href="https://forms.gle/4pgpM4vFe6X7SY8UA"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained" color="primary">
                Fill up the Form
              </Button>
            </a>
          </CardContent>
        ) : permissions === "admin" ? (
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TransactionsCard
                  transaction={stats && stats.monthlyPlan[0].transaction}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <BookingsCard
                  bookings={stats && stats.monthlyPlan[0].bookings}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <ProfitsCard profit={stats && stats.monthlyPlan[0].profit} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <RightSideCard busNum={stats && stats.monthlyPlan[0].busNum} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <WeeklyPlan weeklyPlan={stats && stats.weeklyPlan} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <PopularReport
                  popularBus={stats && stats.popularBus}
                  totalBookings={stats && stats.monthlyPlan[0].bookings}
                />
              </Grid>
            </Grid>
          </CardContent>
        ) : (
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TransactionsCard
                  transaction={stats && stats.monthlyPlan[0].transaction}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <BookingsCard
                  bookings={stats && stats.monthlyPlan[0].bookings}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <ProfitsCard profit={stats && stats.monthlyPlan[0].profit} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <RightSideCard
                  agentPercent={stats && stats.monthlyPlan[0].agentPercent}
                />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <WeeklyPlan weeklyPlan={stats && stats.weeklyPlan} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <PopularReport
                  totalBookings={stats && stats.monthlyPlan[0].bookings}
                />
              </Grid>
            </Grid>
          </CardContent>
        )
      ) : (
        <CardContent>
          <p>
            Create a launch from the launches menu to get your dashboard stats!
          </p>
        </CardContent>
      )}
    </Card>
  ) : null;
};

export default Dashboard;
