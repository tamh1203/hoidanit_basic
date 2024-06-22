import React from "react";

class DisplayInfor extends React.Component {

  state = {
    isShowDetail: true
  }

  handleShowHide = () => {
    this.setState({
      isShowDetail: !this.state.isShowDetail
    })

  }
  render() {
    console.log(this.props.listUser);
    const { listUser } = this.props
    // const listUser = this.props.listUser
    return (
      <>
        <div>
          <span className="cursor-poniter"
            onClick={() => this.handleShowHide()}>
            {this.state.isShowDetail === true ? "Ẩn bớt" : "Hiển thị chi tiết"}
          </span>
        </div>
        {this.state.isShowDetail &&
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
                </div>
              )
            })}
          </div>
        }
      </>
    )
  }
}

export default DisplayInfor