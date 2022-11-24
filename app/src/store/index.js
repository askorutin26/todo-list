import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice.js'
import modalsSlice from './modalsSlice.js';

export default configureStore({
    reducer:{
        tasks: tasksSlice,
        modals: modalsSlice,
    },
});