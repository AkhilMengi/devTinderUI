import Body from "./components/Body"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Setting from "./components/Setting"


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
              <Route path="profile" element={<Profile />} />
              <Route path="setting" element={<Setting />} />

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
