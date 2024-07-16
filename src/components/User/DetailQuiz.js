
import { useParams } from 'react-router-dom';
import { getDataQuiz } from '../Services/apiservice';
import { useEffect } from 'react';
const DetailQuiz = (props) => {

  const params = useParams()
  const quizID = params.id
  console.log(params);

  useEffect(() => {
    apiGetDataQuiz()
  }, [quizID])

  const apiGetDataQuiz = async () => {
    let res = await getDataQuiz(quizID)
    console.log(res);
  }

  return (
    <div>
      Comoponent Detail
    </div>
  )
}

export default DetailQuiz