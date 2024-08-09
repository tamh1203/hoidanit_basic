import { useEffect, useState } from "react";
import { getListQuiz } from "../../Services/apiservice";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {

  const navigate = useNavigate()
  const [arrQuiz, setArrQuiz] = useState([])

  useEffect(() => {
    FetchQuestions()
  }, [])

  const FetchQuestions = async () => {
    let res = await getListQuiz()
    setArrQuiz(res.DT)
    console.log("check res listQuiz", res.DT);
  }
  return (
    //bootstrap card
    <div className="cardlist-container container">
      {arrQuiz && arrQuiz.length > 0 &&
        arrQuiz.map((item, index) => {
          return (
            <div className="card" key={`${index} + ListUser`} style={{ width: "18rem" }}>
              <img className="card-img-top" src={`data:image/jpeg;base64,${item.image}`} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{item.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/quiz/${item.id}`, { state: { description: item.description } })}
                // search : react router usenavigate with state, truyền state  dùng useLocation
                >Start Quiz Now</button>
              </div>
            </div>
          )
        })
      }
      {arrQuiz && arrQuiz.length == 0 &&
        <div>
          You don't have any quiz now...
        </div>
      }
    </div>
  )

}

export default ListQuiz;