import { Navigate, Route } from "react-router-dom"
import { NotFoundRoute } from "../../utils"
import { PublicRoutes } from "../../routes/routes"
import { Login, Register } from "."
import { PublicPropsType } from "../../types/types"

const Public = ({ handleToast }: PublicPropsType) => {
  return (
    <NotFoundRoute>
      {/* default route to Redirection to Login */}
      <Route path="/" element={<Navigate to={PublicRoutes.LOGIN} />} />
      {/* Login */}
      <Route path={PublicRoutes.LOGIN} element={<Login handleToast={handleToast} />} />
      {/* Register */}
      <Route path={PublicRoutes.REGISTER} element={<Register handleToast={handleToast} />} />
    </NotFoundRoute>
  )
}
export default Public