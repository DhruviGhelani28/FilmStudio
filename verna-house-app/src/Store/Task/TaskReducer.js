import { UserActionType } from "../Constants/UserActionType";

const initialState = {
    getMyTasks: [],
    addTask: {},
}

export const TaskReducer = (state = initialState.getMyTasks , action) => {
    switch (action.type) {
        case UserActionType.GET_MYTASKS_SUCCESS:
            return { getMyTasks: action.tasks }
        case UserActionType.GET_MYTASKS_FAIL:
            return { getMyTasks: action.tasks }
        default: return state;
    }

};
export const AddTaskReducer = (state = initialState.addTask , action) => {
    switch (action.type) {
        case UserActionType.ADD_TASK_SUCCESS:
            return { loading: false, success: true, addTask: action.task }
        case UserActionType.ADD_TASK_FAIL:
            return { loading: false, addTask: action.task }
        default: return state;
    }
}