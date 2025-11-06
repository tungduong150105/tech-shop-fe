import RemoveCart from '../../assets/remove-cart.svg'

import type { CartItem } from '../../types/cart'

interface CartProps {
  cartProducts: CartItem[]
}

const CartContent = ({cartProducts} : CartProps) => {
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 rounded-lg shadow mb-2 px-2"
        >
          <img src={product.image_url} alt={product.name} className="h-20 w-20" />
          <div className="p-3">
            <h3 className="text-md font-medium">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.color.name}</p>
            <p className="text-sm text-gray-600 mb-2">x{product.sold_quantity}</p>
            <div className="flex flex-row justify-between">
              <p className="text-sm font-light">${product.final_price}</p>
              {/* <div className="flex flex-row items-center gap-3"> */}
              {/*   <img src={RemoveCart} alt="remove-cart" className="h-5 w-5" /> */}
              {/*   <div className="flex flex-row gap-2 items-center border-b border-b-gray-300"> */}
              {/*     <button className="text-xl font-semi">-</button> */}
              {/*     <p> {product.sold_quantity} </p> */}
              {/*     <button className="text-xl font-semi">+</button> */}
              {/*   </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContent
