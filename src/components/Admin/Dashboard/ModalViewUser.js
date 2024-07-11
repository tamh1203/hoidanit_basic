
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./ModalCreatUser.scss"
import _ from 'lodash';

const ModalViewUser = (props) => {

  const { show, setShow, dataViewUser, resetDateUpdate } = props

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
  const [role, setRole] = useState("")
  const [image, setImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")

  // dùng useEffect để set lại giá trị của từng biến
  // set image dùng base64 cú pháp `data:image/jpeg;base64,${data}`
  useEffect(() => {
    if (!_.isEmpty(dataViewUser)) {
      // nếu object ko rỗng thì update state
      // thư viện lodash (!_.isEmpty === check object không rỗng thì =>)
      setEmail(dataViewUser.email)
      setPassword("**********")
      setUsername(dataViewUser.username)
      setRole(dataViewUser.role)
      if (dataViewUser.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataViewUser.image}`)
      }
    }
  }, [dataViewUser])

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size='xl'
        className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>View Detail a User</Modal.Title>
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
                disabled={true}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label text-danger">Role</label>
              <select
                className="form-select"
                value={role}
                disabled={true}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            {/* <div className='col-md-12'>
              <label
                className="form-label lable-upload"
                htmlFor='lableUpload'
              >
                <FcPlus /> Upload Image</label>
              <input
                type='file'
                id="lableUpload" hidden
                disabled={true}
                onChange={(event) => hanldeUploadImage(event)}
              />
            </div> */}
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
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalViewUser