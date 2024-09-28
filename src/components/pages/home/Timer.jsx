import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { endSession, endSubSession, pauseSession, resumeSession, startSubsession, updateRemainingTime } from '@/components/redux/TimerSlice';

const Timer = () => {
    const dispatch = useDispatch();

    const { sessionStatus, activeSubsessionStatus } = useSelector(state => ({
        sessionStatus: state.timer.statuses.find(status => status.name === "session"),
        activeSubsessionStatus: state.timer.statuses.find(status => status.name === "activeSubsession"),
    }));

    useEffect(() => {
        if (sessionStatus.isRunning && !sessionStatus.isPaused) {
            let interval = null;
            if (sessionStatus.repetitionsCompleted == sessionStatus.repetitionsGoal) {
                dispatch(endSession())
            }
            else if (sessionStatus.hasActiveSubsession) {
                if (activeSubsessionStatus.remainingTime.totalInSeconds > 0) { // Subsession is running
                    interval = setInterval(() => {
                        dispatch(updateRemainingTime());
                    }, 1000)
                }
                else if (activeSubsessionStatus.remainingTime.totalInSeconds == 0) { // Subsession is finished
                    interval = setInterval(() => {
                        dispatch(endSubSession())
                    }, 1000)
                }
            }
            else {
                dispatch(startSubsession())
            }

            return () => { if (interval) clearInterval(interval); }
        }
    }, [sessionStatus, activeSubsessionStatus])

    const timer = {
        start: {
            height: "0%",
        },
        counting: {
            height: `${activeSubsessionStatus.remainingPercentage}%`,
        },
    }

    const handdleSessionPause = () => {
        if (sessionStatus.isPaused) {
            dispatch(resumeSession())
        }
        else {
            dispatch(pauseSession())
        }
    }

    return (
        <>
            <motion.div
                className={`absolute bottom-0 left-0 bg-${activeSubsessionStatus.type == "focus" ? "primary" : "secondary"} w-full z-10 m-0 p-0 ${sessionStatus.isRunning ? "visible" : "hidden"} flex overflow-clip`}
                variants={timer}
                initial="start"
                animate="counting">
                <div className='text-background leading-none font-bold pb-4 px-4 md:pb-12 md:px-12 flex flex-col justify-end items-start flex-1 '>
                    <h1 className='h-fit text-xl md:text-2xl xl:text-3xl cursor-pointer z-50' onClick={handdleSessionPause}>{sessionStatus.isPaused ? "Resume" : "Pause"}</h1>
                    <h1 className='h-fit text-5xl md:text-7xl xl:text-8xl'>Time to {activeSubsessionStatus.type}.</h1>
                </div>
                <div className='text-background font-bold text-5xl md:text-7xl xl:text-8xl pb-4 px-4 md:pb-12 md:px-12 flex flex-col justify-end items-end'>
                    <h1 className='h-fit text-xl md:text-2xl xl:text-3xl'>{sessionStatus.repetitionsCompleted}/{sessionStatus.repetitionsGoal}</h1>
                    <h1 className='h-fit text-5xl md:text-7xl xl:text-8xl'>{activeSubsessionStatus.remainingTime.hours != "00" ? `${activeSubsessionStatus.remainingTime.hours}:` : ""}{activeSubsessionStatus.remainingTime.minutes != "00" ? `${activeSubsessionStatus.remainingTime.minutes}:` : ""}{activeSubsessionStatus.remainingTime.seconds}</h1>
                </div>
            </motion.div>

            <AnimatePresence>
                {(sessionStatus.isRunning && activeSubsessionStatus.remainingPercentage > 0) && (
                    <motion.div className={`absolute bottom-0 left-0 w-full z-0 m-0 p-0 ${sessionStatus.isRunning ? "visible" : "hidden"} flex`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}>
                        <div className={`${activeSubsessionStatus.type == "focus" ? "text-primary" : "text-secondary"} font-bold pb-4 px-4 md:pb-12 md:px-12 flex flex-col justify-end items-start flex-1`}>
                            <h1 className='h-fit text-xl md:text-2xl xl:text-3xl cursor-pointer z-50' onClick={handdleSessionPause}>{sessionStatus.isPaused ? "Resume" : "Pause"}</h1>
                            <h1 className='h-fit text-5xl md:text-7xl xl:text-8xl'>Time to {activeSubsessionStatus.type}.</h1>
                        </div>
                        <div className={`${activeSubsessionStatus.type == "focus" ? "text-primary" : "text-secondary"} font-bold pb-4 px-4 md:pb-12 md:px-12 flex flex-col justify-end items-end`}>
                            <h1 className='h-fit text-xl md:text-2xl xl:text-3xl'>{sessionStatus.repetitionsCompleted}/{sessionStatus.repetitionsGoal}</h1>
                            <h1 className='h-fit text-5xl md:text-7xl xl:text-8xl'>{activeSubsessionStatus.remainingTime.hours != "00" ? `${activeSubsessionStatus.remainingTime.hours}:` : ""}{activeSubsessionStatus.remainingTime.minutes != "00" ? `${activeSubsessionStatus.remainingTime.minutes}:` : ""}{activeSubsessionStatus.remainingTime.seconds}</h1>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Timer