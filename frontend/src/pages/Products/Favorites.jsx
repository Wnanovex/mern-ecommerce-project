import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

export default function Favorites() {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div>
      <h1 className="text-center">Favorite Products</h1>

      <div className="d-flex justify-content-center flex-wrap mt-5">
        {favorites.map((product) => (
          <div key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center alert alert-danger">
          No favorite products found
        </div>
      )}
    </div>
  );
}
