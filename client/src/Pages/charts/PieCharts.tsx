import { DashboardLayout } from "../../components"
import { DoughnutChart, PieChart } from "../../components/";
import { useDashboardPieChartQuery } from "../../store/api/statsAPI";
import toast from "react-hot-toast";

const PieCharts = () => {
    const { error, isLoading, data } = useDashboardPieChartQuery()

    if (isLoading) return <div>Loading...</div>
    if (error) {
        toast.error(data?.message ?? "Something went wrong")
    }

    const getCategories = (): [string[], number[]] => {
        const categoriesData = data?.data?.categories
        if (!categoriesData || categoriesData.length <= 1) {
            toast.error("No Categories Fount")
        }

        const arr = Object.entries(data?.data?.categories ?? {})
        const categories = arr.map(i => Object.keys(i[1])[0])
        const values = arr.map(i => Number(i[0]))
        return [categories, values]
    }


    return (
        <DashboardLayout >
            <main className="chart-container">
                <h1>Pie & Doughnut Charts</h1>

                <section>
                    <h2>Order Fulfillment Ratio</h2>
                    <div>
                        <PieChart
                            labels={["Processing", "Shipped", "Delivered", "Cancelled"]}
                            data={[
                                data?.data?.ordersFulfillment.processing ?? 0,
                                data?.data?.ordersFulfillment.shipping ?? 0,
                                data?.data?.ordersFulfillment.delivered ?? 0,
                                data?.data?.ordersFulfillment.canceled ?? 0
                            ]
                            }
                            backgroundColor={[
                                `hsl(110,80%,80%)`,
                                `hsl(110,80%,50%)`,
                                `hsl(110, 40%, 50%)`,
                            ]}
                            offset={[25, 25, 25]}
                            legend={true}
                        />
                    </div>
                </section>
                <section>
                    <h2>Order Categories Ratio</h2>
                    <div>
                        <DoughnutChart
                            labels={getCategories()[0]}
                            data={getCategories()[1]}
                            backgroundColor={getCategories()[1].map(i => `hsl(${i * 50}, ${i}%, 50%)`)}
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
                            data={[
                                data?.data?.stockAvailability.inStock ?? 0,
                                data?.data?.stockAvailability.outStock ?? 0
                            ]}
                            backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162,255)"]}
                            legends={true}
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
                            data={[
                                data?.data?.revenueDistribution.marketingCost ?? 0,
                                data?.data?.revenueDistribution.discount ?? 0,
                                data?.data?.revenueDistribution.burnt ?? 0,
                                data?.data?.revenueDistribution.productionCost ?? 0,
                                data?.data?.revenueDistribution.netMargin ?? 0
                            ]}
                            backgroundColor={[
                                "hsl(110,80%,40%)",
                                "hsl(19,80%,40%)",
                                "hsl(69,80%,40%)",
                                "hsl(300,80%,40%)",
                                "rgb(53, 162,255)"
                            ]}
                            legends={true}
                            offset={[20, 30, 20, 30, 80]}
                        />
                    </div>
                </section>

                <section>
                    <h2>Users Age Group</h2>
                    <div>
                        <PieChart
                            labels={["Teenager(Below 20)", "Adult (20-40)", "Older (above 40)"]}
                            data={[
                                data?.data?.userAgeDistribution?.teenagers ?? 0,
                                data?.data?.userAgeDistribution?.adults ?? 0,
                                data?.data?.userAgeDistribution?.olds ?? 0,
                            ]}
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
                            data={[
                                data?.data?.userRoleDistribution?.admins ?? 0,
                                data?.data?.userRoleDistribution?.admins ?? 0,
                            ]}
                            backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162,255)"]}
                            legends={true}
                            offset={[0, 80]}
                        />
                    </div>
                </section>
            </main>

        </DashboardLayout>
    )
}

export default PieCharts