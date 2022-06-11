import axios from "axios";
import { UserActionType } from "../Constants/UserActionType";

const BaseUrl = "http://localhost:8000";
// export const SUPPLIER_CREATE_SUCCESS = "SUPPLIER_CREATE_SUCCESS ";
// export const SUPPLIER_CREATE_FAIL = "SUPPLIER_CREATE_FAIL ";

export const getSuppliers = () => async (dispatch) => {
  console.log("Suppliers dispatch");
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseUrl}/api/Suppliers/`, config);
    console.log("Supplier call");
    dispatch({
      type: UserActionType.GET_SUPPLIERS_SUCCESS,
      suppliers: response.data,
    });
  } catch (error) {
    const supplier_error =
      "You are not authorised person to list the suppliers.";
    dispatch({
      type: UserActionType.GET_SUPPLIERS_FAIL,
      suppliers: supplier_error,
    });
    // console.log("You are not authorised person to list the suppliers.");
  }
};

export const getSupplier = (id) => async (dispatch) => {
  console.log("supplier dispatch get param:--", id, id["id"]);
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BaseUrl}/api/Users/Suppliers/${id["id"]}`,
      config
    );
    console.log("get supplier call response data:--", response.data);
    dispatch({
      type: UserActionType.GET_SUPPLIER_SUCCESS,
      supplier: response.data,
    });
  } catch (error) {
    const supplier_error =
      "You are not authorised person to edit the supplier.";
    dispatch({
      type: UserActionType.GET_SUPPLIER_FAIL,
      supplier: supplier_error,
    });
  }
};

// export const getSupplierData = (values) => async (dispatch) => {
//     console.log("supplier dispatch")
//     try {
//         // dispatch({
//         //     type: UserActionType.USER_REGISTER_REQUEST
//         // });
//         const config = {
//             headers: {
//                 "content-type": "application/json",
//             },
//         };
//         console.log("suppllierData save successfully");
//         const { data } = await axios.post(`${BaseUrl}/api/supplierCreate/`, values, config);

//         dispatch({
//             type: SUPPLIER_CREATE_SUCCESS, payload: data,
//         })
//     } catch (error) {
//         console.log(error.response.data);
//         const username = error.response.data.username;
//         // const password = error.response.data.;
//         const email = error.response.data.email;
//         dispatch({
//             type: SUPPLIER_CREATE_FAIL, payload: { username, email },
//         });
//     }
// };

export const editSupplier = (values, id) => async (dispatch) => {
  console.log(
    "supplier dispatch edit param:--",
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
      `${BaseUrl}/api/Users/Suppliers/Edit/${id}`,
      data,
      config
    );
    console.log("edit supplier call response data:--", response.data);
    dispatch({
      type: UserActionType.EDIT_SUPPLIER_SUCCESS,
      supplier: response.data,
    });
  } catch (error) {
    const supplier_error =
      "You are not authorised person to edit the supplier.";
    dispatch({
      type: UserActionType.EDIT_SUPPLIER_FAIL,
      supplier: supplier_error,
    });
  }
};

export const deleteSupplier = (id) => async (dispatch) => {
  console.log("supplier dispatch delete param:--", id);

  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `${BaseUrl}/api/DeleteSupplier/${id}`,
      config
    );
    console.log("delete supplier call response data:--", response.data);
    dispatch({
      type: UserActionType.DELETE_SUPPLIER_SUCCESS,
      supplier: response.data,
    });
  } catch (error) {
    const supplier_error =
      "You are not authorised person to DELETE the supplier.";
    dispatch({
      type: UserActionType.DELETE_SUPPLIER_FAIL,
      supplier: supplier_error,
    });
  }
};
