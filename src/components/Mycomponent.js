// class components 
// function components
import React, { useState } from "react"
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";


const Mycomponent = () => {

  const [listUser, setListUser] = useState([
    { id: 1, name: "Khang", age: 15, address: "Thăng Bình" },
    { id: 2, name: "Kin", age: 61, address: "Bình Đào" },
    { id: 3, name: "Gia", age: 5, address: "Nam giang" }
  ])

  const handleAddListUser = (userOjb) => {
    console.log("check ramdom userOjb", userOjb);
    setListUser([userOjb, ...listUser])

  }

  const handleDeteleUser = (userId) => {
    console.log(userId);
    let listUserClone = listUser
    listUserClone = listUserClone.filter(item => item.id !== userId)
    setListUser(listUserClone)
    // this.setState({
    //   listUser: listUserClone
    // })
  }
  // const handleEditListUser = (userId) => {
  //   const listUserCloneEdit = [...listUser]

  //   console.log(userId);
  // }
  return (
    <>
      <div>
        <AddUserInfor handleAddListUser={handleAddListUser}
        />
      </div>
      <div>
        <DisplayInfor listUser={listUser}
          handleDeteleUser={handleDeteleUser}
        // handleEditListUser={handleEditListUser}
        />

      </div>

    </>
  )
}
export default Mycomponent