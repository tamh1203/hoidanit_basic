
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
/*axios.delete("URL", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        var1: "var1",
        var2: "var2"
      },
    }) - truyền giá trị id theo phương thức trên ( "Url", {data: {id : userId}}*/

// paginate 
const getUsersWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`) // phân trang
}

const loginAPI = (email, password,) => {
  return axios.post('api/v1/login', {
    email: email,
    password: password,
    delay: 3000
  })
  // truyền obj ko có key => với key giống với tên obj
  // {email} <=> {email: email}
}

const registerAPI = (email, password, username) => {
  return axios.post('api/v1/register', { email, password, username, delay: 3000 })
  // truyền obj ko có key => với key giống với tên obj
  // {email} <=> {email: email}
}

const getListQuiz = () => {
  return axios.get("api/v1/quiz-by-participant")
}

const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
  // call list quiz theo id
}
export {
  postCreateUser, getAllUserServices,
  postUpdateUser, deleteUser, getUsersWithPaginate, loginAPI, registerAPI, getListQuiz, getDataQuiz
}