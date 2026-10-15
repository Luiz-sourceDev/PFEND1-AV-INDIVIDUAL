import Image from "next/image";
import Link from "next/link";

import taskFlowIcon from "../app/icon.png";

export default function Header() {
  return (
    <header className="taskflow-navbar py-3">
      <div className="container">
        <Link
          href="/"
          className="taskflow-logo text-white text-decoration-none d-inline-flex align-items-center"
        >
          <Image
            src={taskFlowIcon}
            alt=""
            width={32}
            height={32}
            className="me-2"
            priority
          />

          Task<span>Flow</span>
        </Link>
      </div>
    </header>
  );
}