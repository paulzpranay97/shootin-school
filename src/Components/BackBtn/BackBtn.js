import { useNavigate } from "react-router-dom";
import LeftIcon from "../../Assets/Icons/LeftIcon";
import "./backbtn.css";

const BackBtn = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="back-btn-global">
      <button className="btn btn-primary" onClick={handleBack}>
        <LeftIcon />
      </button>
    </div>
  );
};

export default BackBtn;
