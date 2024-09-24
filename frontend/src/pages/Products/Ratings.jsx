import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Ratings({ value, text, color }) {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStars - halfStars;

  return (
    <div className="d-flex align-items-center">
      {[...Array(fullStars)]?.map((_, index) => (
        <FaStar key={index} color={color} />
      ))}

      {halfStars > 0 && <FaStarHalfAlt color={color} />}

      {[...Array(emptyStar)]?.map((_, index) => (
        <FaRegStar size={18} key={index} color={color} />
      ))}

      <span className="ms-2" style={{ color: color }}>
        {text && text}
      </span>
    </div>
  );
}

// Ratings.defaultProps = {
//     color: '#F9C23C'
// }
