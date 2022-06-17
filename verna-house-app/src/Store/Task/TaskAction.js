import axios from "axios";
import { UserActionType } from "../Constants/UserActionType";

const BaseUrl = "http://localhost:8000";

export const getMyTasks = (username) => async (dispatch) => {
  console.log("tasks dispatch");
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseUrl}/api/Account/MyTasks/`, config);
    console.log("tasks call");
    dispatch({
      type: UserActionType.GET_MYTASKS_SUCCESS,
      tasks: response.data,
    });
  } catch (error) {
    const task_error = "You are not authorised person to list the tasks.";
    dispatch({
      type: UserActionType.GET_MYTASKS_FAIL,
      tasks: task_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const addTask = (values) => async (dispatch) => {
  console.log("addtasks dispatch");
  console.log(values);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BaseUrl}/api/addTask/`,
      values,
      config
    );
    console.log("tasks call");
    dispatch({ type: UserActionType.ADD_TASK_SUCCESS, task: response.data });
  } catch (error) {
    const task_error = "You are not authorised person to ADD the task.";
    dispatch({
      type: UserActionType.ADD_TASK_FAIL,
      task: task_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const editTask = (values) => async (dispatch) => {
  console.log("edit tasks dispatch");
  console.log(values);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${BaseUrl}/api/EditTask/`,
      values["data"],
      config
    );
    console.log(" edit tasks call", response.data);
    dispatch({ type: UserActionType.EDIT_TASK_SUCCESS, task: response.data });
  } catch (error) {
    const task_error = "You are not authorised person to edit the task.";
    dispatch({
      type: UserActionType.EDIT_TASK_FAIL,
      task: task_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const deleteTask = (id) => async (dispatch) => {
  console.log("delete tasks dispatch");
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `${BaseUrl}/api/DeleteTask/${id}`,
      config
    );
    console.log("delete tasks call");
    // dispatch({ type: UserActionType.ADD_TASK_SUCCESS, task: response.data });
  } catch (error) {
    const task_error = "You are not authorised person to delete the task.";
    dispatch({
      type: UserActionType.DELETE_TASK_FAIL,
      task: task_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};
