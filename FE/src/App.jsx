
import "./App.css";
import Login from "./Page/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
