import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserLayout from './components/layout/UserLayout'
import Home from './pages/Home'
import { Toaster } from 'sonner'
import Detail from './pages/Detail'
import Profile from './pages/Profile'
import Collection from './pages/Collection'
import AdminLayout from './admin/components/AdminLayout'
import AdminProductsList from './admin/pages/products/List'
import AdminProductEdit from './admin/pages/products/Edit'
import AdminProductCreate from './admin/pages/products/Create'
import AdminCategoriesList from './admin/pages/categories/List'
import AdminCategoryCreate from './admin/pages/categories/Create'
import AdminCategoryEdit from './admin/pages/categories/Edit'
import AdminOrdersList from './admin/pages/orders/List'
import AdminOrderDetail from './admin/pages/orders/Detail'
import AdminProductReviews from './admin/pages/reviews/ProductReviews'
import AdminDashboard from './admin/pages/dashboard'
import AdminCouponsList from './admin/pages/coupons/List'
import AdminCouponEdit from './admin/pages/coupons/Edit'
import AdminCouponCreate from './admin/pages/coupons/Create'
import AdminCustomersList from './admin/pages/customers/List'
import Cart from './pages/Cart'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            {/* User Layout */}
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/collection/:collection" element={<Collection />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products">
              <Route index element={<AdminProductsList />} />
              <Route path="new" element={<AdminProductCreate />} />
              <Route path=":id" element={<AdminProductEdit />} />
            </Route>
            <Route path="product-reviews" element={<AdminProductReviews />} />
            <Route path="coupons">
              <Route index element={<AdminCouponsList />} />
              <Route path=":id" element={<AdminCouponEdit />} />
              <Route path="new" element={<AdminCouponCreate />} />
            </Route>
            <Route path="customers" element={<AdminCustomersList />} />
            <Route path="categories">
              <Route index element={<AdminCategoriesList />} />
              <Route path="new" element={<AdminCategoryCreate />} />
              <Route path=":id" element={<AdminCategoryEdit />} />
            </Route>
            <Route path="orders">
              <Route index element={<AdminOrdersList />} />
              <Route path=":id" element={<AdminOrderDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
