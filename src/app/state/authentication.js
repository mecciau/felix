const DEFAULT_AUTHENTICATION_STATE = {
  token: localStorage.getItem("authorization"),
};

const authentication = (state = DEFAULT_AUTHENTICATION_STATE, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        token: action.token,
      };
    case "USER_LOGOUT": {
      return {
        ...state,
        token: null,
      };
    }
    default:
      return state;
  }
};

export default authentication;
