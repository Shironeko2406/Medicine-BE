import "./App.css";
import Login from "./Page/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";
import TempUIUser from "./TempUI/TempUIUser";
import RegisterPage from "./Page/RegisterPage/RegisterPage";
import HomePage from "./Page/HomePage/HomePage";
import Profile from "./Page/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="" element={<Login/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path="" element={<TempUIUser></TempUIUser>}>
            <Route path="/user" element={<HomePage/>}></Route>
            <Route path="/user/profile" element={<Profile/>}></Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
