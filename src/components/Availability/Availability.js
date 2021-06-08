import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { Title } from "react-admin";
import { FormControl, Button, Grid, Paper, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import { Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: "0.7rem 1.5rem",
    marginBottom: theme.spacing(1),
  },
  fieldLabel: {
    color: "rgba(0, 0, 0, 0.54)",
  },
}));

const Availability = () => {
  const classes = useStyles();
  const [bus, setBus] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [buses, setBuses] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const { token } = JSON.parse(localStorage.getItem("auth"));

  function getBuses() {
    return axios.get(
      "https://bus-api-sm.herokuapp.com/api/v1/availability/bus-ids",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  const searchFormHandler = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://bus-api-sm.herokuapp.com/api/v1/availability?bus=${bus}&date=${JSON.parse(
          JSON.stringify(date)
        )}&time=${JSON.parse(JSON.stringify(time))}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(function (response) {
        setSearchResult(response.data[0]);
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else if (error.request) {
          alert(error.request);
        } else {
          alert("Error", error.message);
        }
      });
  };

  useEffect(() => {
    getBuses()
      .then(function (result) {
        if (result.data[0]) {
          setBuses(result.data[0].data);
        }
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else if (error.request) {
          alert(error.request);
        } else {
          alert("Error", error.message);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card style={{ marginTop: "2rem" }}>
      <Title title="Availability" />
      <CardHeader title="Check the availability of a bus" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <form onSubmit={searchFormHandler}>
              <FormControl variant="filled" className={classes.formControl}>
                <Autocomplete
                  id="bus-select"
                  options={buses ? buses : []}
                  noOptionsText="Loading"
                  getOptionLabel={(launch) => launch.id}
                  getOptionSelected={(option, value) => option.id === value.id}
                  style={{ width: 300 }}
                  onChange={(e, value) => setBus(value.id)}
                  renderInput={(params) => (
                    <TextField {...params} label="Bus" variant="outlined" />
                  )}
                />
              </FormControl>
              <br />

              <DatePicker
                value={date}
                variant="inline"
                autoOk
                format="dd/MM/yyyy"
                label="Date"
                onChange={setDate}
                animateYearScrolling
                required={true}
              />
              <br />
              <TimePicker
                value={time}
                variant="inline"
                autoOk
                label="Time"
                onChange={setTime}
                required={true}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!bus}
                style={{ marginTop: "1.2rem" }}
              >
                Search
              </Button>
            </form>
          </Grid>
          <Grid item md={6}>
            {searchResult ? (
              <Paper className={classes.paper}>
                <h2>Search Result</h2>
                <small className={classes.fieldLabel}>Bus ID</small>
                <p>{searchResult.bus}</p>
                <small className={classes.fieldLabel}>Route</small>
                <p>{searchResult.route}</p>
                <small className={classes.fieldLabel}>Date</small>
                <p>
                  {new Intl.DateTimeFormat("default", {
                    dateStyle: "long",
                    timeZone: "Asia/Dhaka",
                  }).format(new Date(searchResult.date))}
                </p>
                <small className={classes.fieldLabel}>Time</small>
                <p>
                  {new Intl.DateTimeFormat("default", {
                    hour12: true,
                    timeStyle: "medium",
                    timeZone: "Asia/Dhaka",
                  }).format(new Date(searchResult.time))}
                </p>
                <small className={classes.fieldLabel}>Total Seat</small>
                <p>{searchResult.totalSeat}</p>
                <small className={classes.fieldLabel}>Seat Booked</small>
                <p>{searchResult.seatBooked}</p>
                <small className={classes.fieldLabel}>Booked Seats</small>
                <ul>
                  {searchResult.seats.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      style={{ marginRight: "0.3rem" }}
                    />
                  ))}
                </ul>
                <small className={classes.fieldLabel}>Remaining</small>
                <p>{searchResult.remaining}</p>
                <small className={classes.fieldLabel}>Bookings</small>
                <ul style={{ listStyleType: "none" }}>
                  {searchResult.bookings.map((booking, i) => (
                    <li key={i}>
                      <a
                        href={`#/bookings/${booking}/show`}
                        style={{ color: "#3f51b5", textDecoration: "none" }}
                      >
                        {booking}
                      </a>
                    </li>
                  ))}
                </ul>
              </Paper>
            ) : (
              searchResult !== null && (
                <Paper className={classes.paper}>
                  <h4>No Booking Found</h4>
                  <p>The Seats are free to book</p>
                </Paper>
              )
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Availability;
