
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../Services/apiservice';
import { useEffect, useState, } from 'react';
import _ from "lodash"
import './DetailQuiz.scss'
import Question from './Question';
import ModalResult from './ModalResult';

const DetailQuiz = (props) => {

  const [dataQuiz, setDataQuiz] = useState([])
  const [index, setIndex] = useState(0)
  const [isShowModelResult, setIsShowModalResult] = useState(false)
  const [dataAnsewrResult, setDataAnsewrResult] = useState({})
  const navigate = useNavigate()
  const params = useParams()
  const quizID = params.id
  // console.log(params);
  const location = useLocation()
  // console.log("location", location);
  useEffect(() => {
    apiGetDataQuiz()
  }, [quizID])

  const apiGetDataQuiz = async () => {
    let res = await getDataQuiz(quizID)
    // console.log("check res Detail", res);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription, image = null;
          // console.log("check value",value);
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image
            }
            item.answers.isSelected = false;
            answers.push(item.answers)
          })
          return { questionID: key, answers, questionDescription, image }
        })
        .value()
      setDataQuiz(data)
      // console.log("check dataQuiz >>>", data);
    }
  }

  const handlePrev = () => {
    if (index < 1) return
    setIndex(index - 1)
  }

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1)
      setIndex(index + 1)
  }
  // console.log(index);

  // const resultCheckBox = (answerId, questionId) => {
  //   let dataQuizClone = _.cloneDeep(dataQuiz);
  //   let question = dataQuizClone.find(item => +item.questionID === +questionId)
  //   console.log("question", question);
  //   // find Id question, tiep tuc loc id answers
  //   let arrSelected = question.answers.map(item => {
  //     if (+item.id === +answerId) {
  //       item.isSelected = !item.isSelected
  //     }
  //     return item;
  //   })
  //   question.answers = arrSelected; //gán ngược mảng ansewr lại
  //   // console.log("arrSelect", arrSelected);
  //   let findIndex = dataQuizClone.findIndex(item => +item.questionID === +questionId) // hàm findIndex == true => return -1 
  //   console.log("dataQuizClone", dataQuizClone[findIndex]);
  //   console.log(findIndex);
  //   if (index > -1) {
  //     dataQuizClone[findIndex] = question;
  //     setDataQuiz(dataQuizClone)
  //   }
  // }
  const resultCheckBox = (a_Id, q_Id) => {
    let dataQuizClone = _.cloneDeep(dataQuiz)
    let question = dataQuizClone.find(item => +item.questionID === +q_Id)
    // find id question
    console.log("question>>>  ", question);
    question.answers.forEach(item => {
      if (item.id === a_Id) {
        item.isSelected = !item.isSelected;
        // set true false cho checkbox
      }
      return item;
    })
    let findIndex = dataQuizClone.findIndex(item => +item.questionID === +q_Id)
    // hàm findIndex == true => return -1
    if (index > -1) {
      dataQuizClone[findIndex] = question;
      setDataQuiz(dataQuizClone)
    }
    console.log("  dataQuizClone[findIndex]", dataQuizClone[findIndex]);
  }

  const handleSubmitFinish = async () => {
    //   {
    //     "quizId": 1,
    //     "answers": [
    //         { 
    //             "questionId": 1,
    //             "userAnswerId": [3] // <= push id
    //         },
    //         { 
    //             "questionId": 2,
    //             "userAnswerId": [6] 
    //         }
    //     ]
    // }
    console.log(dataQuiz);
    let payload = {
      quizId: +quizID,
      answers: []
    }
    // let ansewrsNew = []
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach(item => {
        let questionId = item.questionID
        let userAnswerId = []
        // todo
        item.answers.forEach(item => {
          if (item.isSelected === true) {
            userAnswerId.push(item.id)
          }
        })
        payload.answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        })
      })
      // console.log(payload);
      let res = await postSubmitQuiz(payload)
      console.log("check res >", res);
      if (res && res.EC === 0) {
        setDataAnsewrResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData
        })
      } else {
        alert("Something wrongs...")
      }
      setIsShowModalResult(true)
    }
  }

  return (
    <div className='detail-quiz-container'>
      <div className='left-content'>
        <div className='q-title'>
          Quiz {quizID}: {location.state.description}
        </div>
        <hr />
        <div className="q-body-img">
          <img />
        </div>
        <div className='q-content'>
          <Question
            index={index}
            resultCheckBox={resultCheckBox}
            data={dataQuiz && dataQuiz.length > 0
              ?
              dataQuiz[index]
              :
              []
            }// truyền câu hỏi theo index
          />
        </div>
        <div className='footer'>
          <button
            className='btn btn-secondary'
            onClick={() => handlePrev()}
          > Prev </button>
          <button
            className='btn btn-primary'
            onClick={() => handleNext()}
          > Next </button>
          <button
            className='btn btn-success'
            onClick={() => handleSubmitFinish()}
          > Finish </button>
        </div>
        <div>
          <span
            className='btn btn-secondary'
            onClick={() => navigate("/users")}
          >-Back-</span>
        </div>
      </div>
      <div className='right-content'>
      </div>
      <ModalResult
        show={isShowModelResult}
        setShow={setIsShowModalResult}
        dataAnsewrResult={dataAnsewrResult}
      />
    </div>
  )
}

export default DetailQuiz