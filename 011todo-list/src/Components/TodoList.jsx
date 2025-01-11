import todopic from "../assets/todo.png";
import { useTodoStore } from "../store/store.js";
import EditPage from "./EditPage.jsx";

export default function TodoList() {
  const todolist = useTodoStore((state) => state.todolist);

  return (
    <div className="overflow-x-auto pt-8">
      <EditPage />
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              {/* <label>
                <input type="checkbox" className="checkbox" />
              </label> */}
            </th>
            <th>Title</th>
            <th>Description</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {todolist.map((todo) => (
            <tr key={todo.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask h-8 w-8">
                      <img src={todopic} alt="ToDo Icon" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{todo.title}</div>
                    <div className="text-sm opacity-50">Canada, Montreal</div>
                  </div>
                </div>
              </td>
              <td>
                {todo.description}
                <br />
                <span className="badge badge-ghost badge-sm">badge</span>
              </td>
              <th>
                <button
                  className="btn btn-ghost btn-xs text-cyan-500"
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                >
                  Edit
                </button>
                <button className="btn btn-ghost btn-xs text-red-500">
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
