import * as React from "react";
import { useState } from "react";
import { useNotify, Notification, defaultTheme } from "react-admin";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Card,
  CardContent,
  Paper,
  Grid,
  Box,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const SignupPage = ({ theme }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busName, setBusName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const history = useHistory();

  const [dataLoading, setDataLoading] = useState(false);

  const notify = useNotify();
  const submit = (e) => {
    e.preventDefault();
    setDataLoading(true);
    if (password !== passwordConfirm) {
      return alert("Password didn't match");
    }
    axios({
      method: "post",
      url: "https://bus-api-sm.herokuapp.com/api/v1/users/signup",
      data: {
        name,
        email,
        phone,
        busName,
        password,
        passwordConfirm,
      },
    })
      .then((data) => {
        notify("Successfully signed up. Check your email to confirm");
        clearForm();
        setDataLoading(false);
        history.push("/login");
      })
      .catch((error) => {
        setDataLoading(false);
        if (error.response) {
          alert(error.response.data.message);
        } else if (error.request) {
          alert(`${error}`);
        } else {
          alert("Error", error.message);
        }
      });
    // login({ email, password }).catch(() => notify("Invalid email or password"));
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
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
          <h1 style={h1Style}>
            Welcome to <span style={{ color: "#30dd89" }}>Tickets4Travel</span>
          </h1>
          <h3 style={{ color: "white", textAlign: "center", marginTop: "0" }}>
            Let's Signup!
          </h3>
          <Grid container justify="center">
            <Grid item xs={12} md={6} lg={4} style={{ marginTop: "3rem" }}>
              <Paper>
                <Card>
                  <CardContent>
                    <form onSubmit={submit}>
                      <div>
                        <TextField
                          required
                          autoFocus
                          type="text"
                          label="Name"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      </div>
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
                      <div>
                        <TextField
                          required
                          type="text"
                          label="Phone"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div>
                        <TextField
                          required
                          type="text"
                          label="Bus Name"
                          name="busName"
                          value={busName}
                          onChange={(e) => setBusName(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div>
                        <TextField
                          required
                          type="password"
                          label="Password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={{ width: "100%" }}
                          helperText="Minimum 4 characters"
                        />
                      </div>
                      <div>
                        <TextField
                          required
                          type="password"
                          label="Confirm Password"
                          name="passwordConfirm"
                          value={passwordConfirm}
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={dataLoading}
                        type="submit"
                        style={{ width: "100%", marginTop: "1rem" }}
                      >
                        {dataLoading ? (
                          <CircularProgress size={23} />
                        ) : (
                          "Sign Up"
                        )}
                      </Button>
                    </form>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.3rem",
                      }}
                    >
                      <small>Already Signed Up?</small>
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

export default SignupPage;
