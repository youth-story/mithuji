import { Button } from "@mui/material"
import "./basicDetails.scss"

const BasicDetails = () => {
    return (
        <>
            <div className="basicDetails">

                <div className="basicLeft">
                    <div className="box"></div>
                    <div className="boxScroller">
                        <div className="imgBox"></div>
                        <div className="imgBox"></div>
                        <div className="imgBox"></div>
                        <div className="imgBox"></div>
                        <div className="imgBox"></div>
                        <div className="imgBox"></div>
                    </div>
                </div>

                <div className="basicRight">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Product Name(Title)" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="₹ Price" />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" placeholder="Product Description" />
                    </div>
                    <div className="form-group">
                        <Button variant="contained" className="bt">Next</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default BasicDetails