import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from "lodash";
import "./UserInfor.scss";
import { FaCamera } from "react-icons/fa";
import { postUpdateProfile } from '../../../../Services/apiservice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserInfor = (props) => {

  const account = useSelector(state => state.user.account)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("User")
  const [image, setImage] = useState("")
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setEmail(account.email);
      setUsername(account.username);
      setRole(account.role);
      setImage("")
      if (account.image) {
        setPreviewImage(`data:image/jpeg;base64,${account.image}`)
      }
    }
  }, [account])

  console.log("account >>>", account);

  const hanldeUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0])
    }
  }

  const hanldeUpdateProfile = async (event) => {
    event.preventDefault();
    let data = await postUpdateProfile(username, image)
    if (data && data.EC === 0) {
      setUsername(data.DT.username);
      toast.success(data.EM);
      navigate('/login')
      props.handleClose();
    }
    console.log(username);
  }

  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label text-success">Username</label>
          <input
            type='text'
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={false}
          />
        </div>

        <div className="col-md-4">
          <label
            className="form-label text-danger">
            Role</label>
          <input
            className="form-control"
            value={account.role}
            disabled={true} />
        </div>

        <div className="col-md-6">
          <label className="form-label text-primary ">Email</label>
          <input
            type="email"
            className="form-control"
            value={account.email}
            disabled={true}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label text-primary ">Password</label>
          <input
            type="email"
            className="form-control"
            disabled={true}
          />
        </div>

        <div className='col-md-12 img-preview'>
          {previewImage ?
            <img src={previewImage} />
            :
            <label
              className="form-label lable-upload"
              htmlFor='lableUpload'
            >
              Upload Image</label>
          }
        </div>
        <div>
          <span  >
            <input
              type='file'
              id="lableUpload" hidden
              onChange={(event) => hanldeUploadImage(event)}
            />
            <label
              className="form-label lable-upload"
              htmlFor='lableUpload'
              style={{ cursor: "pointer" }}
            >
              <FaCamera /> Changes Image</label>
          </span>
        </div>
        <div>
          <button
            className='btn btn-warning'
            onClick={(event) => { hanldeUpdateProfile(event) }}>
            Update
          </button>
        </div>
      </form>
    </>
  )
}

export default UserInfor;