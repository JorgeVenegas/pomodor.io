import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { updateRemainingTime } from '@/components/redux/TimerSlice';

const Timer = () => {
    const dispatch = useDispatch();

    const sessionStatus = useSelector(state => state.timer.statuses.find(status => status.name === "session"));
    const activeSubsessionStatus = useSelector(state => state.timer.statuses.find(status => status.name === "activeSubsession"));


    useEffect(() => {
        if (sessionStatus.isRunning) {
            let interval = null;
            if (activeSubsessionStatus.remainingTime.totalInSeconds > 0) { // Subsession is running
                interval = setInterval(() => {
                    dispatch(updateRemainingTime());
                }, 1000)
            }
            else if (activeSubsessionStatus.remainingTime.totalInSeconds == 0) { // Subsession is finished

                console.log("Subsession ended")
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
        finished: {
            height: ["0&", "100%"],
            top: [, 0]
        }
    }
    return (
        <>
            <motion.div
                className={`absolute bottom-0 left-0 bg-primary w-full z-10 m-0 p-0 ${activeSubsessionStatus.goal ? "visible" : "hidden"} flex overflow-clip`}
                variants={timer}
                initial="start"
                animate="counting"
                exit="finished">
                <div className='text-background font-bold text-5xl md:text-7xl xl:text-9xl p-4 md:p-12 flex justify-start items-end flex-1 '>
                    <h1 className='h-fit'>Time to {activeSubsessionStatus.type}.</h1>
                </div>
                <div className='text-background font-bold text-5xl md:text-7xl xl:text-9xl p-4 md:p-12 flex justify-end items-end'>
                    <h1 className='h-fit'>{activeSubsessionStatus.remainingTime.hours != "00" ? `${activeSubsessionStatus.remainingTime.hours}:` : ""}{activeSubsessionStatus.remainingTime.minutes != "00" ? `${activeSubsessionStatus.remainingTime.minutes}:` : ""}{activeSubsessionStatus.remainingTime.seconds}</h1>
                </div>
            </motion.div>

            <motion.div className={`absolute bottom-0 left-0 w-full z-0 m-0 p-0 ${activeSubsessionStatus.goal ? "visible" : "hidden"} flex`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 5, duration: 1 }}>
                <div className='text-primary font-bold text-5xl md:text-7xl xl:text-9xl p-4 md:p-12 flex justify-start items-end flex-1 '>
                    <h1 className='h-fit'>Time to {activeSubsessionStatus.type}.</h1>
                </div>
                <div className='text-primary font-bold text-5xl md:text-7xl xl:text-9xl p-4 md:p-12 flex justify-end items-end'>
                    <h1 className='h-fit'>{activeSubsessionStatus.remainingTime.hours != "00" ? `${activeSubsessionStatus.remainingTime.hours}:` : ""}{activeSubsessionStatus.remainingTime.minutes != "00" ? `${activeSubsessionStatus.remainingTime.minutes}:` : ""}{activeSubsessionStatus.remainingTime.seconds}</h1>
                </div>
            </motion.div>
        </>
    )
}

export default Timer