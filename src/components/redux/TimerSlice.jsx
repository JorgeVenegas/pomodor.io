import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    goals: [{
        name: "focus",
        min: 15,
        max: 180,
        value: 25,
        increment: 5
    },
    {
        name: "rest",
        min: 5,
        max: 60,
        value: 5,
        increment: 5
    }, {
        name: "repetitions",
        min: 1,
        max: 12,
        value: 4,
        increment: 1
    }],
    statuses: [
        {
            name: "repetitions",
            value: 0,
            focusSessionsCompleted: 0,
            restSessionsCompleted: 0
        },
        {
            name: "session",
            type: "",
            goal: 0,
            startTime: 0,
            elapsedTime: 0
        }
    ],
};

const TimerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        incrementGoal(state, action) {
            const goalToChange = state.goals.find(goal => goal.name === action.payload)
            goalToChange.value += goalToChange.increment
        },
        decrementGoal(state, action) {
            const goalToChange = state.goals.find(goal => goal.name === action.payload)
            goalToChange.value -= goalToChange.increment
        },
        updateStatus(state, action) {
            const statusToChange = state.statuses.find(status => status.name === action.payload)
            statusToChange.value = newValue
        },
        startSession(state, action) {
            const sessionStatus = state.statuses.find(status => status.name === "session")
            const goalReference = state.goals.find(goal => goal.name === action.payload)

            sessionStatus.startTime = new Date().getTime()

            sessionStatus.goal = goalReference.value
            sessionStatus.type = action.payload
        },
        pauseSession(state, action) {
            const sessionStatus = state.statuses.find(status => status.name === "session")
            sessionStatus.elapsedTime = new Date().getTime() - sessionStatus.startTime
        },
        endSubSession(state, action) {

        },
        endSession() {

        }
    }
});

export const {
    incrementGoal,
    decrementGoal,
    updateStatus,
    startSession,
    pauseSession,
    endSubSession,
    endSession
} = TimerSlice.actions;

export default TimerSlice.reducer;