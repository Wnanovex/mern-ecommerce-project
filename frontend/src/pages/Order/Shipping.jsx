import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

export default function Shipping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <div className="container d-flex align-items-center justify-content-center flex-column gap-5">
      <ProgressSteps step1 step2 />

      <div className="d-flex align-items-center justify-content-center w-50">
        <div className="row">
          <h1 className="text-center text-info">Shipping</h1>

          <form className="row" onSubmit={handleSubmit}>
            <div className="col-12 ">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-12 ">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-control"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="postalCode" className="form-label">
                Postal Code
              </label>
              <input
                type="number"
                id="postalCode"
                name="postalCode"
                className="form-control"
                placeholder="Your Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className="form-control"
                placeholder="Your Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="col-12 ">
              <label htmlFor="category" className="form-label mt-3">
                Select Method
              </label>

              <label className="d-flex gap-2">
                <input
                  type="radio"
                  className="form-check-input"
                  id="paymentMethod"
                  name="paymentMethod"
                  value="Paypal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="form-check-label">PayPal or Credit Card</span>
              </label>
            </div>

            <div className="d-grid col-12 mx-auto mt-4">
              <button type="submit" className="btn btn-primary">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
