import { useNavigate } from "react-router-dom"
import "./profileSideBar.scss"
import { customer_profile } from "../../App";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/user-slice/userSlice';
// import { CATEGORY } from "../../utils/constants";

const ProfileSideBar = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const logoutUser = () => {
      localStorage.removeItem('auth_token');
      dispatch(logout());
      navigate('/');
    };

    return (
        <>
            <div className="sideBar">
                <div className="optionsCon" onClick={() => navigate(customer_profile)}>My Account</div>
                <div className="optionsCon" onClick={() => navigate("#")}>My Order</div>
                <div className="optionsCon">Messages</div>
                <div className="optionsCon">Saved Address</div>
                <div className="optionsCon">Change Langauge</div>
                <div className="optionsCon">Help & Support</div>
                <div className="optionsCon" onClick={logoutUser}>Logout</div>
            </div>
        </>
    )
}

export default ProfileSideBar