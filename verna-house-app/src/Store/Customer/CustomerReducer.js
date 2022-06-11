import { UserActionType } from "../Constants/UserActionType";

const initialState = {
  getCustomers: [],
  getCustomer: {},
  editCustomer: {},
  deleteCustomer: "",
};

export const getCustomersReducer = (
  state = initialState.getCustomers,
  action
) => {
  switch (action.type) {
    case UserActionType.GET_CUSTOMERS_SUCCESS:
      return { getCustomers: action.customers };
    case UserActionType.GET_CUSTOMERS_FAIL:
      return { getCustomers: action.customers };
    default:
      return state;
  }
};

export const getCustomerReducer = (
  state = initialState.getCustomer,
  action
) => {
  switch (action.type) {
    case UserActionType.GET_CUSTOMER_SUCCESS:
      return { getCustomer: action.customer };
    case UserActionType.GET_CUSTOMER_FAIL:
      return { getCustomer: action.customer };
    default:
      return state;
  }
};

export const editCustomerReducer = (
  state = initialState.editCustomer,
  action
) => {
  switch (action.type) {
    case UserActionType.EDIT_CUSTOMER_SUCCESS:
      return { editCustomer: action.customer };
    case UserActionType.EDIT_CUSTOMER_FAIL:
      return { editCustomer: action.customer };
    default:
      return state;
  }
};

export const deleteCustomerReducer = (
  state = initialState.deleteCustomer,
  action
) => {
  switch (action.type) {
    case UserActionType.DELETE_CUSTOMER_SUCCESS:
      return { deleteCustomer: action.customer };
    case UserActionType.DELETE_CUSTOMER_FAIL:
      return { deleteCustomer: action.customer };
    default:
      return state;
  }
};
