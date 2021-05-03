const getUserData = (id) => {
  return (dispatch) => {
    return fetch(`api/user/${id}`, {
      headers: {
        Authorization: UserService.getToken(),
      },
    });
  };
};
