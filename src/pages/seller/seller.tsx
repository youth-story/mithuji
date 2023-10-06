import { useState, useEffect } from "react";
// import { Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import AdminNavbar from "../../components/admin-navbar/AdminNavbar"
import SideBar from "../../components/sideBar/SideBar"
import "./seller.scss"
// import usePagination from "@mui/material/usePagination/usePagination";
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import RectangleIcon from '@mui/icons-material/Rectangle';
// import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
import { BASEURL } from "../../utils/constants";
// import moment, { utc } from "moment";
// import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
// import Category from "../../components/category/Category"
// import { useNavigate } from "react-router-dom"
// import SubCategory from "../../components/sub-category/SubCategory"
// import BasicDetails from "../../components/basic-details/BasicDetails"
// import AdvanceDetails from "../../components/advance-details/AdvanceDetails"
// import { BASIC_DETAILS, ADVANCE_DETAILS, CATEGORY, SUB_CATEGORY } from "../../utils/constants"
// import { base_add_product } from "../../App"


const Seller = () => {

  // const { url } = useParams();

  // const navigate = useNavigate();

  const [seller, setSeller] = useState([{business_name: '', name: '', phone: '', seller_status: ''}]);
  // const [response, setResponse] = useState([]);
  // const [productId, setProductId] = useState(null);
  // const [isOpen, setIsOpen] = useState(false)
  // const [modalSection, setModalSection] = useState("");
  // const [startSelectedDate, setStartSelectedDate] = useState(new Date());
  // const [endSelectedDate, setEndSelectedDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1));

  interface Record {
    business_name: string;
    name: string;
    phone: string;
    seller_status: string;
  }
  
  const [filterRecords, setFilterRecords] = useState<Record[] | null>(null);  

  // const [selectedCategoryOption, setSelectedCategoryOption] = useState("");
  // const [selectedProductOption, setSelectedProductOption] = useState("");

  
  const [currentPage, setCurrentPage] = useState(1);
  // const [recordsPerPage, setRecordsPerPage] = useState(null);
  // const [lastIndex, setLastIndex] = useState(null);
  // const [firstIndex, setFirstIndex] = useState(null);
  // const [records, setRecords] = useState(null);
  // const [npage, setNpage] = useState(null);
  // const [numbers, setNumbers] = useState(null);

  useEffect(() => {
    getSeller();
  }, [])
  
  const getSeller = async() => {
    try {
      // console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/admin/seller/all?page=${currentPage-1}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_auth_token")}`,
        }
      });

      console.log(response);
      const data = await response.json();

      console.log(data.response);

      if (response.status === 200) {
        // setResponse(data.response)
        setSeller(data.response.content)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("getting errr", err);
    }
  }
  

  // const seller = [
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Approvel",
  //   },
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Denied",
  //   },
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  //   {
  //     "sno": 1213,
  //     "bussinessName": "Dummy Bussiness Name",
  //     "OwnerName": "Dummy Name",
  //     "mobileNumber": "+91 123-456-7890",
  //     "status": "Pending",
  //   },          
  // ]

  const recordsPerPage = 11;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = seller.slice(firstIndex, lastIndex);
  const npage = Math.ceil(seller.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const listItems = () => {
  
    // if (Object.keys(filterRecords[0]).length !== 4) {
    if (filterRecords !== null) {
// if (filterRecords.some(record => record.business_name !== '')) {
console.log("filter");

      return filterRecords.map((d, i) => {
        return (
          <tr className="table-body" key={i}>
            <td className="srNumber">{i + 1}
            </td>
            <td className="category-name">{d.business_name}</td>
            <td>{d.name}</td>
            <td className="cat-more"> 
              {d.phone}
            </td>
            <div className="statusBox"> 
            {d.seller_status === "PENDING" ?
            <td className="pending">{d.seller_status}</td> : d.seller_status === "APPROVEL" ? <td className="approvel">{d.seller_status}</td> : <td className="denied">{d.seller_status}</td> 
          }
          </div>
          </tr>
        );
      });
    } else {
console.log("not filter");

      return records.map((d, i) => {
        //     const started = new Date(d.ended);
        // const ended = new Date(d.started);
  
        // const difference = ended - started;
  
        // const days = Math.abs (difference / (1000 * 60 * 60 * 24));
  
        // console.log(days);
        return (
          <tr className="table-body" key={i}>
            <td className="srNumber">{i + 1}
            </td>
            <td className="category-name">{d.business_name}</td>
            <td>{d.name}</td>
            <td className="cat-more"> 
              {d.phone}
            </td>
            {/* <div className="">  */}
            {d.seller_status === "PENDING" ?
            <td className=""><li className="pending">{d.seller_status}</li></td> : d.seller_status === "APPROVEL" ? <td><li className="approvel">{d.seller_status}</li></td> : <td><li className="denied">{d.seller_status}</li></td> 
          }
          {/* </div> */}
          </tr>
        );
      });
    }
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const changeCPage = (id: any) => {
    setCurrentPage(id)
  }

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      <div className="addProduct">
        <AdminNavbar />
        <div className="innerAdd">
          <div className="left"><SideBar /></div>
          <div className="right">
            <div className="addContainer">
              <div className="seller-header-box">
                <h2 className="heading">Seller</h2>
                <input type="text" className="search" placeholder="Search..." />
                <SearchIcon className="searchIcon" />
                {/* <button className="btn" onClick={()=> navigate("/add-category")}>Add Category</button> */}
              </div>
              <div className="products">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Bussiness Name</th>
                      <th>Owner Name</th>
                      <th>Mobile Number</th>
                      <th className="status">
                        <select name="status" className="selection" onChange={(e) => {
            const selectedStatus = e.target.value;
            // const filteredRecords = seller.filter((item) => item.status === selectedStatus);
            setCurrentPage(1);
            if (selectedStatus !== "All") {
              setFilterRecords(seller.filter((item) => item.seller_status === selectedStatus));
            } else {
              setFilterRecords(null);
            }
          }}>
            <option value="All">Select Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVEL">Approvel</option>
            <option value="DENIED">Denied</option>
          </select></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItems()}
                  </tbody>
                </table>
              </div>
              <div className="bottom">
                <div className="pagination">
                  <a href="#" className={currentPage === 1 ? "disabled" : "prev"} onClick={prePage}>&lt;</a>
                  {numbers.map((n, i) => (
                    <a
                      key={i}
                      href="#"
                      className={n === currentPage ? "active" : ""}
                      onClick={() => changeCPage(n)}
                    >{n}</a>
                  ))

                  }
                  {/* {paginationItems} */}
                  <a href="#" className={currentPage === npage ? "disabled" : "next"} onClick={nextPage}>&gt;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Seller