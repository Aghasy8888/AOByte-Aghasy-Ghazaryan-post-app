import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { PostApp } from "./components";
import { Login } from "./pages";
import {SharedLayout} from "./pages";
import {Register} from "./pages";
import {NotFound} from "./pages";
import {Spinner} from "./components";
import {MyAccount} from "./pages";
import {MyPosts} from "./pages";
import "./App.css";

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
