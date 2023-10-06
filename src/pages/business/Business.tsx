import "./business.scss"
import Navbar from "../../components/navbar/Navbar"
import business from "../../assets/business.png"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { business_register } from "../../App"

const Business = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="business">
        <Navbar />

        <div className="innerGrid container">
          <div className="row">

            <div className="col-6 contentCon">
              <section>Take Your <br /> Business to <br /> New <br /> Heights</section>
              <div className="btcon"><Button className="bt1" variant="contained" onClick={() => navigate(business_register)}>Register</Button></div>
              <div className="btcon"><Button className="bt2" variant="contained">Need Help</Button></div>
            </div>

            <div className="col-6 imageCon">
              <img src={business} alt="" />
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Business