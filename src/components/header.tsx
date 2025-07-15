"use client";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import logo from "@/assets/images/logo-horizontal.png";
import { LanguageSelector } from "@/components/LanguageSelector";
import { type NavigationItem, NavMenu } from "@/components/nav-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SubHeader from "./SubHeader";

interface HeaderProps {
  chipMenuStyle?: boolean;
  navigation?: NavigationItem[];
  showAuthButtons?: boolean;
  centeredNavigation?: boolean;
  showLanguageSelector?: boolean;
}

export default function Header({
  chipMenuStyle,
  navigation,
  showAuthButtons = true,
  centeredNavigation = false,
  showLanguageSelector = false,
}: HeaderProps) {
  const t = useTranslations("header");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <SubHeader />
      <header className="w-full bg-accent shadow border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-5">
            {/* Logo */}
            <div className={centeredNavigation ? "flex-none" : "flex-1"}>
              <Link href="/" className="">
                <Image src={logo} alt="Zedle" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <NavMenu navigationItems={navigation} chipStyle={chipMenuStyle} />
              {showLanguageSelector && <LanguageSelector className="ml-2" />}
            </div>

            {/* Desktop Auth Buttons */}
            {showAuthButtons && (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/choose?tab=signin">
                  <Button className="rounded-full">{t("LogIn")}</Button>
                </Link>
                <Link href="/choose?tab=signup">
                  <Button className="rounded-full">{t("SignUp")}</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label={t("Menu")}
                >
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:hidden p-6 pt-8">
                <SheetTitle className="sr-only">Sidebar</SheetTitle>
                <div className="flex flex-col gap-6">
                  <NavMenu
                    navigationItems={navigation}
                    chipStyle={chipMenuStyle}
                    vertical
                    onLinkClick={handleLinkClick}
                  />
                  {showLanguageSelector && (
                    <div className="flex justify-center">
                      <LanguageSelector />
                    </div>
                  )}

                  {showAuthButtons && (
                    <div className="flex flex-col gap-3 mt-4">
                      <Link
                        href="/choose?signin=true"
                        onClick={handleLinkClick}
                      >
                        <Button className="rounded-full w-full">
                          {t("LogIn")}
                        </Button>
                      </Link>
                      <Link
                        href="/choose?signup=true"
                        onClick={handleLinkClick}
                      >
                        <Button className="rounded-full w-full">
                          {t("SignUp")}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
