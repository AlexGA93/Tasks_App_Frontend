import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FormTaskPropsType, NewTaskType } from "../../types/types";
import { useDispatch } from "react-redux";
import { newTask, updateTask } from "../../redux/states/task";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const FormTask = ({ formData, handleClose }: FormTaskPropsType) => {
  const emptyFormValue = {
    title: "",
    description: "",
  };

  const [formValue, setFormValue] = useState<NewTaskType>(
    !formData ? emptyFormValue : formData
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData) {
      // update
      dispatch(updateTask({ taskId: id!, taskInfo: formValue }));
    } else {
      dispatch(newTask(formValue));
    }
    // redirect to dashboard
    navigate("/private/dashboard");
    // close modal from child to parent component
    handleClose();
  };

  return (
    <div className="new-task">
      <Form className="new-task__form form" noValidate onSubmit={handleSubmit}>
        <Row className="mb-auto">
          <Form.Group as={Col} md="auto" controlId="validationCustomTitle">
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                style={{ width: "100%", margin: "5px" }}
                placeholder="Task title..."
                aria-describedby="inputGroupPrepend"
                required
                name="title"
                value={formValue.title}
                onChange={(e) =>
                  setFormValue({ ...formValue, title: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Please enter the task title
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="mb-auto modal-textarea">
          <Form.Control
            as="textarea"
            placeholder="New Task Description"
            style={{ width: "100%", height: "100px", padding: "5px" }}
            name="description"
            value={formValue.description}
            onChange={(e) =>
              setFormValue({ ...formValue, description: e.target.value })
            }
          />
        </Row>
        <Button variant="info" type="submit">
          {formData ? "Update" : "Add New"} Task
        </Button>
      </Form>
    </div>
  );
};
export default FormTask;
