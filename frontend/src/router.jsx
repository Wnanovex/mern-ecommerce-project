import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Profile from "./pages/User/Profile";
import AdminRoute from "./authorisationRoutes/AdminRoute";
import PrivateRoute from "./authorisationRoutes/PrivateRoute";
import UserList from "./pages/Admin/UserList";
import CategoryList from "./pages/Admin/CategoryList";
import ProductList from "./pages/Admin/ProductList";
import ProductUpdate from "./pages/Admin/ProductUpdate";
import AllProducts from "./pages/Admin/AllProducts";
import Home from "./pages/Home";
import Favorites from "./pages/Products/Favorites";
import ProductDetails from "./pages/Products/ProductDetails";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Shipping from "./pages/Order/Shipping";
import PlaceOrder from "./pages/Order/PlaceOrder";
import Order from "./pages/Order/Order";
import UserOrder from "./pages/User/UserOrder";
import OrderList from "./pages/Admin/OrderList";
import AdminDashboard from "./pages/Admin/AdminDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Signup />
            },
            {
                index: true,
                path: "/",
                element: <Home />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/shop",
                element: <Shop />
            },
            {
                path: "/",
                element: <PrivateRoute />,
                children: [
                    {
                        path: "/profile",
                        element: <Profile />
                    },
                    {
                        path: "/favorites",
                        element: <Favorites />
                    },
                    {
                        path: "/product/:id",
                        element: <ProductDetails />
                    },
                    {
                        path: "/place-order",
                        element: <PlaceOrder />
                    },
                    {
                        path: "/shipping",
                        element: <Shipping />
                    },
                    {
                        path: "/order/:id",
                        element: <Order />
                    },
                    {
                        path: "/user-orders",
                        element: <UserOrder />
                    },
                ]
            },
            {
                path: "/admin",
                element: <AdminRoute />,
                children: [
                    {
                        path: "userlist",
                        element: <UserList />
                    },
                    {
                        path: "categorylist",
                        element: <CategoryList />
                    },
                    {
                        path: "productlist",
                        element: <ProductList />
                    },
                    {
                        path: "allproductslist",
                        element: <AllProducts />
                    },
                    {
                        path: "product/edit/:_id",
                        element: <ProductUpdate />
                    },
                    {
                        path: "orderlist",
                        element: <OrderList />
                    },
                    {
                        path: "dashboard",
                        element: <AdminDashboard />
                    },
                ]
            },
        ]
    },
])

export default router;