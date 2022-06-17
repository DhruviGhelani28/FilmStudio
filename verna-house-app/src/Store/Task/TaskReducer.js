import { UserActionType } from "../Constants/UserActionType";

const initialState = {
  getMyTasks: [],
  addTask: {},
  editTask: {},
  deleteTask: "",
};

export const getTasksReducer = (state = initialState.getMyTasks, action) => {
  switch (action.type) {
    case UserActionType.GET_MYTASKS_SUCCESS:
      return { getMyTasks: action.tasks };
    case UserActionType.GET_MYTASKS_FAIL:
      return { getMyTasks: action.tasks };
    default:
      return state;
  }
};
export const addTaskReducer = (state = initialState.addTask, action) => {
  switch (action.type) {
    case UserActionType.ADD_TASK_SUCCESS:
      return { loading: false, success: true, addTask: action.task };
    case UserActionType.ADD_TASK_FAIL:
      return { loading: false, addTask: action.task };
    default:
      return state;
  }
};

export const editTaskReducer = (state = initialState.editTask, action) => {
  switch (action.type) {
    case UserActionType.EDIT_TASK_SUCCESS:
      return { editTask: action.task };
    case UserActionType.EDIT_TASK_FAIL:
      return { editTask: action.task };
    default:
      return state;
  }
};

export const deleteTaskReducer = (state = initialState.deleteTask, action) => {
  switch (action.type) {
    case UserActionType.DELETE_TASK_SUCCESS:
      return { deleteTask: action.task };
    case UserActionType.DELETE_TASK_FAIL:
      return { deleteTask: action.task };
    default:
      return state;
  }
};
