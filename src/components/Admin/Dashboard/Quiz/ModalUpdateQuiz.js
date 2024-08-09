import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaCamera } from "react-icons/fa"
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { putUpdateQuiz } from '../../../../Services/apiservice';
import { toast } from 'react-toastify';


const ModalUpdateQuiz = (props) => {

  const { show, setShow, dataUpdateQuiz } = props

  const handleClose = () => setShow(false);

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("Easy")
  const [image, setImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")

  // set ảnh bằng đường link URL.createOjectURL(file[0])
  const hanldeUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0])
    }
  }

  useEffect(() => {
    if (!_.isEmpty(dataUpdateQuiz)) {
      setName(dataUpdateQuiz.name)
      setDifficulty(dataUpdateQuiz.difficulty)
      setDescription(dataUpdateQuiz.description)
      if (dataUpdateQuiz.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`)
      }
    }
  }, [dataUpdateQuiz])

  const handleSubmitUpdateQuiz = async () => {
    // lấy id data cần update, còn lại có nhập từ input
    let res = await putUpdateQuiz(dataUpdateQuiz.id, name, description, difficulty, image)
    if (res && res.EC === 0) {
      toast.success(res.EM)
      props.setDataUpdateQuiz(res.DT)
      await props.fetchQuiz()
      handleClose()
    } else {
      toast.error(res.EM)
    }
    // console.log("check >>", res.DT);
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size='xl'
        className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-primary">Name</label>
              <input
                type="text"
                placeholder='Please enter your name'
                className="form-control"
                value={name}
                // disabled={true}
                onChange={(event) => setName(event.target.value)}
              />
              <div className='col-md-4'>
                <label className="form-label text-danger">Type</label>
                <select
                  className="form-select"
                  value={difficulty}
                  onChange={(event) => setDifficulty(event.target.value)}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Difficulty">Difficulty</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-success">Description</label>
              <input
                type="text"
                placeholder='Please enter username'
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className='col-md-12'>
              <label
                className="form-label lable-upload"
                htmlFor='lableUpload'
              >
                <FaCamera /> Update Image</label>
              <input
                type='file'
                id="lableUpload" hidden
                onChange={(event) => hanldeUploadImage(event)}
              />
            </div>
            <div className='col-md-12 img-preview'>
              {previewImage
                ? <img src={previewImage} />
                :
                <span>Image preview</span>
              }
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmitUpdateQuiz()}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalUpdateQuiz;