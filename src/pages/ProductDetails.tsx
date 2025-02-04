import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useGetProductByIdQuery } from '@/redux/features/products/productsApi';


import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching product details.</div>;

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt={product?.name || 'Product'} />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <ul className="space-y-1 text-lg">
            {product?.features?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button>Add to cart</Button>
        </div>
      </div>
      <ProductReview id={id} />
    </>
  );
}
