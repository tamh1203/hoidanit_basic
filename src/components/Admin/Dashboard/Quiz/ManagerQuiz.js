import { useState } from "react";
import "./ManagerQuiz.scss"
import Select from 'react-select';
import { postCreateQuiz } from "../../../Services/apiservice";
import { toast } from 'react-toastify'


const options = [
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Difficult', label: 'Difficult' },
];


const ManagerQuiz = (props) => {

  const [name, setName] = useState("")
  const [description, setDiscription] = useState("")
  const [type, setType] = useState("")
  const [image, setImage] = useState(null)

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

  const handleSubmitQuiz = async () => {
    let res = await postCreateQuiz(description, name, +type?.value, image)
    if (res && res.EC === 0) {
      toast.success(res.EM)
      setName("");
      setDiscription("");
      setType("")
      setImage(null);
    }
    else {
      toast.error(res.EM)
    }
    console.log(res);
  }
  return (
    <div className="managerquiz-container container">
      <div className="manager-content">
        <div className="title">
          Manager Quiz
        </div>
        <hr />
        <div className="header-fieldset">
          <fieldset className="border rounded-3 p-3">
            <legend className="float-none w-auto px-3">Add new quiz:</legend>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <label for="floatingInput">Your Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder="Description"
                value={description}
                onChange={(event) => setDiscription(event.target.value)}
              />
              <label htmlFor="floatingPassword">Description</label>
            </div>
            <div className="my-3">
              <Select
                defaultValue={type}
                onChange={setType}
                options={options}
                placeholder={"Quiz type..."}
              />
            </div>
            <div className="more-actions">
              <label className="mb-3">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(event) => handleChangeFile(event)}
              />
            </div>
            <div className="mt-3">
              <button
                className="btn btn-success"
                onClick={() => handleSubmitQuiz()}
              >Save</button>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="list-detail">
        table
      </div>
    </div>
  )
}

export default ManagerQuiz;