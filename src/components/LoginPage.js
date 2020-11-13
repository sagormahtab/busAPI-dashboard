import * as React from "react";
import { useState } from "react";
import { useLogin, useNotify, Notification, defaultTheme } from "react-admin";
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
} from "@material-ui/core";
import { Link } from "react-router-dom";

const LoginPage = ({ theme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const login = useLogin();
  const notify = useNotify();
  const submit = (e) => {
    e.preventDefault();
    login({ email, password }).catch(() => notify("Invalid email or password"));
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
          <Grid container justify="center">
            <Grid item xs={4} style={{ marginTop: "5rem" }}>
              <Paper>
                <Card>
                  <CardContent>
                    <form onSubmit={submit}>
                      <div>
                        <TextField
                          required
                          autoFocus
                          type="email"
                          label="Email"
                          name="email"
                          error={emailError ? true : false}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          helperText={emailError ? "Required" : ""}
                          onBlur={() =>
                            email ? setEmailError(false) : setEmailError(true)
                          }
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
                          error={passwordError ? true : false}
                          helperText={passwordError ? "Required" : ""}
                          onBlur={() =>
                            email
                              ? setPasswordError(false)
                              : setPasswordError(true)
                          }
                          style={{ width: "100%" }}
                        />
                      </div>

                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ width: "100%", marginTop: "1rem" }}
                      >
                        Login
                      </Button>
                    </form>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.3rem",
                      }}
                    >
                      <small>New comer?</small>
                      <Link to="/signup">
                        <small>Signup</small>
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

export default LoginPage;
