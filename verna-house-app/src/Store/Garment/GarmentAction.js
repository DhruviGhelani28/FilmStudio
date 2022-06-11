import axios from "axios";
import { UserActionType } from "../Constants/UserActionType";

const BaseUrl = "http://localhost:8000";

export const getMyGarments = () => async (dispatch) => {
  console.log("garments dispatch");
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseUrl}/api/MyGarments/`, config);
    console.log("garments call", response.data);
    dispatch({
      type: UserActionType.GET_MYGARMENTS_SUCCESS,
      garments: response.data,
    });
  } catch (error) {
    const garment_error = "You are not authorised person to list the garments.";
    dispatch({
      type: UserActionType.GET_MYGARMENTS_FAIL,
      garments: garment_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const getGarment = (id) => async (dispatch) => {
  console.log("garment dispatch");
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BaseUrl}/api/GetGarment/${id["id"]}`,
      config
    );
    console.log("garment call", response.data);
    dispatch({
      type: UserActionType.GET_GARMENT_SUCCESS,
      garment: response.data,
    });
  } catch (error) {
    const garment_error = "You are not authorised person to list the garment.";
    dispatch({
      type: UserActionType.GET_GARMENT_FAIL,
      garment: garment_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const addGarment = (values) => async (dispatch) => {
  console.log("addgarment dispatch");
  console.log(values["values"]);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BaseUrl}/api/AddGarment/`,
      values["values"],
      config
    );
    console.log("garment call---", response.data);
    dispatch({
      type: UserActionType.ADD_GARMENT_SUCCESS,
      garment: response.data,
    });
  } catch (error) {
    const garment_error = "You are not authorised person to ADD the garment.";
    dispatch({
      type: UserActionType.ADD_GARMENT_FAIL,
      garment: garment_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const editGarment = (values, id) => async (dispatch) => {
  console.log("edit garment dispatch", values["values"], id);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${BaseUrl}/api/EditGarment/${id}`,
      config
    );
    console.log("edit garment call", response.data);
    dispatch({
      type: UserActionType.EDIT_GARMENT_SUCCESS,
      garment: response.data,
    });
  } catch (error) {
    const garment_error = "You are not authorised person to EDIT the garments.";
    dispatch({
      type: UserActionType.EDIT_GARMENT_FAIL,
      garment: garment_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const deleteGarment = (id) => async (dispatch) => {
  console.log("delete garment dispatch", id);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `${BaseUrl}/api/DeleteGarment/${id}`,
      config
    );
    console.log("delete garment call", response.data);
    dispatch({
      type: UserActionType.DELETE_GARMENT_SUCCESS,
      garment: response.data,
    });
  } catch (error) {
    const garment_error =
      "You are not authorised person to DELETE the garments.";
    dispatch({
      type: UserActionType.DELETE_GARMENT_FAIL,
      garment: garment_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};
