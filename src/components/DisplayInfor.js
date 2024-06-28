import React from "react";
import Watch from "../../src/watch-gt2.jpg"
import { useState } from "react";

const DisplayInfor = (props) => {
  const { listUser, handleDeteleUser } = props
  const [isShowHideListUser, setShowListUser] = useState(true)
  const [editUser, setEditUser] = useState('')

  const handleShowHideListUser = () => {
    setShowListUser(!isShowHideListUser)
    console.log(isShowHideListUser);
  }
  const handleEditUser = (item) => {
    // console.log(item);
    // setEditUser(item)



    // props.handleEditListUser({
    //   id: event.id,
    //   name: event.name,
    //   age: event.age
    // }
    // )

  }
  return (
    <>
      <div>
        <span className="watch">Đồng hồ thông minh Huawei Gt 2</span>
        <section>
          <img className="Logo" src={Watch} />
        </section>
      </div>
      <div className="ShowHide">
        <span onClick={() => handleShowHideListUser()}>
          {isShowHideListUser ? " Hide List User " : " Show Detail List"}
        </span>
      </div>
      {
        isShowHideListUser &&
        <div>
          {listUser.map((item) => {
            return (
              <div key={item.id} className={+item.age > 18 ? "green" : "red"}>
                <hr></hr>
                <div>
                  Your name's : {item.name}
                </div>
                <div>
                  Your Age :  {item.age}
                </div>
                <div>
                  Address :  {item.address}
                </div>
                <button
                  className="button-delete"
                  onClick={() => handleDeteleUser(item.id)}
                >Delete
                </button>
                <button
                >
                  Edit
                </button>

              </div>
            )
          })}
        </div>
      }
    </>
  )
}

export default DisplayInfor