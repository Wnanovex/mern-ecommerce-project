import { useParams } from "react-router";
import Header from "../components/Header.jsx";
import { useGetSomeProductsQuery } from "../redux/api/productApiSlice.js";
import { Link } from "react-router-dom";
import Product from "./Products/Product.jsx";
import Loader from "../components/loader/Loader.jsx";

export default function Home() {
  const { keyword } = useParams();

  const { data, isLoading, isError } = useGetSomeProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div class="alert alert-danger" role="alert">
          Error loading products
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-around mt-5 align-items-center">
            <h1>Special Products</h1>
            <Link to="/shop" className="btn-home-shop text-decoration-none">
              Shop Now
            </Link>
          </div>

          <div className="d-flex justify-content-center flex-wrap mt-5">
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
