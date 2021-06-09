import * as React from "react";
import { useState } from "react";
import { useNotify, Notification, defaultTheme } from "react-admin";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
  Paper,
  Grid,
  Box,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = ({ theme }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // const [role, setRole] = useState("");
  // const login = useLogin();
  const notify = useNotify();
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: "post",
      url: "https://bus-api-sm.herokuapp.com/api/v1/users/forgotPassword",
      data: {
        email,
      },
    })
      .then((data) => {
        notify("Check your email to reset your password");
        clearForm();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          alert(error.response.data.message);
        } else if (error.request) {
          alert(error.request);
        } else {
          alert("Error", error.message);
        }
      });
  };

  const clearForm = () => {
    setEmail("");
  };

  const h1Style = {
    color: "white",
    marginTop: "0",
    paddingTop: "1.5rem",
    textAlign: "center",
  };

  return (
    <ThemeProvider theme={createMuiTheme(defaultTheme)}>
      <Box
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)",
          height: "100vh",
        }}
      >
        <Container fixed>
          <h1 style={h1Style}>Forgotten your password?</h1>
          <h3 style={{ color: "#30dd89", textAlign: "center", marginTop: "0" }}>
            Don't worry!
          </h3>
          <Grid container justify="center">
            <Grid item xs={12} md={6} lg={4} style={{ marginTop: "3rem" }}>
              <Paper>
                <Card>
                  <CardHeader
                    title="Find your account"
                    style={{ fontSize: "1.2rem", textAlign: "center" }}
                  />
                  <CardContent>
                    <form onSubmit={submit}>
                      <div>
                        <TextField
                          required
                          type="email"
                          label="Email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        style={{ width: "100%", marginTop: "1rem" }}
                      >
                        {loading ? <CircularProgress size={23} /> : "Find"}
                      </Button>
                    </form>
                    <div style={{ textAlign: "right", marginTop: "0.4rem" }}>
                      <small>Go back to </small>
                      <Link to="/login">
                        <small>Login</small>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Notification />
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPassword;
