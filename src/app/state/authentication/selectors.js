export const isFetchingLogin = (state) => state.authentication.login.loading;
export const getAccessToken = (state) => state.authentication.token;
export const getLoginErrorMessage = (state) => {
  const error = state.authentication.login.error;

  return (
    (state.authentication.login.error &&
      error.response &&
      error.response.message) ||
    null
  );
};
