import ProductCard from './ProductCard';
// import BannerCard from './BannerCard';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {products.slice(0, 9).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {products.slice(9, 15).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid