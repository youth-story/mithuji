import "./productCard.scss"
import {Button} from "@mui/material"

const ProductCard = () => {
    return (
        <div className="productCard">
            <div className="imgSection"></div>
            <section>Whole sale Lorem ipsum aart dolor sit amet set</section>
            <div className="price"><strong>US$ 0.56 - 0.62</strong>/Piece</div>
            <div className="pieces">3000 Pieces <span>(MOQ)</span></div>
            <Button className="bt" variant="outlined">Inquire Now</Button>
        </div>
    )
}

export default ProductCard