import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "./components/Root";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Error from "./components/ErrorPage";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import ProtectRouteGen from "./components/ProtectRouteGen";
import Createpost from "./pages/Createpost";
import ProtectRouteAdmin from "./components/ProtectRouteAdmin";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            <ProtectRouteGen>
              <Profile />
            </ProtectRouteGen>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectRouteAdmin>
              <Createpost />
            </ProtectRouteAdmin>
          }
        />
      </Route>
    )
  );
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PersistGate>
  );
}
