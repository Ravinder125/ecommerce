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
                            24000, 14440, 24100, 34000, 90000, 200000, 25600, 44700, 990000, 144000, 1255478, 120000,
                        ]}
                        label="Revenue"
                        borderColor={"hsl(129, 80%, 40%)"}
                        backgroundColor={"rgba(0,150, 0,0.5)"}
                        labels={months}

                    />
                    <h2>Total Products (SKU)</h2>
                </section>
            </main>

        </DashboardLayout >
    )
}

export default BarCharts