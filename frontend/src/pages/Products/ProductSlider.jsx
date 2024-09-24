import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

export default function ProductSlide() {
  const { data: products, isLoading, isError } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      {isLoading ? null : isError ? (
        <div class="alert alert-danger" role="alert">
          Error loading products
        </div>
      ) : (
        <Slider
          {...settings}
          className="slider container"
          style={{ width: "80%", cursor: "pointer" }}
        >
          {products?.map((product) => (
            <div key={product._id}>
              <img
                src={product.image}
                className="img-fluid carousel-item rounded object-fit-cover"
                alt={product.name}
                style={{ height: "400px" }}
              />

              <div
                className="text-slider d-flex justify-content-between text-white position-relative"
                style={{ top: "140px" }}
              >
                <div className="px-2">
                  <div className="d-flex justify-content-between align-items-end">
                    <div className="">
                      <h5>{product.name}</h5>
                      <p className="text-success fw-bold">{product.price}-$</p>
                      <p>
                        <FaStar size={18} color="#F9C23C" /> Reviews:{" "}
                        {product.numReviews}
                      </p>
                      <FaStar size={18} color="#F9C23C" />
                      <FaStar size={18} color="#F9C23C" />
                      <FaStar size={18} color="#F9C23C" />
                      <FaStar size={18} color="#F9C23C" />
                      <FaStar size={18} color="#F9C23C" />
                    </div>
                    <div className="">
                      <p>
                        {" "}
                        <FaClock size={18} color="#F9C23C" /> Added:{" "}
                        {moment(product.createdAt).fromNow()}
                      </p>
                      <p>
                        <FaStore size={18} color="#F9C23C" /> Brand:{" "}
                        {product.brand}
                      </p>
                      <p>
                        <FaStar size={18} color="#F9C23C" /> Ratings:{" "}
                        {Math.round(product.rating)}
                      </p>
                      <p>
                        <FaShoppingCart size={18} color="#F9C23C" /> Quantity:{" "}
                        {product.quantity}
                      </p>
                      <p>
                        <FaBox size={18} color="#F9C23C" /> In Stock:{" "}
                        {product.countInStock}
                      </p>
                    </div>
                  </div>
                  <p className="lead fs-6">
                    {product.description.substring(0, 160)}...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
