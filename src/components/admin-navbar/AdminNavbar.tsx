// import { useState, useEffect } from "react"
// import { useSelector } from 'react-redux';
import "./adminNavbar.scss"
import { useNavigate } from "react-router-dom"
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const AdminNavbar = () => {

  const navigate = useNavigate();
  
  return (
    <nav className={`navBar`}>
      <section className="logo" onClick={() => navigate("/dashboard")}>mithuji</section>
      {/* {user ?( */}
      <div className="d3"><PermIdentityIcon className="icon"/><p className='text'>admin</p></div>
      {/* ): ( */}
  {/* <div onClick={() => navigate("/login")}><PermIdentityIcon className="icon"/><p className='text'>Sign in</p></div> */}
{/* )} */}
    </nav>
  )
}

export default AdminNavbar