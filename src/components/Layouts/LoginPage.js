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
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const LoginPage = ({ theme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = useLogin();
  const notify = useNotify();
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    login({ email, password }).catch((msg) => notify(`${msg}`));
    setLoading(false);
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
            Login to continue
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
                          type="password"
                          label="Password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                        {loading ? <CircularProgress size={23} /> : "Login"}
                      </Button>
                    </form>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.3rem",
                      }}
                    >
                      <Link to="/find-account">
                        <small>Forgot Passwod?</small>
                      </Link>
                      <a href="/#/signup">
                        <small>Signup</small>
                      </a>
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
