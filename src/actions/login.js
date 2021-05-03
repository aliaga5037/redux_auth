import { userService } from "../services/authentication";
export const getAuth = () => {
  return {
    type: "GET_AUTH",
  };
};

export const logoutSuccess = () => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};

export const loginSuccess = () => {
  return {
    type: "LOGIN_SUCCESS",
  };
};

export const loginFailed = (message) => {
  return {
    type: "LOGIN_FAILED",
    message: message,
  };
};

export const loginRequest = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};

export const login = (loginData, ownProps) => {
  console.log({ loginData });
  return async (dispatch) => {
    dispatch(loginRequest());

    // const response = await fetch("/api/login", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(loginData),
    // });

    const response = {
      ok: true,
      json: () => {
        return new Promise((resolve) => {
          resolve({
            token: {
                exp: new Date('2020')
            },
          });
        });
      },
    };

    if (response.ok) {
      response
        .json()
        .then((data) => {
          dispatch(loginSuccess(data));
          userService.setToken(data.token);
          ownProps.history.push("/");
        })
        .catch((err) => dispatch(loginFailed(err)));
    } else {
      response
        .json()
        .then((error) => {
          dispatch(loginFailed(error));
        })
        .catch((err) => dispatch(loginFailed(err)));
    }

    return response;
  };
};

export const logout = () => {
  return (dispatch) => {
    userService.logout();
    dispatch(logoutSuccess());
  };
};

export const reinitializeState = () => {
  return {
    type: "REINITIALIZE_STATE",
  };
};
