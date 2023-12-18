import React,{lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import About from "./components/About.js"
import Contact from "./components/Contact.js";
import Error from "./components/Error.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";


const Grocery = lazy( () => import('./components/Grocery.js'));
window.React = React
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[{
      path:"/about",
      element:<About/>,
      errorElement:<Error/>
    },
    {
      path:"/contact",
      element:<Contact/>,
      errorElement:<Error/>
    },
    {
      path:"/grocery",
      element:<Suspense fallback={<h1>wait loading......</h1>}><Grocery/></Suspense>,
      errorElement:<Error/>
    },
    {
      path:"/restaurant/:resId",
      element:<RestaurantMenu/>,
      errorElement:<Error/>
    },
    {
        path:"/",
        element:<Body/>,
        errorElement:<Error/>
    }],
    errorElement:<Error/>,
  }
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);
