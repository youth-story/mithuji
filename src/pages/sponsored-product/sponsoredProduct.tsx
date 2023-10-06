import { useState, useEffect } from "react";
import { Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import AdminNavbar from "../../components/admin-navbar/AdminNavbar"
import SideBar from "../../components/sideBar/SideBar"
import "./sponsoredProduct.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { BASEURL } from "../../utils/constants";
import moment from "moment";
import { SelectPicker } from 'rsuite';
// import CloseIcon from '@mui/icons-material/Close';
import 'rsuite/dist/rsuite.min.css';
// import Category from "../../components/category/Category"
// import { useNavigate } from "react-router-dom"
// import SubCategory from "../../components/sub-category/SubCategory"
// import BasicDetails from "../../components/basic-details/BasicDetails"
// import AdvanceDetails from "../../components/advance-details/AdvanceDetails"
// import { BASIC_DETAILS, ADVANCE_DETAILS, CATEGORY, SUB_CATEGORY } from "../../utils/constants"
// import { base_add_product } from "../../App"


const SponsoredProduct = () => {

  // const { url } = useParams();

  // const navigate = useNavigate();

  interface CategoryData {
    name: string;
    seq: string;
  }
  
  interface ProductData {
    name: string;
    images: string[];
    price_range: string;
    available_quantities: number;
    currency: string;
  }
  
  interface SponseredData {
    ended: string;
    started: string;
    id: string;
    image: string;
    name: string;
    category_name: string;
  }

  const [sponsoredProduct, setSponsoredProduct] = useState<SponseredData[]>([]);
  const [searchCategoryData, setSearchCategoryData] = useState<CategoryData[]>([]);
const [searchProductData, setSearchProductData] = useState<ProductData[]>([]);
  const [productId, setProductId] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  const [modalSection, setModalSection] = useState("");
  const [startSelectedDate, setStartSelectedDate] = useState(new Date());
  const [endSelectedDate, setEndSelectedDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1));

  const [selectedCategoryOption, setSelectedCategoryOption] = useState("");
  const [selectedProductOption, setSelectedProductOption] = useState("");

  // const [base64Image, setBase64Image] = useState("/Group.png");
  // const [imageUrl, setImageUrl] = useState("/Group.png");
  // const [isImage, setIsImage] = useState(false)
  // const [image, setImage] = useState(null);

  const handleOnSearch = async(event: any) => {
    setSearchCategoryData([])
    try {
      console.log(selectedCategoryOption);
      console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/category/search?q=${event}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_auth_token")}`,
        }
      });

      console.log(response);
      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
        // console.log(data.response[0].name)
        // console.log(data.response[1].name)

        setSearchCategoryData(data.response)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("getting errr", err);
    }
  // }
  };
 
  const handleOnProductSearch = async(event: any) => {
    setSearchProductData([])
    try {
      console.log(selectedCategoryOption);
      console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/product/search?q=${event}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        }
      });

      console.log(response);
      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
        // console.log(data.response[0].name)
        // console.log(data.response[1].name)

        setSearchProductData(data.response)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("getting errr", err);
    }
  // }
  };

  const handleCategoryChange = (event: any) => {
    setSelectedCategoryOption(event);
  };

  const handleProductChange = (event :any) => {
    setSelectedProductOption(event);
  };

  const handleClick = (i: any) => {
      setProductId(i);    
  };

  // const products = [
  //   {
  //     "src": "https://images.unsplash.com/photo-1603791239531-1dda55e194a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  //     "productName": "iPhone 14 Pro Max",
  //     "seller": "Apple",
  //     "timeLeft": "1 day",
  //   },
  //   {
  //     "src": "https://images.unsplash.com/photo-1678958274412-563119ec18ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
  //     "productName": "Samsung Galaxy S23 Ultra",
  //     "seller": "Samsung",
  //     "timeLeft": "2 days",
  //   },
  //   {
  //     "src": "https://images.unsplash.com/photo-1484788984921-03950022c9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=932&q=80",
  //     "productName": "Laptop Dell XPS 13 Plus",
  //     "seller": "Dell",
  //     "timeLeft": "3 days",
  //   },
  //   {
  //     "src": "https://images.unsplash.com/photo-1603791239531-1dda55e194a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  //     "productName": "iPhone 14 Pro Max",
  //     "seller": "Apple",
  //     "timeLeft": "1 day",
  //   },
  //   {
  //     "src": "https://images.unsplash.com/photo-1678958274412-563119ec18ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
  //     "productName": "Samsung Galaxy S23 Ultra",
  //     "seller": "Samsung",
  //     "timeLeft": "2 days",
  //   },
  //   {
  //     "src": "https://images.unsplash.com/photo-1484788984921-03950022c9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=932&q=80",
  //     "productName": "Laptop Dell XPS 13 Plus",
  //     "seller": "Dell",
  //     "timeLeft": "3 days",
  //   },
  //   {
  //     "src": "https://i.imgur.com/xyz.jpg",
  //     "productName": "Watch Apple Watch Series 7",
  //     "seller": "Apple",
  //     "timeLeft": "4 days",
  //   },
  //   {
  //     "src": "https://i.imgur.com/xyz.jpg",
  //     "productName": "Speakers Bose SoundLink Revolve+",
  //     "seller": "Bose",
  //     "timeLeft": "5 days",
  //   }
  // ]

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = sponsoredProduct.slice(firstIndex, lastIndex);
  const npage = Math.ceil(sponsoredProduct.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const handleChangeDate = () => {
    setIsOpen(true)
    setModalSection("changeDate")
  };

  const handleRemoveProduct = () => {
    setIsOpen(true)
    setModalSection("removeProduct")
  };

  const handleAddProduct = () => {
    setIsOpen(true)
    setModalSection("addProduct")
  };

  const addProduct = async() => {
    try {
      console.log("response sending...");
      // console.log(searchCategoryData);
      console.log(searchProductData);

      let cat,prod;
      for (let i = 0; i < searchCategoryData.length; i++) {
        if (searchCategoryData[i].name === selectedCategoryOption) {
          // setEditCategoryData(category[i]);
          cat = searchCategoryData[i]
        }
      }
      
      for (let i = 0; i < searchProductData.length; i++) {
        if (searchProductData[i].name === selectedProductOption) {
          // setEditCategoryData(category[i]);
          prod = searchProductData[i]
        }
      }

      console.log(cat);
      console.log(prod);

      
    const start = moment(startSelectedDate).utc().format("YYYY-MM-DD")
    const end = moment(endSelectedDate).utc().format("YYYY-MM-DD")
    console.log(prod?.images);
    const product = {
      "name": prod?.name,
      "image": prod?.images[0],
      "price_range": prod?.price_range,
      "available_quantities": prod?.available_quantities,
      "currency": prod?.currency,
      "category_name": cat?.name,
      "category_seq": cat?.seq,
      "started": start,
      "ended": end,
    };
      console.log(product);

      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/admin/sponsored/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_auth_token")}`,
        },
        body: JSON.stringify(product)
      });

      console.log(response);
      const data = await response.json();

      console.log(data);

      if (response.status === 201) {
        alert("Product Added Successfully")
        
    getSponsoredProduct();
        setIsOpen(false)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("getting errr", err);
    }
  };

  const removeProduct = async() => {
    try {
      console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/admin/sponsored/remove/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_auth_token")}`,
        }
      });

      console.log(response);
      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
        alert(data.response)
    getSponsoredProduct();
        setIsOpen(false)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("getting errr", err);
    }
  };

  const changeDate = async() => {
    console.log(productId);
    const start = moment(startSelectedDate).utc().format("YYYY-MM-DD")
    const end = moment(endSelectedDate).utc().format("YYYY-MM-DD")
    try {
      console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/admin/sponsored/changeDate/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_auth_token")}`,
        },
        body: JSON.stringify({"started": start, "ended": end}),
      });

      console.log(response);
      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
        alert(data.response)
    getSponsoredProduct();
        setIsOpen(false)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("getting errr", err);
    }
  };

  const listItems = records.map((d, i) => {
    const started = new Date(d.ended);
const ended = new Date(d.started);

const difference = ended.getTime() - started.getTime();

const days = Math.abs (difference / (1000 * 60 * 60 * 24));

// console.log(days);
// console.log(d.id);

    return (
      <tr key={i}>
        <td className="image-box">
          <img className="product-img" src={`${BASEURL}/content/get/${d.image}`} alt={"ERROR.jpg"} />
        </td>
        <td>{d.name}</td>
        <td>{d.category_name}</td>
        <td className="time"> {days}
          <MoreVertIcon className="icon" onClick={() => handleClick(d.id)} />
          {productId === d.id && (
            <ul className="dropdown-content">

              <li>
                <button className={"date"} onClick={handleChangeDate}><CalendarMonthIcon className="icon1" />Change date</button>
                <button className={"remove"} onClick={() => handleRemoveProduct()}><DeleteIcon className="icon1" />Remove product</button>
              </li>
            </ul>
          )}

        </td>
      </tr>
    );
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
      const response = await fetch(`${BASEURL}/sponsored`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer${localStorage.getItem("admin_auth_token")}`,
        }
      });

      // console.log(response);
      const data = await response.json();

      console.log(data.response);

      if (response.status === 200) {
        setSponsoredProduct(data.response)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("getting errr", err);
    }
  }
  
// console.log(imageUrl);


  const categoryData = searchCategoryData.map(
    item => ({ label: item.name, value: item.name })
  );

  const productData = searchProductData.map(
    item => ({ label: item.name, value: item.name })
  );

  return (
    <>
      {modalSection === "addProduct" &&
        <Modal className="custom-modal sponsored-modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          <form className="removeProductModal">
            <p className="heading-model">Select Product</p>
            
            <div className="box">
      <SelectPicker placeholder="Seller User Name" value={selectedCategoryOption} data={categoryData} className="select-picker" onChange={handleCategoryChange} onSearch={handleOnSearch}/>
      <SelectPicker placeholder="Product Name" value={selectedProductOption} data={productData} className="select-picker" onChange={handleProductChange} onSearch={handleOnProductSearch}/>
    </div>
            <Button variant="contained" className="cancel"  onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="contained" className="confirm" onClick={()=>setModalSection("selectDate")}>Next</Button>
          </form>
        </Modal>
      }

{modalSection === "selectDate" &&
        <Modal className="custom-modal sponsored-modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          <form className="removeProductModal">
            <p className="heading-model">Select Time Period</p>
            <div className="start-end">
              <p className="date-tag">Start Date</p>
              <p className="date-tag">End Date</p>
            </div>
            <div className="date-picker">
            <DatePicker
  selected={startSelectedDate}
  onChange={(date) => date && setStartSelectedDate(date)}
  selectsRange={false}
  inline
  minDate={new Date()}
/>

        <DatePicker
        selected={endSelectedDate}
          onChange={date => date && setEndSelectedDate(date)}
          selectsRange={false}
          inline
          minDate={new Date()}
        />
    </div>
            <Button variant="contained" className="cancel" onClick={() => setModalSection("addProduct")}>Previous</Button>
            <Button variant="contained" className="confirm" onClick={addProduct}>Add</Button>
          </form>
        </Modal>
      }
      
      {modalSection === "removeProduct" &&
        <Modal className="custom-modal sponsored-modal small-modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          <form className="removeProductModal">
            <h3>This action is irreversible!</h3>
            <h5>Do you still want to remove this product.</h5>
            <Button variant="contained" className="cancel" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="contained" className="confirm" onClick={removeProduct}>Confirm</Button>
          </form>
        </Modal>
      }

      {modalSection === "changeDate" &&
        <Modal className="custom-modal sponsored-modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          <form className="removeProductModal">
            <p className="heading-model">Select Time Period</p>
            <div className="start-end">
              <p className="date-tag">Start Date</p>
              <p className="date-tag">End Date</p>
            </div>
            <div className="date-picker">
            <DatePicker
            selected={startSelectedDate}
          onChange={date => date && setStartSelectedDate(date)}
          selectsRange={false}
          inline
          minDate={new Date()}
          // formatWeekDay={nameOfDay => nameOfDay.substring(0,3)}
          // dateFormat="ddd"
        />
        <DatePicker
        selected={endSelectedDate}
          onChange={date => date && setEndSelectedDate(date)}
          selectsRange={false}
          inline
          minDate={new Date()}
        />
    </div>
            <Button variant="contained" className="cancel" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="contained" className="confirm" onClick={changeDate}>Save</Button>
          </form>
        </Modal>
      }
      <div className="addProduct">
        <AdminNavbar />
        <div className="innerAdd">
          <div className="left"><SideBar /></div>
          <div className="right">
            <div className="addContainer">
              <div className="header-box">
                <h2 className="heading">Sponsored Products</h2>
                <input type="text" placeholder="Search Product" />
                <SearchIcon className="searchIcon" />
                <button className="btn" onClick={handleAddProduct}>Add Products</button>
              </div>
              <div className="products">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>product Name</th>
                      <th>Seller</th>
                      <th>Time Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItems}
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

export default SponsoredProduct