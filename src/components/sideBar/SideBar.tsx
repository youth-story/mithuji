import { useNavigate } from "react-router-dom"
import "./sideBar.scss"
import { dashBoard, sponsored_products, seller, category  } from "../../App";
// import { CATEGORY } from "../../utils/constants";
// import Category from "../category/Category";

const SideBar = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="sideBar">
                <div className="optionsCon" onClick={() => navigate(dashBoard)}>Dashboard
                </div>
                <div className="optionsCon child-dash" onClick={() => navigate(sponsored_products)}>Sponsored Product on Home Page</div>
                <div className="optionsCon child-dash" onClick={() => navigate(category)}>Category on Home page</div>
                <div className="optionsCon" onClick={() => navigate("/admin-category")}>Category</div>
                <div className="optionsCon" onClick={() => navigate(seller)}>Seller</div>
                {/* <div className="optionsCon" onClick={() => navigate(base_add_product + "/" + CATEGORY)}>Products</div> */}
                <div className="optionsCon">Products</div>
                <div className="optionsCon">Products</div>
            </div>
        </>
    )
}

export default SideBar