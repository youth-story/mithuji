import { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import "./navBar.scss"
import { useNavigate } from "react-router-dom"
import CabinIcon from '@mui/icons-material/Cabin';
import SmsIcon from '@mui/icons-material/Sms';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import { useDispatch } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { loadUser } from "../../store/user-slice/userSlice"

interface NavbarProps {
  sticky?: boolean;
  locateShow?: boolean;
}

interface User {
  name: string;
  user_type: string;
}

interface RootState {
  user: {
    user: User | null;
  };
}



const Navbar: React.FC<NavbarProps> = ({ sticky = false, locateShow = false }) => {
  
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const user = useSelector((state: RootState) => state.user.user);
  // const seller = useSelector((state: RootState) => state.seller.seller);

  
  const [isOpen, setIsOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    dispatch(loadUser());
    
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  // const [location, setLocation] = useState<string | null>(null);

  // const trackIPAddress = async () => {
  //   try {
  //     const response = await fetch('https://ipapi.co/json/');
  //     const data = await response.json();
  //     setLocation(data.city);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const setCityLocation = () => {
  //   setLocation('City');
  // };
  
  const sellNavigate = () => {
    if (user && user.user_type === "SELLER") {
      navigate('/seller-dashboard');
    } else {
      navigate('/business');
    }
  };
  

  const navigate = useNavigate();
  // console.log(user);
  // console.log(isOpen);
  
  return (
    <nav className={`navBar ${sticky ? 'sticky' : ''}`}>
      <section className="logo" onClick={() => navigate("/")}>mithuji</section>
      {locateShow &&
      <div className="location">
        <PlaceIcon />
        <input type="text" className="search" placeholder="All India" value={searchTerm} onChange={handleSearchChange} />
<button onClick={toggleOpen}>
          <p className="icon">{isOpen ? <ArrowDropUpOutlinedIcon/> : <ArrowDropDownOutlinedIcon/>}</p>
        </button>
        {isOpen && (
            // <select onChange={(e) => setLocation(e.target.value)}>
          <div className="dropdown">
              <option value="">Select location</option>
              <option value="trackIPAddress">My Location</option>
              <option value="setCityLocation">City</option>
              {/* Add as many options as you need */}
            {/* </select> */}
          </div>
        )}    
            {/* make it dropdown that is haveing my location option and city options if my location so track ip address */}
      </div>
}
      <div className="d1" onClick={sellNavigate}><CabinIcon className="icon"/> Sell</div>
      <div className="d2" onClick={() => navigate("/message")}><SmsIcon className="icon"/> Messages</div>
      {user ?(
      <div className="d3" onClick={() => navigate("/customer-profile")}><PermIdentityIcon className="icon"/><p className='text'>{!user ? "Sign in" : `${user.name}`}</p></div>
      ): (
  <div className="d3" onClick={() => navigate("/login")}><PermIdentityIcon className="icon"/><p className='text'>Sign in</p></div>
)}
    </nav>
  )
}

export default Navbar