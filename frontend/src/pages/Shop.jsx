import { useDispatch, useSelector } from "react-redux";
import { useGetAllCategoriesQuery } from "../redux/api/categoryApiSlice";
import { useEffect, useState } from "react";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import {
  setCategories,
  setChecked,
  setProducts,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/loader/Loader";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import HeartIcon from "./Products/HeartIcon";
import { addToCart } from "../redux/features/cart/cartSlice";

export default function Shop() {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useGetAllCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  const { userInfo } = useSelector((state) => state.auth); // take userInfo from state.auth

  useEffect(() => {
    if (!categories?.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [dispatch, categoriesQuery.data]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery?.isLoading) {
        // filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [dispatch, checked, radio, filteredProductsQuery.data, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updateChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updateChecked));
  };

  // add "all brands" option to uniqueBrand
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // update the price filter state when the user types in the input field
    setPriceFilter(e.target.value);
  };

  const handleAddToCart = (product, qty) => {
    if (!userInfo) {
      toast.error("Please login to add product to cart");
      return;
    }

    dispatch(addToCart({ ...product, qty }));
    toast.success(`${product.name} added to cart`, {
      autoClose: 2000,
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="rounded p-2 col-lg-2 col-md-4"
            style={{ backgroundColor: "#31363F" }}
          >
            <div className="categories-filter mt-4">
              <h6 className="text-center" style={{ fontSize: "18px" }}>
                Filter By Categories
              </h6>
              <div className="">
                {categories?.map((category) => (
                  <div key={category._id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="red-checkbox"
                      onChange={(e) =>
                        handleCheck(e.target.checked, category._id)
                      }
                    />
                    <label className="form-check-label" htmlFor="red-checkbox">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="brands-filter mt-4">
              <h6 className="text-center" style={{ fontSize: "18px" }}>
                Filter By Brands
              </h6>

              {uniqueBrands?.map((brand, index) => (
                <div key={index} className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                  />
                  <label className="form-check-label" htmlFor={brand}>
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            <div className="price-filter mt-4">
              <h6 className="text-center" style={{ fontSize: "18px" }}>
                Filter By Price
              </h6>
              <div className="form-outline">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter price"
                  value={priceFilter}
                  onChange={handlePriceChange}
                />
                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => window.location.reload()}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-10 col-md-8 mt-4 mt-md-0">
            <h6 className="text-info" style={{ fontSize: "18px" }}>
              {products?.length} Products
            </h6>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
              {products.length === 0 ? (
                <div className="d-flex align-items-center justify-content-center">
                  <Loader />
                </div>
              ) : (
                products?.map((product) => (
                  <div
                    key={product._id}
                    className="card-product-shop card border-0 col-sm-6 col-md-4 col-lg-3 mb-4 text-decoration-none"
                    style={{ width: "13rem" }}
                  >
                    <Link
                      to={`/product/${product._id}`}
                      className="text-decoration-none"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="card-img-top flex-shrink-0 img-fluid"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                    <HeartIcon product={product} />
                    <div
                      className="card-body text-white"
                      style={{ backgroundColor: "#373A40" }}
                    >
                      <div className="card-text">
                        <h5 className="">{product.name}</h5>
                        <p className="badge bg-success rounded-pill">
                          {product?.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                        <p className="lead fs-6">
                          {product.description.substring(0, 40)}...
                        </p>
                        <button
                          className="btn text-white w-100"
                          style={{ backgroundColor: "#FF0080" }}
                          onClick={() => handleAddToCart(product, 1)}
                        >
                          <AiOutlineShoppingCart size={20} /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
