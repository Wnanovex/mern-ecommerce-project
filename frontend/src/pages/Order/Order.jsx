import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderSlice";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Order() {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadingPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [errorPayPal, order, loadingPayPal, paypal, paypalDispatch]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order Paid successful");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const handleDeliver = async () => {
    await deliverOrder(orderId);
    refetch();
    toast.success("Order delivered successful");
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <div className="alert alert-danger" role="alert">
      {error.data.message}
    </div>
  ) : (
    <div className="container d-flex flex-column flex-md-row gap-4">
      <div className="col-12 col-md-6">
        {order.orderItems.length === 0 ? (
          <div className="alert alert-danger" role="alert">
            Order is empty
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {/* map of users object */}
                {order.orderItems?.map((item, index) => (
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
                    <td scope="col">$ {item.price}</td>
                    <td scope="col">$ {(item.price * item.qty).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="col-12 col-md-6">
        <h2 className="fw-bold mb-3">Shipping</h2>
        <p className="mt-2">
          <strong className="text-danger">Order:</strong> {order._id}
        </p>
        <p className="mt-2">
          <strong className="text-danger">Name:</strong> {order.user.username}
        </p>
        <p className="mt-2">
          <strong className="text-danger">Email:</strong> {order.user.email}
        </p>
        <p className="mt-2">
          <strong className="text-danger">Address:</strong>{" "}
          {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
          {order.shippingAddress.postalCode}, {order.shippingAddress.country}
        </p>
        <p className="mt-2">
          <strong className="text-danger">Method:</strong> {order.paymentMethod}
        </p>
        {order.isPaid ? (
          <div className="alert alert-success" role="alert">
            Paid on <strong>{order.paidAt.substring(0,10)}</strong>
          </div>
        ) : (
          <div className="alert alert-danger" role="alert">
            Not Paid
          </div>
        )}

        <h2>Order Summary</h2>
        <div className="d-flex justify-content-between mb-2">
          <span>Items</span>
          <span>$ {order.itemsPrice}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Shipping</span>
          <span>$ {order.shippingPrice}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Tax</span>
          <span>$ {order.taxPrice}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Total</span>
          <span>$ {order.totalPrice}</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}{" "}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              </div>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && (
          <button className="btn btn-primary" onClick={handleDeliver}>
            Mark As Delivered
          </button>
        )}

        {order.isDelivered && (
          <div className="alert alert-success mt-3" role="alert">
            Delivered on <strong>{order.deliveredAt.substring(0, 10)}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
