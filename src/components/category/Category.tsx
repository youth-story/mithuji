import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { BASEURL } from "../../utils/constants"
// import { useNavigate } from "react-router-dom";
import "./category.scss"
import SearchIcon from '@mui/icons-material/Search';

const Category = () => {

    interface Data {
        name: string;
      }
    // const navigate = useNavigate();

    const [data, setData] = useState<Data[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
      handleSearch();
    }, [])
    

    const onQueryChange = (e: any) => {
        setQuery(e.target.value);
    }

    const handleSearch = async () => {
        try {
            console.log("response sending...");
            // Use fetch to make the post request with the url and the data
            const response = await fetch(`${BASEURL}/category/search?q=${query}`, {
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
                setData(data.response)
                // navigate("/add-product")
                // alert("Suggestion Successfully");
            } else {
                alert(data.response);
            }
        } catch (err) {
            console.log("suggestion errr", err);
        }
    }

    return (
        <>
            <div className="categoryContainer">
                <div className="search">
                    <input type="text" onChange={onQueryChange} placeholder="Search Category" />
                    <Button className="searchBt" onClick={handleSearch} variant="contained"><SearchIcon />Search</Button>
                </div>
                <div className="listCon">
                    {
                        data.map(category =>(
                            <div className="item">{category.name}</div>
                        ))
                    }
                </div>
            </div>

        </>
    )
}

export default Category