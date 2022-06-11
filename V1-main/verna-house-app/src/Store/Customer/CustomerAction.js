import axios from "axios";
import { UserActionType } from "../Constants/UserActionType";

const BaseUrl = "http://localhost:8000";
export const getCustomers = () => async (dispatch) => {
  console.log("Customer dispatch");
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseUrl}/api/Customers/`, config);
    console.log("customer call");
    dispatch({
      type: UserActionType.GET_CUSTOMERS_SUCCESS,
      customers: response.data,
    });
  } catch (error) {
    const customer_error =
      "You are not authorised person to list the customers.";
    dispatch({
      type: UserActionType.GET_CUSTOMERS_FAIL,
      customers: customer_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};
export const getCustomer = (id) => async (dispatch) => {
  console.log("Customer dispatch get param:--", id["id"]);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BaseUrl}/api/Users/Customers/${id["id"]}`,
      config
    );
    console.log("get Customer call response data:--", response.data);
    dispatch({
      type: UserActionType.GET_CUSTOMER_SUCCESS,
      customer: response.data,
    });
  } catch (error) {
    const customer_error = "You are not authorised person to GET the Customer.";
    dispatch({
      type: UserActionType.GET_CUSTOMER_FAIL,
      customer: customer_error,
    });
  }
};

export const editCustomer = (values, id) => async (dispatch) => {
  console.log(
    "Customer dispatch edit param:--",
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
      `${BaseUrl}/api/Users/Customers/Edit/${id}`,
      data,
      config
    );
    console.log("edit Customer call response data:--", response.data);
    dispatch({
      type: UserActionType.EDIT_CUSTOMER_SUCCESS,
      customer: response.data,
    });
  } catch (error) {
    const customer_error =
      "You are not authorised person to edit the Customer.";
    dispatch({
      type: UserActionType.EDIT_CUSTOMER_FAIL,
      customer: customer_error,
    });
  }
};

export const deleteCustomer = (id) => async (dispatch) => {
  console.log("Customer dispatch edit param:--", id);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `${BaseUrl}/api/DeleteCustomer/${id}`,
      config
    );
    console.log("delete Customer call response data:--", response.data);
    dispatch({
      type: UserActionType.DELETE_CUSTOMER_SUCCESS,
      customer: response.data,
    });
  } catch (error) {
    const customer_error =
      "You are not authorised person to DELETE the Customer.";
    dispatch({
      type: UserActionType.DELETE_CUSTOMER_FAIL,
      customer: customer_error,
    });
  }
};
