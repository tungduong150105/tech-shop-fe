import { Link, useLocation } from "react-router-dom";
import {
  User,
  DollarSign,
  ShoppingBag,
  Heart,
  Gift,
  Shield,
  Bell,
  Headphones,
  LogOut,
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  warning?: boolean;
}

const menuItems: MenuItem[] = [
  {
    icon: <User className="w-6 h-6" strokeWidth={1.5} />,
    label: "Personal Data",
    href: "/account/profile",
  },
  {
    icon: <DollarSign className="w-6 h-6" strokeWidth={1.5} />,
    label: "Payment & Instalments",
    href: "/account/payment",
  },
  {
    icon: <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />,
    label: "Orders",
    href: "/account/orders",
  },
  {
    icon: <Heart className="w-6 h-6" strokeWidth={1.5} />,
    label: "Wish list",
    href: "/account/wishlist",
  },
  {
    icon: <Gift className="w-6 h-6" strokeWidth={1.5} />,
    label: "Discounts",
    href: "/account/discounts",
  },
  {
    icon: <Shield className="w-6 h-6" strokeWidth={1.5} />,
    label: "Security & access",
    href: "/account/security",
  },
  {
    icon: <Bell className="w-6 h-6" strokeWidth={1.5} />,
    label: "Notification",
    href: "/account/notifications",
  },
  {
    icon: <Headphones className="w-6 h-6" strokeWidth={1.5} />,
    label: "Contact us",
    href: "/account/contact",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-[288px] bg-[#F9F9F9] border border-[#F6F6F6] rounded-lg pt-2 flex-shrink-0">
      {/* User Profile */}
      <div className="flex items-center gap-4 px-2 pb-0">
        <div className="w-[60px] h-[60px] rounded-full border border-[#F6F6F6] bg-[#F9F9F9] flex items-center justify-center flex-shrink-0">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.3002 33.8249C30.2502 33.8249 30.1752 33.8249 30.1252 33.8249C30.0502 33.8249 29.9502 33.8249 29.8752 33.8249C24.2002 33.6499 19.9502 29.225 19.9502 23.775C19.9502 18.225 24.4752 13.7 30.0252 13.7C35.5752 13.7 40.1002 18.225 40.1002 23.775C40.0752 29.25 35.8002 33.6499 30.3752 33.8249C30.3252 33.8249 30.3252 33.8249 30.3002 33.8249ZM30.0002 17.425C26.5002 17.425 23.6752 20.275 23.6752 23.75C23.6752 27.1749 26.3502 29.9499 29.7502 30.0749C29.8252 30.0499 30.0752 30.0499 30.3252 30.0749C33.6752 29.8999 36.3002 27.15 36.3252 23.75C36.3252 20.275 33.5002 17.425 30.0002 17.425Z"
              fill="#B4B4B4"
            />
            <path
              d="M30.0001 56.875C23.2751 56.875 16.8501 54.375 11.8751 49.825C11.4251 49.425 11.2251 48.825 11.2751 48.25C11.6001 45.275 13.4501 42.5 16.5251 40.45C23.9751 35.5 36.0501 35.5 43.4751 40.45C46.5501 42.525 48.4001 45.275 48.7251 48.25C48.8001 48.85 48.5751 49.425 48.1251 49.825C43.1501 54.375 36.7251 56.875 30.0001 56.875ZM15.2001 47.75C19.3501 51.225 24.5751 53.125 30.0001 53.125C35.4251 53.125 40.6501 51.225 44.8001 47.75C44.3501 46.225 43.1501 44.75 41.3751 43.55C35.2251 39.45 24.8001 39.45 18.6001 43.55C16.8251 44.75 15.6501 46.225 15.2001 47.75Z"
              fill="#B4B4B4"
            />
            <path
              d="M30 56.875C15.175 56.875 3.125 44.825 3.125 30C3.125 15.175 15.175 3.125 30 3.125C44.825 3.125 56.875 15.175 56.875 30C56.875 44.825 44.825 56.875 30 56.875ZM30 6.875C17.25 6.875 6.875 17.25 6.875 30C6.875 42.75 17.25 53.125 30 53.125C42.75 53.125 53.125 42.75 53.125 30C53.125 17.25 42.75 6.875 30 6.875Z"
              fill="#B4B4B4"
            />
          </svg>
        </div>
        <h2 className="text-[20px] font-medium text-[#0C0C0C]">Jimmy smith</h2>
      </div>

      {/* Menu Items */}
      <nav className="mt-0">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center gap-4 px-6 py-5 transition-colors relative ${
                isActive
                  ? "text-primary bg-white"
                  : "text-[#0C0C0C] hover:bg-white"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary" />
              )}
              <span className="text-[#444444]">{item.icon}</span>
              <span className="text-[20px] font-light leading-7">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Logout */}
        <button className="flex items-center gap-4 px-6 py-5 w-full text-left hover:bg-white transition-colors relative">
          <LogOut className="w-6 h-6 text-[#444444]" strokeWidth={1.5} />
          <span className="text-[20px] font-light leading-7 text-[#C91433]">
            Log out
          </span>
        </button>
      </nav>
    </aside>
  );
}
