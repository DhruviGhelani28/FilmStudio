import axios from "axios";
import { UserActionType } from "../Constants/UserActionType";

const BaseUrl = "http://localhost:8000";
export const getAgencies = () => async (dispatch) => {
  console.log("Agency dispatch");
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseUrl}/api/Agencies/`, config);
    console.log("agency call");
    dispatch({
      type: UserActionType.GET_AGENCIES_SUCCESS,
      agencies: response.data,
    });
  } catch (error) {
    const agency_error = "You are not authorised person to list the agencies.";
    dispatch({
      type: UserActionType.GET_AGENCIES_FAIL,
      agencies: agency_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const getAgency = (id) => async (dispatch) => {
  console.log("Agency  dispatch get param:--", id["id"]);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BaseUrl}/api/Users/Agencies/${id["id"]}`,
      config
    );
    console.log("get Agency call response data:--", response.data);
    dispatch({
      type: UserActionType.GET_AGENCY_SUCCESS,
      agency: response.data,
    });
  } catch (error) {
    const agency_error = "You are not authorised person to GET the agency.";
    dispatch({
      type: UserActionType.GET_AGENCY_FAIL,
      agency: agency_error,
    });
  }
};

export const editAgency = (values, id) => async (dispatch) => {
  console.log(
    "agency dispatch edit param:--",
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
      `${BaseUrl}/api/Users/Agencies/Edit/${id}`,
      data,
      config
    );
    console.log("edit agency call response data:--", response.data);
    dispatch({
      type: UserActionType.EDIT_AGENCY_SUCCESS,
      agency: response.data,
    });
  } catch (error) {
    const agency_error = "You are not authorised person to edit the agency.";
    dispatch({
      type: UserActionType.EDIT_AGENCY_FAIL,
      agency: agency_error,
    });
  }
};

export const deleteAgency = (id) => async (dispatch) => {
  console.log("=======delete agency--", id);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `${BaseUrl}/api/DeleteAgency/${id}`,
      config
    );
    console.log("delete agency call response data:--", response.data);
    dispatch({
      type: UserActionType.DELETE_AGENCY_SUCCESS,
      agency: response.data,
    });
  } catch (error) {
    const agency_error = "You are not authorised person to DELETE the agency.";
    dispatch({
      type: UserActionType.DELETE_AGENCY_FAIL,
      agency: agency_error,
    });
  }
};
