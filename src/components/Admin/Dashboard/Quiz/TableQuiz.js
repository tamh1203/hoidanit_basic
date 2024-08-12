import { getByQuizAdmin } from "../../../../Services/apiservice";
import { useEffect, useState } from "react";
import ModalDeteleQuiz from "./ModalDeteleQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { useTranslation } from 'react-i18next';


const TableQuiz = (props) => {

  const { t } = useTranslation();

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
            <th scope="col">{t("table-quiz.th1")}</th>
            <th scope="col">{t("table-quiz.th2")}</th>
            <th scope="col">{t("table-quiz.th3")}</th>
            <th scope="col">{t("table-quiz.th4")}</th>
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
                    >{t("table-quiz.btn-delete")}</button>
                    <button
                      className="btn btn-info ms-3"
                      onClick={() => handleUpdateQuiz(item)}
                    >{t("table-quiz.btn-edit")}</button>
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