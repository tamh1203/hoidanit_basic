import _ from "lodash"

const Question = (props) => {

  const { data, index } = props;
  // console.log("check props data", data);

  if (_.isEmpty(data)) {
    // data rỗng render ra mảng rỗng
    return <></>
  }

  const handleCheckBox = (event, answerId, questionId) => {
    console.log("id answer : ", answerId, "id question : ", questionId);
    props.resultCheckBox(answerId, questionId)

  }


  return (
    <>
      {data.image
        ?
        <div className="q-image">
          <img src={`data:image/jpeg;base64,${data.image}`} />
        </div>
        :
        <div className="">

        </div>
      }
      <div className='question'>
        Question {index + 1} : {data.questionDescription} ?
      </div>
      <div className='answers'>
        {data.answers && data.answers.length > 0 &&
          data.answers.map((item, index) => {
            return (
              <div key={index} className='a-child'>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.isSelected}
                    onChange={(event) => handleCheckBox(event, item.id, data.questionID)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault">
                    {item.description}
                  </label>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Question;