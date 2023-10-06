import "./advanceDetails.scss"
import { useState } from "react"
import { Button } from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


const AdvanceDetails = () => {

    const [drop, toggle] = useState(false);

    return (
        <>
            <div className="advanceDetails">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Product Code" />
                    </div>

                    <div className="form-group clearfix dropCon" onClick={() => toggle(!drop)}>
                        <input type="text" id={drop ? "shadow" : ""} readOnly placeholder="Select Business Type" />
                        {!drop ? <ArrowDropDownIcon className="arrow" /> : <ArrowDropUpIcon className="arrow" />}
                        {drop && <div className="dropDown">
                            <div>Retailer</div>
                            <div>Wholesaler</div>
                            <div>Exporter</div>
                            <div>Manufacturer</div>
                        </div>}
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Delivery Time" />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" placeholder="Additional Information" />
                    </div>
                    <div className="form-group">
                        <Button variant="contained" className="bt">Add Product</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdvanceDetails