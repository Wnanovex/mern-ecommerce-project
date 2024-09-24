import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from "../../redux/api/orderSlice";
import ProgressSteps from "../../components/ProgressSteps";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-3">
        {cart.cartItems.length === 0 ? (
          <div className="alert alert-danger" role="alert">
            Your cart is empty.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {/* map of users object */}
                {cart.cartItems?.map((item, index) => (
                  <tr key={index}>
                    <td scope="col" className="p-2">
                      <img
                        src={item.image}
                        className="flex-shrink-0 img-fluid"
                        style={{
                          width: "70px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                        alt={item.name}
                      />
                    </td>
                    <td scope="col">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </td>
                    <td scope="col">{item.qty}</td>
                    <td scope="col">$ {item.price.toFixed(2)}</td>
                    <td scope="col">$ {(item.price * item.qty).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4">
          <h2 className="mb-4">Order Summary</h2>
          <div
            className="d-flex flex-wrap justify-content-between p-3 rounded"
            style={{ backgroundColor: "#373A40" }}
          >
            <ul className="">
              <li className="list-group-item">
                <span className="fw-bold">Items:</span> $ {cart.itemsPrice}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Shipping:</span> ${" "}
                {cart.shippingPrice}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Tax:</span> $ {cart.taxPrice}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Total:</span> $ {cart.totalPrice}
              </li>
            </ul>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error.data.message}
              </div>
            )}

            <div>
              <h2 className="mb-4">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div className="">
              <h2 className="mb-4">Payment Method</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary mt-3"
            disabled={cart.cartItems === 0}
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
}
