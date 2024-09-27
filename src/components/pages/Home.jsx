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
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';
import { decrementGoal, incrementGoal, startSession, startSubsession } from '../redux/TimerSlice'
import Timer from './home/Timer';


const Home = () => {
    const dispatch = useDispatch();

    const focusGoal = useSelector(state => state.timer.goals.find(goal => goal.name === "focus"));
    const restGoal = useSelector(state => state.timer.goals.find(goal => goal.name === "rest"));
    const repetitionsGoal = useSelector(state => state.timer.goals.find(goal => goal.name === "repetitions"));

    const sessionStatus = useSelector(state => state.timer.statuses.find(status => status.name === "session"));
    const activeSubsessionStatus = useSelector(state => state.timer.statuses.find(status => status.name === "activeSubsession"));

    const handleGoalSetting = (goal, increment) => {
        dispatch(increment ? incrementGoal(goal) : decrementGoal(goal))
    }

    const handleStartSession = () => {
        dispatch(startSession());
        dispatch(startSubsession({ type: "focus" }));
    }

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <motion.div key="drawer-trigger-button" className={`flex justify-center align-top ${sessionStatus.isRunning ? "hidden" : "visible"}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}>
                        <Button>Set Pomodoro</Button>
                    </motion.div>
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
            <Timer />
        </>
    )
}

export default Home