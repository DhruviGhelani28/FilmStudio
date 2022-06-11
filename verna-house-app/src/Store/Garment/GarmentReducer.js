import { UserActionType } from "../Constants/UserActionType";

const initialState = {
  getMyGarments: [],
  getGarment: {},
  addGarment: {},
  editGarment: {},
  deleteGarment: "",
};

export const getGarmentsReducer = (
  state = initialState.getMyGarments,
  action
) => {
  switch (action.type) {
    case UserActionType.GET_MYGARMENTS_SUCCESS:
      return { getMyGarments: action.garments };
    case UserActionType.GET_MYGARMENTS_FAIL:
      return { getMyGarments: action.garments };
    default:
      return state;
  }
};

export const getGarmentReducer = (state = initialState.getGarment, action) => {
  switch (action.type) {
    case UserActionType.GET_GARMENT_SUCCESS:
      return { getGarment: action.garment };
    case UserActionType.GET_GARMENT_FAIL:
      return { getGarment: action.garment };
    default:
      return state;
  }
};

export const addGarmentReducer = (state = initialState.addGarment, action) => {
  switch (action.type) {
    case UserActionType.ADD_GARMENT_SUCCESS:
      return { addGarment: action.garment };
    case UserActionType.ADD_GARMENT_FAIL:
      return { addGarment: action.garment };
    default:
      return state;
  }
};

export const editGarmentReducer = (
  state = initialState.editGarment,
  action
) => {
  switch (action.type) {
    case UserActionType.EDIT_GARMENT_SUCCESS:
      return { editGarment: action.garment };
    case UserActionType.EDIT_GARMENT_FAIL:
      return { editGarment: action.garment };
    default:
      return state;
  }
};

export const deleteGarmentReducer = (
  state = initialState.deleteGarment,
  action
) => {
  switch (action.type) {
    case UserActionType.DELETE_GARMENT_SUCCESS:
      return { deleteGarment: action.garment };
    case UserActionType.DELETE_GARMENT_FAIL:
      return { deleteGarment: action.garment };
    default:
      return state;
  }
};
