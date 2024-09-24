import Chart from "react-apexcharts";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderSlice";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import { useEffect, useState } from "react";
import OrderList from "./OrderList";

export default function AdminDashboard() {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTow } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [
      {
        name: "Sales",
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: { categories: formattedSalesDate.map((item) => item.x) },
        },
        series: [
          {
            name: "Sales",
            data: formattedSalesDate.map((item) => item.y),
          },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="container">
      <div className="d-flex justify-content-around flex-column flex-md-row">
        <div className="d-flex justify-content-center flex-column">
          <div className="badge rounded-circle bg-danger fs-3 fw-bold text-center p-4 w-50 mx-auto">
            $
          </div>
          <h3 className="text-center">Total Sales</h3>
          <h4 className="text-center">
            $ {isLoading ? "Loading..." : sales?.totalSales.toFixed(2)}
          </h4>
        </div>
        <div className="d-flex justify-content-center flex-column">
          <div className="badge rounded-circle bg-danger fs-3 fw-bold text-center p-4 w-50 mx-auto">
            $
          </div>
          <h3 className="text-center">Customers</h3>
          <h4 className="text-center">
            {loading ? "Loading..." : customers?.length}
          </h4>
        </div>
        <div className="d-flex justify-content-center flex-column">
          <div className="badge rounded-circle bg-danger fs-3 fw-bold text-center p-4 w-50 mx-auto">
            $
          </div>
          <h3 className="text-center">All Orders</h3>
          <h4 className="text-center">
            {loadingTow ? "Loading..." : orders?.totalOrders}
          </h4>
        </div>
        <div className="col-12 col-md-6">
          <Chart options={state.options} series={state.series} type="bar" />
        </div>
      </div>

      <div className="mt-4">
        <OrderList />
      </div>
    </div>
  );
}
