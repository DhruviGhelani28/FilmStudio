import axios from "axios";
import { UserActionType } from "../Constants/UserActionType";

const BaseUrl = "http://localhost:8000";
export const getModels = () => async (dispatch) => {
  console.log("models dispatch");
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseUrl}/api/Models/`, config);
    console.log("models call");
    dispatch({
      type: UserActionType.LIST_MODEL_SUCCESS,
      models: response.data,
    });
  } catch (error) {
    const model_error = "You are not authorised person to list the models.";
    dispatch({
      type: UserActionType.LIST_MODEL_FAIL,
      models: model_error,
    });
  }
};

export const getModel = (id) => async (dispatch) => {
  console.log("Model dispatch get param:--", id, id["id"]);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BaseUrl}/api/Users/Models/${id["id"]}`,
      config
    );
    console.log("get Model call response data:--", response.data);
    dispatch({ type: UserActionType.GET_MODEL_SUCCESS, model: response.data });
  } catch (error) {
    const model_error = "You are not authorised person to get the Model.";
    dispatch({
      type: UserActionType.GET_MODEL_FAIL,
      model: model_error,
    });
  }
};

export const editModel = (values, id) => async (dispatch) => {
  console.log(
    "Model dispatch edit param:--",
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
      `${BaseUrl}/api/Users/Models/Edit/${id}`,
      data,
      config
    );
    console.log("edit Model call response data:--", response.data);
    dispatch({ type: UserActionType.EDIT_MODEL_SUCCESS, model: response.data });
  } catch (error) {
    const model_error = "You are not authorised person to edit the Model.";
    dispatch({
      type: UserActionType.EDIT_MODEL_FAIL,
      model: model_error,
    });
  }
};

export const deleteModel = (id) => async (dispatch) => {
  console.log("Model dispatch delete param:--", id);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `${BaseUrl}/api/DeleteModel/${id}`,
      config
    );
    console.log("delete Model call response data:--", response.data);
    dispatch({
      type: UserActionType.DELETE_MODEL_SUCCESS,
      model: response.data,
    });
  } catch (error) {
    const model_error = "You are not authorised person to DELETE the Model.";
    dispatch({
      type: UserActionType.DELETE_MODEL_FAIL,
      model: model_error,
    });
  }
};
