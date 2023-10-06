import { Button, TextField } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import "./verification.scss"
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { BASEURL } from "../../utils/constants";
// import { jsx } from "@emotion/react";

const Verification = () => {

  const navigate = useNavigate();

    const [userData, setUserData] = useState({
        phone: "",
        otp: ""
    });

    const handleNumberChange = (e : any) => {
        setUserData({ ...userData, phone: e.target.value });
    }

    // Use this function for the otp input
    const handleOtpChange = (value : string) => {
        setUserData({ ...userData, otp: value });
    }
    const verify = async () => {
        try {
            console.log("response sending...");
            // Use fetch to make the post request with the url and the data
            const response = await fetch(`${BASEURL}/cauth/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData)
            });
    
            console.log(response);
            const data = await response.json();
    
            console.log(data);
    
            if(response.status === 200){
              alert("Verification successfully")
              navigate("/")
            } else{
              alert(data.message);
            }
          } catch (err) {
            console.log("verify errr", err);
          }
    }
    
    const resend = async () => {
        try {
            console.log("response sending...");
            // Use fetch to make the post request with the url and the data
            const response = await fetch(`${BASEURL}/cauth/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData)
            });
    
            console.log(response);
            const data = await response.json();
    
            console.log(data);
    
            if(response.status === 200){
              alert("Verification successfully");
              navigate("/")
            } else{
              alert(data.message);
            }
          } catch (err) {
            console.log("verify errr", err);
          }
    }

    return (
        <div className="verification">
            <Navbar />

            <div className="inner">

                <div className="innerDiv1">
                    <section>Let’s Begin Your <br /> New <span>Journey</span> </section>
                </div>

                <div className="innerDiv2">
                    <div className="logHead">Verify Your Number</div>

                    <form>
                        <TextField className="num" id="outlined-basic" label="Mobile Number" variant="outlined" name="number" onChange={handleNumberChange}/>

                        <MuiOtpInput className="otp" length={4} value={userData.otp} onChange={handleOtpChange} />

                        <div className="forgot"> <span onClick={resend}>Resend OTP</span> in {60} sec </div>

                        <div className="form-group">
                            <Button variant="contained" className="bt1" onClick={verify}>Verify</Button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default Verification