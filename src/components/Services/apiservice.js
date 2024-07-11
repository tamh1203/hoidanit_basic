
import axios from "../utils/AxiosCustomiez";
// import axios từ AxiosCustomiez, đặt tên gì cũng được.
//( instance.post('api/v1/participant', data) vẫn chạy được)

const postCreateUser = (email, password, username, role, image) => {

  const data = new FormData();// gửi file image cần dùng FormData
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post('api/v1/participant', data)
}

const getAllUserServices = () => {
  return axios.get("api/v1/participant/all")
}

const postUpdateUser = (id, username, role, image) => {

  const data = new FormData();// gửi file image cần dùng FormData()
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put('api/v1/participant', data)
  // import axios từ AxiosCustomiez, đặt tên gì cũng được.
  //( instance.post('api/v1/participant', data) vẫn chạy được)
}

const deleteUser = (userId) => {
  return axios.delete('api/v1/participant', { data: { id: userId } })
}

export { postCreateUser, getAllUserServices, postUpdateUser, deleteUser }