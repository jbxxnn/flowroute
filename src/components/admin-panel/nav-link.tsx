"use client";


import Link from "next/link"

export function NavLink() {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
          </Link>
          <Link
            href="/"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/customers"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
          <Link
            href="/plans"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Phone Plans
          </Link>
        </nav>
  );
}
