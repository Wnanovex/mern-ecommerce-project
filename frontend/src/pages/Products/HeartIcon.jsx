import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavorites,
  removeFavorites,
  addFavorites,
} from "../../redux/features/favorites/favoriteSlice.js";
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";
import { useEffect } from "react";

export default function HeartIcon({ product }) {
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);
  const dispatch = useDispatch();

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFavorites(product));
      removeFavoriteFromLocalStorage(product._id); // remove the product from localStorage
    } else {
      dispatch(addFavorites(product));
      addFavoriteToLocalStorage(product); // add the product to localStorage
    }
  };

  return (
    <div
      className="position-absolute top-0"
      onClick={toggleFavorites}
      style={{ right: "10px", cursor: "pointer" }}
    >
      {isFavorite ? (
        <FaHeart size={20} color="#FF0080" />
      ) : (
        <FaRegHeart size={20} color="#fff" />
      )}
    </div>
  );
}
