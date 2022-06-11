import axios from "axios";
import { UserActionType } from "../Constants/UserActionType";

const BaseUrl = "http://localhost:8000";

export const getWorkers = () => async (dispatch) => {
  console.log("Workers dispatch");
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseUrl}/api/Workers/`, config);
    console.log("workers call");
    dispatch({
      type: UserActionType.GET_WORKERS_SUCCESS,
      workers: response.data,
    });
  } catch (error) {
    const worker_error = "You are not authorised person to list the workers.";
    dispatch({
      type: UserActionType.GET_WORKERS_FAIL,
      workers: worker_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const getWorker = (id) => async (dispatch) => {
  console.log("edit worker dispatch call:: --", id["id"]);

  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BaseUrl}/api/Users/Workers/${id["id"]}`,
      config
    );
    console.log("edit worker call---", response.data);
    dispatch({
      type: UserActionType.GET_WORKER_SUCCESS,
      worker: response.data,
    });
  } catch (error) {
    const worker_error = "You are not authorised person to edit the worker.";
    dispatch({
      type: UserActionType.GET_WORKER_FAIL,
      worker: worker_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const editWorker = (values, id) => async (dispatch) => {
  console.log(
    "Worker dispatch edit param:--",
    typeof values["values"],
    values,
    id
  );
  let data = values["values"];
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${BaseUrl}/api/Users/Workers/Edit/${id}`,
      data,
      config
    );
    console.log("edit Worker call response data:--", response.data);
    dispatch({
      type: UserActionType.EDIT_WORKER_SUCCESS,
      worker: response.data,
    });
  } catch (error) {
    const worker_error = "You are not authorised person to edit the Worker.";
    dispatch({
      type: UserActionType.EDIT_WORKER_FAIL,
      worker: worker_error,
    });
  }
};

export const deleteWorker = (id) => async (dispatch) => {
  console.log("Worker dispatch edit param:--", id);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `${BaseUrl}/api/DeleteWorker/${id}`,
      config
    );
    console.log("delete Worker call response data:--", response.data);
    dispatch({
      type: UserActionType.DELETE_WORKER_SUCCESS,
      worker: response.data,
    });
  } catch (error) {
    const worker_error = "You are not authorised person to DELETE the Worker.";
    dispatch({
      type: UserActionType.DELETE_WORKER_FAIL,
      worker: worker_error,
    });
  }
};
