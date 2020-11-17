const authProvider = {
  login: ({ email, password }) => {
    const request = new Request("http://localhost:4200/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        localStorage.setItem("auth", JSON.stringify(auth));
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject({
        redirectTo: "http://localhost:4200/api/v1/users/login",
      });
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth")
      ? Promise.resolve()
      : Promise.reject({ message: "login.required" }),
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
    const { role } = JSON.parse(localStorage.getItem("auth")).user;
    return role ? Promise.resolve(role) : Promise.reject();
  },
  // ...
};

export default authProvider;
