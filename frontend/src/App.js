import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header"
import Login from "./components/Login";
import Body from "./components/Body";
import Record from "./components/Record";
import Operation  from "./components/Operation";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";



const AppLayout = () => {
    return (

      <>
        <Header />
        <Outlet />
        {/* <Footer />  */}
      </>
   );
  };

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
        
      },
      {
        path: "/record",
        element: <Record />,

      },

      {
        path: "/operation",
        element: <Operation />,

      },
      {
        path: "/login",
        element: <Login />,

      },
    ]
  },

])
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<RouterProvider router={appRouter}/>);