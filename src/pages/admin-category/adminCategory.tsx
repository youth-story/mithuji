import { useState, useEffect } from "react";
// import { Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import AdminNavbar from "../../components/admin-navbar/AdminNavbar"
import SideBar from "../../components/sideBar/SideBar"
import "./adminCategory.scss"
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
import { BASEURL } from "../../utils/constants";
// import moment from "moment";
// import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';


const AdminProduct = () => {

  // const { url } = useParams();

  // const navigate = useNavigate();

  // interface CategoryData {
  //   name: string;
  //   seq: string;
  // }
  
  // interface ProductData {
  //   name: string;
  //   images: string[];
  //   price_range: string;
  //   available_quantities: number;
  //   currency: string;
  // }
  
  interface SponseredData {
    ended: string;
    started: string;
    id: string;
    image: string;
    name: string;
    category_name: string;
    subcategories: string[];
  }

  const [sponsoredProduct, setSponsoredProduct] = useState<SponseredData[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [subCatName, setSubCatName] = useState("");
//   const [searchCategoryData, setSearchCategoryData] = useState<CategoryData[]>([]);
// const [searchProductData, setSearchProductData] = useState<ProductData[]>([]);
//   const [productId, setProductId] = useState(null);
  // const [isOpen, setIsOpen] = useState(false)
  // const [modalSection, setModalSection] = useState("");
  // const [startSelectedDate, setStartSelectedDate] = useState(new Date());
  // const [endSelectedDate, setEndSelectedDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1));
  
  // const [selectedCategoryOption, setSelectedCategoryOption] = useState("");
  // const [selectedProductOption, setSelectedProductOption] = useState("");
  
  const [isDivide, setISDivide] = useState(false)
  const [selectedTd, setSelectedTd] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 11;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = sponsoredProduct.slice(firstIndex, lastIndex);
  const npage = Math.ceil(sponsoredProduct.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const handleAddProduct = () => {
    // setIsOpen(true)
    // setModalSection("addProduct")
  };


  const listItems = records.map((d, i) => {
    const started = new Date(d.ended);
    const ended = new Date(d.started);

    const difference = ended.getTime() - started.getTime();

    const days = Math.abs (difference / (1000 * 60 * 60 * 24));

    // console.log(days);
    // console.log(d.id);
    // console.log(i);

    return (!isDivide ? (
      <tr className="tableRow" onClick={() => {
        setISDivide(true);
        setSelectedTd(i);
      }}
       key={i}>
        <td>{d.name}</td>
        <td>{d.subcategories.length}</td>
        <td>{days}</td>
      </tr>
    ) : (
      selectedTd === i && d.subcategories.map((subcat, index) => (
        <tr key={index}>
          <td>{subcat}</td>
        </tr>
      ))
    ))
    
  });

  const categoryItems = records.map((d, i) => {

    return (
      <tr key={i}>
      <td 
        className={`cat ${isDivide && selectedTd === i ? `bgGray` : ``}`} 
        onClick={() => {
          setISDivide(true);
          setSelectedTd(i);
        }}
      >
        {d.name}
      </td>
    </tr>
      )
  });


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

  useEffect(() => {
    getSponsoredProduct();
  }, [])
  
  const getSponsoredProduct = async() => {
    try {
      // console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/admin/category/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_auth_token")}`,
        }
      });

      // console.log(response);
      const data = await response.json();

      console.log(data.response);

      if (response.status === 200) {
        setSponsoredProduct(data.response.content)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("getting errr", err);
    }
  }
  
  
  const onCategoryChange = (e: any) => {
    setCategoryName(e.target.value);
}
  
  const onSubChange = (e: any) => {
    setSubCatName(e.target.value);
}

  const addCategory = async() => {
    // const addData = {
      
    // }

    console.log(categoryName);
    console.log(subCatName);
    try {
      // console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/admin/category/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_auth_token")}`,
        }
      });

      // console.log(response);
      const data = await response.json();

      console.log(data.response);

      if (response.status === 200) {
        setSponsoredProduct(data.response.content)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("getting errr", err);
    }
  }

  return (
    <>
      <div className="addProduct">
        <AdminNavbar />
        <div className="innerAdd">
          <div className="left"><SideBar /></div>
          <div className="right">
            <div className="add-Container">
              <div className="left-side">
                { !isDivide &&
              <div className="header">
                <h2 className="heading">Categories</h2>
                <p className="btn"  onClick={() => {
                        setISDivide(true);
                        setSelectedTd(0);
                      }}>Sub Categories</p>
                <div className="side-search">
                <input className="search" type="text" placeholder="Search Category" />
                <SearchIcon className="search-icon" onClick={handleAddProduct} />
                </div>
              </div>
}
              <div className="products">
                { !isDivide ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Categories Name</th>
                      <th>Sub Categories</th>
                      <th>Linked Products</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {listItems}
                  </tbody>
                </table>
                ) : (
                  <div className="table-divider">
                    <div className="table-left">
                <h3 className="head" onClick={() => setISDivide(false)}>Categories</h3>
                <table className="table ">
                  <thead>
                    <tr>
                      <th onClick={() => setISDivide(false)}>Categories Name</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {categoryItems}
                  </tbody>
                </table>
                </div>
                <div className="table-right">
                  
                <h3 className="head">Sub-Categories</h3>
                <div className="side-search">
                <input className="search" type="text" placeholder="Search SubCategory" />
                <SearchIcon className="search-icon" onClick={handleAddProduct} />
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sub Categories</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {listItems}
                  </tbody>
                </table>
                </div>
                </div>
                )
                }
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
            { !isDivide ?(

            <div className="right-side">
              <div className="side-box">
                <h2 className="heading">Add New Category</h2>
                <input type="text" onChange={onCategoryChange} placeholder="Add Category" />
                <button className="btn" onClick={addCategory}>Add</button>
              </div>
            </div>
            ) : (
              <div className="right-side">
              <div className="side-box">
                <h2 className="heading">Add New Sub-Category</h2>
                <input type="text" onChange={onSubChange} placeholder="Add Sub-Category" />
                <button className="btn" onClick={handleAddProduct}>Add</button>
              </div>
            </div>
            )
}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProduct