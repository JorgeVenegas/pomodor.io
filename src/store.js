import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './Components/redux/TimerSlice';
const store = configureStore({
    reducer: {
        timer: timerReducer,
    },
});
export default store;