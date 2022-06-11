import axios from "axios";
import { UserActionType } from "../Constants/UserActionType";

const BaseUrl = "http://localhost:8000";
export const getPhotoPosters = () => async (dispatch) => {
    console.log("photoposters dispatch");
    try {
        const token = JSON.parse(localStorage.getItem("userInfo")).token
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${BaseUrl}/api/PhotoPosters/`, config);
        console.log("photoposter call")
        dispatch({ type: UserActionType.LIST_PHOTOPOSTER_SUCCESS, photoposters: response.data });


    } catch (error) {
        const photoposter_error = "You are not authorised person to list the photposters.";
        dispatch({
            type: UserActionType.LIST_PHOTOPOSTER_FAIL, photoposters: photoposter_error,
        });
        // console.log("You are not authorised person to list the suppliers.");
    }
}