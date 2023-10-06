import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import Navbar from "../../components/navbar/Navbar"
import SideBar from "../../components/sideBar/SideBar"
import "./addCategory.scss"
import { SelectPicker } from 'rsuite';
import { BASEURL } from "../../utils/constants";
// import Category from "../../components/category/Category"
import { useLocation } from "react-router-dom"
import CloseIcon from '@mui/icons-material/Close';
// import SubCategory from "../../components/sub-category/SubCategory"
// import BasicDetails from "../../components/basic-details/BasicDetails"
// import AdvanceDetails from "../../components/advance-details/AdvanceDetails"
// import { BASIC_DETAILS, ADVANCE_DETAILS, CATEGORY, SUB_CATEGORY } from "../../utils/constants"
// import { base_add_product, category } from "../../App"
// import selectedCategory from "../category/category"

const AddCategory = () => {

  const location = useLocation();
  // console.log(location.state);
  let id = '', category: any = [];
if (location.state) {
  ({id, category} = location.state);
}


  // const [editCategoryData, setEditCategoryData] = useState([]);

  const [image, setImage] = useState("/cloud.png");
  const [isImage, setIsImage] = useState(false);
  const [searchCategoryData, setSearchCategoryData] = useState([{name: ''}])
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [editCategoryData, setEditCategoryData] = useState({category_name: '', product_one_name: '', product_two_name: '', product_three_name: '', cover_image_url: ''});

  const [searcProducthData1, setSearcProducthData1] = useState([{name: ''}])
  const [selectedProductOption1, setSelectedProductOption1] = useState(null);

  const [searcProducthData2, setSearcProducthData2] = useState([{name: ''}])
  const [selectedProductOption2, setSelectedProductOption2] = useState(null);

  const [searcProducthData3, setSearcProducthData3] = useState([{name: ''}])
  const [selectedProductOption3, setSelectedProductOption3] = useState(null);

  const [base64Image, setBase64Image] = useState("/Group.png");

  useEffect(() => {
    if(id){
      editCategory();
    }
    console.log(base64Image);
  }, [])
  

    const editCategory = async () => {
      let temp_cat: any = [];
      console.log(id);
        for (let i = 0; i < category.length; i++) {
          if (category[i].id === id) {
            setEditCategoryData(category[i]);
            temp_cat = category[i]
          }
        }
        console.log(temp_cat);
        
    if (temp_cat) {
      alert("change data by clicking on selection picker")
      setSelectedCategoryOption(temp_cat.category_name)
      setSelectedProductOption1(temp_cat.product_one_name)
      setSelectedProductOption2(temp_cat.product_two_name)
      setSelectedProductOption3(temp_cat.product_three_name)

      setBase64Image(temp_cat.cover_image_url)
    }
    };

    const handleImageChange = (event: any) => {
      const file = event.target.files[0];
      setImage(file);
  
      if (file) {
        setIsImage(true)
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = document.querySelector(".image");
          if(image){
            const imgElement = image as HTMLImageElement;
            imgElement.src = e.target.result;
            imgElement.style.width = `200px`;
          }

          const base64Data = e.target.result.replace("data:image/png;base64,", "");
            setBase64Image(base64Data);
        };
        reader.readAsDataURL(file);
      }
    };


    const handleCategorySearch = async(event: any) => {
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
      };

      const handleOnProductSearch1 = async(event: any) => {
        setSearcProducthData1([])
        try {
          console.log(selectedProductOption1);
          console.log("response sending...");
          // Use fetch to make the post request with the url and the data
          const response = await fetch(`${BASEURL}/product/search?q=${event}`, {
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
    
            setSearcProducthData1(data.response)
          } else {
            alert(data.response);
          }
        } catch (err) {
          console.log("getting errr", err);
        }
      // }
      };
      
      const handleOnProductSearch2 = async(event: any) => {
        setSearcProducthData2([])
        try {
          console.log(selectedProductOption2);
          console.log("response sending...");
          // Use fetch to make the post request with the url and the data
          const response = await fetch(`${BASEURL}/product/search?q=${event}`, {
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
    
            setSearcProducthData2(data.response)
          } else {
            alert(data.response);
          }
        } catch (err) {
          console.log("getting errr", err);
        }
      // }
      };
      
      const handleOnProductSearch3 = async(event: any) => {
        setSearcProducthData3([])
        try {
          console.log(selectedProductOption3);
          console.log("response sending...");
          // Use fetch to make the post request with the url and the data
          const response = await fetch(`${BASEURL}/product/search?q=${event}`, {
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
    
            setSearcProducthData3(data.response)
          } else {
            alert(data.response);
          }
        } catch (err) {
          console.log("getting errr", err);
        }
      // }
      };
      
      const handleAddProduct = async() => {

        if (!id) {

          let categoryData: any;
          let product1Data: any;
          let product2Data: any;
          let product3Data: any;
        
        for (let i = 0; i < searchCategoryData.length; i++) {
          if (searchCategoryData[i].name === selectedCategoryOption) {
            categoryData = searchCategoryData[i]
          }
        }

        for (let i = 0; i < searcProducthData1.length; i++) {
          if (searcProducthData1[i].name === selectedProductOption1) {
            product1Data = searcProducthData1[i]
          }
        }

        for (let i = 0; i < searcProducthData2.length; i++) {
          if (searcProducthData2[i].name === selectedProductOption2) {
            product2Data = searcProducthData2[i]
          }
        }

        for (let i = 0; i < searcProducthData3.length; i++) {
          if (searcProducthData3[i].name === selectedProductOption3) {
            product3Data = searcProducthData3[i]
          }
        }
        
        console.log(categoryData);
        console.log(product1Data);
        console.log(product2Data);
        console.log(product3Data);
        console.log(base64Image);

        const CategoryData = {
          "category_seq": categoryData.seq,
          "category_name": categoryData.name,
          "product_one_id": product1Data.id,
          "product_one_name": product1Data.name,
          "product_two_id": product2Data.id,
          "product_two_name": product2Data.name,
          "product_three_id": product3Data.id,
          "product_three_name": product3Data.name,
          "image": base64Image,
        }
        try {
          // console.log(selectedProductOption3);
          console.log("response sending add...");
          // Use fetch to make the post request with the url and the data
          const response = await fetch(`${BASEURL}/admin/hc/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("admin_auth_token")}`,
            }, 
            body: JSON.stringify(CategoryData)
          });
    
          console.log(response);
          const data = await response.json();
    
          console.log(data);
    
          if (response.status === 200) {
            // console.log(data.response[0].name)
            // console.log(data.response[1].name)
    
            alert("Category Added Successfully")
          } else {
            alert(data.response);
          }
        } catch (err) {
          console.log("getting errr", err);
        }

      } else {

        // const CategoryData = {
        //   "category_seq": categoryData.seq,
        //   "category_name": categoryData.name,
        //   "product_one_id": product1Data.id,
        //   "product_one_name": product1Data.name,
        //   "product_two_id": product2Data.id,
        //   "product_two_name": product2Data.name,
        //   "product_three_id": product3Data.id,
        //   "product_three_name": product3Data.name,
        //   "cover_image_base64": base64Image,
        // }

        console.log(selectedCategoryOption);
        console.log(base64Image);
        
        try {
          console.log(editCategoryData);

          const CategoryData = {
            "category_name": editCategoryData.category_name !== selectedCategoryOption ? selectedCategoryOption : editCategoryData.category_name,
            
            "product_one_name": editCategoryData.product_one_name !== selectedProductOption1 ? selectedProductOption1 : editCategoryData.product_one_name,
            
            "product_two_name": editCategoryData.product_two_name !== selectedProductOption2 ? selectedProductOption2 : editCategoryData.product_two_name,
            
            "product_three_name": editCategoryData.product_three_name !== selectedProductOption3 ? selectedProductOption3 : editCategoryData.product_three_name,

            "cover_image_base64": !base64Image ? editCategoryData.cover_image_url : base64Image,
            
          }
          console.log(CategoryData);
          console.log("response sending update...");
          // Use fetch to make the post request with the url and the data
          const response = await fetch(`${BASEURL}/admin/hc/update/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("admin_auth_token")}`,
            }, 
            body: JSON.stringify(CategoryData)
          });
    
          console.log(response);
          const data = await response.json();
    
          console.log(data);
    
          if (response.status === 200) {
            // console.log(data.response[0].name)
            // console.log(data.response[1].name)
    
            alert("Category Updated Successfully")
          } else {
            alert(data.response);
          }
        } catch (err) {
          console.log("getting errr", err);
        }
      }
      };

    const handleCategoryChange = async(event: any) => {
        setSelectedCategoryOption(event);
      };

      const handleProductChange1 = (event: any) => {
        setSelectedProductOption1(event);
      };

      const handleProductChange2 = (event: any) => {
        setSelectedProductOption2(event);
      };

      const handleProductChange3 = (event: any) => {
        setSelectedProductOption3(event);
      };

      const data = searchCategoryData.map(
        item => ({ label: item.name, value: item.name })
      );

      const productData1 = searcProducthData1.map(
        item => ({ label: item.name, value: item.name })
      );
      const productData2 = searcProducthData2.map(
        item => ({ label: item.name, value: item.name })
      );
      const productData3 = searcProducthData3.map(
        item => ({ label: item.name, value: item.name })
      );

      // console.log(searchCategoryData);
    return (
        <>
            <div className="addProduct">
                <Navbar />
                <div className="innerAdd">
                    <div className="left"><SideBar /></div>
                    <div className="right">
                        <div className="categoryDetails">

                            <div className="basicLeft">
                                <div className="form-group">
                                    <label className="label">Select Category</label>
                                    <SelectPicker placeholder="Seller User Name" value={selectedCategoryOption} data={data} className="select-picker" onChange={handleCategoryChange} onSearch={handleCategorySearch}/>
                                </div>
                                <div className="form-group">
                                <label className="label">Select Product 1</label>
                                    <SelectPicker placeholder="Seller User Name" value={selectedProductOption1} data={productData1} className="select-picker" onChange={handleProductChange1} onSearch={handleOnProductSearch1}/>
                                </div>
                                <div className="form-group">
                                <label className="label">Select Product 2</label>
                                    <SelectPicker placeholder="Seller User Name" value={selectedProductOption2} data={productData2} className="select-picker" onChange={handleProductChange2} onSearch={handleOnProductSearch2}/>
                                </div>
                                <div className="form-group">
                                <label className="label">Select Product 3</label>
                                    <SelectPicker placeholder="Seller User Name" value={selectedProductOption3} data={productData3} className="select-picker" onChange={handleProductChange3} onSearch={handleOnProductSearch3}/>
                                </div>
                            </div>
                            

                            <div className="basicRight">
                                <div className="box">
                                    <div className="insideBox"> 
                              <input
                                type="file"
                                className="file-input"
                                id="pan-card"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={handleImageChange}
                              />
                              {!isImage && !id ? (<>
                                <img src={image} className="image" />
                                {/* <CloudIcon className="icon"/> */}
                                <p className="text">Upload cover image</p>
                              </>
                              ) : !id && (
                                <>
                                  <img width="250px" src={`data:image/png;base64,${base64Image}`} className="image" height="150px" />
                                  <p className="img-name">image.jpg<CloseIcon className="icon" onClick={() => setIsImage(false)} /></p>
                                </>
                              )
                              }

                              {
                                id && (
                                  <>
                                  <img width="250px" src={base64Image === editCategoryData.cover_image_url ?`${BASEURL}/content/get/${base64Image}` : `data:image/png;base64,${base64Image}`} className="image" height="150px" />
                                  <p className="img-name">image.jpg<CloseIcon className="icon" onClick={() => setIsImage(false)} /></p>
                                </>
                                )
                              }
                            </div>
                            {!isImage && !id ? (
                                    <button className="upload-btn">Upload Image</button>
                                    ) : !id && (
                                    <button className="upload-btn">Uploaded</button>
                                    )
}
{
  id &&(
    <button className="upload-btn">Change Image</button>
  )
}
                                </div>

<div className="form-group">
                                    <Button variant="contained" className="cancel-btn">Cancel</Button>
                                    <Button variant="contained" className="save-btn" onClick={handleAddProduct}>Save</Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategory