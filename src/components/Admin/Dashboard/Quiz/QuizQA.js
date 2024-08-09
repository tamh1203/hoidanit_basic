import Select from 'react-select';
import { useState, useEffect } from 'react';
import "./QuizQA.scss"
import { FaRegPlusSquare } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox"; //component preview image
import {
  getByQuizAdmin, getQuizWhitQA, postUpSertQA
} from "../../../../Services/apiservice";
import { toast } from 'react-toastify';


const QuizQA = (props) => {

  const [isShowPreImage, setIsShowPreImage] = useState(false);
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        }]
    }]

  const [questions, setQuestions] = useState(initQuestions)

  const [dataPrevImage, setDataPrevImage] = useState({
    url: "",
    title: "",
  })

  const [listQuiz, setListQuiz] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState({})

  // useEffect
  useEffect(() => {
    fetchQuiz()
  }, [])

  const fetchQuiz = async () => {
    let res = await getByQuizAdmin()
    if (res && res.EC === 0) {
      let newListQuiz = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        }
      })
      setListQuiz(newListQuiz)
      console.log("newListQuiz", newListQuiz);
    }
  }

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA()
    }
  }, [selectedQuiz])

  // return a promise that resolves with a File instance
  const urltoFile = (url, filename, mimeType) => {
    if (url.startsWith('data:')) {
      var arr = url.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then(res => res.arrayBuffer())
      .then(buf => new File([buf], filename, { type: mimeType }));
  }
  // //Usage example:
  // urltoFile('data:text/plain;base64,aGVsbG8=', 'hello.txt', 'text/plain')
  //   .then(function (file) { console.log(file); });

  const fetchQuizWithQA = async () => {
    let res = await getQuizWhitQA(+selectedQuiz.value)
    if (res && res.EC === 0) {
      //convert base64 to file object
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let ques = res.DT.qa[i]
        if (ques.imageFile) {
          ques.imageName = `Question${ques.id}`;
          ques.imageFile =
            await urltoFile(`data:img/png;base64,${ques.imageFile}`, `Question${ques.id}`, 'img/png')
        }
        newQA.push(ques)
      }
      setQuestions(newQA)
      console.log("Check res-QA", res);
    }
  }

  const hanldeRemoveAddQuestion = (type, id) => {
    // console.log(type, id);
    if (type === 'ADD') {
      let newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          }]
      }
      setQuestions([...questions, newQuestion])
    }
    if (type === 'REMOVE') {
      let questionsClone = _.cloneDeep(questions)
      questionsClone = questionsClone.filter(item => item.id !== id)
      setQuestions(questionsClone)
    }
  }

  const hanldeRemoveAddAnswers = (type, questionId, answerId) => {
    // console.log(type, questionId, answerId);
    let questionClone = _.cloneDeep(questions)
    if (type === 'ADD') {
      let newAnswer =
      {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      }
      let index = questionClone.findIndex(item => item.id === questionId)
      questionClone[index].answers.push(newAnswer)
      setQuestions(questionClone);
    }
    if (type === 'REMOVE') {
      let index = questionClone.findIndex(item => item.id === questionId)
      questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId)
      setQuestions(questionClone)
      console.log("index", questionClone);
    }
  }

  const handleOnChange = (questionId, event) => {

    let questionClone = _.cloneDeep(questions)
    let index = questionClone.findIndex(item => item.id === questionId)
    if (index > -1) {
      questionClone[index].description = event.target.value;
    }
    setQuestions(questionClone);
  }

  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionClone = _.cloneDeep(questions)
    let index = questionClone.findIndex(item => item.id === questionId)
    console.log(index);
    if (index > -1 && event.target && event.target.files && event.target.files[0]) {
      questionClone[index].imageFile = event.target.files[0]
      questionClone[index].imageName = event.target.files[0].name
    }
    setQuestions(questionClone)
  }

  const handleOnChangeAnswer = (type, answerId, questionId, event) => {
    let questionClone = _.cloneDeep(questions)
    let index = questionClone.findIndex(item => item.id === questionId)
    // console.log("index", index);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(answer => {
        if (answer.id === answerId) {
          if (type === "CHECKBOX") {
            answer.isCorrect = event.target.checked;
          }
          if (type === "INPUT") {
            answer.description = event.target.value;
          }
        }
        return answer;
      })
    }
    setQuestions(questionClone)
  }

  const hanlePrevImage = (questionId) => {
    let questionClone = _.cloneDeep(questions)
    let index = questionClone.findIndex(item => item.id === questionId)
    if (index > -1) {
      setDataPrevImage({
        url: URL.createObjectURL(questionClone[index].imageFile), // URL.createObjectURL convert dang file anh
        title: questionClone[index].imageName
      })
      setIsShowPreImage(true)
    }
  }


  const hanldeSubmitQuestionQuiz = async () => {

    console.log("questions", questions)
    console.log("selectedQuiz", selectedQuiz);;
    // submitQuestion  
    // Promise.all tránh TH gọi api ko về

    // await Promise.all(questions.map(async (ques) => {
    //   let res_q = await postCreatedQuestionForQuiz(
    //     +selectedQuiz.value, ques.description, ques.imageFile)
    //   console.log("res question >>>", res_q);
    //   //submitAnswers
    //   await Promise.all(ques.answers.map(async (anwser) => {
    //     await postCreatedAnswerForQuestion(
    //       anwser.description, anwser.isCorrect, res_q.DT.id)
    //   }))
    // }));
    // todo
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz")
      return;
    }

    //validate answer
    let isValidAnswer = true;
    let indexQ = 0;
    let indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) break;
    }
    if (isValidAnswer === false) {
      toast.error(`NOT EMPTY QUESTION ${indexQ + 1} AND ANSWER ${indexA + 1}`)
      return;
    }
    //validate question
    let isValidQuestion = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQ1 = i;
        break;
      }
    }
    if (isValidQuestion === false) {

      toast.error(`Question ${indexQ1 + 1} empty Description !`)
      return;
    }

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
    let questionClone = _.cloneDeep(questions);
    for (let i = 0; i < questionClone.length; i++) {
      if (questionClone[i].imageFile) {
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile)
      }
    }
    // console.log("questionClone", questionClone);
    let res = await postUpSertQA({
      quizId: selectedQuiz.value,
      questions: questionClone,
    });
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    } else {
      toast.error(res.EM)
    }
    console.log("check res ", res);
    // setQuestions(initQuestions);
  }

  return (
    <>
      <div className='question-container container'>
        <div>
          <div className='add-new-question  '>
            <label>Select Quiz :</label>
            <Select
              defaultValue={selectedQuiz}
              onChange={setSelectedQuiz}
              options={listQuiz}
              className='col-4'
            />
            <div className='label-question '>
              <label>Add Question :</label>
            </div>
            {questions && questions.length == 0 &&
              <div className='text-danger fs-3'>Currently there are no questions....</div>
            }
            {questions && questions.length > 0
              && questions.map((ques, index) => {
                return (
                  <div key={ques.id} className=' q-main mb-3'>
                    <div className='question-content'>
                      <div className="form-floating mb-3 description ">
                        <input type="text"
                          className="form-control "
                          id="floatingInput"
                          placeholder="name@example.com"
                          onChange={(event) => handleOnChange(ques.id, event)}
                          value={ques.description}
                        />
                        <label htmlFor="floatingInput">
                          Question's {index + 1} description
                        </label>
                      </div>
                      <div className='group-upload'>
                        <label htmlFor={`${ques.id}`}>
                          <RiImageAddFill className='label-up' />
                        </label>
                        <input
                          id={`${ques.id}`}
                          type={"file"}
                          onChange={(event) => handleOnChangeFileQuestion(ques.id, event)}
                          hidden />
                        <span>
                          {ques.imageName ?
                            <span style={{ cursor: 'pointer' }}
                              onClick={() => hanlePrevImage(ques.id)}
                            > {ques.imageName}</span>
                            : " 0 file is upload"}
                        </span>
                      </div>
                      <div className='btn-add'>
                        <span
                          className='icon-add'
                          onClick={() => hanldeRemoveAddQuestion('ADD', '')}
                        >
                          <FaRegPlusSquare />
                        </span>

                        {questions && questions.length > 1
                          && <span
                            className='icon-remove'
                            onClick={() => hanldeRemoveAddQuestion('REMOVE', ques.id)}
                          >
                            <FaTrashAlt />
                          </span>
                        }
                      </div>
                    </div>

                    {ques.answers && ques.answers.length > 0
                      && ques.answers.map((answer, index) => {
                        return (
                          <div className='answers-content mb-3' key={answer.id}>
                            <input
                              className='form-check-input isCorrect'
                              type="checkbox"
                              checked={answer.isCorrect}
                              onChange={(event) => handleOnChangeAnswer('CHECKBOX', answer.id, ques.id, event)}
                            />
                            <div className="form-floating answer-input">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="name@example.com"
                                value={answer.description}
                                onChange={(event) => handleOnChangeAnswer('INPUT', answer.id, ques.id, event)}
                              />
                              <label >Answers {index + 1}</label>
                            </div>
                            <div className='btn-group '>
                              {
                                ques.answers && ques.answers.length < 4 &&
                                <span
                                  className='icon-add'
                                  onClick={(event) => hanldeRemoveAddAnswers('ADD', ques.id)}
                                >
                                  <AiOutlinePlusSquare />
                                </span>
                              }
                              {ques.answers && ques.answers.length > 1 &&
                                <span
                                  className='icon-remove'
                                  onClick={() => hanldeRemoveAddAnswers('REMOVE', ques.id, answer.id)}
                                >
                                  <FaTrashAlt />
                                </span>
                              }
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }

            {questions && questions.length > 0
              && <div>
                <button
                  onClick={() => hanldeSubmitQuestionQuiz()}
                  className='btn btn-warning mt-3'>
                  Save Update</button>
              </div>
            }
            {isShowPreImage && isShowPreImage === true
              &&
              <Lightbox
                image={dataPrevImage.url}
                title={dataPrevImage.title}
                onClose={() => setIsShowPreImage(false)}
              >
              </Lightbox>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizQA;