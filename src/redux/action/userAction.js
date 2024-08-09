export const FETCH_USER_LOGIN_SUCESS = "FETCH_USER_LOGIN_SUCESS"
export const USER_LOGOUT_SUCESS = "USER_LOGOUT_SUCESS"

export const Dologin = (data) => {

  return {
    type: FETCH_USER_LOGIN_SUCESS,
    payload: data
  }
}

export const doLogout = () => {

  return {
    type: USER_LOGOUT_SUCESS,
  }
}

