import _ from "lodash"
import { useState } from "react";
import Lightbox from "react-awesome-lightbox"; //component preview image
const Question = (props) => {

  const { data, index } = props;
  // console.log("check props data", data);
  const [isShowPreImag, setIsShowPreImag] = useState(false)

  if (_.isEmpty(data)) {
    // data rỗng render ra mảng rỗng
    return (<></>)
  }

  const handleCheckBox = (event, answerId, questionId) => {
    console.log("id answer : ", answerId, "id question : ", questionId);
    props.resultCheckBox(answerId, questionId)

  }

  return (
    <>
      {data.image
        ?
        <div
          className="q-image"
        >
          <img
            style={{ cursor: "pointer" }}
            src={`data:image/jpeg;base64,${data.image}`}
            onClick={() => setIsShowPreImag(true)}
          />
          {isShowPreImag === true &&
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={"questionImage"}
              onClose={() => setIsShowPreImag(false)}
            >
            </Lightbox>
          }

        </div >

        :
        <div className="">

        </div>
      }
      <div className="question" >
        <span className="title"> Question {index + 1} : </span>
        <span className="description">{data.questionDescription}</span>
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
                    id={`label ${index}`}
                    checked={item.isSelected}
                    onChange={(event) => handleCheckBox(event, item.id, data.questionID)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`label ${index}`}>
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