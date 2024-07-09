import { useState, useEffect } from "react";
import ModalCreatUser from "./ModalCreatUser"
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { getAllUserServices } from "../../Services/apiservice"
import ModalUpdateUser from "./ModalUpdateUser";
const ManagerUser = (props) => {

  const [showModalCreateUser, setShowModalCreateUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [dataUpdate, setDataUpdate] = useState({})

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
    console.log("update user", user);

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
      />
    </div >
  )
}

export default ManagerUser