import { useSelector } from "react-redux";

export default function FavoritesCount() {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="position-absolute" style={{ top: "-10px", left: "10px" }}>
      {favoriteCount > 0 && (
        <span
          className="badge rounded-circle p-1"
          style={{ backgroundColor: "#B60071" }}
        >
          {favoriteCount}
        </span>
      )}
    </div>
  );
}
