import './App.css'
import { store } from './Redux/Store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import PublicRoute from './Utils/PublicRoute'
import Login from './Page/Login/Login'
import RegisterPage from './Page/RegisterPage/RegisterPage'
import HomePage from './Page/HomePage/HomePage'
import TempUi from './TempUI/TempUi'
import ProtectedRoute from './Utils/ProtectedRoute'
import Profile from './Page/Profile/Profile'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="" element={<ProtectedRoute><TempUi /></ProtectedRoute>}>
            <Route path="/user" element={<HomePage/>}></Route>
            <Route path="/user/profile" element={<Profile/>}></Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
