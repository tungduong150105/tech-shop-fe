import './styles/globals.css'

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import UserLayout from './components/layout/UserLayout'
import Home from './app/pages/Home'
import { Toaster } from 'sonner'
// import Detail from './pages/Detail'
// import Profile from './pages/Profile'
// import Collection from './pages/Collection'
// import AdminLayout from './admin/components/AdminLayout'
// import AdminProductsList from './admin/pages/products/List'
// import AdminProductEdit from './admin/pages/products/Edit'
// import AdminProductCreate from './admin/pages/products/Create'
// import AdminCategoriesList from './admin/pages/categories/List'
// import AdminCategoryCreate from './admin/pages/categories/Create'
// import AdminCategoryEdit from './admin/pages/categories/Edit'
// import AdminOrdersList from './admin/pages/orders/List'
// import AdminOrderDetail from './admin/pages/orders/Detail'
// import AdminProductReviews from './admin/pages/reviews/ProductReviews'
// import AdminDashboard from './admin/pages/dashboard'
// import AdminCouponsList from './admin/pages/coupons/List'
// import AdminCouponEdit from './admin/pages/coupons/Edit'
// import AdminCouponCreate from './admin/pages/coupons/Create'
// import AdminCustomersList from './admin/pages/customers/List'
// import AdminFiltersList from './admin/pages/filters/List'
// import AdminFilterCreate from './admin/pages/filters/Create'
// import AdminFilterEdit from './admin/pages/filters/Edit'
import NotFound from './app/pages/NotFoundPage'
import { ProductCollection, ProductDetail } from '@/features/products'
import { Account } from '@/features/account'
import { Order, Checkout } from '@/features/orders'
// import Cart from './pages/Cart'
import { UserProvider } from '@/features/user'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            {/* <Route path="/" element={<UserLayout />}> */}
            {/* User Layout */}
            <Route index element={<Home />} />
            <Route path="/products" element={<ProductCollection />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/account/profile" element={<Account />} />
            <Route path="/account/wishlist" element={<Account />} />
            <Route path="/account/orders" element={<Account />} />
            <Route path="/order/" element={<Order />} />
            <Route path="/checkout/" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/product/:id" element={<Detail />} /> */}
            {/* <Route path="/profile" element={<Profile />} /> */}
            {/* <Route path="/collection/:collection" element={<Collection />} /> */}
            {/* <Route path="/cart" element={<Cart />} /> */}
            {/* </Route> */}
            {/* <Route path="/admin" element={<AdminLayout />}> */}
            {/*   <Route index element={<AdminDashboard />} /> */}
            {/*   <Route path="products"> */}
            {/*     <Route index element={<AdminProductsList />} /> */}
            {/*     <Route path="new" element={<AdminProductCreate />} /> */}
            {/*     <Route path=":id" element={<AdminProductEdit />} /> */}
            {/*   </Route> */}
            {/*   <Route path="product-reviews" element={<AdminProductReviews />} /> */}
            {/*   <Route path="coupons"> */}
            {/*     <Route index element={<AdminCouponsList />} /> */}
            {/*     <Route path=":id" element={<AdminCouponEdit />} /> */}
            {/*     <Route path="new" element={<AdminCouponCreate />} /> */}
            {/*   </Route> */}
            {/*   <Route path="customers" element={<AdminCustomersList />} /> */}
            {/*   <Route path="categories"> */}
            {/*     <Route index element={<AdminCategoriesList />} /> */}
            {/*     <Route path="new" element={<AdminCategoryCreate />} /> */}
            {/*     <Route path=":id" element={<AdminCategoryEdit />} /> */}
            {/*   </Route> */}
            {/*   <Route path="filters"> */}
            {/*     <Route index element={<AdminFiltersList />} /> */}
            {/*     <Route path="new" element={<AdminFilterCreate />} /> */}
            {/*     <Route path=":id" element={<AdminFilterEdit />} /> */}
            {/*   </Route> */}
            {/*   <Route path="orders"> */}
            {/*     <Route index element={<AdminOrdersList />} /> */}
            {/*     <Route path=":id" element={<AdminOrderDetail />} /> */}
            {/*   </Route> */}
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default App
