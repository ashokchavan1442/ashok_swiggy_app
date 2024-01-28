import React,{lazy, Suspense, useState,useEffect} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import About from "./components/About.js"
import Contact from "./components/Contact.js";
import Error from "./components/Error.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext.js";

const Grocery = lazy( () => import('./components/Grocery.js'));
window.React = React
const AppLayout = () => {
  const [userName, setUserName] = useState()
  useEffect( ()=>{
    // Make a API call and username and password
    const data={
name:"Ashok",
    };
    setUserName(data.name);
  },[])
  return (
    <UserContext.Provider value={{loggedInUser:userName}} >
      <div className="app">
      <Header />
      <Outlet />
    </div>
    </UserContext.Provider>
    
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
