import { useState } from "react";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/loader/Loader";
import Ratings from "./Ratings";
import SmallProduct from "./SmallProduct";

export default function ProductTabs({
  loadingProductReview,
  userInfo,
  product,
  rating,
  setRating,
  comment,
  setComment,
  handleSubmit,
}) {
  const { data } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="container row">
      <section className="col-md-4">
        <div
          className={`d-flex p-4 ${activeTab === 1 ? "fw-bold" : ""}`}
          onClick={() => handleTabClick(1)}
          style={{ cursor: "pointer" }}
        >
          Write Your Review
        </div>
        <div
          className={`d-flex p-4 ${activeTab === 2 ? "fw-bold" : ""}`}
          onClick={() => handleTabClick(2)}
          style={{ cursor: "pointer" }}
        >
          All Reviews
        </div>
        <div
          className={`d-flex p-4 ${activeTab === 3 ? "fw-bold" : ""}`}
          onClick={() => handleTabClick(3)}
          style={{ cursor: "pointer" }}
        >
          Related Products
        </div>
      </section>

      <section className="col-md-8">
        {activeTab === 1 && (
          <div className="mt-3">
            {userInfo ? (
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-outline mb-4">
                  <label htmlFor="rating" className="form-label">
                    Rating
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="form-select w-100"
                    id="rating"
                  >
                    <option value="">Select Rating</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="comment" className="form-label">
                    Comment
                  </label>
                  <textarea
                    className="form-control w-100"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write Your Review"
                    rows="3"
                    id="comment"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="btn btn-primary"
                >
                  Submit Review
                </button>
              </form>
            ) : (
              <div className="text-center">
                <p>
                  Please <Link to="/login">Sign in</Link> to write a review.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="col-md-8">
        {activeTab === 2 && (
          <>
            <div>
              {product.reviews.length === 0 ? (
                <p className="alert alert-danger">No Reviews</p>
              ) : (
                <>
                  <h2>All Reviews</h2>
                  {product?.reviews?.map((review, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <div className="card-title d-flex justify-content-between">
                          <strong className="text-muted">{review.name}</strong>
                          <p className="text-muted">
                            {review.createdAt.substring(0, 10)}
                          </p>
                        </div>
                        <p className="card-text">{review.comment}</p>
                        <Ratings value={review.rating} color="#F9C23C" />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </section>

      <section className="col-12">
        {activeTab === 3 && (
          <section className="d-flex flex-wrap gap-2 justify-content-center">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
}
