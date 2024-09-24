import moment from "moment";
import { useGetAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";

export default function AllProducts() {
  const { data: products, isLoading, isError } = useGetAllProductsQuery();

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="alert alert-danger" role="alert">
        Error loading products
      </div>
    );

  return (
    <div className="container text-white">
      <AdminMenu />

      <h1 className="display-5 text-center">
        All Products ({products.length})
      </h1>

      <div
        className="d-flex align-items-center gap-3 flex-row flex-wrap bg-dark rounded py-3 px-2"
        style={{ justifyContent: products.length == 1 && "center" }}
      >
        {products?.map((product) => (
          <div
            className="card my-3 bg-dark border-0"
            key={product._id}
            style={{ maxWidth: "540px" }}
          >
            <div className="row g-0">
              <div className="col-sm-4 mb-3">
                <img
                  src={product.image}
                  className="img-fluid rounded-start flex-shrink-0"
                  alt="..."
                  style={{ height: "100%" }}
                />
              </div>
              <div className="col-sm-8">
                <div className="card-body text-white">
                  <small className="text-secondary float-end">
                    {moment(product.createAt).format("MMMMM Do YYYY")}
                  </small>
                  <h5 className="card-title">{product.name}</h5>

                  <p className="card-text lead fs-6">
                    {product?.description?.substring(0, 160)}...
                  </p>

                  <div className="d-flex justify-content-between">
                    <Link
                      className="btn btn-primary"
                      to={`/admin/product/edit/${product._id}`}
                    >
                      Update Product
                    </Link>
                    <p className="text-success fw-bold my-auto">
                      {product.price}$
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
