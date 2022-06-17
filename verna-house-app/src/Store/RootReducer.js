import {
  userLoginReducer,
  userRegisterReducer,
  usersReducer,
} from "./Register/RegisterReducer";

import {
  getSuppliersReducer,
  editSupplierReducer,
  getSupplierReducer,
} from "./Supplier/SupplierReducer";
import {
  getWorkersReducer,
  getWorkerReducer,
  editWorkerReducer,
} from "./Worker/WorkerReducer";
import {
  getAgenciesReducer,
  getAgencyReducer,
  editAgencyReducer,
} from "./Agency/AgencyReducer";
import {
  getCustomersReducer,
  getCustomerReducer,
  editCustomerReducer,
} from "./Customer/CustomerReducer";
import {
  getModelsReducer,
  getModelReducer,
  editModelReducer,
} from "./Model/ModelReducer";

import {
  getTasksReducer,
  addTaskReducer,
  editTaskReducer,
  deleteTaskReducer,
} from "./Task/TaskReducer";
import {
  getGadgetsReducer,
  deleteGadgetReducer,
  addGadgetReducer,
  editGadgetReducer,
} from "./Gadget/GadgetReducer";
import {
  getGarmentsReducer,
  deleteGarmentReducer,
  addGarmentReducer,
  editGarmentReducer,
} from "./Garment/GarmentReducer";
import { PhotoPosterReducer } from "./PhotoPoster/PhotoPosterReducer";

import { combineReducers } from "redux";

const RootReducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  users: usersReducer,

  // supplierData: SupplierCreateReducer,
  suppliers: getSuppliersReducer,
  supplier: getSupplierReducer,
  esupplier: editSupplierReducer,

  workers: getWorkersReducer,
  worker: getWorkerReducer,
  eworker: editWorkerReducer,

  agencies: getAgenciesReducer,
  agency: getAgencyReducer,
  eagency: editAgencyReducer,

  customers: getCustomersReducer,
  customer: getCustomerReducer,
  ecustomer: editCustomerReducer,

  models: getModelsReducer,
  model: getModelReducer,
  emodel: editModelReducer,

  tasks: getTasksReducer,
  addTask: addTaskReducer,
  etask: editTaskReducer,
  dtask: deleteTaskReducer,

  gadgets: getGadgetsReducer,
  addGadget: addGadgetReducer,
  egadget: editGadgetReducer,
  dgadget: deleteGadgetReducer,

  garments: getGarmentsReducer,
  addGarment: addGarmentReducer,
  egarment: editGarmentReducer,
  degarment: deleteGarmentReducer,

  photoposters: PhotoPosterReducer,
});

export default RootReducers;
