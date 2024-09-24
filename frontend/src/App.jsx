import { Outlet } from "react-router";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AnimationCss.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3 text-white">
        <Outlet />
      </main>
    </>
  );
}

export default App;
