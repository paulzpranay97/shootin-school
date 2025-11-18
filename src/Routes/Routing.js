import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import GroupInstruction from "../Pages/GroupInstruction";
import IndividualInstruction from "../Pages/IndividualInstruction";
import UnlimitedInstruction from "../Pages/UnlimitedInstruction";

import Layout from "../Components/Layout/Layout";
import UserDashLayout from "../Components/Layout/UserDashLyout/UserDashLayout";

import Home from "../Pages/Home";



import Profile from "../Pages/UserDashboard/Profile/Profile";
import Detail from "../Pages/UserDashboard/Profile/Details/Detail";
import LoginPage from "../Pages/Authentication/login";
import Register from "../Pages/Authentication/register/Register";
import Forget from "../Pages/Authentication/Forget/Forget";





const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-an-account" element={<Register />} />
      <Route path="/forgot-password" element={<Forget />}/>
      <Route element={<Layout />} >
        <Route path="/" element={<Home />} />
        <Route path="/group-instruction" element={<GroupInstruction />} />
        <Route path="/individual-instruction" element={<IndividualInstruction />} />
        <Route path="/unlimited-instruction" element={<UnlimitedInstruction />} />
      <Route path="/profile-details" element={<Detail />}/>
      </Route>
      <Route element={<UserDashLayout />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Routing;
