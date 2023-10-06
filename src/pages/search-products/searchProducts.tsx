import { useEffect, useState } from "react"
import "./searchProducts.scss"
import { Button } from "@mui/material"
// import EastIcon from '@mui/icons-material/East';
import Footer from "../../components/footer/Footer";
// import ProductCard from "../../components/product-card/ProductCard";
import Navbar from "../../components/navbar/Navbar";
// import { BASEURL } from "../../utils/constants"
// import { category_products } from "../../App"
import { useNavigate, useLocation } from "react-router-dom";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { BASEURL } from "../../utils/constants";
// import Category from "../category/category";

const SearchProducts = () => {

    const location = useLocation();
    //   console.log(location.state);
    const {array, searchedItem} = location.state;
    
    const navigate = useNavigate();
    // const categoryName = window.location.pathname.split("/")[1];
    
    // const base_url = category_products;
    
    // const navigation = (path: any, seqe : any) => {
        //   console.log(seq);
        //   seq = seqe
        //     navigate("/" +path + base_url, { state: {seq:  seqe} })
        //     getProducts();
        // }
        
        
        const navigateProduct = (path: any, id: any, created_by_id: any) => {
            console.log(id, created_by_id);
  navigate(path, { state: {id:  id, created_by_id: created_by_id} })
}

interface DataType {
    images: string;
    name: string;
    price_range: string;
    id: string;
    created_by_id: string;
  }
  
  const [data, setData] = useState<DataType[]>([]);
  
    
    // ])
    
    // const [query, setQuery] = useState("");

    // const [userData, setUserData] = useState({
    //     productName: "",
    //     phoneNumber: "",
    //     name: ""
    // });

    useEffect(() => {

      console.log(array);
      setData(array)
        // getCategory();
        // if (!data) {
        //   return;
        // }
        // getProducts();

  }, []);

//     const getCategory = async() => {
//       try {
//                 console.log("response sending...");
//                 // Use fetch to make the post request with the url and the data
//                 const response = await fetch(`${BASEURL}/category/all`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${localStorage.getItem("admin_auth_token")}`},
//                 });
    
//                 // console.log(response);
//                 const data = await response.json();

    
//                 if (response.status === 200) {
//                     // console.log(data.response);
//                     setData(data.response)
//                 } else {
//                     alert(data.message);
//                 }
//             } catch (err) {
//                 console.log("suggestion errr", err);
//             } 
//   }

//     const getProducts = async() => {
//       console.log(data);
        
//       try {
//         // if (data) {
//         //   let seq;
  
//         //   console.log(data);
//         //   for (let i = 0; i < data.length; i++) {
//         //     if (data[i].name === categoryName) {
//         //       seq = data[i].seq;
//         //     }
//         //   }
//         // }

//         console.log(seq);
//           console.log("response sending...");
//           // Use fetch to make the post request with the url and the data
//           const response = await fetch(`${BASEURL}/product?seq=${seq}`, {
//               method: "GET",
//               headers: {
//                   "Content-Type": "text",
//                   "Authorization": `Bearer ${localStorage.getItem("admin_auth_token")}`
//               },
//           });

//           // console.log(response);
//           const Data = await response.json();


//           if (response.status === 200) {
//               console.log(Data.response);
//               setArray(Data.response)
//           } else {
//               alert(Data.message);
//           }
//       } catch (err) {
//           console.log("Sponsored data errr", err);
//       }
//   }

    // const onQueryChange = (e: any) => {
    //     setQuery(e.target.value);
    // }

    // const submit = async () => {
    //     try {
    //         console.log("response sending...");
    //         // Use fetch to make the post request with the url and the data
    //         const response = await fetch(`${BASEURL}/suggestion/create`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(userData), // Convert the userData object to a JSON string
    //         });

    //         console.log(response);
    //         const data = await response.json();

    //         console.log(data);

    //         if (response.status === 200) {
    //             console.log(data);
    //             alert("Suggestion Successfully");
    //         } else {
    //             alert(data.message);
    //         }
    //     } catch (err) {
    //         console.log("suggestion errr", err);
    //     }
    // }

    // const handleSearch = async () => {
    //     try {
    //         console.log("response sending...");
    //         // Use fetch to make the post request with the url and the data
    //         const response = await fetch(`${BASEURL}/product/search?q=${query}`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(userData), // Convert the userData object to a JSON string
    //         });

    //         console.log(response);
    //         const data = await response.json();

    //         console.log(data);

    //         if (response.status === 200) {
    //             console.log(data);
    //             alert("Suggestion Successfully");
    //         } else {
    //             alert(data.message);
    //         }
    //     } catch (err) {
    //         console.log("suggestion errr", err);
    //     }
    // }

//       const renderCategory = () => {

//       // const i = 0;

//     //   console.log(data);
//     //   console.log(data[0].categories[0]);
// const categoriesname = ["sub cat 1"];
// // console.log(categoriesname);
// // console.log(categories[0].subCategories);
// // console.log(array);
//         return (
//           <>
//             {data.map(category => (
//               <li className="category">
//                 <a dangerouslySetInnerHTML={{ __html: category.name }} onClick={() => navigation(category.name, category.seq)}></a>
//                 <ul className="dropdown">
//                   {categoriesname.map(subCategory => (
//                     <li className="sub-category">
//                       <a href="#">{subCategory}</a>
//                       <ul className="tab">
//                         {category.categories.map(item => (
//                           <p className="sub-category-item"><a href="#">{item.name}</a></p>
//                         ))}
//                       </ul>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </>
//         );
//       };      

    return (
        <>
            <div className="home">

                <Navbar />

                    <div className="container">
                    <div className="products">
                <section className="category-name">Search: {searchedItem}</section>
                        {data && data.map((val, index) => {
                          // {console.log(val.images)}
                            return (
                                <div className="boxContainer" key={index}>
                                    <img src={`${BASEURL}/content/get/${val.images}`} className="box"></img>
                                    <p className="productName">{val.name}</p>
                                    <div className="text-flex">
                                        <p className="first">₹{val.price_range}</p>
                                        <p className="second"><VerifiedUserIcon className="icon"/>Trusted <span>
                                            Seller</span></p>
                                    </div>
                                    <p className="minQuntity">Min Order Qty. - 100pieces</p>
                                    
                            <Button variant="contained" className="btn" onClick={() => navigateProduct(val.name, val.id, val.created_by_id)}>Contact Seller</Button>
                                </div>
                            );
                        })}
    </div>
    </div>

                <Footer />

            </div>
        </>
    )
}

export default SearchProducts