import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

export default function Product({ product }) {
  return (
    <div
      className="card-product card m-3 border-0"
      style={{ width: "19rem" }}
      key={product._id}
    >
      <div className="">
        <img
          src={product.image}
          className="card-img-top flex-shrink-0 img-fluid"
          alt={product.name}
          style={{ width: "100%", height: "250px" }}
        />
        <HeartIcon product={product} />
      </div>
      <div
        className="card-body text-white"
        style={{ backgroundColor: "#373A40" }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <span className="card-text">{product.name}</span>
          <span className="text-success fw-bold">{product.price}-$</span>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Link
            to={`/product/${product._id}`}
            className="btn text-white"
            style={{ backgroundColor: "#B60071" }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
