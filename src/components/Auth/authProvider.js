import axios from "axios";

const authProvider = {
  login: ({ email, password }) => {
    const request = {
      method: "post",
      url: "https://bus-api-sm.herokuapp.com/api/v1/users/login",
      data: { email, password },
    };
    return axios(request)
      .then((res) => {
        localStorage.setItem("auth", JSON.stringify(res.data));
      })
      .catch((error) => {
        if (error.response) {
          throw new Error(error.response.data.message);
        } else if (error.request) {
          throw new Error(error.request);
        } else {
          throw new Error("Network error");
        }
      });
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject({
        redirectTo: "/login",
      });
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth")
      ? Promise.resolve()
      : Promise.reject({ message: "login required" }),
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      const { _id, name } = JSON.parse(localStorage.getItem("auth")).user;
      return Promise.resolve({ id: _id, fullName: name });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: () => {
    const regexList = [/reset-password/, /confirm-user/];
    const url = window.location.href;
    if (["/signup", "/find-account"].includes(url.split("#")[1])) {
      return;
    } else if (regexList.some((rx) => rx.test(url))) {
      return;
    }
    const { role } = JSON.parse(localStorage.getItem("auth")).user;
    return role ? Promise.resolve(role) : Promise.reject();
  },
  // ...
};

export default authProvider;
