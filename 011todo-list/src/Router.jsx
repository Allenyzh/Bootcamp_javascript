import { BrowserRouter, Routes, Route } from "react-router";
import TodoListLayout from "./pages/TodoListLayout";
import Home from "./pages/Home";
import "./Router.css";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/011todolist" element={<TodoListLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
