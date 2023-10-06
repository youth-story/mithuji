import { useState } from "react"
import "./login.scss"
import { Button } from "@mui/material"
import Navbar from "../../components/navbar/Navbar"
import { useNavigate } from "react-router-dom"
import { signup } from "../../App"
// import { ThunkDispatch } from "@reduxjs/toolkit"
// import { useDispatch } from "react-redux"
// import { loginUser } from "../../store/user-slice/userSlice"
import { BASEURL } from "../../utils/constants"

const Login = () => {

  const navigate = useNavigate();
  // const dispatch = useDispatch<ThunkDispatch<any, any, any>>();


  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  

  const hanldeChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const login = async () =>{ 
      console.log(BASEURL);
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
      if(!re.test(userData.email.toLowerCase())){
        alert("Email is not valid")
      } else{
  
        try {
          console.log("response sending...");
          // Use fetch to make the post request with the url and the data
          const response = await fetch(`${BASEURL}/cauth/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData), // Convert the userData object to a JSON string
          });
  
          console.log(response);
          const data = await response.json();
  
          console.log(data);
  
          if(response.status === 200){
            console.log(data);
            alert("Login Successfully");
            console.log(data.jwt);

            localStorage.setItem("auth_token", data.jwt);
            navigate("/")
          } else{
            alert(data.response);
          }
        } catch (err) {
          console.log("login errr", err);
        }
    }
  }

  // Create a state variable to store the type of the input
  const [type, setType] = useState("password");

  // Define a function to toggle the type of the input
  const toggleType = () => {
    setType(type === "password" ? "text" : "password");
  };

  const handleChange = (e: any) => { // Get the selected value const value = e.target.value;

    // Push the new URL to the history
    alert('https://location.loc?lang=' + e.target.value);
    };


  return (
    <div className="login">
      <Navbar />

      <div className="inner">

        <div className="innerDiv1">
          <section>Let’s Begin Your <br /> New <span>Journey</span> </section>
        </div>

        <div className="innerDiv2">
          <div className="logHead">Log In</div>

          <select className="language-selector" defaultValue="en" onChange={handleChange}>
    <option value="tr">TR</option>
    <option value="en">English (uk)</option>
    <option value="de">DE</option>
  </select>
          <form>
            <div className="form-group">
              <input type="text" className="input" id="email" name="email" placeholder="Email" value={userData.email} onChange={hanldeChange} />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-group">
              <input type={type} className="input" name="password" id="password" value={userData.password} placeholder="Password" onChange={hanldeChange} />
            <label htmlFor="password">Password</label>
            <span className={type === "password" ? "fa fa-eye" : "fa fa-eye-slash"} onClick={toggleType}></span>
            </div>
            <div className="forgot"> <span>Forgot Password</span></div>

            <div className="form-group">
              <Button variant="contained" className="bt1" onClick={login}>Log In</Button>
            </div>
            <div className="form-group">
              <Button variant="contained" className="bt2" onClick={() => navigate(signup)}>Sign Up</Button>
            </div>

          </form>

        </div>
      </div>

    </div>
  )
}

export default Login