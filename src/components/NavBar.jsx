import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios'
import { removeUser } from '../utils/userSlice'


const NavBar = () => {
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connection) || []
  const requests = useSelector((store) => store.request) || []
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true } // <- Important to send the cookie
      )
      dispatch(removeUser())
      navigate('/login')
    } catch (error) {
      console.error("Logout failed", error)
      alert("Logout failed")
    }
  }



  // const isLoggedIn = user; // Adjust based on your actual user structure

  return (
    <div className="navbar bg-neutral shadow-sm px-4">
      {/* Left side: logo */}
      <div className="flex-1 min-w-0">
        <a className="btn btn-ghost text-lg md:text-xl text-white truncate">
          Dev Tinder 👨‍💻🔥👩‍💻
        </a>
      </div>


      {user && (
        <div className="hidden md:flex gap-3 items-center mr-4">
          {/* Feed */}
          <Link
            to="/"
            className="px-4 py-2 bg-neutral text-white rounded-lg hover:bg-neutral-focus transition-all shadow"
          >
            Feed
          </Link>

          {/* Connections */}
          <Link
            to="/connections"
            className="relative px-4 py-2 bg-neutral text-white rounded-lg hover:bg-neutral-focus transition-all shadow"
          >
            Connections
            {connections.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-info text-white text-xs px-2 py-0.5 rounded-full shadow-md">
                {connections.length}
              </span>
            )}
          </Link>

          {/* Requests */}
          <Link
            to="/requests/recieved"
            className="relative px-4 py-2 bg-neutral text-white rounded-lg hover:bg-neutral-focus transition-all shadow"
          >
            Requests
            {requests.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-warning text-black text-xs px-2 py-0.5 rounded-full shadow-md">
                {requests.length}
              </span>
            )}
          </Link>
        </div>
      )}



      {/* Right side: avatar & dropdown menu */}
      {user && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] w-52 rounded-box bg-base-contentp-2 shadow "
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">
                    {user.firstName ? `Welcome! ${user.firstName.charAt(0).toUpperCase()}${user.firstName.slice(1)}` : "Welcome!"}
                  </span>


                </Link>
              </li>
              <li><Link to="setting">Settings</Link></li>
              <li>
                <button onClick={handleLogout} className=" text-white rounded">
                  Logout
                </button>

              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
