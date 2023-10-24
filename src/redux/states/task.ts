import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { NewTaskType, TaskType, TasksStateType } from "../../types/types";
import { checkLocalStorage, userKey } from "../../utils";
const headers = {
  "Content-Type": "application/json",
  "x-auth-token": checkLocalStorage(userKey),
};

export const getUserTasks = createAsyncThunk<TaskType[], void>("tasks/getTasks", async () => {
  console.log(headers);
  
  const userTasks = await axios.get("http://localhost:5000/api/tasks/", {
    headers,
  });
  return userTasks.data.tasks;
});

export const newTask = createAsyncThunk<void, NewTaskType>("tasks/newTask", async (newTask: NewTaskType, thunkAPI) => {
  await axios.post("http://localhost:5000/api/tasks/", newTask, {headers});
  thunkAPI.dispatch(getUserTasks());
});

export const getSingleTask = createAsyncThunk<TaskType, string>("tasks/singleTask", async (taskId: string) => {
  const singleTaskResponse = await axios.get(`http://localhost:5000/api/tasks/${taskId}`, {headers});
  return singleTaskResponse.data;
});

export const updateTask = createAsyncThunk<TaskType, {taskId:string; taskInfo:NewTaskType}>("tasks/updateTask", async (task: {taskId:string; taskInfo:NewTaskType}) => {
  const updatedTask = await axios.put(`http://localhost:5000/api/tasks/${task.taskId}`, task.taskInfo, {headers});
  return updatedTask.data.taskUpdated;
})

export const deleteTask = createAsyncThunk("tasks/deleteTask", async(taskId:string) => {
  await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {headers});
})

export const initialState: TasksStateType = {
  tasks: [],
  singleTask: {
    title: "",
    description: "",
  },
  isLoading: false,
  error: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // get user tasks
    builder.addCase(getUserTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
      state.error = null;
    });
    builder.addCase(getUserTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // new task
    builder.addCase(newTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(newTask.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(newTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // get single task
    builder.addCase(getSingleTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleTask = action.payload;
      state.error = null;
    });
    builder.addCase(getSingleTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // update task
    builder.addCase(updateTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleTask = action.payload;
      state.error = null;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // deletedTask
    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state) => {
      state.isLoading = false;
      state.singleTask = {title: "", description: ""};
      state.error = null;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default taskSlice.reducer;
