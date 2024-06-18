import React from "react";

class UserInfor extends React.Component {
  state = {
    name: "Tam Huynh",
    age: "33",
    address: "Quang Nam"
  }
  handleOnchangeInput = (event) => {
    this.setState({
      name: event.target.value
    })
  }
  handleOnchangeAge = (event) => {
    this.setState({
      age: event.target.value
    })
  }
  handleOnSubmit = (event) => {
    event.preventDefault();
    this.setState({
      name: this.state.name
    })
    console.log(this.state);
  }
  render() {
    return (
      <div>
        My name is {this.state.name}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <label>Your name : </label>
          <input
            value={this.state.name}
            type="text"
            onChange={(event) => this.handleOnchangeInput(event)}
          >
          </input>
          <label>Your Age : </label>
          <input
            value={this.state.age}
            type="text"
            onChange={(event) => this.handleOnchangeAge(event)}
          >
          </input>
          <button>Submit</button>
        </form>
      </div>)
  }
}

export default UserInfor