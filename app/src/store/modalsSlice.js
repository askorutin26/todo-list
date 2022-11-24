import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  add: false,  
  delete: false,
  show: false,
  taskID: '',
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setShow: (state, action) => {
      const key = Object.keys(action.payload);
      const stateCopy = state;
      stateCopy[key] = action.payload[key];
    },
    setID: (state, action) => {
      const stateCopy = state;
      stateCopy.taskID = action.payload;
    },
  },
});

export const { setShow, setID } = modalsSlice.actions;

export default modalsSlice.reducer;
// store.dispatch(renameChannel({ id, changes: { removable, name } }))