import { Suspense, lazy, useState } from "react";
import { Footer, Loading, Navbar } from "./components";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { NotFoundRoute } from "./utils";
import { PrivateRoutes, PublicRoutes } from "./routes/routes";
import { AuthGuard } from "./guards";
import { Toast, ToastContainer } from "react-bootstrap";

// lazy loading
const Private = lazy(() => import("./pages/Private/Private"));
const Public = lazy(() => import("./pages/Public/Public"));

export const App = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const [toastInfo, setToastInfo] = useState<{toastFlag:string, toastMessage:string}>({toastFlag:'', toastMessage:''});

  const handleToast = (payload: {value: boolean, toastFlag: string, toastMessage: string }) => {
    
    setToastInfo((toastInfo) => ({...toastInfo, toastFlag: payload.toastFlag, toastMessage: payload.toastMessage}));
    setShow(payload.value);
  };

  return (
    <div className="app">
      <Suspense fallback={<Loading />}>
        {/* Browser Router */}
        <BrowserRouter>
          <Navbar />
          {/* Not Found Route */}
          <NotFoundRoute>
            {/* root route redirects to private main page (if we're logged in) */}
            <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />

            {/* Public Routes - main public element will be the public parent component */}
            <Route
              path={`${PublicRoutes.PUBLIC}/*`}
              element={<Public handleToast={handleToast} />}
            />

            {/* Private Routes - using a guard to redirect to public routes if there is no user */}
            <Route element={<AuthGuard validation={true} />}>
              <Route
                path={`${PrivateRoutes.PRIVATE}/*`}
                element={<Private />}
              />
            </Route>
          </NotFoundRoute>
          {/*******************/}
          <Footer />
        </BrowserRouter>
        {/******************/}
      </Suspense>
      <ToastContainer className="p-3" position={"top-center"} style={{ zIndex: 1 }}>
        <Toast 
          onClose={() => setShow(false)} 
          show={show} 
          delay={3000} 
          bg={toastInfo.toastFlag}
          autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Task App Notify!</strong>
          </Toast.Header>
          <Toast.Body>{toastInfo.toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};
