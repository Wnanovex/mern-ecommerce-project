import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";

export default function UserList() {
  const { data: users, refetch } = useGetUsersQuery(); // take object of data = users && refetch
  const [deleteUser] = useDeleteUserMutation(); // take deleteUser from useDeleteUserMutation
  const [updateUser] = useUpdateUserMutation(); // take updateUser from useUpdateUserMutation

  const [editableUserId, setEditableUserId] = useState(null); // useState of editableUserId
  const [editableUserName, setEditableUserName] = useState(""); // useState of editableUserName
  const [editableUserEmail, setEditableUserEmail] = useState(""); // useState of editableUserEmail

  useEffect(() => {
    refetch();
  }, [refetch]);

  const toggleEdit = (id, username, email) => {
    // function of toggle edit
    setEditableUserId(id); // put the value of id into value of editableUserId
    setEditableUserName(username); // put the value of username into value of editableUserName
    setEditableUserEmail(email); // put the value of email into value of editableUserEmail
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // show confirmation window
      try {
        await deleteUser(id); // delete user by id
      } catch (error) {
        toast.error(error.data.message || error.error); // show error message
      }
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateUser({
        // put the values of _id && username && email into the updateUser
        userId: id, // data.userId
        username: editableUserName, // data.username
        email: editableUserEmail, // data.email
      });
      setEditableUserId(null); // put value of editableUserId = null
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.error); // error message box
    }
  };

  return (
    <div className="container">
      <AdminMenu />
      <h1 className="text-center text-info my-3">All Users</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">USERNAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">ADMIN</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* map of users object */}
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td scope="col">{user._id}</td>
                  <td scope="col">
                    {editableUserId === user._id ? (
                      <div className="d-flex align-items-center gap-1">
                        <input
                          type="text"
                          className="rounded border-1"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                        />
                        <button
                          onClick={() => handleUpdate(user._id)}
                          className="btn btn-info"
                        >
                          <FaCheck />{" "}
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        <span>{user.username} </span>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                          className="bg-transparent border-0 text-center"
                        >
                          <FaEdit size={15} />{" "}
                        </button>
                      </div>
                    )}
                  </td>
                  <td scope="col">
                    {editableUserId === user._id ? (
                      <div className="d-flex align-items-center gap-1 ">
                        <input
                          type="text"
                          className="rounded border-1"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                        />
                        <button
                          onClick={() => handleUpdate(user._id)}
                          className="btn btn-info"
                        >
                          <FaCheck />{" "}
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        <span>{user.email} </span>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                          className="bg-transparent border-0 text-center"
                        >
                          <FaEdit size={15} />{" "}
                        </button>
                      </div>
                    )}
                  </td>
                  <td scope="col">
                    {user.isAdmin ? (
                      <FaCheck className="text-success" />
                    ) : (
                      <FaTimes className="text-danger" />
                    )}
                  </td>
                  <td scope="col">
                    {!user.isAdmin && (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-danger"
                      >
                        <FaTrash />{" "}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
