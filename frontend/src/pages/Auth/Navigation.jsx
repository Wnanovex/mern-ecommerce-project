import { Link, useNavigate } from "react-router-dom"; // import useNavigate, Link from "react-router"
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai"; // import icons from "react-icons/ai"
import { FaHeart } from "react-icons/fa"; // import {FaHeart} from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"; // import useSelector && useDispatch from "react-redux
import { useLogoutApiCallMutation } from "../../redux/api/usersApiSlice"; // import useLogoutApiCallMutation from usersApiSlice
import { logout } from "../../redux/features/auth/authSlice"; // import logout from authSlice
import FavoritesCount from "../Products/FavoritesCount";

export default function Navigation() {
  const { userInfo } = useSelector((state) => state.auth); // take userInfo from state.auth
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch(); //  dispatch
  const [logoutApiCall] = useLogoutApiCallMutation(); // take logoutApiCall from useLogoutApiCallMutation
  const navigate = useNavigate(); // useNavigate

  const handleLogout = async () => {
    // function to handle logout
    try {
      await logoutApiCall().unwrap(); // use logoutApiCall with
      dispatch(logout()); // use dispatch of logout
      navigate("/login"); // navigate to login page
    } catch (error) {
      console.error(error); // console error
    }
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand text-info" to="/">
          StoreWell
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active d-flex gap-2" to="/">
                <AiOutlineHome size={26} />
                {/* use icon from react-icons/ai */}
                <span className="">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active d-flex gap-2" to="/shop">
                <AiOutlineShopping size={26} />
                <span className="">Shop</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active d-flex gap-2 align-items-center"
                to="/favorites"
              >
                <span className="position-relative">
                  <FaHeart size={20} />
                  <FavoritesCount />
                </span>
                <span className="">Favorite</span>{" "}
              </Link>
            </li>

            {/* if userInfo is true */}
            {userInfo ? (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-dark dropdown-toggle text-white"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userInfo.username}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark ms-auto">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="#"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                  {/* if userInfo.isAdmin is true */}
                  {userInfo.isAdmin && (
                    <>
                      {/* use dropdown */}
                      <li className="nav-item dropdown">
                        <Link className="dropdown-item" to="/admin/dashboard">
                          Dashboard
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="dropdown-item" to="/admin/productlist">
                          Products
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link
                          className="dropdown-item"
                          to="/admin/categorylist"
                        >
                          Category
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="dropdown-item" to="/admin/orderlist">
                          Order
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="dropdown-item" to="/admin/userlist">
                          Users
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            ) : (
              <></>
            )}

            {/* if userInfo is not found */}
            {!userInfo && (
              <>
                <li className="nav-item">
                  <Link className="nav-link active d-flex gap-2" to="/login">
                    <AiOutlineLogin size={26} />
                    <span className="">Login</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active d-flex gap-2" to="/register">
                    <AiOutlineUserAdd size={26} />
                    <span className="">Register</span>
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link active d-flex gap-2" to="/cart">
                <span className="position-relative">
                  <AiOutlineShoppingCart size={26} />
                  {/* if cartItems is not empty */}
                  {cartItems.length > 0 && (
                    <span
                      className="position-absolute badge rounded-circle bg-danger text-light"
                      style={{ top: "-10px", left: "10px" }}
                    >
                      {/* {cartItems.length} */}
                      {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)}
                    </span>
                  )}
                </span>
                <span className="">Cart</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
