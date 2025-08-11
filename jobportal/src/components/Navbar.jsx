import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-5 border-b border-base-300 max-h-[55px]" data-theme={"light"}>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5">
        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
          JobGenius
        </span>
      </Link>

      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-focus transition"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}
