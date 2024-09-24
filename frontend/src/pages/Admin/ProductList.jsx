import { useState } from "react";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";
import { useNavigate } from "react-router";

export default function ProductList() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState("");

  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetAllCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("countInStock", stock);
    formData.append("brand", brand);
    formData.append("image", image);

    try {
      const res = await createProduct(formData).unwrap();
      if (res.message) {
        toast.error(res.message);
        return;
      } else {
        toast.success("Product created successfully.");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to create product.");
    }
  };

  const handleUploadImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.filePath);
      setImageUrl(res.filePath);
    } catch (error) {
      toast.error("Failed to upload image.");
    }
  };

  return (
    <div className="container mt-3">
      <AdminMenu />
      <div className="d-flex align-items-center justify-content-center p-3">
        <div className="row">
          <h1 className="text-center text-info">Create Product</h1>

          <form className="row g-3" onSubmit={handleSubmit}>
            {imageUrl && (
              <div className="col-12 d-flex align-items-center justify-content-center">
                <img
                  src={imageUrl}
                  alt="Product Image"
                  className="img-fluid "
                  style={{ width: "300px", height: "350px" }}
                />
              </div>
            )}

            <div className="col-12 text-center">
              <label
                htmlFor="image"
                className="border col-12 py-4"
                style={{ cursor: "pointer" }}
              >
                {image ? image.name : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  name="image"
                  onChange={handleUploadImage}
                  className={!image ? "d-none" : "text-white"}
                />
              </label>
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-12 col-sm-6">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                placeholder="Price Of Product"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-12 col-sm-6">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-control"
                placeholder="Quantity Of Product"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="col-12 col-sm-6">
              <label htmlFor="stock" className="form-label">
                Count In Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                className="form-control"
                placeholder="Stock Of Product"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="brand" className="form-label">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                className="form-control"
                placeholder="Product Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="col-12 col-sm-6">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Choose Category</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                placeholder="Description Of Product"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="d-grid col-6 mx-auto mt-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
