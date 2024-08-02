
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaCamera } from "react-icons/fa"
import "./ModalCreatUser.scss"
import { toast } from 'react-toastify'
import { postCreateUser } from "../../Services/apiservice"

const ModalCreatUser = (props) => {
  const { show, setShow } = props

  const handleClose = () => {
    setShow(false);
    setEmail("")
    setPassword("")
    setUsername("")
    setRole("User")
    setImage("")
    setPreviewImage("")
  }
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("User")
  const [image, setImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")


  const hanldeUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0])
    }
  }
  // validate
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


  const handleSubmitCreateUser = async () => {
    //validate 
    const isValidate = validateEmail(email)
    // if (!isValidate) {
    //   toast.error("Invalid email")
    //   return;
    // }
    // if (!password) {
    //   toast.error("Invalid password")
    //   return;
    // }
    let data = await postCreateUser(email, password, username, role, image)
    console.log("data component", data);
    if (data && data.EC == 0) {
      toast.success(data.EM)
      handleClose()
      // await props.fetchListUser()
      // hàm này cập nhật lại danh sách người dùng,đẩy lên thằng cha (ManagerUser để render lại giao diện)
      props.setCurrentPage(1)
      await props.fetchListUserWithPaginate(1)// return page 1

    } else {
      toast.error(data.EM)
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size='xl'
        className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-primary ">Email</label>
              <input
                type="email"
                placeholder='Please enter your email'
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-primary">Password</label>
              <input
                type="password"
                placeholder='Please enter your password'
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-success">Username</label>
              <input
                type="text"
                placeholder='Please enter username'
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label text-danger">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className='col-md-12'>
              {/* <span>
                <input
                  type='file'
                  id="lableUpload" hidden
                  onChange={(event) => hanldeUploadImage(event)}
                />  <label
                  className="form-label lable-upload"
                  htmlFor='lableUpload'
                >
                  <FaCamera /> Upload Image</label>
              </span> */}
            </div>
            <div className='col-md-12 img-preview'>

              {previewImage
                ? <img src={previewImage} />
                :
                <span>
                  <input
                    type='file'
                    id="lableUpload" hidden
                    onChange={(event) => hanldeUploadImage(event)}
                  />
                  <label
                    className="form-label lable-upload"
                    htmlFor='lableUpload'
                  >
                    <FaCamera /> Upload Image</label>
                  {/* Preview */}
                </span>
              }
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmitCreateUser()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
}


export default ModalCreatUser