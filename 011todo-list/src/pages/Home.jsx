import TodoList from "../Components/TodoList";
import { useTodoStore } from "../store/store";

export default function Home() {
  const title = useTodoStore((state) => state.title);
  const description = useTodoStore((state) => state.description);
  const setTitle = useTodoStore((state) => state.setTitle);
  const setDescription = useTodoStore((state) => state.setDescription);
  const addTodolist = useTodoStore((state) => state.addTodolist);

  return (
    <div className="flex flex-col items-center justify-center min-w-full pt-10 ">
      <div className="flex gap-4 flex-col md:flex-row items-center">
        <label className="input input-bordered flex items-center gap-2 max-w-40">
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="grow"
            placeholder="type here..."
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="grow"
            placeholder="type here..."
          />
        </label>
        <button className=" btn btn-accent" onClick={addTodolist}>
          Create
        </button>
      </div>
      <TodoList />
    </div>
  );
}
