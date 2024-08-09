
import CountDown from "./CountDown";
import { useRef } from "react";
const RightContent = (props) => {
  const { dataQuiz } = props;
  const refDiv = useRef([]);
  // console.log("dataQuiz for RightContent", dataQuiz);

  const onTimeUp = () => {
    props.handleSubmitFinish();
    // hết giờ tự động kết thúc bài thi
  }

  const getClassQuestion = (question, index) => {
    console.log(index, question);
    // check answered
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(item => item.isSelected === true) // ham find loop isSelected co 1 gia tri === true return undefined
      // console.log("isAnswered", isAnswered);
      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  }

  const handleClickQuestion = (question, index) => {
    props.setIndex(index);// render cau hoi khi click vao` so cau 

    if (refDiv.current) {
      refDiv.current.forEach(item => {
        if (item && item.className == "question clicked") {
          item.className = "question";
        }
      })
    }
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(item => item.isSelected === true) // ham find loop isSelected co 1 gia tri === true return undefined
      // console.log("isAnswered", isAnswered);
      if (isAnswered) {
        return
      }
    }
    refDiv.current[index].className = "question clicked";
    // console.log("refDIv", refDiv.current[index])
  }

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>

      <div className="main-question">
        {dataQuiz && dataQuiz.length > 0
          && dataQuiz.map((question, index) => {
            return (
              <div
                key={`question-${index}`}
                className={getClassQuestion(question, index)}
                onClick={() => handleClickQuestion(question, index)}
                ref={element => refDiv.current[index] = element}
              >
                {index + 1}</div>
            )
          })
        }
      </div>
    </>
  )
}

export default RightContent;