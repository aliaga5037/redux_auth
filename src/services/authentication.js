export const userService = {
  loggedIn: loggedIn,
  setToken: setToken,
  isTokenExpired: isTokenExpired,
  getToken: getToken,
  logout: logout,
};

function loggedIn() {
  const token = this.getToken();
  return !!token && !this.isTokenExpired(token);
}

function isTokenExpired(token) {
  try {
    const decoded = JSON.parse(token);
    if (new Date(decoded.exp) < Date.now()) {
      return true;
    } else return false;
  } catch (err) {
    console.log({ err });
    return false;
  }
}

function setToken(idToken) {
  localStorage.setItem("id_token", JSON.stringify(idToken));
}

function getToken() {
  return localStorage.getItem("id_token");
}

function logout() {
  localStorage.removeItem("id_token");
}
