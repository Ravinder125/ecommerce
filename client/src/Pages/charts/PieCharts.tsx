import { DashboardLayout } from "../../components"
import { DoughnutChart, PieChart } from "../../components/";
import data from '../../assets/data.json'

const PieCharts = () => {
    return (
        <DashboardLayout >
            <main className="chart-container">
                <h1>Pie & Doughnut Charts</h1>

                <section>
                    <h2>Order Fulfillment Ratio</h2>
                    <div>
                        <PieChart
                            labels={["Processing", "Shipped", "Delivered"]}
                            data={[12, 9, 13]}
                            backgroundColor={[
                                `hsl(110,80%,80%)`,
                                `hsl(110,80%,50%)`,
                                `hsl(110, 40%, 50%)`,
                            ]}
                            offset={[25, 25, 25]}
                            legend={false}
                        />
                    </div>
                </section>
                <section>
                    <h2>Order Categories Ratio</h2>
                    <div>
                        <DoughnutChart
                            labels={data.categories.map(i => i.heading)}
                            data={data.categories.map(i => i.value)}
                            backgroundColor={data.categories.map(i => `hsl(${i.value * 4}, ${i.value}%, 50%)`)}
                            offset={[10, 10, 10]}
                            legends={false}
                        />
                    </div>
                </section>
                <section>
                    <h2>Stock Availability</h2>
                    <div>
                        <DoughnutChart
                            labels={["In Stock", "Out Of Stock"]}
                            data={[40, 20]}
                            backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162,255)"]}
                            legends={false}
                            offset={[10, 10]}
                            cutout={"90"}
                        />
                    </div>
                </section>
                <section>
                    <h2>Revenue Distribution</h2>
                    <div>
                        <DoughnutChart
                            labels={[
                                "Marketing Cost",
                                "Discount",
                                "Burnt",
                                "Production Cost",
                                "Net Margin"
                            ]}
                            data={[32, 18, 5, 20, 25]}
                            backgroundColor={[
                                "hsl(110,80%,40%)",
                                "hsl(19,80%,40%)",
                                "hsl(69,80%,40%)",
                                "hsl(300,80%,40%)",
                                "rgb(53, 162,255)"
                            ]}
                            legends={false}
                            offset={[20, 30, 20, 30, 80]}
                        />
                    </div>
                </section>

                <section>
                    <h2>Users Age Group</h2>
                    <div>
                        <PieChart
                            labels={["Teenager(Below 20)", "Adult (20-40)", "Older (above 40)"]}
                            data={[30, 250, 70]}
                            backgroundColor={[
                                `hsl(110,${80}%,80%)`,
                                `hsl(110,${80}%,50%)`,
                                `hsl(110, ${50}%, 50%)`,
                            ]}
                            offset={[25, 25, 25]}
                            legend={true}
                        />
                    </div>
                </section>
                <section>
                    <div>
                        <DoughnutChart
                            labels={["Admin", "Customers"]}
                            data={[40, 250]}
                            backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162,255)"]}
                            legends={false}
                            offset={[0, 80]}
                        />
                    </div>
                </section>
            </main>

        </DashboardLayout>
    )
}

export default PieCharts