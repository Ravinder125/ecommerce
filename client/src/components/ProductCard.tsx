import { FaPlus } from "react-icons/fa6";


interface ProductsProps {
    _id: string,
    name: string,
    price: number,
    image: string,
    stock: number,
    handler: () => void;
}

// const server = "jlajsdljf";
const ProductCard = ({ _id, name, price, image, stock, handler }
    : ProductsProps) => {
    return (
        <div key={_id} className="product-card">
            {/* <img src={`${server}/${image}`} alt={name} />
             */}
            <img src={image} alt={name} />
            <p>{name}</p>
            <span>₹{price}</span>

            <div>
                <button
                    onClick={handler}
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}

export default ProductCard