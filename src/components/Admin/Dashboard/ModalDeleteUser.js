import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from "../../Services/apiservice"
import { toast } from 'react-toastify'
const ModalDeleteUser = (props) => {

  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleConfirmDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id)
    // lấy id của user cần delete (dataDelete)
    if (data && data.EC == 0) {
      toast.success(data.EM)
      handleClose()
      await props.fetchListUser()// hàm này cập nhật lại danh sách người dùng,đẩy lên thằng cha (ManagerUser để render lại giao diện)
    } else {
      toast.error(data.EM)
    }
  }

  return (
    <>
      <Modal show={show}
        onHide={handleClose}
        backdrop="static" // kích ra ngoài ko đóng modal
        size='xm'
        className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Delete A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>  Are You Sure This Delete User ? Email:
          <b> {dataDelete && dataDelete.email ? dataDelete.email : ""}  </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleConfirmDeleteUser()}>
            Confirm
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser