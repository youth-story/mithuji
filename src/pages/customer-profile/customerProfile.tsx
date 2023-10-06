import { useState, useEffect } from "react"
import "./customerProfile.scss"
import GppGoodIcon from '@mui/icons-material/GppGood';
import Navbar from "../../components/navbar/Navbar"
import ProfileSideBar from "../../components/profile-sideBar/ProfileSideBar"
import { BASEURL } from "../../utils/constants";
import Modal from "react-modal";
import { MuiOtpInput } from 'mui-one-time-password-input'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

const CustomerProfile = () => {

  const navigate = useNavigate();
  const [progress, setProgress] = useState(0)
  const [isEdit, setIsEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isPanCard, setIsPanCard] = useState(false)
  const [isGst, setIsGst] = useState(false)
  const [isVerify1, setIsVerify1] = useState("Verify");
  const [isVerify2, setIsVerify2] = useState("Verify");

  const [modalSection, setModalSection] = useState("");

  const [isFilled, setIsFilled] = useState({
    name: false,
    business_name: false,
    phone: false,
    email: false,
    pan_number: false,
    gst_number: false,
    street_line: false,
    city: false,
    pin_code: false,
    state: false,
  });

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    business_name: "",
    phone: "",
    email: "",
    pan_number: "",
    gst_number: "",
    street_line: "",
    city: "",
    pin_code: "",
    state: "",
    otp: "",
  });


  // const [panCard, setPanCard] = useState(null);
  const [base64Image1, setBase64Image1] = useState("/Group.png");
  const [base64Image2, setBase64Image2] = useState("/Group.png");

  const [number, setNumber] = useState({
    phone: ""
  });

  const handleNumberChange = (e: any) => {

    setNumber({ ...number, [e.target.name]: e.target.value });
  }

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    // setPanCard(file);

    if (file) {
      setIsPanCard(true)
      setIsGst(true)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = document.querySelector(".box");
        if(image){
          const imgElement = image as HTMLImageElement;
          imgElement.src = e.target.result;
          imgElement.style.width = `200px`;
        }

        const base64Data = e.target.result.replace("data:image/png;base64,", "");
        if (modalSection === "uploadPanNumber") {
          setBase64Image1(base64Data);
        } else {
          setBase64Image2(base64Data);
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const handleChange = (event: any) => {


    setUserData({ ...userData, [event.target.name]: event.target.value });

    const progressBar = document.querySelector('.progressBar > .progress');
    const percentage = document.querySelector('.progress-percentage > p');

    // console.log(event.target.name);
    if (event.target.name === "name") {
      setIsFilled({
        ...isFilled,
        name: event.target.value.length > 0,
      });
    } else if (event.target.name === "business_name") {
      setIsFilled({
        ...isFilled,
        business_name: event.target.value.length > 0,
      });
    } else if (event.target.name === "phone") {
      setIsFilled({
        ...isFilled,
        phone: event.target.value.length > 0,
      });
    } else if (event.target.name === "email") {
      setIsFilled({
        ...isFilled,
        email: event.target.value.length > 0,
      });
    } else if (event.target.name === "pan_number") {
      setIsFilled({
        ...isFilled,
        pan_number: event.target.value.length > 0,
      });
    } else if (event.target.name === "gst_number") {
      setIsFilled({
        ...isFilled,
        gst_number: event.target.value.length > 0,
      });
    } else if (event.target.name === "street_line") {
      setIsFilled({
        ...isFilled,
        street_line: event.target.value.length > 0,
      });
    } else if (event.target.name === "city") {
      setIsFilled({
        ...isFilled,
        city: event.target.value.length > 0,
      });
    } else if (event.target.name === "pin_code") {
      setIsFilled({
        ...isFilled,
        pin_code: event.target.value.length > 0,
      });
    } else if (event.target.name === "state") {
      setIsFilled({
        ...isFilled,
        state: event.target.value.length > 0,
      });
    }

    // const filledCount = Object.keys(isFilled).reduce((acc, key) => acc + (isFilled[key] ? 1 : 0), 0);
    const filledCount = Object.keys(isFilled).reduce(
      (acc, key) => acc + (isFilled[key as keyof typeof isFilled] ? 1 : 0),
      0
    );
    // const filledCount = (isFilled as Record<string, boolean>).reduce((acc: any, key: any) => acc + (isFilled[key] ? 1 : 0), 0);
    

    setProgress(filledCount * 10);
    if (progressBar && percentage) {
      const progressBarElement = progressBar as HTMLElement;
      const percentageElement = percentage as HTMLElement;
    
      progressBarElement.style.width = `${progress}%`;
      percentageElement.style.left = `${progress - 2}%`;
    }
    
    // console.log(progress);
  }

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    // localStorage.setItem("auth_token", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtaXRodWppLWJhY2tlbmQtYXBpIiwic3ViIjoiZXhhbXBsZUAxMjMuY29tIiwiZXhwIjozMzI0ODY2MjMxNywianRpIjoiNjRkNWU0OTk1NDFmNzg3M2YxOWM2YzJmIiwibmFtZSI6IkV4YW1wbGVNYW4iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2OTE3NTM1MTd9.2AJxb74RW33mHhdXzOl3h8QyQpZSWrQigj4yFOyGZaM")

    try {
      console.log("response sending get details...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/customer/details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
          // "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtaXRodWppLWJhY2tlbmQtYXBpIiwic3ViIjoiZXhhbXBsZUAxMjMuY29tIiwiZXhwIjozMzI0ODU4MzcxMywianRpIjoiNjRkNGU4MTUyZDIzZWIzYWFlMTQ5MTEzIiwibmFtZSI6IkV4YW1wbGVNYW4iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2OTE2NzQ5MTN9.GCqP1Fj7xu6t249pvxwSr_DAQmMw90DbINKAjNGPU04",
        },
        body: JSON.stringify({}),
      });

      // console.log(response);
      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
        console.log(data.response);
        setUserData(data.response[0]);
        // localStorage.setItem("auth_token", data.response[1]["jwt"])
        if(data.response[0]["pan_image_url"] !== null){
        setBase64Image1(data.response[0]["pan_image_url"])
        setIsVerify1("View")
        setIsPanCard(true)
        setModalSection("viewPanNumber");
        }
        if(data.response[0]["gst_image_url"] !== null){
        setBase64Image2(data.response[0]["gst_image_url"])
        setIsVerify2("View")
        setIsGst(true)
        setModalSection("viewGst");
        }

        
// const filledCount = (isFilled as Record<string, boolean>).reduce((acc: any, key: any) => acc + (isFilled[key] ? 1 : 0), 0);

// setProgress(filledCount * 10);


changeProgressBar(data);

       // localStorage.setItem("auth_token", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtaXRodWppLWJhY2tlbmQtYXBpIiwic3ViIjoiZXhhbXBsZUAxMjMuY29tIiwiZXhwIjozMzI0ODU4MzcxMywianRpIjoiNjRkNGU4MTUyZDIzZWIzYWFlMTQ5MTEzIiwibmFtZSI6IkV4YW1wbGVNYW4iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2OTE2NzQ5MTN9.GCqP1Fj7xu6t249pvxwSr_DAQmMw90DbINKAjNGPU04")
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("get details errr", err);
    }
  }

  const changeProgressBar = async (data: any) => {

    // const newIsFilled = {...isFilled};
for (const key of Object.keys(data.response[0])) {
  if (key === "name" || key === "phone" || key === "email" || key === "business_name" || key === "pan_number" || key === "gst_number" || key === "street_line" || key === "city" || key === "pin_code" || key === "state") {
    if (data.response[0][key] !== null && data.response[0][key] !== "") {
      isFilled[key] = true;
    }
  }
}
setIsFilled(isFilled);


const filledCount = Object.keys(isFilled).reduce(
  (acc, key) => acc + (isFilled[key as keyof typeof isFilled] ? 1 : 0),
  0
  );
  
  setProgress(filledCount * 10);

const progressBar = document.querySelector('.progressBar > .progress');
const percentage = document.querySelector('.progress-percentage > p');

    if (progressBar) {
      console.log("123");
      const progressBarElement = progressBar as HTMLElement;
      const percentageElement = percentage as HTMLElement;
      console.log(filledCount);
      
      progressBarElement.style.width = `${filledCount * 10}%`;
      percentageElement.style.left = `${filledCount * 10 - 2}%`;
      console.log("123");
    }
  }
  const handleSubmit = async () => {
    try {
      console.log("response sending verified full form ...");
      console.log(userData);
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/customer/details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Convert the userData object to a JSON string
      });

      console.log(response);
      const data = await response.json();

      console.log(data);
      // console.log(data.status);

      if (response.status === 201) {
        console.log(data);
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("sign up errr", err);
    }
  }

  const handleSave = async () => {
    setIsEdit(false);
    // try {
    //   console.log("response sending...");
    //   console.log(userData);
    //   // Use fetch to make the post request with the url and the data
    //   const response = await fetch(`${BASEURL}/customer/details`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userData), // Convert the userData object to a JSON string
    //   });

    //   console.log(response);
    //   const data = await response.json();

    //   console.log(data);
    //   // console.log(data.status);

    //   if (response.status === 201) {
    //     console.log(data);
    //     alert("Registration Successfully");
    //   } else {
    //     alert(data.response);
    //   }
    // } catch (err) {
    //   console.log("sign up errr", err);
    // }
  }

  const editDetails = () => {
    setIsEdit(true)
  }

  const changeNumber = () => {
    setIsOpen(true);
    setModalSection("verify")
  }

  const addEmail = () => {
    setIsOpen(true);
    setModalSection("addEmail")
  }

  const uploadPanNumber = () => {
    if (isVerify1 === "Verify") {
      setModalSection("uploadPanNumber")
    } else {
      setModalSection("viewPanNumber")
    }
    setIsOpen(true);
  }

  const uploadGstNumber = () => {
    // setIsVerify2("verify")
    if (isVerify2 === "Verify") {
      setModalSection("uploadGstNumber")
    } else {
      setModalSection("viewGstNumber")
    }
    setIsOpen(true);
  }

  const handleOtpChange = (value: string) => {
    setUserData({ ...userData, otp: value });
  }

  const verifyPhoneOtp = async () => {
    try {
      console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/cauth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ phone: userData.phone, otp: userData.otp })
      });

      console.log(response);
      const data = await response.json();

      console.log(data);
      console.log(data["jwt"]);

      if (response.status === 200) {
    // localStorage.setItem("auth_token", data["jwt"])

        setModalSection("addNumber")
        //   setTimeout(() => {
        //     setIsOpen(false)
        // }, 1000)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("verify errr", err);
    }
  }

  const requestEmailOtp = async () => {
    try {
      console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/email/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
        // body: JSON.stringify(userData.otp)
      });

      console.log(response);
      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
        alert(data.response)
        setModalSection("verifyEmail")
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("verify errr", err);
    }
  }

  const verifyEmailOtp = async () => {
    try {
      console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/email/verify?otp=${userData.otp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(userData.otp)
      });

      console.log(response);
      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
        //   alert("Verification successfully")
        handleChangeEmail();
        setIsOpen(false)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("verify errr", err);
    }
  }

  const verifyPanNumber = async () => {
    // console.log(base64Image1);
    // console.log(`Bearer ${localStorage.getItem("auth_token")}`);
    try {
      console.log("response sending pan image upload...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/content/upload/pan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
          // "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtaXRodWppLWJhY2tlbmQtYXBpIiwic3ViIjoiZXhhbXBsZUAxMjMuY29tIiwiZXhwIjozMzI0ODU4MzcxMywianRpIjoiNjRkNGU4MTUyZDIzZWIzYWFlMTQ5MTEzIiwibmFtZSI6IkV4YW1wbGVNYW4iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2OTE2NzQ5MTN9.GCqP1Fj7xu6t249pvxwSr_DAQmMw90DbINKAjNGPU04",

        },
        body: JSON.stringify({ "base64": base64Image1 })
      });

      console.log(response);
      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
        alert("Uploaded Pan Certificate Successfully")
        setIsVerify1("View");
        navigate("/business-profile")
      } else {
        alert(data.response);
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

      if (response.status === 200) {
        alert("Verification successfully")
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("verify errr", err);
    }
  }

  const handleChangeNumber = async () => {
    try {
      console.log("response sending otp verify ...");
      // console.log(object);
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/phone/request?otp=${userData.otp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
        // body: JSON.stringify(number)
      });

      console.log(response);
      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
        // alert("Number Added successfully")
        console.log(number);
        try {
          console.log("response sending change number ...");
          // Use fetch to make the post request with the url and the data
          const response = await fetch(`${BASEURL}/customer/details`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
            },
            body: JSON.stringify(number)
          });

          console.log(response);
          const data = await response.json();

          console.log(data);

          if (response.status === 200) {
            alert("Number Added successfully")
            setUserData({
              ...userData,
              phone: data.response[0].phone,
            });
            localStorage.setItem("auth_token", data.response[1]["jwt"])
            // console.log(userData.phone);
            setIsOpen(false)
          } else {
            alert(data.response);
          }
        } catch (err) {
          console.log("verify errr", err);
        }
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("verify errr", err);
    }
  }

  const handleChangeEmail = async () => {
    try {
      console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/customer/details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({email: userData.email})
      });

      console.log(response);
      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
        alert("Email Added successfully")
        localStorage.setItem("auth_token", data.response[1]["jwt"])
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("verify errr", err);
    }
  }

  const verifyGstNumber = async () => {
    try {
      console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/content/upload/gst`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({"base64": base64Image2}) //base 64 send of jpg
      });

      console.log(response);
      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
        alert("gst certificate uploaded successfully")
        setIsVerify2("View");
        setIsOpen(false)
        navigate("/business-profile")
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("verify errr", err);
    }
  }

    console.log(isFilled);
  

  return (
    
    <>
      <div className="profile">
        <Navbar />
        <div className="innerProduct">
          <div className="left"><ProfileSideBar /></div>
          <div className="right">
            <div className="box-left">
              <div className="boxCon">
                <img src={`http://ec2-16-170-207-123.eu-north-1.compute.amazonaws.com:8080/api/v1/content/get/${userData.id}`} className="box-img"></img>
                <span>Change Profile</span>
              </div>
              <div className="align">

                <div className="progress-percentage"><p>{progress}%</p></div>
                <div className="progressBar">
                  <div className="progress"></div>
                </div>
                <p>Complete Your Profile</p>
              </div>
            </div>
            <div className="businessDetailes">
              <form method="post">
                <div className="formGroup">
                  <h3>Personal Details</h3>
                  {!isEdit &&
                    <button className="edit-btn" onClick={editDetails}>Edit Details</button>
                  }
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={userData.name} className="form-control" onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Business Name</label>
                    <input type="text" name="business_name" value={userData.business_name} className="form-control" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input className="form-control" name="phone" value={userData.phone} onChange={handleChange} />
                    {isEdit &&
                      <p onClick={changeNumber}>Change</p>
                    }

                    {modalSection === "verify" && (
                      <Modal className="custom-modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                        <form>
                          <p>Verify Your Registered Number</p>
                          <MuiOtpInput className="otp" length={4} value={userData.otp} onChange={handleOtpChange} />

                          <div className="forgot"> <span onClick={resend}>Resend OTP</span> in {60} sec </div>

                          <div className="form-group">
                            <Button variant="contained" className="bt2" onClick={verifyPhoneOtp}>Verify</Button>
                          </div>
                        </form>
                      </Modal>
                    )}

                    {modalSection === "addNumber" && (

                      <Modal className="custom-modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                        <form>
                          <p>Add Your Number</p>
                          {/* <Select
        value={selectedCountryCode}
        disableSelected={true}
      >
          <option>
            +91
          </option>

      </Select> */}
                          <input type="text" id="mobile_code" className="form-control" placeholder="Phone Number" onChange={handleNumberChange} name="phone"></input>

                          <div className="form-group">
                            <Button variant="contained" className="bt2" onClick={() => setModalSection("verifyNew")}>Next</Button>
                          </div>
                        </form>
                      </Modal>
                    )}

                    {modalSection === "verifyNew" && (
                      <Modal className="custom-modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                        <p>Verify Your New Number</p>
                        <MuiOtpInput className="otp" value={userData.otp} length={4} onChange={handleOtpChange} />

                        <div className="forgot"> <span onClick={resend}>Resend OTP</span> in {60} sec </div>

                        <div className="form-group">
                          <Button variant="contained" className="bt1" onClick={(handleChangeNumber)}>Verify</Button>
                        </div>
                      </Modal>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" name="email" value={userData.email} onChange={handleChange} />
                    {isEdit &&
                      <p onClick={addEmail}>Add</p>
                    }
                    {modalSection === "addEmail" && (

                      <Modal className="custom-modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                        <form>
                          <p>Add Your Email</p>
                          <div className="form-group">
                            <input type="email" className="input" id="email" name="email" placeholder="Enter Your Email" onChange={handleChange} />
                            <label htmlFor="email">Enter Your Email</label>
                          </div>

                          <div className="form-group">
                            <Button variant="contained" className="bt2" onClick={requestEmailOtp}>Verify</Button>
                          </div>
                        </form>
                      </Modal>
                    )}

                    {modalSection === "verifyEmail" && (

                      <Modal className="custom-modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                        <form>
                          <p>Verify Your Email</p>
                          <MuiOtpInput className="otp" length={4} value={userData.otp} onChange={handleOtpChange} />

                          <div className="forgot"> <span onClick={resend}>Resend OTP</span> in {60} sec </div>

                          <div className="form-group">
                            <Button variant="contained" className="bt2" onClick={verifyEmailOtp}>Verify</Button>
                          </div>
                        </form>
                      </Modal>

                    )}
                  </div>
                  {isEdit &&
                    <div className="form-group">
                      <button className="cancel-btn" onClick={() => setIsEdit(false)}>Cancel</button>
                      <button className="save-btn" onClick={handleSave}>Save</button>
                    </div>
                  }
                </div>
                <div className="formGroup">
                  <h3>Documents</h3>
                  {!isEdit &&
                    <button type="button" className="edit-btn" onClick={editDetails}>Edit Details</button>
                  }
                  <div className="form-group">
                    <label>PAN Number</label>
                    <input type="text" name="pan_number" value={userData.pan_number} className="form-control" onChange={handleChange} />
                    {isEdit &&
                      <p onClick={uploadPanNumber}>{isVerify1}</p>
                    }
                    {modalSection == "uploadPanNumber" && (

                      <Modal className="custom-modal" isOpen={isOpen} onRequestClose={() => { setIsOpen(false); setBase64Image1("/Group.png"); setIsPanCard(false) }}>
                        <form>
                          <p className="upload-para">Upload Pan Card</p>
                          <div className="form-group">
                            {/* {isPanCard &&
<>
          <img src={base64Image} className="user-image" />
          </>
} */}
                            <div className="box-upload">
                              <input
                                type="file"
                                className="file-input"
                                id="pan-card"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={handleImageChange}
                              />
                              {!isPanCard ? (<>
                                <img src={base64Image1} className="box" width="100px" height="100px" />
                                <p>To Upload Pan Card Click Here</p>
                              </>
                              ) : (
                                <>
                                  <img width="250px" src={`data:image/png;base64,${base64Image1}`} className="box" height="150px" />
                                  <p className="img-name">Pan_card.jpg<CloseIcon className="icon" onClick={() => setIsOpen(false)} /></p>
                                </>
                              )
                              }
                            </div>
                          </div>
                          <div className="form-group">
                            <Button variant="contained" className="bt1" onClick={verifyPanNumber}>Upload</Button>
                          </div>
                          {/* <p>Base64 Image:</p>
      <textarea value={base64Image} /> */}
                        </form>
                      </Modal>
                    )}

                    {modalSection == "viewPanNumber" && (

                      <Modal className="custom-modal" isOpen={isOpen} onRequestClose={() => { setIsOpen(false);}}>
                        <form>
                          <p className="upload-para">View Pan Card</p>
                          <div className="form-group">
                            {/* {isPanCard &&
<>
          <img src={base64Image} className="user-image" />
          </>
} */}
                            <div className="box-upload">
                              <input
                                type="file"
                                className="file-input"
                                id="pan-card"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={handleImageChange}
                              />
                              {!isPanCard ? (<>
                                <img src={`data:image/png;base64,${base64Image1}`} className="box" width="100px" height="100px" />
                                <p>To Upload Pan Card Click Here</p>
                              </>
                              ) : (
                                <>
                                  <img width="250px" src={`http://ec2-16-170-207-123.eu-north-1.compute.amazonaws.com:8080/api/v1/content/get/${base64Image1}`} className="box" height="150px" />
                                  <p className="img-name">Pan_card.jpg<CloseIcon className="icon" onClick={() => setIsOpen(false)} /></p>
                                </>
                              )
                              }
                            </div>
                          </div>
                          <div className="form-group">
                            <Button variant="contained" className="bt1" onClick={verifyPanNumber}>Upload</Button>
                          </div>
                          {/* <p>Base64 Image:</p>
      <textarea value={base64Image} /> */}
                        </form>
                      </Modal>
                    )}
                  </div>

                  <div className="form-group">
                    <label>GST Number</label>
                    <input type="text" name="gst_number" value={userData.gst_number} className="form-control" onChange={handleChange} />
                    {isEdit &&
                      <p onClick={uploadGstNumber}>{isVerify2}</p>
                    }
                    {modalSection == "uploadGstNumber" && (

                      <Modal className="custom-modal" isOpen={isOpen} onRequestClose={() => { setIsOpen(false); setBase64Image2("/Group.png"); setIsGst(false) }}>
                        <form>
                          <p className="upload-para">Upload Gst Certificate</p>
                          <div className="form-group">
                            <div className="box-upload">
                              <input
                                type="file"
                                className="file-input"
                                id="pan-card"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={handleImageChange}
                              />
                              {!isGst ? (<>
                                <img src={`${base64Image2}`} className="box" width="100px" height="100px" />
                                <p>To gst certificate Card Click Here</p>
                              </>
                              ) : (
                                <>
                                  <img width="250px" src={`data:image/png;base64,${base64Image2}`} className="box" height="150px" />
                                  <p className="img-name">gst_certi.jpg<CloseIcon className="icon" onClick={() => setIsOpen(false)} /></p>
                                </>
                              )
                              }
                            </div>
                          </div>
                          <div className="form-group">
                            <Button variant="contained" className="bt1" onClick={verifyGstNumber}>Upload</Button>
                          </div>
                          {/* <p>Base64 Image:</p>
      <textarea value={base64Image} /> */}
                        </form>
                      </Modal>
                    )}

                    {modalSection == "viewGstNumber" && (

                      <Modal className="custom-modal" isOpen={isOpen} onRequestClose={() => { setIsOpen(false);}}>
                        <form>
                          <p className="upload-para">View Gst Certificate</p>
                          <div className="form-group">
                            <div className="box-upload">
                              <input
                                type="file"
                                className="file-input"
                                id="pan-card"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={handleImageChange}
                              />
                              {!isGst ? (<>
                                <img src={`data:image/png;base64,${base64Image2}`} className="box" width="100px" height="100px" />
                                <p>To Upload Pan Card Click Here</p>
                              </>
                              ) : (
                                <>
                                  <img width="250px" src={`http://ec2-16-170-207-123.eu-north-1.compute.amazonaws.com:8080/api/v1/content/get/${base64Image2}`} className="box" height="150px" />
                                  <p className="img-name">Pan_card.jpg<CloseIcon className="icon" onClick={() => setIsOpen(false)} /></p>
                                </>
                              )
                              }
                            </div>
                          </div>
                          <div className="form-group">
                            <Button variant="contained" className="bt1" onClick={verifyGstNumber}>Upload</Button>
                          </div>
                          {/* <p>Base64 Image:</p>
      <textarea value={base64Image} /> */}
                        </form>
                      </Modal>
                    )}
                  </div>
                  {isEdit &&
                    <div className="form-group">
                      <button className="cancel-btn" onClick={() => setIsEdit(false)}>Cancel</button>
                      <button className="save-btn" onClick={handleSave}>Save</button>
                    </div>
                  }
                </div>

                <div className="formGroup">
                  <h3>Address</h3>
                  {!isEdit &&
                    <button type="button" className="edit-btn" onClick={editDetails}>Edit Details</button>
                  }
                  <div className="form-group">
                    <label>Street Line</label>
                    <input type="text" name="street_line" value={userData.street_line} className="form-control" onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" value={userData.city} className="form-control" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Pin Code</label>
                    <input className="form-control" value={userData.pin_code} name="pin_code" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input className="form-control" value={userData.state} name="state" onChange={handleChange} />
                  </div>
                  {isEdit &&
                    <div className="form-group">
                      <button className="cancel-btn" onClick={() => setIsEdit(false)}>Cancel</button>
                      <button className="save-btn" onClick={handleSave}>Save</button>
                    </div>
                  }
                </div>
                <div className="form-group">
                  <button type="button" className="bt" onClick={handleSubmit}><GppGoodIcon className="icon" />Verified</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerProfile
