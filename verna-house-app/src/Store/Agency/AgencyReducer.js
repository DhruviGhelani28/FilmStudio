import { UserActionType } from "../Constants/UserActionType";

const initialState = {
  getAgencies: [],
  getAgency: {},
  editAgency: {},
  deleteAgency: "",
};

export const getAgenciesReducer = (
  state = initialState.getAgencies,
  action
) => {
  switch (action.type) {
    case UserActionType.GET_AGENCIES_SUCCESS:
      return { getAgencies: action.agencies };
    case UserActionType.GET_AGENCIES_FAIL:
      return { getAgencies: action.agencies };
    default:
      return state;
  }
};

export const getAgencyReducer = (state = initialState.getAgency, action) => {
  switch (action.type) {
    case UserActionType.GET_AGENCY_SUCCESS:
      return { getAgency: action.agency };
    case UserActionType.GET_AGENCY_FAIL:
      return { getAgency: action.agency };
    default:
      return state;
  }
};

export const editAgencyReducer = (state = initialState.editAgency, action) => {
  switch (action.type) {
    case UserActionType.EDIT_AGENCY_SUCCESS:
      return { editAgency: action.agency };
    case UserActionType.EDIT_AGENCY_FAIL:
      return { editAgency: action.agency };
    default:
      return state;
  }
};

export const deleteAgencyReducer = (
  state = initialState.deleteAgency,
  action
) => {
  switch (action.type) {
    case UserActionType.DELETE_AGENCY_SUCCESS:
      return { deleteAgency: action.agency };
    case UserActionType.DELETE_AGENCY_FAIL:
      return { deleteAgency: action.agency };
    default:
      return state;
  }
};
