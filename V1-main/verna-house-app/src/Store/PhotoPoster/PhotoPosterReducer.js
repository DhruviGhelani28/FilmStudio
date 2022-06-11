import { UserActionType } from "../Constants/UserActionType";

const initialState = {
    getPhotoPosters: [],
    // addPhotoPoster: {},
}

export const PhotoPosterReducer = (state = initialState.getPhotoPosters, action) => {
    switch (action.type) {
        case UserActionType.LIST_PHOTOPOSTER_SUCCESS:
            return { getPhotoPosters: action.photoposters }
        case UserActionType.LIST_PHOTOPOSTER_FAIL:
            return { getPhotoPosters: action.photoposters }
        default: return state;
    }

};