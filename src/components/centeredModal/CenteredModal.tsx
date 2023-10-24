import { Button, Modal } from "react-bootstrap";
import { CenteredModalPropsType } from "../../types/types";
import { FormTask } from "..";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteTask } from "../../redux/states/task";

const CenteredModal = (props: CenteredModalPropsType) => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [, setShowModal] = useState<boolean>(false);
  const handleClose = () => setShowModal(false);
  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch(deleteTask(id!));
    // redirect to dashboard
    navigate("/private/dashboard");
    // close modal from child to parent component
    setShowModal(false);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.mode} Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to {props.mode.toLowerCase()} this task?</h4>

        {props.mode === "Update" ? (
          <FormTask formData={props.taskdata} handleClose={handleClose} />
        ) : (
          <p>
            This task will be deleted and you'll not be capable to restore it.
          </p>
        )}
      </Modal.Body>
      {props.mode === "Delete" && (
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};
export default CenteredModal;
