import axios from "axios";
import { UserActionType } from "../Constants/UserActionType";


const BaseUrl = "http://localhost:8000";
const FormData = require('form-data');

export const getRegisterData = (values) => async (dispatch) => {
    console.log("Register dispatch")
    try {
        // dispatch({
        //     type: UserActionType.USER_REGISTER_REQUEST
        // });
        const config = {
            headers: {
                "content-type": "application/json",
            },
        };
        console.log("RegisterData save successfully");
        const { data } = await axios.post(`${BaseUrl}/api/register/`, values, config);

        dispatch({
            type: UserActionType.USER_REGISTER_SUCCESS, payload: data,
        })
    } catch (error) {
        console.log(error.response.data);
        const username = error.response.data.username;
        const password = error.response.data.password;
        const email = error.response.data.email;
        dispatch({
            type: UserActionType.USER_REGISTER_FAIL, payload: { username, password, email },
        });
    }
};

export const getLoginData = (values) => async (dispatch) => {

    console.log("\naction request data\t", values)
    const formData = new FormData();
    formData.append("username", "dhruvi_ghelani")
    formData.append("password", "Dhruvi@68")
    console.log("Login dispatch", values, typeof (values))
    let response = {}
    // localStorage.removeItem("userInfo");
    try {

        try {
            response = await axios.post(`${BaseUrl}/api/users/token/`, values);
        }
        catch (error) {

            // console.log("586989786")
            return error.response.data;

        }

        console.log("fdhdyhtyh", response)
        const username = values.username
        const token = response.data['access']
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };

        // const { data } = await axios.get(`${BaseUrl}/api/users/`, values);
        const login = await axios.post(`${BaseUrl}/api/login/`, values, config)
        dispatch({
            type: UserActionType.USER_LOGIN_SUCCESS, payload: login,
        });
        const role = login['data']
        console.log("login call", login)

        localStorage.setItem("userInfo", JSON.stringify({ username, token, role }));

    } catch (error) {
        const login_error = error.response;
        dispatch({
            type: UserActionType.USER_LOGIN_FAIL, payload: { login_error },
        });
    }
};

// export const logout = () => async (dispatch) => {
//     localStorage.removeItem("userInfo");
//     dispatch({ type: UserActionType.USER_LOGOUT });
// };

export const getUsers = () => async (dispatch) => {
    console.log("all users dispatch")
    try {

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.get(`${BaseUrl}/api/Users/`, config);
        console.log("users call");
        console.log(data)
        dispatch({
            type: UserActionType.USER_LIST_SUCCESS, payload: data,
        })
    } catch (error) {

        dispatch({
            type: UserActionType.USER_LIST_FAIL, payload: error?.response?.data,
        });
    }
};