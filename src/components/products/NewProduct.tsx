const NewProduct = () => {
  const newProducts = [
    {
      _id: 1,
      name: 'MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch',
      color: 'black',
      quantity: 1,
      cost: 433.0,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_1__1_8.png'
    },
    {
      _id: 2,
      name: 'MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch',
      color: 'black',
      quantity: 1,
      cost: 433.0,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_1__1_8.png'
    },
    {
      _id: 3,
      name: 'MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch',
      color: 'black',
      quantity: 1,
      cost: 433.0,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_1__1_8.png'
    },
    {
      _id: 4,
      name: 'MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch',
      color: 'black',
      quantity: 1,
      cost: 433.0,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_1__1_8.png'
    }
  ]
  const DataRender = newProducts.slice(0, 4)
  function onClick() {
    console.log('Clicked')
  }
  function ViewAll() {
    console.log('View All Clicked')
  }
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mx-20 py-2 border-b border-b-black mb-10">
        <h2 className="text-3xl font-semibold mb-4">New Products</h2>
        <button onClick={ViewAll}>View All</button>
      </div>
      <div className="px-20 md:flex flex-rows gap-10">
        {DataRender.map(product => (
          <div
            key={product._id}
            className="shadow rounded-lg p-5 cursor-pointer"
            onClick={onClick}
          >
            <div className="flex items-center justify-center border-b border-b-black mb-5">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="font-normal">${product.cost}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NewProduct
