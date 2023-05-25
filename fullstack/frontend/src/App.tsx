import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import ForgotPassword from "./views/ForgotPassword"
import Login from "./views/Login"
import Register from "./views/Register"
import ResetPassword from "./views/ResetPassword"
import VerifyAccount from "./views/VerifyAccount"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="forgot-password/:token" element={<ResetPassword />} />
          <Route path="verify-account/:id" element={<VerifyAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
