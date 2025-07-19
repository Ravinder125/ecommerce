import { lazy, Suspense } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { Loader } from './components'
const Home = lazy(() => import("./pages/Home"))
const Search = lazy(() => import("./pages/Search"))
const Cart = lazy(() => import("./pages/Cart"))
const Products = lazy(()=> import("./pages/Products"))
const Customers = lazy(()=> import("./pages/Customers"))
const Transaction = lazy(()=> import("./pages/Transaction"))
const Dashboard = lazy(()=> import("./pages/Dashboard"))

function App() {
  return (
    <Router>
      {/* Header */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          
          <Route path="/admin/products" element={<Products/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/customers" element={<Customers/>}/>
          <Route path="/admin/transaction" element={<Transaction/>}/>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
