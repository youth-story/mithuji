import AdminNavbar from "../../components/admin-navbar/AdminNavbar"
import Sidebar from "../../components/sideBar/SideBar"
import "./dashBoard.scss"

const DashBoard = () => {
    return (
        <>
            <div className="sellerDashboard">
                <AdminNavbar />
                <div className="inner">
                    <div className="left"><Sidebar /></div>

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