import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CenteredModal } from "../../../components";
import { getSingleTask } from "../../../redux/states/task";
import { AppDispatch, RootState } from "../../../redux/store";
import { TaskType } from "../../../types/types";

const SingleTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const taskdata: TaskType = useSelector((state: RootState) => state.taskReducer.singleTask);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [mode, setMode] = useState<string>('');
  

  const handleClose = () => setModalShow(false);

  const handleAction = (action: string): void => {
    
    if(action ==='Update'){
      // update
      setMode(action);
    }else if(action === 'Delete'){
      //delete
      setMode(action);
    }
    setModalShow(true);
  };

  useEffect(() => {
    // dipatch getTask with url id
    dispatch(getSingleTask(id!));
  }, [dispatch, id]);
  

  return (
    <section className="single">
      <div className="single__title">
        <h1 className="single__title--name">{ taskdata.title }</h1>
      </div>
      <div className="single__description">
        <p className="single__description--text">
          { taskdata.description }
        </p>
      </div>
      <div className="single__actions">
       <Button variant="outline-info" onClick={() => handleAction('Update') }>Update Task</Button>
       <Button variant="outline-danger" onClick={() => handleAction('Delete') }>Delete Task</Button>
      </div>
        <CenteredModal taskdata={taskdata} show={modalShow} onHide={handleClose} mode={mode} />
    </section>
  )
}
export default SingleTask