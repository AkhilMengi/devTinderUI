import Body from "./components/Body"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Setting from "./components/Setting"
import UpdateProfile from "./components/UpdateProfile"
import ConnectionRequestList from "./components/ConnectionRequestList"
import ConnectionList from "./components/ConnectionList"



function App() {


  return (
    <>
      <Provider  store ={appStore}>  
        {/* adding reducx store on whole app */}
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              {/* Children Routes */}
              <Route path="/profile/edit" element={<UpdateProfile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="setting" element={<Setting />} />
              <Route path="requests/recieved" element={<ConnectionRequestList />} />
              <Route path="connections" element={<ConnectionList />} />
              

              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />

            </Route>
          </Routes>

        </BrowserRouter>
      </Provider>


    </>
  )
}

export default App
