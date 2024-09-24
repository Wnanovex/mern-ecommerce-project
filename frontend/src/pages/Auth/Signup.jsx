import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import { setCredientials } from "../../redux/features/auth/authSlice";

export default function Signup() {
  const { userInfo } = useSelector((state) => state.auth); // take userInfo from state.auth
  const dispatch = useDispatch(); // dispatch
  const navigate = useNavigate(); // Navigate
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const [register, { isLoading }] = useRegisterMutation(); // take register from useRegisterMutation && object of isLoading

  useEffect(() => {
    // use useEffect
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      // if password is not match then confirmPassword
      toast.error("Passwords do not match"); // open the modal of errors
    } else {
      try {
        const res = await register(formData).unwrap(); // put the values of username && email && password into the register

        dispatch(setCredientials({ ...res })); // use dispatch function to set the credentials
        navigate(redirect);
        toast.success("Registration successful"); // show a message box for registration
      } catch (error) {
        toast.error(error.data); // show a message box for error registration
      }
    }
  };

  return (
    <section className="h-100">
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div
              className="card rounded-3 text-white"
              style={{ backgroundColor: "#232D3F" }}
            >
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <form className="mb-3" onSubmit={handleSubmit}>
                      <h3 className="text-center mb-4 text-info">
                        Create a new count
                      </h3>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="username">
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          className="form-control"
                          placeholder="Your Username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="form-control"
                          placeholder="Password confirmation"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="text-center pt-1 pb-1 d-flex align-items-center flex-column">
                        <button
                          disabled={isLoading}
                          className="btn btn-primary px-5 fa-lg mb-3"
                        >
                          {isLoading ? "Registering ..." : "Register"}
                        </button>
                      </div>
                    </form>

                    <div className="d-flex align-items-center justify-content-center pb-4">
                      <p className="mb-0 me-2">You have an account?</p>
                      <Link to="/login" className="btn btn-outline-danger">
                        Sign in
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div
                    className="px-3 py-4 p-md-5 rounded-3 d-flex align-items-center justify-content-center flex-column"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: 'url("signup.jpg")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
