import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <a
        href="/"
        className="text-primary font-heading text-2xl font-semibold"
        aria-label="Med Hub Home"
      >
        Med Hub
      </a>
      <nav>
        <ul className="flex gap-4">
          <li>
            <a
              href="/login"
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="/signup"
              className="bg-primary text-white px-4 py-2 rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Cadastro
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}