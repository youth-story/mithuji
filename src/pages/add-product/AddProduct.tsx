import { Button } from "@mui/material"
import Navbar from "../../components/navbar/Navbar"
// import SideBar from "../../components/sideBar/SideBar"
import "./addProduct.scss"
import Category from "../../components/category/Category"
import { useNavigate, useParams } from "react-router-dom"
import SubCategory from "../../components/sub-category/SubCategory"
import BasicDetails from "../../components/basic-details/BasicDetails"
import AdvanceDetails from "../../components/advance-details/AdvanceDetails"
import { BASIC_DETAILS, ADVANCE_DETAILS, CATEGORY, SUB_CATEGORY } from "../../utils/constants"
import { base_add_product } from "../../App"
import SellerSideBar from "../../components/sellerSideBar/sellerSideBar"

const AddProduct = () => {

    const { url } = useParams();

    const navigate = useNavigate();

    const base_url = base_add_product + "/";

    const navigation = (path: any) => {
        navigate(base_url + path)
    }

    return (
        <>
            <div className="addProduct">
                <Navbar />
                <div className="innerAdd">
                    <div className="left"><SellerSideBar /></div>
                    <div className="right">
                        <div className="addContainer">
                            <div className="progressBox">
                                <div><Button variant="outlined" id={url == CATEGORY ? "activeBt" : ""} className="bt" onClick={() => navigation(CATEGORY)}> <input type="checkbox" className="form-check-input" /> Category</Button></div>
                                <div><Button variant="outlined" id={url == SUB_CATEGORY ? "activeBt" : ""} className="bt" onClick={() => navigation(SUB_CATEGORY)}> <input type="checkbox" className="form-check-input" /> Sub Category</Button></div>
                                <div><Button variant="outlined" id={url == BASIC_DETAILS ? "activeBt" : ""} className="bt" onClick={() => navigation(BASIC_DETAILS)}> <input type="checkbox" className="form-check-input" /> Basic Details</Button></div>
                                <div><Button variant="outlined" id={url == ADVANCE_DETAILS ? "activeBt" : ""} className="bt" onClick={() => navigation(ADVANCE_DETAILS)}> <input type="checkbox" className="form-check-input" /> Advance Details</Button></div>
                            </div>

                            {url == CATEGORY && <Category />}
                            {url == SUB_CATEGORY && <SubCategory />}
                            {url == BASIC_DETAILS && <BasicDetails />}
                            {url == ADVANCE_DETAILS && <AdvanceDetails />}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct