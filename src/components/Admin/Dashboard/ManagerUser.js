import ModalCreatUser from "./ModalCreatUser"

const ManagerUser = (props) => {


  return (
    <div className="manager-user-container" >
      <div className="titel" >
        Manager User
      </div >
      <div className="user-content" >
        <div>
          <button>Add New User</button>
        </div>
        <div>

        </div>
      </div >
      <ModalCreatUser />
    </div >
  )
}

export default ManagerUser