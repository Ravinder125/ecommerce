import { lazy, Suspense } from "react"
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom"
// import { Loader } from './components'
import { ThemeProvider } from "./context/themeContext"
import ProtectedRoutes from "./pages/protectedRoutes"
import PublicRoutes from "./pages/publicRoutes"

import { Toaster } from 'react-hot-toast'
// import AuthSync from "./components/AuthSync"
import { PageSkeleton } from "./components/skeletons/PageSkeleton"
import NotFound from "./pages/notFound"
import { useAppSelector } from "./store/hooks"
import { auth } from "./config/firebase"
// Routes

// Auth Routes 
const Signup = lazy(() => import("./pages/auth/signup"))
const Login = lazy(() => import("./pages/auth/login"))
// const Logout = lazy(() => import("./pages/auth/Logout"))
const VerifyEmail = lazy(() => import("./pages/auth/verifyEmail"))
const CompleteProfile = lazy(() => import("./pages/auth/completeProfile"))


const Home = lazy(() => import("./pages/home"))
const Profile = lazy(() => import("./pages/profile"))
const Dashboard = lazy(() => import("./pages/admin/dashboard"))
const Search = lazy(() => import("./pages/search"))
const Cart = lazy(() => import("./pages/cart"))
const Shipping = lazy(() => import("./pages/shipping"))
const Checkout = lazy(() => import("./pages/checkout"))
const Orders = lazy(() => import("./pages/admin/orders"))
const OrderDetails = lazy(() => import("./pages/admin/orderDetails"))

// Product Management routes
const ProductDetails = lazy(() => import("./pages/productDetails"))
const Products = lazy(() => import("./pages/admin/products"))
const NewProduct = lazy(() => import("./pages/admin/management/newProduct"))
const ProductManagement = lazy(() => import("./pages/admin/management/productManagement"))
const Customers = lazy(() => import("./pages/admin/customers"))

// Transaction Management routes
const Transaction = lazy(() => import("./pages/admin/transaction"))
const TransactionManagement = lazy(() => import("./pages/admin/management/transactionManagement"))
const BarCharts = lazy(() => import("./pages/charts/barCharts"))
const LineCharts = lazy(() => import("./pages/charts/lineCharts"))
const PieCharts = lazy(() => import("./pages/charts/pieCharts"))

// Apps Routes
const StopWatch = lazy(() => import("./pages/admin/apps/stopWatch"))
const Coupon = lazy(() => import("./pages/admin/apps/coupon"))
const Toss = lazy(() => import("./pages/admin/apps/toss"))

function App() {
  const { isLoading, user } = useAppSelector(state => state.user)

  const firebaseUser = auth.currentUser

  console.log(!!user, !!firebaseUser, isLoading)
  if (isLoading) return <div>Loading...</div>

  return (
    <ThemeProvider>
      <Router>
        {/* Header */}
        {/* <AuthSync /> */}
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />

            {/* Auth Routes */}
            <Route element={<PublicRoutes authenticated={!!firebaseUser} profileCompleted={!!user?.email} />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Signup />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/complete-profile" element={<CompleteProfile />} />
            </Route>

            {/* Public Routes */}
            <Route element={<ProtectedRoutes authenticated={!!firebaseUser} isAdmin={user?.role === "admin"} profileCompleted={!!user} />}>

              <Route path="/profile" element={<Profile />} />

              {/* Private Routes (Users) */}
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/pay" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />

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
  )
}

export default App
