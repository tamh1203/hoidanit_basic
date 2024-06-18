import React from "react";

class DisplayInfor extends React.Component {

  render() {
    console.log(this.props);
    const { name, age } = this.props
    return (
      <div>
        <div>
          Your name's : {name}
        </div>
        <div>
          Your Age :  {age}
        </div>
      </div>
    )
  }
}

export default DisplayInfor