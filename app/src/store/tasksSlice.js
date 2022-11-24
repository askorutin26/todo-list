import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
  name: "taks",
  initialState,
  reducers: {
    addTask: tasksAdapter.addOne,
    addTasks: tasksAdapter.setAll,
    deleteTask: (state, { payload }) => {
      tasksAdapter.removeOne(state, payload);
    },
    changeTask: tasksAdapter.updateOne,
    reset: (state) => {
      state = undefined;
      console.log(state)
    },
  },
});

export const { addTask, addTasks, deleteTask, changeTask, reset } =
  tasksSlice.actions;
export const tasksSelector = tasksAdapter.getSelectors((state) => state.tasks);
export default tasksSlice.reducer;
