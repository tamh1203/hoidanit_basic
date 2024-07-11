import { useState, useEffect } from "react";
import ModalCreatUser from "./ModalCreatUser"
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { getAllUserServices } from "../../Services/apiservice"
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManagerUser = (props) => {

  const [showModalCreateUser, setShowModalCreateUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [showModalViewUser, setShowModalViewUser] = useState(false)
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
  const [dataUpdate, setDataUpdate] = useState({})
  const [dataViewUser, setDataViewUser] = useState({})
  const [dataDelete, setDataDelete] = useState({})

  const [listUser, setListUser] = useState([])

  useEffect(() => {
    fetchListUser();
  }, [])

  const fetchListUser = async () => {
    let res = await getAllUserServices();
    if (res && res.EC == 0) {
      setListUser(res.DT)
      console.log(res);
    }

  }
  const handleClickUpdate = (user) => {
    // mở modal update
    setShowModalUpdateUser(true)
    // set data cần được update
    setDataUpdate(user)
    // console.log("update user", user);
  }

  const handleClickViewUser = (item) => {
    setShowModalViewUser(true)
    setDataViewUser(item)
    console.log("view user :", item);
  }

  const handleClickBtnDeleteUser = (item) => {
    setShowModalDeleteUser(true)
    setDataDelete(item)
    console.log("user delete", item);
  }

  const resetDateUpdate = () => {
    setDataUpdate({})
    setDataViewUser({})
    // set lại dataUpdate == rỗng để hàm useEffect chạy lại.
  }

  return (
    <div className="manager-user-container" >
      <div className="titel" >
        Manager User
      </div >
      <div className="user-content" >
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />Add New User</button>
        </div>
        <div>
          <TableUser
            listUser={listUser}
            handleClickUpdate={handleClickUpdate}
            handleClickViewUser={handleClickViewUser}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
          />
        </div>
      </div >
      <ModalCreatUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
        fetchListUser={fetchListUser}
      />
      <ModalUpdateUser
        show={showModalUpdateUser}
        setShow={setShowModalUpdateUser}
        dataUpdate={dataUpdate}
        fetchListUser={fetchListUser}
        resetDateUpdate={resetDateUpdate}
      />
      <ModalViewUser
        show={showModalViewUser}
        setShow={setShowModalViewUser}
        dataViewUser={dataViewUser}
        resetDateUpdate={resetDateUpdate}
      />
      <ModalDeleteUser
        show={showModalDeleteUser}
        setShow={setShowModalDeleteUser}
        dataDelete={dataDelete}
        fetchListUser={fetchListUser}

      />
    </div >
  )
}

export default ManagerUser