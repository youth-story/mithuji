import { Button } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import "./signUp.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../../store/user-slice/userSlice";
// import { ThunkDispatch } from "@reduxjs/toolkit";
import {BASEURL} from "../../utils/constants";

const SignUp = () => {

  const navigate = useNavigate();
  // const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  // const [signup, setSignup] = useState(false);

  const navigation = () => {
    navigate("/login");
  }

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPass: ""
  });

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  // Create a state variable to store the type of the input
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");

  // Define a function to toggle the type of the input
  const toggleType1 = () => {
    setType1(type1 === "password" ? "text" : "password");
  };

  const toggleType2 = () => {
    setType2(type2 === "password" ? "text" : "password");
  };

  const handleSubmit = async () => {
    console.log(BASEURL);
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(!re.test(userData.email.toLowerCase())){
      alert("Email is not valid")
    }else{

    if (userData.password == userData.confirmPass ) {
      try {
        console.log("response sending...");
        console.log(userData);
        // Use fetch to make the post request with the url and the data
        const response = await fetch(`${BASEURL}/cauth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          // "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
          body: JSON.stringify(userData), // Convert the userData object to a JSON string
        });

        console.log(response);
        const data = await response.json();

        console.log(data);
        // console.log(data.status);

        if(response.status === 201){
          console.log(data);
          alert("Registration Successfully");
          navigate("/verification")
        } else{
          alert(data.response);
        }
      } catch (err) {
        console.log("sign up errr", err);
      }
    } else {
      window.alert("password and confirm passsword must be same");
    }
  }
  }

  return (
    <>
      <div className="signup">
        <Navbar />

        <div className="inner">

          <div className="innerDiv1">
            <section>Let’s Begin Your <br /> New <span>Journey</span> </section>
          </div>

          <div className="innerDiv2">
            <div className="logHead">Sign Up</div>

            <select className="language-selector" defaultValue={"en"} onChange={handleChange}>
              <option value="tr">TR</option>
              <option value="en">English (uk)</option>
              <option value="de">DE</option>
            </select>
            <form>
              <div className="form-group">
                <input type="text" className="input" id="name" name="name" placeholder="Enter Your Name" onChange={handleChange} />
                <label htmlFor="name">Enter Your Name</label>
              </div>
              <div className="form-group">
                <input type="email" className="input" id="email" name="email" placeholder="Enter Your Email" onChange={handleChange} />
                <label htmlFor="email">Enter Your Email</label>
              </div>
              <div className="form-group">
                <input type="text" className="input" id="number" name="phone" placeholder="Mobile Number" onChange={handleChange} />
                <label htmlFor="number">Mobile Number</label>
              </div>
              <div className="form-group">
                <input type={type1} className="input" id="password" name="password" placeholder="Enter Password" onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <span className={type1 === "password" ? "fa fa-eye" : "fa fa-eye-slash"} onClick={toggleType1}></span>
              </div>
              <div className="form-group">
                <input type={type2} className="input" id="cpassword" name="confirmPass" placeholder="Confirm Password" onChange={handleChange} />
                <label htmlFor="cpassword">Confirm Password</label>
                <span className={type2 === "password" ? "fa fa-eye" : "fa fa-eye-slash"} onClick={toggleType2}></span>
              </div>
              <div className="form-group">
                <Button variant="contained" className="bt1" onClick={handleSubmit}>Sign Up</Button>
              </div>

              <div className="already">Already have a account? <span onClick={navigation}>Login</span></div>

            </form>

          </div>
        </div>

      </div>
    </>
  )
}

export default SignUp