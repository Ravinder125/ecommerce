import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type RatingProps = {
    value: number;   // rating number e.g. 3.7
    max?: number;    // max stars (default 5)
};

export default function Rating({ value, max = 5 }: RatingProps) {
    const stars = [];

    for (let i = 1; i <= max; i++) {
        if (value >= i) {
            stars.push(<FaStar key={i} color="#f5a623" />);
        }
        else if (value >= i - 0.5) {
            stars.push(<FaStarHalfAlt key={i} color="#f5a623" />);
        }
        else {
            stars.push(<FaRegStar key={i} color="#f5a623" />);
        }
    }

    return (
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            {stars}
            <span style={{ marginLeft: "6px", fontSize: "0.9rem" }}>
                {value.toFixed(1)}
            </span>
        </div>
    );
}