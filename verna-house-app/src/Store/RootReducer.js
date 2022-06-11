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

import { TaskReducer, AddTaskReducer } from "./Task/TaskReducer";
import {
  getGadgetsReducer,
  getGadgetReducer,
  addGadgetReducer,
  editGadgetReducer,
} from "./Gadget/GadgetReducer";
import {
  getGarmentsReducer,
  getGarmentReducer,
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

  tasks: TaskReducer,
  addTask: AddTaskReducer,

  gadgets: getGadgetsReducer,
  gadget: getGadgetReducer,
  addGadget: addGadgetReducer,
  egadget: editGadgetReducer,

  garments: getGarmentsReducer,
  garment: getGarmentReducer,
  addGarment: addGarmentReducer,
  egarment: editGarmentReducer,

  photoposters: PhotoPosterReducer,
});

export default RootReducers;
