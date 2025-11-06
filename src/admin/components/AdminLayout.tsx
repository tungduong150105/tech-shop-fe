import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  Home,
  ShoppingCart,
  Users,
  TicketPercent,
  Layers,
  Wallet,
  Badge,
  PlusCircle,
  Images,
  List,
  MessageSquare,
  Shield,
  Settings2,
  ExternalLink,
  Store
} from 'lucide-react'

type NavItem = {
  to: string
  label: string
  icon?: React.ComponentType<{ size?: number }>
  end?: boolean
}
type NavSection = { title?: string; items: NavItem[] }

const sections: NavSection[] = [
  {
    title: 'Main menu',
    items: [
      { to: '/admin', label: 'Dashboard', icon: Home, end: true },
      { to: '/admin/orders', label: 'Order Management', icon: ShoppingCart },
      { to: '/admin/customers', label: 'Customers', icon: Users },
      { to: '/admin/coupons', label: 'Coupon Code', icon: TicketPercent },
      { to: '/admin/categories', label: 'Categories', icon: Layers }
    ]
  },
  {
    title: 'Product',
    items: [
      { to: '/admin/products/new', label: 'Add Products', icon: PlusCircle },

      { to: '/admin/products', label: 'Product List', icon: List, end: true },
      {
        to: '/admin/product-reviews',
        label: 'Product Reviews',
        icon: MessageSquare
      }
    ]
  }
]

export default function AdminLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[256px_1fr] grid-rows-[56px_1fr]">
      <aside className="row-span-2 border-r bg-white">
        <div className="h-14 flex items-center px-4 font-semibold">
          TechShop Admin
        </div>
        <nav className="px-2 py-3 space-y-6">
          {sections.map(section => (
            <div key={section.title ?? 'root'}>
              {section.title && (
                <div className="px-3 text-xs uppercase tracking-wide text-gray-500 mb-2">
                  {section.title}
                </div>
              )}
              <div className="space-y-1">
                {section.items.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded px-3 py-2 text-sm ${
                        isActive
                          ? 'bg-green-100 text-green-700'
                          : 'hover:bg-gray-100'
                      }`
                    }
                  >
                    {item.icon ? <item.icon size={16} /> : null}
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-6 px-2">
            <Link
              to="/"
              className="mt-2 w-full inline-flex items-center gap-2 border rounded px-3 py-2 text-sm"
            >
              <Store size={16} />
              <span>Your Shop</span>
            </Link>
          </div>
        </nav>
      </aside>

      <main className="col-start-2 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
