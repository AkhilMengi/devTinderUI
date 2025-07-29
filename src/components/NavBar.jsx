import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BASE_URL } from "../utils/constant";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connection) || [];
  const requests = useSelector((store) => store.request) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL +"/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed");
    }
  };

  return (
    <div className="navbar bg-neutral text-white shadow-sm px-4">
      {/* Brand */}
      <div className="flex-1">
        <Link className="btn btn-ghost text-lg md:text-xl truncate">Dev Tinder 👨‍💻🔥👩‍💻</Link>
      </div>

      {/* Desktop Navigation */}
      {user && (
        <div className="hidden md:flex gap-3 items-center">
          <Link to="/" className="btn btn-sm btn-ghost">Feed</Link>

          <Link to="/connections" className="relative btn btn-sm btn-ghost">
            Connections
            {connections.length > 0 && (
              <span className="badge badge-info text-xs absolute -top-2 -right-2">
                {connections.length}
              </span>
            )}
          </Link>

          <Link to="/requests/recieved" className="relative btn btn-sm btn-ghost">
            Requests
            {requests.length > 0 && (
              <span className="badge badge-warning text-xs absolute -top-2 -right-2 text-black">
                {requests.length}
              </span>
            )}
          </Link>
        </div>
      )}

      {/* Mobile Menu Toggle */}
      {user && (
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      )}

      {/* Avatar Dropdown (Universal) */}
      {user && (
        <div className="dropdown dropdown-end ml-3">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] w-52 rounded-box bg-base-content p-2 shadow"

          >
            <li>
              <Link to="/profile">
                Profile
                <span className="badge">
                  {user.firstName
                    ? `Hi, ${user.firstName.charAt(0).toUpperCase()}${user.firstName.slice(1)}`
                    : "Welcome"}
                </span>
              </Link>
            </li>
            <li><Link to="/setting">Settings</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      )}

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-neutral z-50 flex flex-col gap-2 p-4 md:hidden">
          <Link to="/" className="btn btn-sm btn-ghost w-full">Feed</Link>

          <Link to="/connections" className="relative btn btn-sm btn-ghost w-full">
            Connections
            {connections.length > 0 && (
              <span className="badge badge-info text-xs absolute top-0 right-2">
                {connections.length}
              </span>
            )}
          </Link>

          <Link to="/requests/recieved" className="relative btn btn-sm btn-ghost w-full">
            Requests
            {requests.length > 0 && (
              <span className="badge badge-warning text-xs absolute top-0 right-2 text-black">
                {requests.length}
              </span>
            )}
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
