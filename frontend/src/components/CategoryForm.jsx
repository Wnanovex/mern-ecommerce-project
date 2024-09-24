export default function CategoryForm({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) {
  return (
    <div className="container mt-3 text-white">
      <div className="d-flex align-items-center justify-content-center p-3">
        <div className="row">
          <h1 className="text-center text-info">Create Category</h1>

          <form className="col-12" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Name Of Category
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Write Category Name"
                name="username"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <div className="d-grid col-6 mx-auto">
              <button type="submit" className="btn btn-primary">
                {buttonText}
              </button>
            </div>
          </form>
          <div className="d-grid col-6 mx-auto">
            {handleDelete && (
              <button onClick={handleDelete} className="btn btn-danger mt-4">
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
