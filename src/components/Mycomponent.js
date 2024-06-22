// class components 
// function components
import React from "react"
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class Mycomponent extends React.Component {

  state = {
    listUser: [
      { id: 1, name: "Khang", age: 15 },
      { id: 2, name: "Kin", age: 61 },
      { id: 3, name: "Gia", age: 5 }
    ]
  }
  render() {
    return (
      <div>
        <UserInfor />
        <DisplayInfor listUser={this.state.listUser} />
      </div>
    )
  }
}
export default Mycomponent