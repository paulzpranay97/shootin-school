import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../Pages/Authentication/Login";
import CreateAccount from "../Pages/Authentication/CreateAccount/CreateAccount";
import GroupInstruction from "../Pages/GroupInstruction";
import IndividualInstruction from "../Pages/IndividualInstruction";
import UnlimitedInstruction from "../Pages/UnlimitedInstruction";

import Layout from "../Components/Layout/Layout";
import UserDashLayout from "../Components/Layout/UserDashLyout/UserDashLayout";

import Home from "../Pages/Home";



import Profile from "../Pages/UserDashboard/Profile/Profile";





const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/create-an-account" element={<CreateAccount />} />
      <Route element={<Layout />} >
        <Route path="/" element={<Home />} />
        <Route path="/group-instruction" element={<GroupInstruction />} />
        <Route path="/individual-instruction" element={<IndividualInstruction />} />
        <Route path="/unlimited-instruction" element={<UnlimitedInstruction />} />
      </Route>
      <Route element={<UserDashLayout />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Routing;
