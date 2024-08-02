import { getByQuizAdmin } from "../../../Services/apiservice";
import { useEffect, useState } from "react";
import ModalDeteleQuiz from "./ModalDeteleQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";


const TableQuiz = (props) => {

  const [tableQuiz, setTableQuiz] = useState("")
  const [showModalDeteteQuiz, setIsShowModalDeteleQuiz] = useState(false)
  const [dataDeteleQuiz, setDataDeteleQuiz] = useState("")
  const [showModalUpdateQuiz, setIsShowModaUpdateQuiz] = useState(false)
  const [dataUpdateQuiz, setDataUpdateQuiz] = useState("")

  useEffect(() => {
    fetchQuiz()
  }, [])

  const fetchQuiz = async () => {
    let res = await getByQuizAdmin()
    if (res && res.EC === 0) {
      setTableQuiz(res.DT)
    }
    console.log(res);
  }

  const handelDeteleQuiz = (item) => {
    setIsShowModalDeteleQuiz(true)
    setDataDeteleQuiz(item)
    // console.log(item);
  }

  const handleUpdateQuiz = (item) => {
    setIsShowModaUpdateQuiz(true)
    setDataUpdateQuiz(item)
    console.log("dataUpdate", item);
  }

  return (
    <>
      <div className="my-3">List Quizz:</div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableQuiz && tableQuiz.length > 0 &&

            tableQuiz.map((item, index) => {

              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-danger "
                      onClick={() => handelDeteleQuiz(item)}
                    >Delete</button>
                    <button
                      className="btn btn-info ms-3"
                      onClick={() => handleUpdateQuiz(item)}
                    >Edit</button>
                  </td>
                </tr>
              )
            })
          }
          <ModalDeteleQuiz
            show={showModalDeteteQuiz}
            setShow={setIsShowModalDeteleQuiz}
            dataDeteleQuiz={dataDeteleQuiz}
            fetchQuiz={fetchQuiz}
          />
          <ModalUpdateQuiz
            show={showModalUpdateQuiz}
            setShow={setIsShowModaUpdateQuiz}
            dataUpdateQuiz={dataUpdateQuiz}
            fetchQuiz={fetchQuiz}
            setDataUpdateQuiz={setDataUpdateQuiz}
          />

        </tbody>
      </table>
    </>
  )
}

export default TableQuiz;