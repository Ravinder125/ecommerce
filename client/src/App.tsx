import { lazy, Suspense } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { Loader } from './components'

// Routes
const Home = lazy(() => import("./pages/Home"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Search = lazy(() => import("./pages/Search"))
const Cart = lazy(() => import("./pages/Cart"))

// Product Management routes
const Products = lazy(() => import("./pages/Products"))
const NewProduct = lazy(() => import("./pages/management/NewProduct"))
const ProductManagement = lazy(() => import("./pages/management/ProductManagement"))
const Customers = lazy(() => import("./pages/Customers"))

// Transaction Management routes
const Transaction = lazy(() => import("./pages/Transaction"))
const TransactionManagement = lazy(() => import("./pages/management/TransactionManagement"))
const BarCharts = lazy(() => import("./pages/charts/BarCharts"))
const LineCharts = lazy(() => import("./pages/charts/LineCharts"))
const PieCharts = lazy(() => import("./pages/charts/PieCharts"))

// Apps Routes
const StopWatch = lazy(() => import("./pages/apps/StopWatch"))
const Coupon = lazy(() => import("./pages/apps/Coupon"))
const Toss = lazy(() => import("./pages/apps/Toss"))

function App() {
  return (
    <Router>
      {/* Header */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/home" element={<Home />} />

          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/transaction" element={<Transaction />} />

          {/* Charts */}
          <Route path="/admin/charts/bar" element={<BarCharts />} />
          <Route path="/admin/charts/pie" element={<PieCharts />} />
          <Route path="/admin/charts/line" element={<LineCharts />} />
          {/* Apps */}

          {/* Management */}
          <Route path="/admin/products/new" element={<NewProduct />} />
          <Route path="/admin/products/:id" element={<ProductManagement />} />
          <Route path="/admin/transactions/:id" element={<TransactionManagement />} />

          {/* Apps */}
          <Route path="/admin/apps/stopwatch" element={<StopWatch />} />
          <Route path="/admin/apps/coupon" element={<Coupon />} />
          <Route path="/admin/apps/toss" element={<Toss />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
