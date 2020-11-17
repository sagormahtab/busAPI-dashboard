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
import { useHistory, useParams } from "react-router-dom";

const ResetPassword = ({ theme }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const history = useHistory();
  let { token } = useParams();

  // const [role, setRole] = useState("");
  // const login = useLogin();
  const notify = useNotify();
  const submit = (e) => {
    e.preventDefault();
    axios({
      method: "patch",
      url: `http://localhost:4200/api/v1/users/resetPassword/${token}`,
      data: {
        password,
        passwordConfirm,
      },
    })
      .then((data) => {
        notify("Password Reset successfully. Login to continue");
        clearForm();
        history.push("/login");
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
    setPassword("");
    setPasswordConfirm("");
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
                    title="Reset your password"
                    style={{ fontSize: "1.2rem", textAlign: "center" }}
                  />
                  <CardContent>
                    <form onSubmit={submit}>
                      <div>
                        <TextField
                          required
                          type="password"
                          label="New Password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                        />
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ width: "100%", marginTop: "1rem" }}
                      >
                        Reset
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

export default ResetPassword;
