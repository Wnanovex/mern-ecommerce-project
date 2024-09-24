import { useNavigate, useParams } from "react-router";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productApiSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import HeartIcon from "./HeartIcon";
import moment from "moment";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/cartSlice";

export default function ProductDetails() {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductDetailsQuery(productId);
  const { data: categories } = useGetAllCategoriesQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth); // take userInfo from state.auth
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review added successfully");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleAddToCart = () => {
    if (!userInfo) {
      toast.error("Please login to add product to cart");
      return;
    }

    dispatch(addToCart({ ...product, qty }));
    toast.success(`${product.name} added to cart`);
    navigate("/cart");
  };

  return (
    <>
      <div className="mt-3 mb-5 mx-4">
        <Link to="/" className="text-primary ml-3 text-decoration-none">
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div class="alert alert-danger" role="alert">
          Error loading products
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img
                src={product?.image}
                className="img-fluid"
                alt={product?.name}
                style={{ height: "500px" }}
              />
              <HeartIcon product={product} />
            </div>
            <div className="col-lg-6 mt-3 mt-lg-0">
              <h1>{product?.name}</h1>
              <p>
                Category :{" "}
                {categories?.map((c) => (
                  <span key={c._id}>
                    {c._id === product?.category && c.name}
                  </span>
                ))}
              </p>
              <p className="lead">
                <strong>Description :</strong> <br />{" "}
                <span>{product?.description}</span>
              </p>
              <p className="fs-4 text-success fw-bold">{product.price}-$</p>
              <div className="d-flex align-items-center justify-content-between">
                <div className="one">
                  <h5 className="d-flex align-items-center gap-1 mb-3">
                    <FaStore size={18} color="#F9C23C" /> Brand: {product.brand}
                  </h5>
                  <h5 className="d-flex align-items-center gap-1 mb-3">
                    <FaClock size={18} color="#F9C23C" /> Added:{" "}
                    {moment(product.createdAt).fromNow()}
                  </h5>
                  <h5 className="d-flex align-items-center gap-1 mb-3">
                    <FaStar size={18} color="#F9C23C" /> Reviews:{" "}
                    {product.numReviews}
                  </h5>
                </div>
                <div className="two">
                  <h5 className="d-flex align-items-center gap-1 mb-3">
                    <FaStar size={18} color="#F9C23C" /> Ratings:{" "}
                    {Math.round(product.rating)}
                  </h5>
                  <h5 className="d-flex align-items-center gap-1 mb-3">
                    <FaShoppingCart size={18} color="#F9C23C" /> Quantity:{" "}
                    {product.quantity}
                  </h5>
                  <h5 className="d-flex align-items-center gap-1 mb-3">
                    <FaBox size={18} color="#F9C23C" /> In Stock:{" "}
                    {product.countInStock}
                  </h5>
                </div>
              </div>
              <div className="d-flex flex-wrap justify-content-between">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color="#F9C23C"
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="form-select"
                      data-bs-theme="dark"
                    >
                      {[...Array(product.countInStock).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="mt-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.countInStock === 0}
                  className="btn px-4 text-white"
                  style={{ backgroundColor: "#E90074" }}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="col-12 mt-3 d-flex flex-wrap justify-content-between align-items-start">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                handleSubmit={handleSubmit}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
