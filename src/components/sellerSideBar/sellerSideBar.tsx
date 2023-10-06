import { useNavigate } from "react-router-dom"
import "./sellerSideBar.scss"
import { seller_dashBoard } from "../../App";

const SideBar = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="sideBar">
                <div className="optionsCon" onClick={() => navigate(seller_dashBoard)}>Dashboard</div>
                {/* <div className="optionsCon child-dash" onClick={() => navigate(sponsored_products)}>Sponsored Product on Home Page</div>
                <div className="optionsCon child-dash" onClick={() => navigate(category)}>Category on Home page</div> */}
                <div className="optionsCon" onClick={() => navigate("/products")}>Products</div>
                <div className="optionsCon" onClick={() => navigate("#")}>Messages</div>
            </div>
        </>
    )
}

export default SideBar