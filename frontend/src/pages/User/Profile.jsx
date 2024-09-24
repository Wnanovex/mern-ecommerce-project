import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import { setCredientials } from "../../redux/features/auth/authSlice";

export default function Profile() {
  const { userInfo } = useSelector((state) => state.auth); // take userInfo from state.auth
  const dispatch = useDispatch(); // dispatch
  const [updateProfile, { isLoading }] = useUpdateProfileMutation(); // take updateProfile from useUpdateProfileMutation && object of isLoading

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // use useEffect
    setUsername(userInfo.username); // put the value of userInfo.username into initial value of username
    setEmail(userInfo.email); // put the value of userInfo.email into initial value of email
  }, [userInfo.username, userInfo.email]); // is change if userInfo.username && userInfo.email are changed

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // if password is not match then confirmPassword
      toast.error("Passwords do not match"); // open the modal of errors
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap(); // put the values of _id username && email && password into the updateProfile
        dispatch(setCredientials({ ...res })); // use dispatch function to set the credentials
        toast.success("Profile updated successfully"); // show a message box for registration
      } catch (error) {
        toast.error(error?.data?.message || error.message); // show a message box for error registration
      }
    }
  };

  return (
    <>
      <div className="container mt-3 text-white">
        <div className="d-flex align-items-center mt-2 justify-content-between">
          <h4>
            Id : <span className="text-success">{userInfo._id}</span>
          </h4>
          <Link to="/user-orders" className="btn btn-primary">
            My Orders
          </Link>
        </div>
        <div className="d-flex align-items-center justify-content-center p-3">
          <div className="row">
            <h1 className="text-center text-info">Update Profile</h1>

            <form className="col-12" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Your Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Password confirmation"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="d-grid col-6 mx-auto">
                <button type="submit" className="btn btn-primary">
                  {isLoading ? "Updating ..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
