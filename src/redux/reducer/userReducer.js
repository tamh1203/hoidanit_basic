
import { FETCH_USER_LOGIN_SUCESS, USER_LOGOUT_SUCESS } from '../action/userAction';
const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    role: "",
    image: "",
    email: "",
  },
  isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case FETCH_USER_LOGIN_SUCESS:
      console.log("check actions >>>", action);
      return {
        ...state, account: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
          email: action?.payload?.DT?.email,
          // ?. để tránh bugs
        },
        isAuthenticated: true
      };

    case USER_LOGOUT_SUCESS:
      return {
        ...state, account: {
          access_token: "",
          refresh_token: "",
          username: "",
          role: "",
          image: "",
          email: "",
        },
        isAuthenticated: false
      };
    default: return state;
  }
};

export default userReducer;