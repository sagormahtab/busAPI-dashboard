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
} from "@material-ui/core";
import axios from "axios";

const ForgotPassword = ({ theme }) => {
  const [email, setEmail] = useState("");

  // const [role, setRole] = useState("");
  // const login = useLogin();
  const notify = useNotify();
  const submit = (e) => {
    e.preventDefault();
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
  };

  const clearForm = () => {
    setEmail("");
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
                        style={{ width: "100%", marginTop: "1rem" }}
                      >
                        Find
                      </Button>
                    </form>
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
