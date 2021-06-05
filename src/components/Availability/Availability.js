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
  const [launch, setLaunch] = useState(null);
  const [cabin, setCabin] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [launches, setLaunches] = useState(null);
  const [cabins, setCabins] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const { token } = JSON.parse(localStorage.getItem("auth"));

  function getLaunches() {
    return axios.get(
      "https://launch-api-sm.herokuapp.com/api/v1/availability/launch-ids",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  function getCabins() {
    return axios.get(
      `https://launch-api-sm.herokuapp.com/api/v1/availability/${launch}/cabin-ids`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  const searchFormHandler = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://launch-api-sm.herokuapp.com/api/v1/availability?launch=${launch}&cabin=${cabin}&date=${JSON.parse(
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
    getLaunches()
      .then(function (result) {
        if (result.data[0]) {
          setLaunches(result.data[0].data);
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

  useEffect(() => {
    if (!launch) return;

    getCabins()
      .then(function (result) {
        if (result.data) {
          setCabins(result.data);
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
  }, [launch]);

  return (
    <Card style={{ marginTop: "2rem" }}>
      <Title title="Availability" />
      <CardHeader title="Check the availability of a cabin" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <form onSubmit={searchFormHandler}>
              <FormControl variant="filled" className={classes.formControl}>
                <Autocomplete
                  id="launch-select"
                  options={launches ? launches : []}
                  noOptionsText="Loading"
                  getOptionLabel={(launch) => launch.name}
                  getOptionSelected={(option, value) =>
                    option.name === value.name
                  }
                  style={{ width: 300 }}
                  onChange={(e, value) => setLaunch(value.id)}
                  renderInput={(params) => (
                    <TextField {...params} label="Launch" variant="outlined" />
                  )}
                />
              </FormControl>

              <br />
              <FormControl variant="filled" className={classes.formControl}>
                <Autocomplete
                  id="cabin-select"
                  options={cabins ? cabins : []}
                  noOptionsText="Loading"
                  getOptionLabel={(cabin) => cabin.type}
                  getOptionSelected={(option, value) =>
                    option.type === value.type
                  }
                  style={{ width: 300 }}
                  onChange={(e, value) => setCabin(value.id)}
                  renderInput={(params) => (
                    <TextField {...params} label="Cabin" variant="outlined" />
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
                disabled={!(launch && cabin)}
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
                <small className={classes.fieldLabel}>Launch ID</small>
                <p>{searchResult.launch}</p>
                <small className={classes.fieldLabel}>Cabin ID</small>
                <p>{searchResult.cabin}</p>
                <small className={classes.fieldLabel}>Cabin Type</small>
                <p>{searchResult.type}</p>
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
                    timeStyle: "long",
                    timeZone: "Asia/Dhaka",
                  }).format(new Date(searchResult.time))}
                </p>
                <small className={classes.fieldLabel}>Total</small>
                <p>{searchResult.total}</p>
                <small className={classes.fieldLabel}>Booked</small>
                <p>{searchResult.booked}</p>
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
                  <p>The cabins are free to book</p>
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
