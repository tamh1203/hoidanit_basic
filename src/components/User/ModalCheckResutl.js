import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import _ from "lodash";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
import Lightbox from "react-awesome-lightbox"; //component preview image
import "./Question.scss";

const ModalCheckResult = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data, index, isSubmitQuiz, isShowAnswer } = props;
  // console.log("check props data", data);
  const [isShowPreImag, setIsShowPreImag] = useState(false)

  if (_.isEmpty(data)) {
    // data rỗng render ra mảng rỗng
    return (<></>)
  }
  // console.log("data", data);

  const handleCheckBox = (event, answerId, questionId) => {
    console.log("id answer : ", answerId, "id question : ", questionId);
    props.resultCheckBox(answerId, questionId)

  }

  return (<>
    <Button variant="primary" onClick={handleShow}>
      Launch demo modal
    </Button>

    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {data.image
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
        } */}
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
                      disabled={isSubmitQuiz}
                      checked={item.isSelected}
                      onChange={(event) => handleCheckBox(event, item.id, data.questionID)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`label ${index}`}>
                      {item.description}
                    </label>
                    {/* {console.log("item question", item)} */}
                    {isShowAnswer === true &&
                      <>
                        {item.isSelected === true && item.isCorrect === false
                          && <IoIosClose className='incorrect' />
                        }

                        {item.isCorrect === true
                          && <IoIosCheckmark className='correct' />
                        }
                      </>
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
}

export default ModalCheckResult;