import React, { useEffect, useState } from 'react'
import { Minus, Plus } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';
import { decrementGoal, incrementGoal, startSession } from '../redux/TimerSlice'


const Home = () => {
    const dispatch = useDispatch();

    const focusGoal = useSelector(state => state.timer.goals.find(goal => goal.name === "focus"));
    const restGoal = useSelector(state => state.timer.goals.find(goal => goal.name === "rest"));
    const repetitionsGoal = useSelector(state => state.timer.goals.find(goal => goal.name === "repetitions"));

    const sessionStatus = useSelector(state => state.timer.statuses.find(status => status.name === "session"));
    const repetitionsStatus = useSelector(state => state.timer.statuses.find(status => status.name === "repetitions"));

    const [elapsedTime, setElapsedTime] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00"
    });
    const [remainingTime, setRemainingTime] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00"
    });

    const [timerReaminingPercentage, setTimerReaminingPercentage] = useState(0);

    useEffect(() => {
        if (sessionStatus.startTime === 0)
            return;
        const interval = setInterval(() => {
            const currentTime = new Date().getTime()
            const timeDiff = (currentTime - sessionStatus.startTime)

            const totalRemainingTimeInSeconds = (sessionStatus.goal * 60) - Math.floor(timeDiff / 1000)
            const remainingTimeInHours = (Math.floor((totalRemainingTimeInSeconds % 86400) / 3660)).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            const remainingTimeInMinutes = (Math.floor((totalRemainingTimeInSeconds % 3660) / 60)).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            const remainingTimeInSeconds = (Math.floor(totalRemainingTimeInSeconds % 60)).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });

            setRemainingTime({
                hours: remainingTimeInHours,
                minutes: remainingTimeInMinutes,
                seconds: remainingTimeInSeconds,
                totalInSeconds: totalRemainingTimeInSeconds
            });

            const totalElapsedTimeInSeconds = Math.floor(timeDiff / 1000)
            const elapsedTimeInHours = Math.floor((timeDiff % 86400000) / 3600000).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            const elapsedTimeInMinutes = Math.floor((timeDiff % 3600000) / 60000).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            const elapsedTimeInSeconds = Math.floor((timeDiff % 60000) / 1000).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });

            setElapsedTime({
                hours: elapsedTimeInHours,
                minutes: elapsedTimeInMinutes,
                seconds: elapsedTimeInSeconds,
                totalInSeconds: totalElapsedTimeInSeconds
            });

            setTimerReaminingPercentage(Math.round((1 - (totalElapsedTimeInSeconds / (sessionStatus.goal * 60))) * 10000) / 100); 
            
            if (remainingTime <= 0) {
                
            }
        }, 1000)
    }, [sessionStatus.goal])

    const handleGoalSetting = (goal, increment) => {
        dispatch(increment ? incrementGoal(goal) : decrementGoal(goal))
    }

    const handleStartSession = () => {
        dispatch(startSession("focus"))
    }



    const timer = {
        start: {
            height: "0%",
        },
        counting: {
            height: `${timerReaminingPercentage}%`,
        },
        finished: {
            height: ["0&", "100%"],
            top: [, 0]
        }
    }

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <div className='flex justify-center'>
                        <Button>Set Pomodoro</Button>
                    </div>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Pomodoro Setting</DrawerTitle>
                            <DrawerDescription>Set your focus goal.</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => handleGoalSetting("focus", false)}
                                    disabled={focusGoal.value <= focusGoal.min}
                                >
                                    <Minus className="h-4 w-4" />
                                    <span className="sr-only">Decrease</span>
                                </Button>
                                <div className="flex-1 text-center">
                                    <div className="text-7xl font-bold text-primary">
                                        {focusGoal.value}
                                    </div>
                                    <div className="text-[0.70rem] uppercase text-primary">
                                        focus minutes
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => handleGoalSetting("focus", true)}
                                    disabled={focusGoal.value >= focusGoal.max}
                                >
                                    <Plus className="h-4 w-4" />
                                    <span className="sr-only">Increase</span>
                                </Button>
                            </div>
                        </div>
                        <DrawerHeader>
                            <DrawerDescription>Set your rest goal.</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => handleGoalSetting("rest", false)}
                                    disabled={restGoal.value <= restGoal.min}
                                >
                                    <Minus className="h-4 w-4" />
                                    <span className="sr-only">Decrease</span>
                                </Button>
                                <div className="flex-1 text-center">
                                    <div className="text-7xl font-bold text-primary">
                                        {restGoal.value}
                                    </div>
                                    <div className="text-[0.70rem] uppercase text-primary">
                                        rest minutes
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => handleGoalSetting("rest", true)}
                                    disabled={restGoal.value >= restGoal.max}
                                >
                                    <Plus className="h-4 w-4" />
                                    <span className="sr-only">Increase</span>
                                </Button>
                            </div>
                        </div>
                        <DrawerHeader>
                            <DrawerDescription>Set your repetitions goal.</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => handleGoalSetting("repetitions", false)}
                                    disabled={repetitionsGoal.value <= repetitionsGoal.min}
                                >
                                    <Minus className="h-4 w-4" />
                                    <span className="sr-only">Decrease</span>
                                </Button>
                                <div className="flex-1 text-center">
                                    <div className="text-7xl font-bold text-primary">
                                        {repetitionsGoal.value}
                                    </div>
                                    <div className="text-[0.70rem] uppercase text-primary">
                                        repetitions
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => handleGoalSetting("repetitions", true)}
                                    disabled={repetitionsGoal.value >= repetitionsGoal.max}
                                >
                                    <Plus className="h-4 w-4" />
                                    <span className="sr-only">Increase</span>
                                </Button>
                            </div>
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button
                                    onClick={() => handleStartSession()}>
                                    Start
                                </Button>
                            </DrawerClose>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
            <motion.div
                className={`absolute bottom-0 left-0 bg-primary w-full z-0 ${sessionStatus.goal ? "visible" : "invisible"} flex`}
                variants={timer}
                initial="start"
                animate="counting"
                exit="finished">
                <div className='text-background font-bold text-5xl md:text-7xl xl:text-9xl p-4 flex-1 flex justify-start items-start'>
                    <h1 className='h-fit'>Time to {sessionStatus.type}.</h1></div>
                <div className='text-background font-bold text-5xl md:text-7xl xl:text-9xl p-4 flex justify-end items-end'><h1 className='h-fit'>{remainingTime.hours != "00" ? `${remainingTime.hours}:` : ""}{remainingTime.minutes != "00" ? `${remainingTime.minutes}:` : ""}{remainingTime.seconds}</h1></div>
            </motion.div>
        </>
    )
}

export default Home