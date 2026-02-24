import { lazy, Suspense } from "react"
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom"
// import { Loader } from './components'
import { ThemeProvider } from "./context/themeContext"
import ProtectedRoutes from "./pages/ProtectedRoutes"
import PublicRoutes from "./pages/PublicRoutes"

import { Toaster } from 'react-hot-toast'
// import AuthSync from "./components/AuthSync"
import { PageSkeleton } from "./components/skeletons/PageSkeleton"
import UserProvider from "./providers/UserProvider"

// Routes


// Auth Routes 
const Signup = lazy(() => import("./pages/auth/Signup"))
const Login = lazy(() => import("./pages/auth/Login"))
const Logout = lazy(() => import("./pages/auth/Logout"))
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"))
const CompleteProfile = lazy(() => import("./pages/auth/CompleteProfile"))


const Home = lazy(() => import("./pages/Home"))
const Profile = lazy(() => import("./pages/Profile"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Search = lazy(() => import("./pages/Search"))
const Cart = lazy(() => import("./pages/Cart"))
const Shipping = lazy(() => import("./pages/Shipping"))
const Orders = lazy(() => import("./pages/Orders"))
const OrderDetails = lazy(() => import("./pages/OrderDetails"))


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


// Import your Publishable Key

function App() {


  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          {/* Header */}
          {/* <AuthSync /> */}
          <Suspense fallback={<PageSkeleton />}>
            <Routes>

              {/* Auth Routes */}
              <Route element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logout" element={<Signup />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
              </Route>

              {/* Public Routes */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/complete-profile" element={<CompleteProfile />} />
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cart" element={<Cart />} />

                <Route path="/profile" element={<Profile />} />

                {/* Private Routes (Users) */}
                <Route>
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:id" element={<OrderDetails />} />
                </Route>


                {/* <Route path="/home" element={<Home />} /> */}

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
              </Route>
            </Routes>
          </Suspense>
        </Router>
        <Toaster />
      </ThemeProvider>
     </UserProvider>
  )
}

export default App
