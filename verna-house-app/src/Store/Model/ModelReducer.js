import { UserActionType } from "../Constants/UserActionType";

const initialState = {
  getModels: [],
  getModel: {},
  editModel: {},
  deleteModel: "",
};

export const getModelsReducer = (state = initialState.getModels, action) => {
  switch (action.type) {
    case UserActionType.LIST_MODEL_SUCCESS:
      return { getModels: action.models };
    case UserActionType.LIST_MODEL_FAIL:
      return { getModels: action.models };
    default:
      return state;
  }
};

export const getModelReducer = (state = initialState.getModel, action) => {
  switch (action.type) {
    case UserActionType.GET_MODEL_SUCCESS:
      return { getModel: action.model };
    case UserActionType.GET_MODEL_FAIL:
      return { getModel: action.model };
    default:
      return state;
  }
};

export const editModelReducer = (state = initialState.editModel, action) => {
  switch (action.type) {
    case UserActionType.EDIT_MODEL_SUCCESS:
      return { editModel: action.model };
    case UserActionType.EDIT_MODEL_FAIL:
      return { editModel: action.model };
    default:
      return state;
  }
};

export const deleteModelReducer = (
  state = initialState.deleteModel,
  action
) => {
  switch (action.type) {
    case UserActionType.DELETE_MODEL_SUCCESS:
      return { deleteModel: action.model };
    case UserActionType.DELETE_MODEL_FAIL:
      return { deleteModel: action.model };
    default:
      return state;
  }
};
