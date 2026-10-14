import Link from "next/link";

export default function Header() {
  return (
    <header className="taskflow-navbar py-3">
      <div className="container">
        <Link
          href="/"
          className="taskflow-logo text-white text-decoration-none"
        >
          Task<span>Flow</span>
        </Link>
      </div>
    </header>
  );
}