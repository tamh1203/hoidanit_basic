import { useState } from "react";
import React from "react";

const AddUserInfor = (props) => {

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [address, setAddress] = useState("")

  const { handleAddListUser } = props

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleAddListUser({
      id: Math.floor((Math.random() * 100) + 1),
      name: name,
      age: age,
      address: address
    })
  }
  const handleOnChangeName = (event) => {
    setName(
      event.target.value
    )
  }
  return (
    <>
      <div>
        My name is {name}
      </div>
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <label>Your name : </label>
        <input
          value={name}
          type="text"
          onChange={(event) => handleOnChangeName(event)}
        />
        <label>Your Age : </label>
        <input
          value={age}
          type="text"
          onChange={(event) => setAge(event.target.value)}
        />
        <label> Address : </label>
        <input
          value={address}
          type="text"
          onChange={(event) => setAddress(event.target.value)}
        />
        <button>Sumit</button>

      </form>
      <hr></hr>
    </>)
}


export default AddUserInfor