import { Routes,Route, Navigate } from "react-router-dom";
import {Signup,Home,Signin} from "../pages";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import UserProfile from "../pages/UserProfile";

function App() {

  const {token}=useAuthContext()
  useEffect(()=>{
  },[token])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={token?<Home />:<Navigate to='/sign-in' />} />
        <Route path="/profile" element={token?<UserProfile />:<Navigate to='/sign-in' />} />
        <Route path="/sign-in" element={token?<Navigate to='/' />:<Signin />}/>
        <Route path="/sign-up" element={token?<Navigate to='/' />:<Signup />} />
        <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            }
          />

      </Routes>
    </div>
  );
}

export default App;
