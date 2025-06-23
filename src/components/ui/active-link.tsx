"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ActiveLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}

const ActiveLink = forwardRef<HTMLAnchorElement, ActiveLinkProps>(
  (
    { children, className, activeClassName, exact = false, href, ...props },
    ref,
  ) => {
    const pathname = usePathname();

    // Convert href to string for comparison
    const hrefString = typeof href === "string" ? href : href.pathname || "";

    // Check if the link is active
    const isActive = exact
      ? pathname === hrefString
      : pathname.startsWith(hrefString) && hrefString !== "/";

    // Special case for home page
    const isHomeActive = hrefString === "/" && pathname === "/";

    const linkIsActive =
      isHomeActive ||
      (!exact && hrefString !== "/" && isActive) ||
      (exact && isActive);

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, linkIsActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

ActiveLink.displayName = "ActiveLink";

export { ActiveLink };
