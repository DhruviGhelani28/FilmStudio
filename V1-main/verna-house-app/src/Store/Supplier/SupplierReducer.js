import { UserActionType } from "../Constants/UserActionType";
const initialState = {
  getSuppliers: [],
  getSupplier: {},
  // getSupplierData: []
  editSupplier: {},
  deleteSupplier: "",
};

export const getSuppliersReducer = (
  state = initialState.getSuppliers,
  action
) => {
  switch (action.type) {
    case UserActionType.GET_SUPPLIERS_SUCCESS:
      return { getSuppliers: action.suppliers };
    case UserActionType.GET_SUPPLIERS_FAIL:
      return { getSuppliers: action.suppliers };
    default:
      return state;
  }
};

export const getSupplierReducer = (
  state = initialState.getSupplier,
  action
) => {
  switch (action.type) {
    case UserActionType.GET_SUPPLIER_SUCCESS:
      return { getSupplier: action.supplier };
    case UserActionType.GET_SUPPLIER_FAIL:
      return { getSupplier: action.supplier };
    default:
      return state;
  }
};

export const editSupplierReducer = (
  state = initialState.editSupplier,
  action
) => {
  switch (action.type) {
    case UserActionType.EDIT_SUPPLIER_SUCCESS:
      return { editSupplier: action.supplier };
    case UserActionType.EDIT_SUPPLIER_FAIL:
      return { editSupplier: action.supplier };
    default:
      return state;
  }
};
// export const SupplierCreateReducer = (state = initialState.getSupplierData, action) => {
//     switch (action.type) {
//         // case USER_REGISTER_REQUEST:
//         //     return { loading: true };
//         case SUPPLIER_CREATE_SUCCESS:
//             return { loading: false, userInfo: action.payload };
//         case SUPPLIER_CREATE_FAIL:
//             return { loading: false, error: action.payload };
//         default:
//             return state;
//     }
// };

export const deleteSupplierReducer = (
  state = initialState.deleteSupplier,
  action
) => {
  switch (action.type) {
    case UserActionType.DELETE_SUPPLIER_SUCCESS:
      return { deleteSupplier: action.supplier };
    case UserActionType.DELETE_SUPPLIER_FAIL:
      return { deleteSupplier: action.supplier };
    default:
      return state;
  }
};
