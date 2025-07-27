import { useState } from "react"
import { DashboardLayout } from "../../components"

const Toss = () => {
    const [angle, setAngle] = useState<number>(0);

    const flipCoin = () => {
        const rotation = Math.random() > 0.5 ? 180 : 360
        setAngle(prev => (prev + rotation) % 3600);
    }
    const isHeads: boolean = angle % 360 === 0

    return (
        <DashboardLayout>
            <main className="dashboard-app--container">
                <h1>Toss</h1>
                <section>
                    <article
                        className="tosscoin"
                        onClick={flipCoin}
                        style={{
                            transform: `rotateY(${angle}deg)`,
                        }}
                    >
                        <div></div>
                        <div></div>
                    </article>
                    <p
                        style={{
                            fontSize: "1.5rem",
                            marginTop: "1rem"
                        }}
                    >
                        Result: {isHeads ? "Heads" : "Tails"}
                    </p>
                </section>
            </main>
        </DashboardLayout>
    )
}

export default Toss