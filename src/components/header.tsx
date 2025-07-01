import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo-horizontal.png";
import { type NavigationItem, NavMenu } from "@/components/nav-menu";
import { Button } from "@/components/ui/button";
import SubHeader from "./SubHeader";

interface HeaderProps {
  chipMenuStyle?: boolean;
  navigation?: NavigationItem[];
  showAuthButtons?: boolean;
}

export default function Header({
  chipMenuStyle,
  navigation,
  showAuthButtons = true,
}: HeaderProps) {
  return (
    <>
      <SubHeader />
      <header className="w-full bg-accent shadow border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="Zedle" className="h-8 w-auto" />
            </Link>

            {/* Navigation */}
            <NavMenu navigationItems={navigation} chipStyle={chipMenuStyle} />

            {/* Auth Buttons */}
            {showAuthButtons && (
              <div className="flex items-center space-x-4">
                <Link href="/choose?signin=true">
                  <Button className="rounded-full">Log In</Button>
                </Link>
                <Link href="/choose?signup=true">
                  <Button className="rounded-full">Sign up</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
