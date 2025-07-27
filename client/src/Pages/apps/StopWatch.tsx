import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components"


const formatTime = (timeInSeconds: number) => {
    const hour = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor(timeInSeconds % 3600 / 60)
    const seconds = timeInSeconds % 60

    const hourInString = hour.toString().padStart(2, "0")
    const minutesInString = minutes.toString().padStart(2, "0")
    const secondsInString = seconds.toString().padStart(2, "0")

    return `${hourInString}:${minutesInString}:${secondsInString}`
}


const StopWatch = () => {
    const [time, setTime] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);


    const resetHandler = () => {
        setIsActive(false)
        setTime(0)
    }

    useEffect(() => {
        let intervalID: number;
        if (isActive) {
            intervalID = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(intervalID)
    }, [isActive])
    return (
        <DashboardLayout>
            <main className="dashboard-app--container">
                <h1>Stopwatch</h1>
                <section>
                    <div className="stopwatch">
                        <h2>{formatTime(time)}</h2>
                        <button onClick={() => setIsActive((prev) => !prev)}>
                            {isActive ? "Stop" : "Start"}
                        </button>
                        <button onClick={resetHandler}>Reset</button>
                    </div>
                </section>
            </main>
        </DashboardLayout>
    )
}

export default StopWatch