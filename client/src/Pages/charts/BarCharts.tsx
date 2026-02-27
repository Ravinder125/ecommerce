import toast from "react-hot-toast";
import { BarChart, DashboardLayout } from "../../components"
import { useDashboardBarChartQuery } from "../../store/api/statsAPI";

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
    const { isLoading, data, error } = useDashboardBarChartQuery();
    if (isLoading) return <div>Loading...</div>
    if (error) {
        toast.error(data?.message ?? "Something went wrong")
    }

    return (
        <DashboardLayout>
            <main className="chart-container">
                <h1>Bar Charts</h1>
                <section>
                    <h2>Top selling products & top customers</h2>
                    <BarChart
                        data_1={data?.data?.product ?? [200, 444, 343, 556, 778, 455, 990]}
                        data_2={data?.data?.users ?? [300, 144, 433, 655, 237, 755, 190]}
                        title_1="Products"
                        title_2="Users"
                        bgColor_1={`hsl(260,50%, 30%)`}
                        bgColor_2={`hsl(360,90%,90%)`}
                    />
                </section>
                <section>
                    <h2>Orders Throughout the year</h2>
                    <BarChart
                        horizontal={true}
                        data_1={data?.data?.orders ?? [200, 444, 343, 556, 778, 455, 990]}
                        data_2={[]}
                        title_1="Products"
                        title_2=""
                        bgColor_1={`hsl(180,40%, 50%)`}
                        bgColor_2=""
                        labels={months}
                    />
                </section>
            </main>

        </DashboardLayout>
    )
}

export default BarCharts