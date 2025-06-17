import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import NavMenu from "@/components/nav-menu";

import logo from "@/assets/images/logo-horizontal.png";

export default function Header() {
  return (
    <header className="w-full bg-accent shadow border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="Zedle" className="h-8 w-auto" />
          </Link>

          {/* Navigation */}
          <NavMenu />

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button className="rounded-full">Log In</Button>
            <Button className="rounded-full">Sign up</Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
