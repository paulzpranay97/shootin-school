import { Routes, Route } from "react-router-dom";

import Layout from "../Components/Layout/Layout";
import Home from "../Pages/Home";

import GroupInstruction from "../Pages/GroupInstruction";
import IndividualInstruction from "../Pages/IndividualInstruction";
import UnlimitedInstruction from "../Pages/UnlimitedInstruction";

import Detail from "../Pages/UserDashboard/Profile/Details/Detail";

import ProfileDetail from "../Pages/UserDashboard/Profile/Details/Sub-Section/ProfileDetail";
import Player from "../Pages/UserDashboard/Profile/Details/Sub-Section/Player";
import Payment from "../Pages/UserDashboard/Profile/Details/Sub-Section/Payment";
import Package from "../Pages/UserDashboard/Profile/Details/Sub-Section/Package";
import Password from "../Pages/UserDashboard/Profile/Details/Sub-Section/Password";

import LoginPage from "../Pages/Authentication/login";
import Register from "../Pages/Authentication/register/Register";
import Forget from "../Pages/Authentication/Forget/Forget";
import OtpVerify from "../Pages/Authentication/OtpVerify/OtpVerify";
import ResetPassword from "../Pages/Authentication/ResetPassword/ResetPassword";

import SessionScheduled from "../Pages/Schedule/SessionScheduled"; 

const Routing = () => {
  return (
    <Routes>

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-an-account" element={<Register />} />
      <Route path="/forgot-password" element={<Forget />} />
      <Route path="/otp-verify" element={<OtpVerify />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Main Layout */}
      <Route element={<Layout />}>

        <Route path="/" element={<Home />} />
        <Route path="/group-instruction" element={<GroupInstruction />} />
        <Route path="/individual-instruction" element={<IndividualInstruction />} />
        <Route path="/unlimited-instruction" element={<UnlimitedInstruction />} />
        <Route path="/session-scheduled" element={<SessionScheduled />} />



        

        {/* PROFILE SECTION (Nested) */}
        <Route path="/profile" element={<Detail />}>
          <Route index element={<ProfileDetail />} />
          <Route path="players" element={<Player />} />
          <Route path="billing" element={<Payment />} />
          <Route path="packages" element={<Package />} />
          <Route path="password" element={<Password />} />
        </Route>

      </Route>

    </Routes>
  );
};

export default Routing;
