import { useEffect, useState } from "react"
import "./home.scss"
import { Button } from "@mui/material"
import EastIcon from '@mui/icons-material/East';
import Footer from "../../components/footer/Footer";
import ProductCard from "../../components/product-card/ProductCard";
import Navbar from "../../components/navbar/Navbar";
import { BASEURL } from "../../utils/constants"
import { category_products } from "../../App"
import { useNavigate } from "react-router-dom";
import { search_products } from "../../App";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Home = () => {

    const navigate = useNavigate();
    
    const base_url = category_products + "/";

    const navigation = (categoryName: string, seq : any) => {
        navigate(categoryName + base_url, { state: {seq:  seq} });
      };

      const [sticky, setSticky] = useState(false);
      const [locateShow, setLocateShow] = useState(false);
    
    const [array, setArray] = useState([
        {image: '', name: ''}
    ])

    interface Category {
        category_name: string;
        category_seq: number;
        product_one_name: string;
        product_two_name: string;
        product_three_name: string;
      }      
    
      const [data, setData] = useState<Category[]>([]);

    const [query, setQuery] = useState("");

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 300) {
            setSticky(true);
            setLocateShow(true)
        } else {
            setSticky(false);
            setLocateShow(false)
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    useEffect(() => {
        // console.log(setArray);

        (async () => {     
            try {
                // console.log("response sending...");
                // Use fetch to make the post request with the url and the data
                const response = await fetch(`${BASEURL}/category/all`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("auth_token")}`},
                });
    
                // console.log(response);
                const data = await response.json();

    
                if (response.status === 200) {
                    console.log(data.response);
                    setData(data.response)
                } else {
                    alert(data.response);
                }
            } catch (err) {
                console.log("suggestion errr", err);
            }
          })();
        
        
          (async () => {     
            try {
                // console.log("response sending...");
                console.log(BASEURL);
                // Use fetch to make the post request with the url and the data
                const response = await fetch(`${BASEURL}/sponsored`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "text",
                        "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                    },
                });
    
                // console.log(response);
                const data = await response.json();
                console.log(data);

    
                if (response.status === 200) {
                    // console.log(data.response);
                    setArray(data.response)
                } else {
                    alert(data.response);
                }
            } catch (err) {
                console.log("Sponsored data errr", err);
            }
          })();
    }, []);

    const hanldeChange = (e: any) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const onQueryChange = (e: any) => {
        setQuery(e.target.value);
    }

    const submit = async () => {
        try {
            console.log("response sending...");
            console.log(userData);
            // Use fetch to make the post request with the url and the data
            const response = await fetch(`${BASEURL}/suggestion/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                },
                body: JSON.stringify(userData), // Convert the userData object to a JSON string
            });

            console.log(response);
            const data = await response.json();

            console.log(data);

            if (response.status === 201) {
                console.log(data);
                alert("Suggestion Successfully");
            } else {
                alert(data.response);
            }
        } catch (err) {
            console.log("suggestion errr", err);
        }
    }

    const handleSearch = async () => {
        try {
            console.log("response sending...");
            // Use fetch to make the post request with the url and the data
            const response = await fetch(`${BASEURL}/product/search?q=${query}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                },
                // body: JSON.stringify(userData), // Convert the userData object to a JSON string
            });

            console.log(response);
            const data = await response.json();

            console.log(data);

            if (response.status === 200) {
                console.log(data);
                navigate(search_products, {state: {array: data.response, searchedItem: query}})
                // alert("Suggestion Successfully");
            } else {
                alert(data.response);
            }
        } catch (err) {
            console.log("suggestion errr", err);
        }
    }

      const renderCategory = () => {

    //     const categories = [
    //     {
    //       name: "Electronic &<br /> Electrical",
    //       subCategories: [
    //         { name: "Sub category 1", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4", "Sub-5"] },
    //         { name: "Sub category 2", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4"] },
    //         { name: "Sub category 3", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub category 4", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4"] },
    //         { name: "Sub category 5", items: ["Sub-1", "Sub-2", "Sub-3"] }
    //       ]
    //     },
    //     {
    //       name: "Health &<br /> medicines",
    //       subCategories: [
    //         { name: "Sub-1", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4", "Sub-5"] },
    //         { name: "Sub-2", items: ["Sub-1", "Sub-2", "Sub-3",] },
    //         { name: "Sub-3", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub-4", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub-5", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4"] }
    //       ]
    //     },
    //     {
    //       name: "Lights &<br /> Lighting",
    //       subCategories: [
    //         { name: "Sub-1", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4", "Sub-5"] },
    //         { name: "Sub-2", items: ["Sub-1", "Sub-2", "Sub-3",] },
    //         { name: "Sub-3", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub-4", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub-5", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4"] }
    //       ]
    //     },

    //     {
    //       name: "Bulding &<br /> Construction",
    //       subCategories: [
    //         { name: "Sub-1", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4", "Sub-5"] },
    //         { name: "Sub-2", items: ["Sub-1", "Sub-2", "Sub-3",] },
    //         { name: "Sub-3", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub-4", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub-5", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4"] }
    //       ]
    //     },
    //     {
    //       name: "Industrial<br /> Supplies",
    //       subCategories: [
    //         { name: "Sub-1", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4", "Sub-5"] },
    //         { name: "Sub-2", items: ["Sub-1", "Sub-2", "Sub-3",] },
    //         { name: "Sub-3", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub-4", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub-5", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4"] }
    //       ]
    //     },
    //     {
    //       name: "Packaging &<br /> Printing",
    //       subCategories: [
    //         { name: "Sub-1", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4", "Sub-5"] },
    //         { name: "Sub-2", items: ["Sub-1", "Sub-2", "Sub-3",] },
    //         { name: "Sub-3", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub-4", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub-5", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4"] }
    //       ]
    //     },
    //     {
    //       name: "Furniture &<br /> Home Decore",
    //       subCategories: [
    //         { name: "Sub-1", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4", "Sub-5"] },
    //         { name: "Sub-2", items: ["Sub-1", "Sub-2", "Sub-3",] },
    //         { name: "Sub-3", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub-4", items: ["Sub-1", "Sub-2"] },
    //         { name: "Sub-5", items: ["Sub-1", "Sub-2", "Sub-3", "Sub-4"] }
    //       ]
    //     },
    //   ];

    //   const i = 0;

    //   console.log(data);
    //   console.log(data[0].categories[0]);
const categoriesname = ["sub cat 1"];
// console.log(categoriesname);
// console.log(categories[0].subCategories);
// console.log(array);
return (
    <>
            {data.map(category => (
              <li className="category">
                <a dangerouslySetInnerHTML={{ __html: category.category_name }} onClick={() => navigation(category.category_name, category.category_seq)}></a>
                <ul className="dropdown">
                  {categoriesname.map(subCategory => (
                    <li className="sub-category">
                      <a href="#">{subCategory}</a>
                      <ul className="tab">
                        {/* {category.categories.map(item => ( */}
                          <p className="sub-category-item"><a href="#">{category.product_one_name}</a></p>
                          <p className="sub-category-item"><a href="#">{category.product_two_name}</a></p>
                          <p className="sub-category-item"><a href="#">{category.product_three_name}</a></p>
                        {/* ))} */}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </>
        );
      };      

    return (
        <>
            <div className="home">

                <Navbar sticky={sticky} locateShow={locateShow} />

                <div className="topContainer">
                    <div className="topInner">
                        <div className="options">
                            <div>Product</div>
                            <div>Category</div>
                            <div>Seller</div>
                        </div>

                        <div className={`searchSection ${sticky ? 'stickySearch' : ''}`} >
                        <input type="text" className="form-control" onChange={onQueryChange} placeholder="Search for Anything..." />
                            <button className="btn" onClick={handleSearch}><SearchOutlinedIcon className="icon"/>Search</button>
                        </div>

                        <div className="selectCon">
                            <select name="" id="">
                                <option value="">All India</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="contentSection">
                    <ul>
                        {renderCategory()}
                        <li className="category"><a href="/">View All<br /> Categories</a>
                            {/* <ul className="dropdown">
                                <li className="sub-category"><a href="#">Sub-1</a>
                                    <ul className="tab">
                                        <p className="sub-category-item"><a href="#">Sub-1</a></p>
                                        <p className="sub-category-item"><a href="#">Sub-2</a></p>
                                        <p className="sub-category-item"><a href="#">Sub-3</a></p>
                                    </ul>
                                </li>
                                <li className="sub-category"><a href="#">Sub-2</a>
                                    <ul className="tab">
                                        <p className="sub-category-item"><a href="#">Sub-1</a></p>
                                        <p className="sub-category-item"><a href="#">Sub-2</a></p>
                                        <p className="sub-category-item"><a href="#">Sub-3</a></p>
                                    </ul></li>
                                <li className="sub-category"><a href="#">Sub-3</a>
                                    <ul className="tab">
                                        <p className="sub-category-item"><a href="#">Sub-1</a></p>
                                        <p className="sub-category-item"><a href="#">Sub-2</a></p>
                                        <p className="sub-category-item"><a href="#">Sub-3</a></p>
                                    </ul>
                                </li>
                                <li className="sub-category"><a href="#">Sub-3</a>
                                    <ul className="tab menu">
                                        <p className="sub-category-item"><a href="#">Sub-1</a></p>
                                        <p className="sub-category-item"><a href="#">Sub-2</a></p>
                                        <p className="sub-category-item"><a href="#">Sub-3</a></p>
                                    </ul>
                                </li>
                            </ul> */}
                        </li>
                    </ul>
                </div>

                <div className="midContainer">

                    <div className="left">
                        <section>Sponsored Products</section>
                        {array.map((val, index) => {
                            return (
                                <div className="boxCon" key={index} onClick={() => console.log(val)}>
                                    <img src={`${BASEURL}/content/get/${val.image}`} className="box"></img>
                                    <span>{val.name}</span>
                                </div>
                            );
                        })}

                    </div>

                    <div className="right">
                        <div className="innerDiv">
                            <section>Tell Us What <br /> You Need</section>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Enter Product Name" name="product_name" onChange={hanldeChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Enter your mobile number" name="phone_number" onChange={hanldeChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Enter your name" name="name" onChange={hanldeChange} />
                                </div>
                                <div className="form-group">
                                    <Button className="bt" variant="contained" onClick={() => submit()}>Submit</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="productCategoryCon">
                    <div className="d1"></div>
                    <div className="d2">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                    <div className="d3">
                        <section><EastIcon /> <br /> View All</section>
                    </div>
                </div>
                <div className="productCategoryCon">
                    <div className="d1"></div>
                    <div className="d2">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                    <div className="d3">
                        <section><EastIcon /> <br /> View All</section>
                    </div>
                </div>
                <div className="productCategoryCon">
                    <div className="d1"></div>
                    <div className="d2">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                    <div className="d3">
                        <section><EastIcon /> <br /> View All</section>
                    </div>
                </div>

                <Footer />

            </div>
        </>
    )
}

export default Home