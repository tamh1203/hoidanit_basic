import { getHistory } from "../../../../Services/apiservice";
import { useEffect, useState } from "react";
const History = () => {

  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    fetchGetHistory();
  }, [])

  const fetchGetHistory = async () => {

    let res = await getHistory()
    if (res && res.EC === 0) {
      let newData = res.DT.data.map(item => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          name: item.quizHistory.name ?? "",
          id: item.id,
          date: new Date(item.createdAt).toLocaleDateString()

        }
      })
      if (newData.length > 7) {
        newData = newData.slice(newData.length - 7, newData.length)
      }
      setDataHistory(newData)
    }

  }
  console.log("dataHistory", dataHistory);

  return (
    <>
      <div className="my-3 fw-bold">
        Table History
      </div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Total Question</th>
            <th scope="col">Total Correct</th>
            <th scope="col">CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {dataHistory && dataHistory.length > 0 &&
            dataHistory.map((item, index) => {

              return (
                <tr key={`table-history-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default History;