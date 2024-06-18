// class components 
// function components
import React from "react"
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class Mycomponent extends React.Component {

  render() {
    const MyInfo = ['Kin', 'Khang', 'Gia']
    return (
      <div>
        <UserInfor />
        <DisplayInfor name="Gia Khang" age={5} MyInfo={MyInfo} />
      </div>
    )
  }
}
export default Mycomponent