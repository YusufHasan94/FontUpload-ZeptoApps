import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Preview from './Components/Preview/Preview.jsx';
import Upload from './Components/Upload/Upload.jsx';
import Group from './Components/Group/Group.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/",
        element: <Upload/>
      },
      {
        path: "/preview",
        element: <Preview/>
      },
      {
        path: "/group",
        element: <Group/>
      }
    ]
  },{
    path: "*",
    element: <NotFound></NotFound>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
