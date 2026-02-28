import { BsSearch } from "react-icons/bs"
import {
  BarChart,
  DashboardLayout,
  DoughnutChart,
  DashboardTable as Table
} from "../components"
import { FaRegBell, FaRegUser } from "react-icons/fa6"
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi"
// import AdminSideBar from "../components/layouts/AdminSideBar"
// import data from '../assets/data.json'
import { BiMaleFemale } from "react-icons/bi"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { useTheme } from '../context/themeContext'
import { useState } from "react"
import { useDashboardQuery } from "../store/api/statsAPI"


const Dashboard = () => {
  // console.log(Math.abs(40 / 100)* 360)
  const { theme, toggleTheme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  const { data, isLoading, error } = useDashboardQuery(undefined, {
    pollingInterval: 300000
  })

  if (isLoading) return <div>Loading..</div>

  if (error) return <div>Something went wrong</div>

  return (
    <DashboardLayout>
      <main className="dashboard">
        <div className="bar" style={{ position: "relative", width: "calc(100% - 16px)" }}>
          <BsSearch onClick={() => setIsSearchOpen(true)} />
          <input
            type="text"
            placeholder="Search for data, users"
            style={{
              display: isSearchOpen ? "inline-block" : "none",
              position: isSearchOpen ? "absolute" : "static",
              width: isSearchOpen ? "calc(100% - 18px)" : "auto",
              zIndex: isSearchOpen ? 2 : 0
            }}

            onBlur={() => setIsSearchOpen(false)}

          />
          <div
            className="theme-switch"
            onClick={() => toggleTheme()}
          >
            <div style={{
              right: theme === "dark" ? "50%" : "10px"
            }}
            >
              {theme === "dark"
                ? <MdOutlineDarkMode />
                : <MdOutlineLightMode />
              }
            </div>
          </div >
          <FaRegBell />
          <div>
            <FaRegUser />
          </div>
        </div>

        <section className="widget-container">
          <WidgetItem
            heading="Revenue"
            color="rgb(0,115, 255)"
            percent={data?.data?.growth?.revenue ?? 0}
            value={data?.data?.count.revenue ?? 0}
          />
          <WidgetItem
            heading="Users"
            color="rgb(0,198, 202)"
            percent={data?.data?.growth?.users ?? 0}
            value={data?.data?.count?.users ?? 0}
          />
          <WidgetItem
            heading="Transactions"
            color="rgb(255, 196,0)"
            percent={data?.data?.growth?.orders ?? 0}
            value={data?.data?.count?.orders ?? 0}
          />
          <WidgetItem
            heading="Products"
            color="rgb(76,0, 255)"
            percent={data?.data?.growth?.products ?? 0}
            value={data?.data?.count?.products ?? 0}
          />
        </section>

        <section className="graph-container">
          <div className="revenue-chart">
            <h2>Revenue & Transaction</h2>
            <BarChart
              data_1={data?.data?.charts.revenue ?? []}
              data_2={data?.data?.charts.order ?? []}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,155, 255)"
              bgColor_2="rgba(53, 163,235, 0.8)"
            />
          </div>

          <div className="dashboard-categories">
            <h2>Inventory</h2>
            <div>
              {
                data?.data.categories.map((item, idx) => {
                  const [category, count] = Object.entries(item)[0]

                  return <CategoryItem
                    key={idx}
                    heading={category}
                    value={count}
                    color={`hsl(${(count * 4)}, ${count}%, 50%)`}
                  />
                }
                )
              }
            </div>
          </div>
        </section>
        <section className="transaction-container">
          <div className="gender-chart">
            <h2>Gender Ratio</h2>
            <DoughnutChart
              labels={["Female", "Male"]}
              data={[
                data?.data?.ratio?.female ?? 0,
                data?.data?.ratio?.male ?? 0
              ]}
              backgroundColor={["hsl(340, 82%, 56%)", "rgba(53, 162, 235, 0.8)"]}
              cutout={90}
            />
            <p><BiMaleFemale /></p>
          </div>
          <div >
            <Table data={data?.data?.modifiedLatestTransactions ?? []} />
          </div>
        </section>
      </main>
    </DashboardLayout>
  )
}

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({ heading, value, percent, amount = false, color }: WidgetItemProps) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{amount ? `$${value}` : value}</h4>
      {
        percent > 0
          ? (
            <span className="green">
              <HiTrendingUp /> + {percent}%{" "}
            </span>
          )
          : (
            <span className="red">
              <HiTrendingDown /> {percent}%{" "}
            </span>
          )
      }
    </div>

    <div
      className="widget-circle"
      style={{
        background: `conic-gradient(
      ${color} ${(Math.abs(percent / 100) * 360)}deg,
      white ${(Math.abs(percent / 100) * 360)}deg
    )`,
      }}
    >
      <span style={{ color }}>{percent}%</span>
    </div>

  </article>
)

interface CategoryItemProps {
  color: string,
  value: number,
  heading: string
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div style={{
        backgroundColor: color,
        width: `${value}%`,
      }}></div>
    </div>
    <span className="">{value}</span>
  </div>
)

export default Dashboard

// 2:2