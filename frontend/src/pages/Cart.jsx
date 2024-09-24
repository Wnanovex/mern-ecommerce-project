import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleAddToCart = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const handleCheckout = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container">
        {cartItems.length === 0 ? (
          <div className="text-center">
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <h1 className="text-center">Shopping Cart</h1>
            <div className="d-flex align-items-center gap-3 flex-row flex-wrap bg-dark rounded py-3 px-2">
              {cartItems?.map((item) => (
                <div
                  className="card my-3 bg-dark border-0"
                  key={item._id}
                  style={{ maxWidth: "540px" }}
                >
                  <div className="row g-0">
                    <div className="col-sm-4 mb-3">
                      <img
                        src={item.image}
                        className="img-fluid rounded-start flex-shrink-0"
                        alt="..."
                        style={{ height: "100%" }}
                      />
                    </div>
                    <div className="col-sm-8">
                      <div className="card-body text-white">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text lead fs-6">{item.brand}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="text-success fw-bold text-center mt-3">
                            {item.price}$
                          </p>

                          <select
                            value={item.qty}
                            onChange={(e) =>
                              handleAddToCart(item, Number(e.target.value))
                            }
                            className="form-select w-25"
                            data-bs-theme="dark"
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="d-flex align-items-center gap-2 mt-3">
                          <Link
                            to={`/product/${item._id}`}
                            className="btn btn-sm btn-outline-light"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleRemoveFromCart(item._id)}
                            className="btn btn-sm btn-outline-light"
                          >
                            <FaTrash color="red" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-12">
                <div className="card bg-dark border-0">
                  <div className="card-body text-white">
                    <h2>
                      Items(
                      {cartItems.reduce(
                        (acc, item) => Number(acc) + Number(item.qty),
                        0
                      )}
                      )
                    </h2>
                    <hr />
                    <h4 className="card-title">Cart Total</h4>
                    <p className="card-text lead fs-5 btn btn-info">
                      Total :{" "}
                      <span className="text-success fw-bold">
                        {cart.cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                        $
                      </span>
                    </p>
                    <button
                      className="btn btn-primary d-block"
                      disabled={cartItems.length === 0}
                      onClick={handleCheckout}
                    >
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
