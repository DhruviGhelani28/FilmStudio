import { UserActionType } from "../Constants/UserActionType";

const initialState = {
  getMyGadgets: [],
  getGadget: {},
  addGadget: {},
  editGadget: {},
  deleteGadget: "",
};

export const getGadgetsReducer = (
  state = initialState.getMyGadgets,
  action
) => {
  switch (action.type) {
    case UserActionType.GET_MYGADGETS_SUCCESS:
      return { getMyGadgets: action.gadgets };
    case UserActionType.GET_MYGADGETS_FAIL:
      return { getMyGadgets: action.gadgets };
    default:
      return state;
  }
};
export const getGadgetReducer = (state = initialState.getGadget, action) => {
  switch (action.type) {
    case UserActionType.GET_GADGET_SUCCESS:
      return { getGadget: action.gadget };
    case UserActionType.GET_GADGET_FAIL:
      return { getGadget: action.gadget };
    default:
      return state;
  }
};
export const addGadgetReducer = (state = initialState.addGadget, action) => {
  switch (action.type) {
    case UserActionType.ADD_GADGET_SUCCESS:
      return { addGadget: action.gadget };
    case UserActionType.ADD_GADGET_FAIL:
      return { addGadget: action.gadget };
    default:
      return state;
  }
};
export const editGadgetReducer = (state = initialState.editGadget, action) => {
  switch (action.type) {
    case UserActionType.EDIT_GADGET_SUCCESS:
      return { editGadget: action.gadget };
    case UserActionType.EDIT_GADGET_FAIL:
      return { editGadget: action.gadget };
    default:
      return state;
  }
};

export const deleteGadgetReducer = (
  state = initialState.deleteGadget,
  action
) => {
  switch (action.type) {
    case UserActionType.DELETE_GADGET_SUCCESS:
      return { deleteGadget: action.gadget };
    case UserActionType.DELETE_GADGET_FAIL:
      return { deleteGadget: action.gadget };
    default:
      return state;
  }
};
