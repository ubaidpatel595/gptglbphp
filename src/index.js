import React from 'react';
import ReactDOM from 'react-dom/client';
import './Home/Css/index.css';

import Main from "./Home/Main";
import Home from './Home/Home';
import Courses from "./Home/Courses";
import Admission from './Home/Admission';
import Login from './Home/Login';
import Logout from './Home/Logout';
import Register from './Home/Register';
import About from './Home/About';
import Profile from './Home/Profile';

//Users
import Dashboard from './Home/Dashboard';
import Admin from './Users/Admin/Admin';
import Hod from './Users/Hod/Hod';
import Faculty from './Users/Faculty/Faculty';
import Student from './Users/Student/Student';

//Apis
import AssignSub from './Apis/AssignSub';
import Upload from './Apis/Upload';
import Attendance from './Apis/Attendance';
import Syllabus from './Apis/Syllabus';
import Reports from './Apis/Reports';


import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {path:'/',element:<><Main/><Home/></>},
  {path:'/Home',element:<><Main/><Home/></>},
  {path:'courses',element:<><Main/><Courses/></>},
  {path:'admission',element:<><Main/><Admission/></>},
  {path:'login',element:<><Main/><Login/></>},
  {path:'logout',element:<><Main/><Logout/></>},
  {path:'register',element:<><Main/><Register/></>},
  {path:'about',element:<><Main/><About/></>},
  {path:'admin',element:<><Main/><Admin/></>},
  {path:'hod',element:<><Main/><Hod/></>},
  {path:'faculty',element:<><Main/><Faculty/></>},
  {path:'student',element:<><Main/><Student/></>},
  {path:'Dashboard',element:<><Main/><Dashboard/></>},
  {path:'Profile',element:<><Main/><Profile user={JSON.parse(localStorage.Authorization)}/></>},

  //Apis 
  {path:'AssignSub',element:<><AssignSub/></>},
  {path:'upload',element:<><Upload/></>},
  {path:'Attendance',element:<><Attendance/></>},
  {path:'Syllabus',element:<><Syllabus/></>},
  {path:'Reports',element:<><Reports/></>},

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
       <RouterProvider router={router}/>
    </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
