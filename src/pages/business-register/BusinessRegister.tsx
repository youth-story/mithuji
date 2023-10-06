import { useState } from "react";
import "./businessRegister.scss"
import Navbar from "../../components/navbar/Navbar"
import { useNavigate } from "react-router-dom";
import business from "../../assets/business.png"
import {BASEURL} from "../../utils/constants";
import { Button } from "@mui/material"


const BusinessRegister = () => {

  const navigate = useNavigate();

    const [sellerData, setSellerData] = useState({
        business_name: "",
        document_type: "",
        gst: "",
        pan: "",
      });
    
      const handleChange = (e: any) => {
        setSellerData({ ...sellerData, [e.target.name]: e.target.value });
      }

      const [buttonClicked, setButtonClicked] = useState('');

      const handleButtonChange = (event: any) => {
        const { name } = event.target;
        setButtonClicked(name)
      };
    
      const sellerRegister = async() => { 
        if (sellerData.business_name === "" || sellerData.document_type === "" || sellerData.gst === "" || sellerData.pan === "") {
            console.log(sellerData);
            alert("fill all contained");
        }else{
        try {
            console.log("response sending...");
            console.log(sellerData);
            // Use fetch to make the post request with the url and the data
            const response = await fetch(`${BASEURL}/becomeseller`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
              },
              body: JSON.stringify(sellerData), // Convert the userData object to a JSON string
            });
    
            console.log(response);
            const data = await response.json();
    
            console.log(data);
            // console.log(data.status);
    
            if(response.status === 200){
              console.log(data);
              alert("Registration Successfully");
              navigate("/dashboard")
            } else{
              alert(data.response);
            }
          } catch (err) {
            console.log("sign up errr", err);
          }
        }
      }

    return (
        <>
            <div className="businessRegister">
                <Navbar />

                <div className="innerGrid container">
                    <div className="row">

                        <div className="col-6 imageCon">
                            <div>
                                <section>Take Your Business <br /> to New Heights</section>
                                <img src={business} alt="" />
                            </div>
                        </div>

                        <div className="col-6 contentCon">
                            <div className="box">

                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Business Name" name="business_name" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Document Type" name="document_type" onChange={handleChange} />
                                    </div>

                                    {/* <div className="form-group">
                                        <input type="text" className="form-control inp" placeholder="GST" name="gst" onChange={handleChange} />
                                        <input type="text" className="form-control inp" placeholder="PAN" name="pan" onChange={handleChange} />
                                    </div> */}
<Button className={`inp ${buttonClicked === 'gst' ? "clicked" : ""}`} name="gst" onClick={handleButtonChange}>
  GST
</Button>
<Button className={`inp ${buttonClicked === 'pan' ? "clicked" : ""}`} name="pan" onClick={handleButtonChange}>
  PAN
</Button>
                                    <Button className="btn1" variant="contained" onClick={sellerRegister}>Register</Button>
                                    <Button className="btn2" variant="contained">Need Help</Button>

                                    <span>Take help to our executive</span>

                                </form>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default BusinessRegister