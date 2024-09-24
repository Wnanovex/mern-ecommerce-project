import { useEffect, useState } from "react";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { useNavigate, useParams } from "react-router";
import AdminMenu from "./AdminMenu";

export default function ProductUpdate() {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { data: categories = [] } = useGetAllCategoriesQuery();
  const { data: product } = useGetProductByIdQuery(_id);
  const [uploadProductImage] = useUploadProductImageMutation();

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [category, setCategory] = useState(product?.category || "");
  const [image, setImage] = useState(product?.image || "");
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const [stock, setStock] = useState(product?.countInStock || 0);
  const [brand, setBrand] = useState(product?.brand || "");

  useEffect(() => {
    if (product && product._id) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setQuantity(product.quantity);
      setStock(product.countInStock);
      setBrand(product.brand);
      setImageUrl(product.image);
    }
  }, [product]);

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
      const res = await updateProduct({
        productId: _id,
        productData: formData,
      }).unwrap();
      if (res.message) {
        toast.error(res.message);
        return;
      } else {
        toast.success("Product updated successfully.");
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product"
      );
      if (!answer) return;
      await deleteProduct(_id).unwrap();
      toast.success("Product deleted successfully.");
      navigate("/admin/allproductslist");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleUploadImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.filePath);
    } catch (error) {
      toast.error("Failed to upload image.");
    }
  };

  return (
    <div className="container mt-3 text-white">
      <AdminMenu />
      <div className="d-flex align-items-center justify-content-center p-3">
        <div className="row">
          <h1 className="text-center text-info">Update Product</h1>

          <form className="row g-3" onSubmit={handleSubmit}>
            {image && (
              <div className="col-12  d-flex align-items-center justify-content-center">
                <img
                  src={image}
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
                {image ? image.name : "Update Image"}
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
                Update
              </button>
            </div>
          </form>

          <div className="d-grid col-3 mx-auto mt-4 ">
            <button
              type="submit"
              onClick={handleDeleteProduct}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
