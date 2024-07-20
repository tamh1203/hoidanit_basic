import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResult = (props) => {

  const { show, setShow, dataAnsewrResult } = props;
  const handleClose = () => setShow(false);
  console.log(dataAnsewrResult);

  return (
    <>
      <Modal show={show}
        onHide={handleClose}
        backdrop="static" // kích ra ngoài ko đóng modal
        // size='xm'
        className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Show Detail Ansewrs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Ansewrs:<b> {dataAnsewrResult.countTotal}</b>
          </div>
          <div>
            Incorrect Ansewrs : <b> {dataAnsewrResult.countCorrect}</b>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleClose()}>
            Show Ansewrs
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult