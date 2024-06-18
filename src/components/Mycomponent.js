// class components 
// function components
import React from "react"

class Mycomponent extends React.Component {

  state = {
    name: "Tam Huynh",
    age: "33",
    address: "Quang Nam"
  }
  handleClick(e) {
    console.log("My name ", this.state.name);
    this.setState({
      name: "Khang"
    })
  }
  render() {
    return (
      <div>
        My name is {this.state.name}
        <button onClick={(event) => { this.handleClick(event) }} >Click Me</button>
      </div>
    )
  }
}
export default Mycomponent