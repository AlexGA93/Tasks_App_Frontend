import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { Dashboard, SingleTask } from ".";
import { getUserInfo } from "../../redux/states/user";
import { AppDispatch } from "../../redux/store";
import { PrivateRoutes } from "../../routes/routes";
import { NotFoundRoute } from "../../utils";

const Private = () => {

  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch])
  

  return (
    <NotFoundRoute>
      {/* default route to Redirection to Dashboard */}
      <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
      {/* Dashboard */}
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
      {/* Single task page */}
      <Route path={`${PrivateRoutes.SINGLEPAGE}/:id`} element={<SingleTask />}/>
    </NotFoundRoute>
  );
};
export default Private;
