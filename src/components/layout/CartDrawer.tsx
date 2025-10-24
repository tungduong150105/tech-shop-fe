import { useState } from 'react'
import CartContent from '../cart/CartContent'

// @ts-ignore
import CartIcon from '../../assets/cart-icon.svg'
// @ts-ignore
import EmptyCart from '../../assets/empty-cart.png'
// @ts-ignore
import ProceedCart from '../../assets/proceed-cart.svg'

type ModalProps = {
  open: boolean
  onClose(): void
  cartItemCount?: number
  totalCost?: string
}

function Model({ open, onClose, cartItemCount, totalCost }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 top-[145px] transition-colors ${open ? 'visible bg-gray-500/10' : 'visible'}`}
      onClick={onClose}
    >
      <div
        className={`fixed top-[145px] right-10 bg-white rounded-b-lg shadow p-6 sm:w-[450px] transition-all ${open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex-grow p-2 overflow-y-auto">
          {cartItemCount ? (
            <div>
              {cartItemCount > 1 ? (
                <p className="text-lg font-light mb-4">{cartItemCount} items</p>
              ) : (
                <p className="text-lg font-light mb-4">{cartItemCount} item</p>
              )}
              <div className="flex flex-col space-y-2 mb-4">
                <CartContent />
                <CartContent />
                <CartContent />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <p className="text-lg font-light">Grand total</p>
                  <p>{totalCost}</p>
                </div>
                <div>
                  <button className="bg-blue-600 px-8 py-4 rounded-lg text-white">
                    Proceed to Cart
                    <img
                      src={ProceedCart}
                      alt="proceed-cart"
                      className="h-6 w-6 inline-block ml-2"
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-lg font-light">Your cart is empty</p>
              <img src={EmptyCart} alt="empty-cart" className="" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const CartDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(2)
  const [totalCost, setTotalCost] = useState('$200.00')
  return (
    <div className="">
      {drawerOpen && (
        <Model
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          cartItemCount={cartItemCount}
          totalCost={totalCost}
        />
      )}
      <button className="relative" onClick={e => setDrawerOpen(!drawerOpen)}>
        <img src={CartIcon} alt="Search" className="h-15 w-15" />
        {cartItemCount > 0 && (
          <span className="absolute bg-blue-600 text-white text-xs rounded-full px-2 py-1 bottom-1">
            {cartItemCount}
          </span>
        )}
      </button>
    </div>
  )
}

export default CartDrawer
