import { useState } from "react";
import "./ManagerQuiz.scss"
import Select from 'react-select';
import { postCreateQuiz } from "../../../../Services/apiservice";
import { toast } from 'react-toastify'
import TableQuiz from "./TableQuiz";
import AssignQuiz from "./AssignQuiz";
import QuizQA from "./QuizQA";
import { useTranslation } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const options = [
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Difficult', label: 'Difficult' },
];


const ManagerQuiz = (props) => {

  const { t } = useTranslation();

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
    let res = await postCreateQuiz(description, name, type?.value, image)
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
      <Tabs
        defaultActiveKey="updateQA"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="manager-quiz" title={t("manager-quiz.title1")}>
          <div className="header-fieldset">
            <fieldset className="border rounded-3 p-3">
              <legend className="float-none w-auto px-3">{t("manager-quiz.addnewquiz")}</legend>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <label htmlFor="floatingInput">{t("manager-quiz.username")}</label>
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
                <label htmlFor="floatingPassword">{t("manager-quiz.description")}</label>
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
                <label className="mb-3">{t("manager-quiz.upload-image")}</label>
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
                >{t("manager-quiz.btn-save")}</button>
              </div>
            </fieldset>
          </div>
          <div className="list-detail">
            <TableQuiz />
          </div>
        </Tab>
        <Tab eventKey="updateQA" title={t("manager-quiz.title2")}>
          <QuizQA />
        </Tab>
        <Tab eventKey="assign" title={t("manager-quiz.title3")} >
          <AssignQuiz />
        </Tab>
      </Tabs>
    </div>
  )
}

export default ManagerQuiz;