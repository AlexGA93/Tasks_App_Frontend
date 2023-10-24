import { Navigate, Outlet } from "react-router-dom"
import { GuardPropsType } from "../../types/types"
import { PrivateRoutes, PublicRoutes } from "../../routes/routes"
import { checkLocalStorage, userKey } from "../../utils";

const AuthGuard = ({ validation }: GuardPropsType) => {

  // check redux user state
  const getToken = checkLocalStorage(userKey);

  return getToken ? (
    validation ? (
      <Outlet />
    ) : (
      <Navigate replace to={PrivateRoutes.PRIVATE} />
    )
  ) : (
    <Navigate replace to={PublicRoutes.PUBLIC} />
  )
}
export default AuthGuard