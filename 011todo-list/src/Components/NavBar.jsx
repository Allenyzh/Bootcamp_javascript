import { Link } from "react-router";

export default function NavBar() {
  return (
    <div className="navbar bg-base-200">
      <Link to="/011todolist" className="btn btn-ghost text-xl mx-auto">
        TODO List
      </Link>
    </div>
  );
}
