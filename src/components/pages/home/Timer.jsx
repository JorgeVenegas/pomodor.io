import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { endSession, endSubSession, startSubsession, updateRemainingTime } from '@/components/redux/TimerSlice';

const Timer = () => {
    const dispatch = useDispatch();

    let sessionStatus = useSelector(state => state.timer.statuses.find(status => status.name === "session"));
    const activeSubsessionStatus = useSelector(state => state.timer.statuses.find(status => status.name === "activeSubsession"));

    useEffect(() => {
        if (sessionStatus.isRunning) {
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

            return () => clearInterval(interval);
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

    return (
        <>
            <motion.div
                className={`absolute bottom-0 left-0 bg-${activeSubsessionStatus.type == "focus" ? "primary" : "secondary"} w-full z-10 m-0 p-0 ${sessionStatus.isRunning ? "visible" : "hidden"} flex overflow-clip`}
                variants={timer}
                initial="start"
                animate="counting">
                <div className='text-background font-bold text-5xl md:text-7xl xl:text-8xl pb-4 px-4 md:pb-12 md:px-12 flex justify-start items-end flex-1 '>
                    <h1 className='h-fit'>Time to {activeSubsessionStatus.type}.</h1>
                </div>
                <div className='text-background font-bold text-5xl md:text-7xl xl:text-8xl pb-4 px-4 md:pb-12 md:px-12 flex flex-col justify-end items-end'>
                    <h1 className='h-fit'>{sessionStatus.repetitionsCompleted}/{sessionStatus.repetitionsGoal}</h1>
                    <h1 className='h-fit'>{activeSubsessionStatus.remainingTime.hours != "00" ? `${activeSubsessionStatus.remainingTime.hours}:` : ""}{activeSubsessionStatus.remainingTime.minutes != "00" ? `${activeSubsessionStatus.remainingTime.minutes}:` : ""}{activeSubsessionStatus.remainingTime.seconds}</h1>
                </div>
            </motion.div>

            <AnimatePresence>
                {(sessionStatus.isRunning && activeSubsessionStatus.remainingPercentage > 0) && (
                    <motion.div className={`absolute bottom-0 left-0 w-full z-0 m-0 p-0 ${sessionStatus.isRunning ? "visible" : "hidden"} flex`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}>
                        <div className={`${activeSubsessionStatus.type == "focus" ? "text-primary" : "text-secondary"} font-bold text-5xl md:text-7xl lg:text-8xl pb-4 px-4 md:pb-12 md:px-12 flex justify-start items-end flex-1`}>
                            <h1 className='h-fit'>Time to {activeSubsessionStatus.type}.</h1>
                        </div>
                        <div className={`${activeSubsessionStatus.type == "focus" ? "text-primary" : "text-secondary"} font-bold text-5xl md:text-7xl lg:text-8xl pb-4 px-4 md:pb-12 md:px-12 flex flex-col justify-end items-end`}>
                            <h1 className='h-fit'>{sessionStatus.repetitionsCompleted}/{sessionStatus.repetitionsGoal}</h1>
                            <h1 className='h-fit'>{activeSubsessionStatus.remainingTime.hours != "00" ? `${activeSubsessionStatus.remainingTime.hours}:` : ""}{activeSubsessionStatus.remainingTime.minutes != "00" ? `${activeSubsessionStatus.remainingTime.minutes}:` : ""}{activeSubsessionStatus.remainingTime.seconds}</h1>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Timer