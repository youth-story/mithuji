import Navbar from "../../components/navbar/Navbar"
import SellerSideBar from "../../components/sellerSideBar/sellerSideBar"
import "./sellerDashboard.scss"

const DashBoard = () => {
    return (
        <>
            <div className="sellerDashboard">
                <Navbar />
                <div className="inner">
                    <div className="left"><SellerSideBar /></div>

                    <div className="right">
                       <div className="top">
                        <div className="topLeft"></div>
                        <div className="topRight"></div>
                       </div>
                       <div className="bottom"></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DashBoard