import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardTask } from "../../../components";
import { getUserTasks } from "../../../redux/states/task";
import { AppDispatch, RootState } from "../../../redux/store";
import { TaskType } from "../../../types/types";

const Dashboard = () => {

  const userState = useSelector((state: RootState) => state.userReducer.user);
  const tasksState = useSelector((state: RootState) =>state.taskReducer.tasks);
  
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(getUserTasks());
  }, [dispatch])
  

  return (
    <section className="dashboard">
      <div className="dashboard__user">
        <h2 className="dashboard__user--title">User: { userState.username }</h2>
      </div>
      <div className="dashboard__tasks grid">
        { tasksState.length!==0 ? tasksState.map((task: TaskType) => (
          <CardTask key={task._id} taskId={task._id!} taskTitle={task.title} taskDesc={task.description} />
        )) : (
          <h1>No tasks Found!</h1>
        ) }
      </div>
    </section>
  )
}
export default Dashboard