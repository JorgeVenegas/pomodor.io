import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

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
            name: "session",
            repetitionsGoal: 0,
            focusGoal: 0,
            restGoal: 0,
            repetitionsCompleted: 0,
            focusSessionsCompleted: 0,
            restSessionsCompleted: 0,
            isRunning: false,
            isCompleted: false,
        },
        {
            name: "activeSubsession",
            type: "",
            goal: "",
            startTime: 0,
            remainingTime: {
                hours: 0,
                minutes: 0,
                seconds: 0,
                totalInSeconds: 0
            },
            remainingPercentage: 0,
            intervalID: "",
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
        startSession(state) {
            console.log("Session started")
            const sessionStatus = state.statuses.find(status => status.name === "session")

            const focusGoal = state.goals.find(goal => goal.name === "focus")
            const restGoal = state.goals.find(goal => goal.name === "rest")
            const repetitionsGoal = state.goals.find(goal => goal.name === "repetitions")

            sessionStatus.focusGoal = focusGoal.value
            sessionStatus.restGoal = restGoal.value
            sessionStatus.repetitionsGoal = repetitionsGoal.value
        },
        startSubsession(state, action) {
            console.log("Subsession started")
            const sessionStatus = state.statuses.find(status => status.name === "session")
            const activeSubsessionStatus = state.statuses.find(status => status.name === "activeSubsession")

            sessionStatus.isRunning = true
            activeSubsessionStatus.type = action.payload.type
            activeSubsessionStatus.goal = action.payload.type == "focus" ? sessionStatus.focusGoal : sessionStatus.restGoal
            activeSubsessionStatus.startTime = new Date().getTime()
            activeSubsessionStatus.remainingTime.totalInSeconds = activeSubsessionStatus.goal * 60
        },
        updateRemainingTime(state, action) {
            const activeSubsessionStatus = state.statuses.find(status => status.name === "activeSubsession")
            activeSubsessionStatus.remainingTime.totalInSeconds--;

            const remainingTimeInHours = (Math.floor((activeSubsessionStatus.remainingTime.totalInSeconds % 86400) / 3660)).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
            const remainingTimeInMinutes = (Math.floor((activeSubsessionStatus.remainingTime.totalInSeconds % 3660) / 60)).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
            const remainingTimeInSeconds = (Math.floor(activeSubsessionStatus.remainingTime.totalInSeconds % 60)).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

            const remainingPercentage = Math.round(((activeSubsessionStatus.remainingTime.totalInSeconds / (activeSubsessionStatus.goal * 60))) * 10000) / 100

            activeSubsessionStatus.remainingTime = {
                ...activeSubsessionStatus.remainingTime,
                hours: remainingTimeInHours,
                minutes: remainingTimeInMinutes,
                seconds: remainingTimeInSeconds,
            }

            activeSubsessionStatus.remainingPercentage = remainingPercentage
        },
        pauseSession(state, action) {
            const sessionStatus = state.statuses.find(status => status.name === "session")
            sessionStatus.elapsedTime = new Date().getTime() - sessionStatus.startTime
        },
        endSubSession(state) {

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
    startSubsession,
    updateRemainingTime,
    pauseSession,
    endSubSession,
    endSession
} = TimerSlice.actions;



export default TimerSlice.reducer;