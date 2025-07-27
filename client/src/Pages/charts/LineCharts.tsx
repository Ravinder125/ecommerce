import { LineChart, DashboardLayout } from "../../components"

const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const BarCharts = () => {
    return (
        <DashboardLayout >
            <main className="chart-container">
                <h1>Line Charts</h1>
                <section>
                    <h2>Active Users</h2>
                    <LineChart
                        data={[
                            200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200,
                        ]}
                        label="Users"
                        borderColor="rgb(53, 162, 255)"
                        backgroundColor="rgba(53, 162, 255, 0.5)"
                        labels={months}
                    />
                </section>
                <section>
                    <LineChart
                        data={[
                            40, 60, 244, 100, 143, 120, 41, 41, 47, 50, 56, 32,
                        ]}
                        label="Products"
                        borderColor={"hsl(129, 80%, 40%)"}
                        backgroundColor={"rgba(0,150, 0,0.5)"}
                        labels={months}

                    />
                    <h2>Total Products (SKU)</h2>
                </section>
                <section>
                    <LineChart
                        data={[
                            9000, 12000, 12000, 9000, 1000, 5000, 4000, 1200, 1100, 1500, 1100, 1200,
                        ]}
                        label="Discount"
                        borderColor={"hsla(29, 80%, 40%, 0.4)"}
                        backgroundColor={"hsl(29, 80%,40%)"}
                        labels={months}

                    />
                    <h2>Discount Allotted</h2>
                </section>
            </main>

        </DashboardLayout >
    )
}

export default BarCharts