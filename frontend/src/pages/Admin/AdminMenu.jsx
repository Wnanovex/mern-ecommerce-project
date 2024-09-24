import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <div className="d-flex align-items-end flex-column dropdown">
      <button
        className="btn btn-primary mb-3 dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        data-bs-target="#collapseExample"
        aria-controls="collapseExample"
        aria-expanded="false"
      >
        <span>Admin Menu</span>
      </button>
      <div className="dropdown" id="collapseExample" style={{ width: "150px" }}>
        <ul className="dropdown-menu me-auto mb-2 dropdown-menu-dark rounded px-3 ">
          <li className="">
            <NavLink
              className=" dropdown-item"
              to="/admin/dashboard"
              style={({ isActive }) => ({
                color: isActive ? "#FFB200" : "white",
              })}
            >
              Dashboard
            </NavLink>
          </li>

          <li className="">
            <NavLink
              className=" dropdown-item"
              to="/admin/categorylist"
              style={({ isActive }) => ({
                color: isActive ? "#FFB200" : "white",
              })}
            >
              Create Category
            </NavLink>
          </li>

          <li className=" ">
            <NavLink
              className=" dropdown-item"
              to="/admin/productlist"
              style={({ isActive }) => ({
                color: isActive ? "#FFB200" : "white",
              })}
            >
              Create Product
            </NavLink>
          </li>

          <li className="">
            <NavLink
              className=" dropdown-item"
              to="/admin/allproductslist"
              style={({ isActive }) => ({
                color: isActive ? "#FFB200" : "white",
              })}
            >
              All Products
            </NavLink>
          </li>

          <li className=" ">
            <NavLink
              className=" dropdown-item"
              to="/admin/userlist"
              style={({ isActive }) => ({
                color: isActive ? "#FFB200" : "white",
              })}
            >
              Manage Users
            </NavLink>
          </li>

          <li className="">
            <NavLink
              className=" dropdown-item"
              to="/admin/orderlist"
              style={({ isActive }) => ({
                color: isActive ? "#FFB200" : "white",
              })}
            >
              Manage Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
