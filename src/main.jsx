import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Screens/Login.jsx'
import Home from './Screens/Home.jsx'
import Register from './Screens/Register.jsx'
import Properties from './Screens/Properties.jsx'
import MyProperties from './Screens/MyProperties.jsx'
import EditProperty from './Screens/EditProperty.jsx'
import CreateProperty from './Screens/CreateProperty.jsx'
import Nav from './Components/Nav.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/property/:id",
      element: <EditProperty />
    },
    {
      path: "/property",
      element: <Properties />
    },
    {
      path: "/create-property",
      element: <CreateProperty />
    },
    {
      path: "/my-properties",
      element: <MyProperties />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
