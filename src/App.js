import Routing from "./Routes/Routing";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ParentProvider } from "./APIContext/ParentContext";
import "./App.css";
import { useLogin } from "./APIContext/LoginContext";
import { NotificationProvider } from "./APIContext/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AppWrapper() {
  const { user } = useLogin();
  const navigate = useNavigate();
  

  return (
    <ParentProvider user={user}>
      
        <Routing />
                      
     </ParentProvider>
  );
}

export default AppWrapper;
