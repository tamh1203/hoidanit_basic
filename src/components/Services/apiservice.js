
import axios from "../utils/AxiosCustomiez";
const postCreateUser = (email, password, username, role, image) => {

  const data = new FormData();// gửi file image cần dùng form data
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post('api/v1/participant', data)
  // import axios từ AxiosCustomiez, đặt tên gì cũng được.
  //( instance.post('api/v1/participant', data) vẫn chạy được)
}

const getAllUserServices = () => {
  return axios.get("api/v1/participant/all")
}


export { postCreateUser, getAllUserServices }