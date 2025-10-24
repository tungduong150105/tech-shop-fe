import RemoveCart from '../../assets/remove-cart.svg'

const CartContent = () => {
  const cartProducts = [
    {
      _id: 1,
      name: 'MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch',
      color: 'black',
      quantity: 1,
      cost: 433.0,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_1__1_8.png'
    }
  ]
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 rounded-lg shadow mb-2 px-2"
        >
          <img src={product.image} alt={product.name} className="h-20 w-20" />
          <div className="p-3">
            <h3 className="text-md font-medium">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.color}</p>
            <p className="text-sm text-gray-600 mb-2">x{product.quantity}</p>
            <div className="flex flex-row justify-between">
              <p className="text-sm font-light">${product.cost}</p>
              <div className="flex flex-row items-center gap-3">
                <img src={RemoveCart} alt="remove-cart" className="h-5 w-5" />
                <div className="flex flex-row gap-2 items-center border-b border-b-gray-300">
                  <button className="text-xl font-semi">-</button>
                  <p> {product.quantity} </p>
                  <button className="text-xl font-semi">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContent
