import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useGetOrdersQuery } from "../../redux/api/orderSlice";
import AdminMenu from "./AdminMenu";

export default function OrderList() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <div style={{ marginRight: "20px" }}>
        <AdminMenu />
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error?.data?.message || error.message}
        </div>
      ) : (
        <div className="container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Items</th>
                  <th scope="col">ID</th>
                  <th scope="col">User</th>
                  <th scope="col">Date</th>
                  <th scope="col">Total</th>
                  <th scope="col">Paid</th>
                  <th scope="col">Delivered</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td scope="col" className="p-2">
                      <img
                        src={order.orderItems[0].image}
                        className="flex-shrink-0 img-fluid"
                        style={{
                          width: "70px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        alt={order.user.username}
                      />
                    </td>
                    <td scope="col">{order._id}</td>
                    <td scope="col">
                      {order.user ? order.user.username : "N/A"}
                    </td>
                    <td scope="col">
                      {order.createdAt
                        ? order.createdAt.substring(0, 10)
                        : "N/A"}
                    </td>
                    <td scope="col">$ {order.totalPrice}</td>
                    <td scope="col">
                      {order.isPaid ? (
                        <p className="badge bg-success p-2">Completed</p>
                      ) : (
                        <p className="badge bg-danger p-2">Pending</p>
                      )}
                    </td>
                    <td scope="col">
                      {order.isDelivered ? (
                        <p className="badge bg-success p-2">Completed</p>
                      ) : (
                        <p className="badge bg-danger p-2">Pending</p>
                      )}
                    </td>
                    <td scope="col">
                      <Link
                        className="btn btn-primary"
                        to={`/order/${order._id}`}
                      >
                        More
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
