import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

export default function SmallProduct({ product }) {
  return (
    <>
      <Link
        className="card-product card text-decoration-none border-0"
        to={`/product/${product._id}`}
        key={product._id}
        style={{ width: "16rem" }}
      >
        <img
          src={product.image}
          className="card-img-top flex-shrink-0 img-fluid"
          alt={product.name}
          style={{ width: "100%", height: "150px" }}
        />
        <HeartIcon product={product} />
        <div className="card-body bg-dark text-white border-0">
          <div className="d-flex align-items-center justify-content-between">
            <span className="card-text">{product.name}</span>
            <span className="btn btn-info">{product.price}-$</span>
          </div>
        </div>
      </Link>
    </>
  );
}
