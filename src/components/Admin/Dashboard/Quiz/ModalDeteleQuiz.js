import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import { deleteQuiz } from "../../../../Services/apiservice";



const ModalDeteleQuiz = (props) => {
  const { show, setShow, dataDeteleQuiz } = props;

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  console.log("dataDeteleQuiz", dataDeteleQuiz);


  const handleDeleteQuiz = async () => {
    let data = await deleteQuiz(dataDeteleQuiz.id)
    console.log("check res", data);
    if (data && data.EC == 0) {
      toast.success(data.EM)
      handleClose()
      await props.fetchQuiz()
    } else {
      toast.error(data.EM)
    }
  }

  return (<>
    <Modal show={show}
      onHide={handleClose}
      backdrop="static" // kích ra ngoài ko đóng modal
      // size='xm'
      className='modal-add-user'>
      <Modal.Header closeButton>
        <Modal.Title>Delete A Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>  Are You Sure This Delete Quiz ? Email:
        {/* <b> {dataDelete && dataDelete.email ? dataDelete.email : ""}  </b> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleDeleteQuiz()}>
          Confirm
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  </>)
}

export default ModalDeteleQuiz;
