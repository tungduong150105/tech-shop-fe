import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'
import Home from './pages/Home'
import { Toaster } from 'sonner'
import Detail from './pages/Detail'
import Profile from './pages/Profile'
import Collection from './pages/Collection'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          {/* User Layout */}
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collection/:collection" element={<Collection />} />
        </Route>
        <Route>{/* Admin Layout */}</Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
