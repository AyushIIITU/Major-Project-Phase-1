import React from 'react'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from './Components/Home/Home.jsx';
const router=createBrowserRouter(
  [
    {
      path: "/",
        element: <App />,
      children:[
        {
      path: "",
      element: <Home/>,
        }
      ]

    
    }
  ]
)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ThemeProvider/> */}
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);