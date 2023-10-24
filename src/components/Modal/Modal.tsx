import { Modal as BootstrapModal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormTask } from "..";
import { logout } from "../../redux/states/user";
import { ModalPropsType } from "../../types/types";

const Modal = ({ showModal, setShowModal, modalContent }: ModalPropsType) => {
  const { flag, modalTitle, modalDesc } = modalContent!;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);

  const handleLogOut = () => {
    // dispatch action - logout
    dispatch(logout());
    // close modal
    setShowModal(false);
    //redirect to login
    navigate("/public/login");
  };

  return (
    <BootstrapModal show={showModal} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{modalTitle}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {flag === 0 ? <FormTask handleClose={handleClose} /> : modalDesc}
      </BootstrapModal.Body>
      {/* if modal is for log out action show modal footer */}
      {flag === 1 && (
        <BootstrapModal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogOut}>
            {modalTitle}
          </Button>
        </BootstrapModal.Footer>
      )}
    </BootstrapModal>
  );
};
export default Modal;
