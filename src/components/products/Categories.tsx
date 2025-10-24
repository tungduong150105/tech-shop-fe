const Categories = () => {
  const categoriesList = [
    {
      id: 1,
      name: 'Accessories',
      img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:150/q:90/plain/https://media-asset.cellphones.com.vn/page_configs/01K6FA9G05VYEFVX2VCHYZY1R7.png'
    },
    {
      id: 2,
      name: 'Camera',
      img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:150/q:90/plain/https://media-asset.cellphones.com.vn/page_configs/01K6FA9HBE3PQPJEBJNS1ZZDZQ.png'
    },
    {
      id: 3,
      name: 'Laptop',
      img: 'https://imagor.owtg.one/unsafe/fit-in/240x240/https://d28jzcg6y4v9j1.cloudfront.net/logo/laptop-chinh-hang-khong-nen.png'
    },
    {
      id: 4,
      name: 'Smartphone',
      img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max_3.jpg'
    },
    {
      id: 5,
      name: 'Smartwatch',
      img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple_lte_3_21.png'
    }
  ]
  return (
    <div className="none lg:flex flex-row gap-[70px] items-center justify-center p-10">
      {categoriesList.map(category => (
        <div
          key={category.id}
          className="flex flex-col items-center shadow rounded-lg px-4 py-4 cursor-pointer"
        >
          <img
            src={category.img}
            alt={category.name}
            className="w-32 h-32 object-contain mb-2 hover:scale-110 transition-transform duration-300"
          />
          <span className="text-sm font-normal">{category.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Categories
