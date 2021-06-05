import * as React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Container, Box, LinearProgress, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { defaultTheme, Link } from "react-admin";
import { useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  progress: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const ConfirmUserPage = ({ theme }) => {
  const { token } = useParams();
  const [dataLoaded, setDataLoaded] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`https://bus-api-sm.herokuapp.com/api/v1/users/confirmUser/${token}`)
      .then((res) => {
        setDataLoaded(true);
      })
      .catch((error) => {
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

  const h1Style = {
    color: "white",
    marginTop: "0",
    paddingTop: "1.5rem",
    textAlign: "center",
  };

  return (
    <ThemeProvider theme={createMuiTheme(defaultTheme)}>
      {dataLoaded ? (
        <Box
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)",
            height: "100vh",
          }}
        >
          <Container fixed style={{ paddingTop: "5rem" }}>
            <Paper className={classes.paper}>
              <h1 style={h1Style}>
                <span style={{ color: "#30dd89" }}>Congratulations!</span>
              </h1>
              <h3
                style={{ color: "black", textAlign: "center", marginTop: "0" }}
              >
                Your account is activated. <Link to="/login">Login</Link> to
                continue
              </h3>
            </Paper>
          </Container>
        </Box>
      ) : (
        <div className={classes.progress}>
          <LinearProgress />
        </div>
      )}
    </ThemeProvider>
  );
};

export default ConfirmUserPage;
