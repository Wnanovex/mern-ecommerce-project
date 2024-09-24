import { useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

export default function CategoryList() {
  const { data: categories } = useGetAllCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const res = await createCategory({ name }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        setName("");
        toast.success("Category created successfully");
      }
    } catch (error) {
      toast.error("Error creating category");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const res = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        setName("");
        toast.success("Category updated successfully");
        setSelectedCategory(null);
        setUpdatingName("");
      }
    } catch (error) {
      toast.error("Error updating category");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const res = await deleteCategory(selectedCategory._id).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Category deleted successfully");
        setSelectedCategory(null);
        setUpdatingName("");
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  return (
    <div className="container text-white">
      <AdminMenu />
      <h1 className="display-4 text-center">Manage Categories</h1>

      <CategoryForm
        value={name}
        setValue={setName}
        handleSubmit={handleCreateCategory}
      />

      <br />
      <hr />

      <div className="row">
        {/* get all categories */}
        {categories?.map((category) => (
          <div className="col-sm-4" key={category._id}>
            <div className="card mb-3">
              <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          </div>
        ))}

        {/* Modal */}

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <CategoryForm
                  value={updatingName}
                  setValue={(value) => setUpdatingName(value)}
                  handleSubmit={handleUpdateCategory}
                  buttonText="Update"
                  handleDelete={handleDeleteCategory}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
