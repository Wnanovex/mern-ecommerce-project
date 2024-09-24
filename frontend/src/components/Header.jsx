import ProductSlider from "../pages/Products/ProductSlider";
import SmallProduct from "../pages/Products/SmallProduct";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";

export default function Header() {
  const { data, isLoading, isError } = useGetTopProductsQuery();

  if (isLoading) return <div></div>;
  if (isError) return <div>Error :</div>;

  return (
    <>
      <h1 className="text-center display-5">Top 4 Products</h1>

      <div className="mt-3 d-flex align-items-start justify-content-center flex-column gap-5">
        <div
          className="col-12 d-flex justify-content-center flex-wrap gap-2"
          style={{ width: "100%" }}
        >
          {data?.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product} />
            </div>
          ))}
        </div>

        <ProductSlider />
      </div>
    </>
  );
}
