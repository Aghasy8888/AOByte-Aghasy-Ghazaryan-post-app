import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import PostApp from "./components/PostApp/PostApp";
import Login from "./pages/Login/Login";
import SharedLayout from "./pages/SharedLayout/SharedLayout";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import Spinner from "./components/Spinner/Spinner";
import { useSelector } from "react-redux";
import MyAccount from "./pages/MyAccount/MyAccount";
import MyPosts from "./pages/MyPosts/MyPosts";

function App() {
  const showAuthSpinner = useSelector((state) => state.authReducer.loading);

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<PostApp />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="myAccount" element={<MyAccount />} />
              <Route path="myPosts" element={<MyPosts />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>

      {showAuthSpinner && <Spinner />}
    </>
  );
}

export default App;
