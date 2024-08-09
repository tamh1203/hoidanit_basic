
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaCamera } from "react-icons/fa"
import "./ModalCreatUser.scss";
import { toast } from 'react-toastify';
import { postUpdateUser } from "../../../Services/apiservice";
import _ from 'lodash';

const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate, resetDateUpdate } = props

  const handleClose = () => {
    setShow(false);
    setEmail("")
    setPassword("")
    setUsername("")
    setRole("User")
    setImage("")
    setPreviewImage("")
    resetDateUpdate()
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("User")
  const [image, setImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")

  // dùng useEffect để set lại giá trị của từng biến
  // set image dùng base64 cú pháp `data:image/jpeg;base64,${data}`
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      // nếu object ko rỗng thì update state
      // thư viện lodash (!_.isEmpty === check object không rỗng)
      setEmail(dataUpdate.email)
      setPassword("")
      setUsername(dataUpdate.username)
      setRole(dataUpdate.role)
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
      }
    }
  }, [dataUpdate])


  // set ảnh bằng đường link URL.createOjectURL(file[0])
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
    if (!isValidate) {
      toast.error("Invalid email")
      return;
    }
    let data = await postUpdateUser(dataUpdate.id, username, role, image)
    // lấy id của user cần update (dataUpdate)
    if (data && data.EC == 0) {
      toast.success(data.EM)
      handleClose()
      // props.fetchListUser() cập nhật lại tấc cả danh sách
      // props.setCurrentPage(1) // sét về trang 1
      await props.fetchListUserWithPaginate(props.currentPages)// hàm này cập nhật lại danh sách người dùng từng page,đẩy lên thằng cha (ManagerUser để render lại giao diện) props.currentPages => giữ nguyên trang đang đứng
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
          <Modal.Title>Update a User</Modal.Title>
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
                disabled={true}
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
                disabled={true}
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
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className='col-md-12'>
              <label
                className="form-label lable-upload"
                htmlFor='lableUpload'
              >
                <FaCamera /> Update Image</label>
              <input
                type='file'
                id="lableUpload" hidden
                onChange={(event) => hanldeUploadImage(event)}
              />
            </div>
            <div className='col-md-12 img-preview'>
              {previewImage
                ? <img src={previewImage} />
                :
                <span>Image preview</span>
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
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalUpdateUser