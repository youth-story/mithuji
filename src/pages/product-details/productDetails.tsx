import { useEffect, useState } from "react"
import "./productDetails.scss"
import { Button } from "@mui/material"
// import EastIcon from '@mui/icons-material/East';
import Footer from "../../components/footer/Footer";
// import ProductCard from "../../components/product-card/ProductCard";
import Navbar from "../../components/navbar/Navbar";
import { BASEURL } from "../../utils/constants"
// import { category_products } from "../../App"
import { useLocation } from "react-router-dom";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';

const CategoryProducts = () => {

    // const navigate = useNavigate();

    const location = useLocation();
    // console.log(location.state);
    const {id, created_by_id} = location.state;

    // const categoryName = window.location.pathname.split("/")[1];
    
    // const base_url = category_products + "/";

    // const navigation = (path: any) => {
    //     navigate("/" +path + base_url)
    // }

    const [seller, setSeller] = useState({business_name: '', location: '', name: '', year: '', address: ''})
    
    const [data, setData] = useState({ name: '', price_range: '',description: '', images: ''});
    // const [query, setQuery] = useState("");

    // const [userData, setUserData] = useState({
    //     productName: "",
    //     phoneNumber: "",
    //     name: ""
    // });

    useEffect(() => {
        // console.log(setArray);

        (async () => {     
            try {
                console.log("response sending...");
                // Use fetch to make the post request with the url and the data
                const response = await fetch(`${BASEURL}/product/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("auth_token")}`},
                });
    
                console.log(response);
                const data = await response.json();

    
                if (response.status === 200) {
                    console.log(data.response);
                    setData(data.response)
                } else {
                    alert(data.message);
                }
            } catch (err) {
                console.log("suggestion errr", err);
            }
          })();
        
        
          (async () => {     
            try {
                // console.log("response sending...");
                // Use fetch to make the post request with the url and the data
                const response = await fetch(`${BASEURL}/customer/${created_by_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "text",
                        "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                    },
                });
    
                console.log(response);
                const data = await response.json();

    
                if (response.status === 200) {
                    console.log(data.response);
                    setSeller(data.response)
                } else {
                    alert(data.message);
                }
            } catch (err) {
                console.log("Sponsored data errr", err);
            }
          })();
    }, []);
 
    return (
        <>
            <div className="home">

                <Navbar />


                    {/* <div className="container">
                    <div className="products">
                <section className="category-name">{categoryName}</section>
                        {array.map((val, index) => {
                            return (
                                <div className="boxContainer" key={index}>
                                    <img src={val.image} className="box"></img>
                                    <p className="productName">{val.name}Simonsen 123 Tempered Glass 10H Hardness...</p>
                                    <div className="text-flex">
                                        <p className="first">$40.25</p>
                                        <p className="second"><VerifiedUserIcon className="icon"/>Trusted <span>
                                            Seller</span></p>
                                    </div>
                                    <p className="minQuntity">{val.name}Min Order Qty. - 100pieces</p>
                                    
                            <Button variant="contained" className="btn" onClick={() => navigateProduct("1")}>Contact Seller</Button>
                                </div>
                            );
                        })}
    </div>
    </div> */}

<div className="prductsection">
<div className={`handheld-printer-container`}>
      <p className={`handheld-printer-title`}>{data.name}</p>
      <p className={`handheld-printer-price`}>
        <span className={`price-label`}>₹{data.price_range}</span>/ piece
      </p>
      <p className={`justified-text`}>
        <div className="specifications">
        Specifications:
        <ul>
        {/* {data.specification.map(item => (
          <li>item</li>
        ))
          } */}
        {/* <li>Power: 2 ah, li-ion, rechargeable battery</li>
        <li>Input voltage : 190 –240v.</li>
        <li>Pc interface: rs232 serial.</li> */}
        </ul>
        </div>

    <div className="applications">
        Applications:
        <ul>
          {/* {data.application.map(item => (
          <li>item</li>
        ))
          } */}
        {/* <li>
        Buses, go-downs, delivery sales vans.
        </li>
        <li>Spot billing in electricity &amp; water suppliers.</li>
        <li>
        Spot billing in petrol bunks and billing in delivery sales vans.
        </li> */}
        </ul>
        </div>
        
        <div className="description">
{data.description}

        {/* With over 20 years of expertise and domain knowledge in Embedded Design, Hardware and Software solutions, Softland India Limited introduces &apos; IPRINT MARVEL &apos; portable printers. Our
        printers are ideally suited for Android / I phone / windows applications.
        <br />
        <br />
        It provides optimal configurations of performance, enhanced security, connectivity &amp; expandability to suite your automation needs.We have 2 models available for our customers.
        <br />
        <br />
        Thermal printers which can be used for temporary printing*Dot matrix printers which can be used for permanent printing with ink. */}
        </div>
      </p>
    </div>
    <div className="images">
    <div className={`hierarchical-container`}>
      <img className={`image-container1`} src={`${BASEURL}/content/get/${data.images}`} />
      <div className={`image-gallery`}>
        {/* {data &&
        {data.images.map(item =>(
          <div className={`container-image-wrapper`}>
          <img className={`image-container`} src={`https://16.170.207.123.nip.io/api/v1/content/get/${item}`} />
        </div>
        ))}
} */}
        <div className={`container-image-wrapper`}>
          <img className={`image-container`} src={`${BASEURL}/content/get/${data.images}`} />
        </div>
        <div className={`container-image-wrapper`}>
          <img className={`image-container5`} src={`${BASEURL}/content/get/${data.images}`} />
        </div>
        <div className={`container-image-wrapper`}>
          <img className={`image-container5`} src={`${BASEURL}/content/get/${data.images}`} />
        </div>
        <div className={`container-image-wrapper`}>
          <img className={`image-container5`} src={`${BASEURL}/content/get/${data.images}`} />
        </div>
        <div className={`container-image-wrapper`}>
          <img className={`image-container`} src={`${BASEURL}/content/get/${data.images}`} />
        </div>
      </div>
    </div>
    <Button className="request-for-quotation-button">Request For Quotation</Button>
    </div>
    </div>

    <div className={`seller-details`}>
      <p className={`seller-details-heading`}>Seller Details</p>
      <div className={`seller-details-container`}>
        <div className={`gradient-container`}>
          <p className={`main-heading`}>N</p>
        </div>
        <div className={`company-info`}>
          <div className={`company-info-container`}>
            <p className={`company-name`}>{seller.business_name}</p>
          <p className={`company-location`}>{seller.location}</p>
          </div>
          <div className={`company-logo-container`}>
              <VerifiedUserIcon className="svg-container5" />
              <p className={`gradient-text`}>
                Trusted Seller
              </p>
            </div>
        </div>
      </div>
      <div className={`seller-details1`}>
      <div className={`owner-info-container`}>
        <div className={`container-image-wrapper`}>
          <div className={`proprietor-container`}>
            <div className={`proprietor-container1`}>
              <PermIdentityIcon className="svg-container6" />
            </div>
            <p className={`proprietor-label`}>Proprietor</p>
          </div>
          <p className={`proprietor-name`}>{seller.name}</p>
        </div>
        <div className={`container-image-wrapper`}>
          <div className={`proprietor-container`}>
            <div className={`proprietor-container1`}>
              <CalendarTodayOutlinedIcon className="svg-container6" />
            </div>
            <p className={`proprietor-label`}>Member Since</p>
          </div>
          <p className={`proprietor-name`}>{seller.year}3 Years</p>
        </div>
        <div className={`address-container`}>
          <div className={`proprietor-container`}>
            <div className={`proprietor-container1`}>
              <RoomOutlinedIcon className="svg-container6" />
            </div>
            <p className={`proprietor-label`}>Address</p>
          </div>
          <p className={`proprietor-address`}>{seller.address}</p>
        </div>
      </div>
      {/* Button Component starts here. We've generated code using MUI Base. See other options in "Component library" dropdown in Settings */}
      <Button className="chat-button">Chat with Seller</Button>
    </div>
    </div>
                <Footer />

            </div>
        </>
    )
}

export default CategoryProducts