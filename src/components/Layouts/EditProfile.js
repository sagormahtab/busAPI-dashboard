import * as React from "react";
import { useState, useEffect } from "react";
import { useNotify, Notification, defaultTheme, Title } from "react-admin";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import axios from "axios";
// import { useHistory } from "react-router-dom";

const SignupPage = ({ theme }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { token } = JSON.parse(localStorage.getItem("auth"));
  // const history = useHistory();

  useEffect(() => {
    const { name, email } = JSON.parse(localStorage.getItem("auth")).user;
    setName(name);
    setEmail(email);
  }, []);

  const notify = useNotify();
  const submit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4200/api/v1/users/updateMe", {
      method: "PATCH",
      body: JSON.stringify({ name, email }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        data.token = token;
        localStorage.setItem("auth", JSON.stringify(data));
        notify("Information updated successfully!");
      })
      .catch((err) => {
        alert("Error Occured");
      });
    // login({ email, password }).catch(() => notify("Invalid email or password"));
  };

  const passwordSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return alert("Passwords didn't match");
    }
    axios({
      method: "patch",
      url: "http://localhost:4200/api/v1/users/updateMyPassword",
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
      headers: { Authorization: `Bearer ${token}` },
      // body: JSON.stringify({ passwordCurrent, password, passwordConfirm }),
      // headers: {
      //   "Content-type": "application/json; charset=UTF-8",
      //   Authorization: `Bearer ${token}`,
      // },
    })
      // .then((res) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error(res.statusText);
      //   }
      //   return res.json();
      // })
      .then((data) => {
        localStorage.setItem("auth", JSON.stringify(data.data));
        notify("Password updated successfully!");
        clearForm();
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          alert(error.response.data.message);
          // if (error.response.status === 401) {
          //   history.push("/login");
          //   localStorage.removeItem("auth");
          // }
        } else if (error.request) {
          // The request was made but no response was received
          alert(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          alert("Error", error.message);
        }
      });
    // login({ email, password }).catch(() => notify("Invalid email or password"));
  };

  const clearForm = () => {
    setPasswordCurrent("");
    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <ThemeProvider theme={createMuiTheme(defaultTheme)}>
      <Card>
        <Title title="My Profile" />
        <CardContent>
          <form onSubmit={submit}>
            <div>
              <TextField
                required
                type="text"
                label="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginTop: "1rem" }}
              />
            </div>
            <div>
              <TextField
                required
                multiline
                type="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginTop: "1rem" }}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>
          </form>
          <form onSubmit={passwordSubmit}>
            <div>
              <TextField
                required
                type="password"
                label="Current Password"
                name="passwordCurrent"
                value={passwordCurrent}
                onChange={(e) => setPasswordCurrent(e.target.value)}
              />
            </div>
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
              style={{ marginTop: "1rem" }}
            >
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
      <Notification />
    </ThemeProvider>
  );
};

export default SignupPage;
