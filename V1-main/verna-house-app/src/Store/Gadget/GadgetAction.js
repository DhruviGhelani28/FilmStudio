import axios from "axios";
import { UserActionType } from "../Constants/UserActionType";

const BaseUrl = "http://localhost:8000";

export const getMyGadgets = () => async (dispatch) => {
  console.log("Gadgets dispatch");
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseUrl}/api/MyGadgets/`, config);
    console.log("Gadgets call");
    dispatch({
      type: UserActionType.GET_MYGADGETS_SUCCESS,
      gadgets: response.data,
    });
  } catch (error) {
    const gadget_error = "You are not authorised person to list the gadgets.";
    dispatch({
      type: UserActionType.GET_MYGADGETS_FAIL,
      gadgets: gadget_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const getGadget = (id) => async (dispatch) => {
  console.log("Gadget dispatch", id["id"]);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BaseUrl}/api/GetGadget/${id["id"]}`,
      config
    );
    console.log("Gadget call", response.data);
    dispatch({
      type: UserActionType.GET_GADGET_SUCCESS,
      gadgets: response.data,
    });
  } catch (error) {
    const gadget_error = "You are not authorised person to get the gadgets.";
    dispatch({
      type: UserActionType.GET_GADGET_FAIL,
      gadgets: gadget_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const addGadget = (values) => async (dispatch) => {
  console.log("addGadget dispatch");
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
      `${BaseUrl}/api/AddGadget/`,
      values["values"],
      config
    );
    console.log("Gadget call");
    dispatch({
      type: UserActionType.ADD_GADGET_SUCCESS,
      gadget: response.data,
    });
  } catch (error) {
    const gadget_error = "You are not authorised person to ADD the gadget.";
    dispatch({
      type: UserActionType.ADD_GADGET_FAIL,
      gadget: gadget_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const editGadget = (values, id) => async (dispatch) => {
  console.log("EDIT Gadget dispatch");
  console.log(values, id);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BaseUrl}/api/EditGadget/${id["id"]}`,
      values["values"],
      config
    );
    console.log("EIDIT Gadget call");
    dispatch({
      type: UserActionType.EDIT_GADGET_SUCCESS,
      gadget: response.data,
    });
  } catch (error) {
    const gadget_error = "You are not authorised person to edit the gadget.";
    dispatch({
      type: UserActionType.EDIT_GADGET_FAIL,
      gadget: gadget_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const deleteGadget = (id) => async (dispatch) => {
  console.log("delete Gadget dispatch", id);

  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `${BaseUrl}/api/DeleteGadget/${id}`,
      config
    );
    console.log("delete gadget call response data:--", response.data);
    dispatch({
      type: UserActionType.DELETE_GADGET_SUCCESS,
      gadget: response.data,
    });
  } catch (error) {
    const gadget_error = "You are not authorised person to delete the gadget.";
    dispatch({
      type: UserActionType.DELETE_GADGET_FAIL,
      gadget: gadget_error,
    });
  }
};
