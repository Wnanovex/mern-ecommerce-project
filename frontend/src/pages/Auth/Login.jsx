import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";

export default function Login() {
  const { userInfo } = useSelector((state) => state.auth); // take userInfo from state.auth
  const dispatch = useDispatch(); //  dispatch
  const navigate = useNavigate(); // navigate
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const [login, { isLoading }] = useLoginMutation(); // take login from useLoginMutation && object of isLoading

  useEffect(() => {
    // use useEffect
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // defined function of handleSubmit
    e.preventDefault();

    try {
      const res = await login(formData).unwrap(); // put the values of email && password into the login
      dispatch(setCredientials({ ...res })); // use dispatch function to set the credentials
    } catch (error) {
      toast.error(error?.data); // open the model of errors
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
                        Login to your account
                      </h3>

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

                      <div className="text-center pt-1 pb-1 d-flex align-items-center flex-column">
                        <button
                          disabled={isLoading}
                          className="btn btn-primary px-5 fa-lg mb-3"
                        >
                          {isLoading ? "Signing in ..." : "Sign In"}
                        </button>
                        <Link to="#!">Forgot password?</Link>
                      </div>
                    </form>

                    <div className="d-flex align-items-center justify-content-center pb-4">
                      <p className="mb-0 me-2">Don't have an account?</p>
                      <Link to="/register" className="btn btn-outline-danger">
                        Create new
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
                      backgroundImage: 'url("login.png")',
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
