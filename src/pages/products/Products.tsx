// import "./products.scss"
// import { Button } from "@mui/material"
// import Navbar from "../../components/navbar/Navbar"
// import SideBar from "../../components/sideBar/SideBar"
// import { base_add_product } from "../../App"
// import { useNavigate } from "react-router-dom"
// import { CATEGORY } from "../../utils/constants"


// const Products = () => {

//     const navigate = useNavigate();

//     const navigation = () => {        navigate(base_add_product + "/" + CATEGORY);
//     }

//     return (
//         <>
//             <div className="products">
//                 <Navbar />
//                 <div className="innerProduct">
//                     <div className="left"><SideBar /></div>
//                     <div className="right">
//                         <div className="innerContanier">
//                             <div className="header">
//                                 <Button className="addBt" variant="contained" onClick={navigation}>Add product</Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Products