import { useState, useEffect } from "react";
import { Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import AdminNavbar from "../../components/admin-navbar/AdminNavbar"
import SideBar from "../../components/sideBar/SideBar"
import "./category.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom"
import { BASEURL } from "../../utils/constants";
import Modal from "react-modal";

const Category = () => {

  // const { url } = useParams();

  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState(null);
  const [category, setCategory] = useState([{id: '', category_name: '', product_one_name: '', product_one_id: '', product_two_id: '', product_two_name: '', product_three_name: '', product_three_id: '', image: ''}])
  const [modalSection, setModalSection] = useState("");
  const [isOpen, setIsOpen] = useState(false)

  // const selectedCategory = createContext(category);
  // const selectedCategoryId = createContext(categoryId);

  // const [startSelectedDate, setStartSelectedDate] = useState(new Date());
  // const [endSelectedDate, setEndSelectedDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1));

  // const [selectedCategoryOption, setSelectedCategoryOption] = useState("");
  // const [selectedProductOption, setSelectedProductOption] = useState("");

  useEffect(() => {
    getAllCategory()
  }, [])
  

  const getAllCategory = async() => {
    try {
      // console.log(selectedCategoryOption);
      console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/admin/hc/all`, {
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
        setCategory(data.response)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("getting errr", err);
    }
  };

  // const handleProductChange = (event) => {
  //   setSelectedProductOption(event);
  // };

  const handleClick = (i: any) => {
    if (categoryId === null) {
      setCategoryId(i);    
    } else {
      setCategoryId(null)
    }
  };

  const handleEdit = () => {
    navigate("/add-category", { state: {id:  categoryId, category: category} })
  };

  const removeCategory = async() => {
    try {
      console.log("response sending...");
      // Use fetch to make the post request with the url and the data
      const response = await fetch(`${BASEURL}/admin/hc/remove/${categoryId}`, {
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
        alert("product removed successfully")
        setIsOpen(false)
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.log("getting errr", err);
    }
  };


  const listItems = category.map((d, i) => {
// console.log(category);
return (
    <tr key={i}>
        <td className="order-section">
            <img className="icon" src="/rectangle.png" alt="not found image" />
          <div className="image-box">
          <img className="product-img" src={`${BASEURL}/content/get/${d.image}`} alt={"ERROR.jpg"} />
          </div>
        </td>
        <td className="category-name">{d.category_name}</td>
        <td>
           <div>
            <img className="" src={`${BASEURL}/content/get/${d.product_one_id}`} alt={"ERROR.jpg"} />
            {1}. {d.product_one_name}
            </div>
           <div>
            <img className="" src={`${BASEURL}/content/get/${d.product_two_id}`} alt={"ERROR.jpg"} />
            {2}. {d.product_two_name}
            </div>
           <div>
            <img className="" src={`${BASEURL}/content/get/${d.product_three_id}`} alt={"ERROR.jpg"} />
            {3}. {d.product_three_name}
            </div>
    </td>
        <td className="cat-more"> 
          <MoreVertIcon className="icon" onClick={() => handleClick(d.id)} />
          {categoryId === d.id && (
            <ul className="dropdown-content">

              <li>
                <button className={"date"} onClick={handleEdit}><EditIcon className="icon1" />Edit</button>
                <button className={"remove"} onClick={() => { setModalSection("removeProduct"); setIsOpen(true)}}><DeleteIcon className="icon1" />Remove Category</button>
              </li>
            </ul>
          )}

        </td>
      </tr>
    );
  });

  return (
    <>
    {modalSection === "removeProduct" &&
        <Modal className="custom-modal sponsored-modal small-modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          <form className="removeProductModal">
            <h3>This action is irreversible!</h3>
            <h5>Do you still want to remove this product.</h5>
            <Button variant="contained" className="cancel" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="contained" className="confirm" onClick={removeCategory}>Confirm</Button>
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
                <h2 className="heading">Category On Home Page</h2>
                <input type="text" placeholder="Search Product" />
                <SearchIcon className="searchIcon" />
                <button className="btn" onClick={()=> navigate("/add-category")}>Add Category</button>
              </div>
              <div className="products">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Category</th>
                      <th>Products</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItems}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Category;