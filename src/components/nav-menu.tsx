"use client";

import { ChevronsDown } from "lucide-react";
import { ActiveLink } from "@/components/ui/active-link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// Define navigation item types
export type NavigationItem =
  | {
      title: string;
      type: "link";
      href: string;
      icon?: React.ReactNode;
      items?: never;
    }
  | {
      title: string;
      type: "dropdown";
      items: {
        title: string;
        href: string;
        description?: string;
      }[];
      href?: never;
      icon?: never;
    };

// Default navigation structure
const defaultNavigationItems: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
    type: "link" as const,
  },
  {
    title: "Users",
    type: "dropdown" as const,
    items: [
      {
        title: "Grocery Delivery",
        href: "/users/grocery",
      },

      {
        title: "Logistics",
        href: "/users/logistics",
      },
      {
        title: "Food Delivery",
        href: "/users/food",
      },
      {
        title: "Travel & Tourism",
        href: "/users/travel-tourism",
      },
      {
        title: "Enterprise Hub",
        href: "/users/enterprise",
      },
    ],
  },
  {
    title: "Vendor",
    type: "dropdown" as const,
    items: [
      {
        title: "Grocery Delivery",
        href: "/vendor/grocery",
      },
      {
        title: "Logistics",
        href: "/vendor/logistics",
      },
      {
        title: "Food Delivery",
        href: "/vendor/food-delivery",
      },
      {
        title: "Travel & Tourism",
        href: "/vendor/travel-tourism",
      },
      {
        title: "Enterprise Hub",
        href: "/vendor/enterprise-hub",
      },
    ],
  },
  {
    title: "Delivery Partner",
    href: "/delivery-partner",
    type: "link" as const,
  },
  {
    title: "About Us",
    href: "/about",
    type: "link" as const,
  },
];

interface NavMenuProps {
  navigationItems?: NavigationItem[];
  chipStyle?: boolean;
  vertical?: boolean;
}

export function NavMenu({
  chipStyle = false,
  navigationItems = defaultNavigationItems,
  vertical = false,
}: NavMenuProps) {
  if (vertical) {
    return (
      <nav>
        <ul className="flex flex-col gap-2">
          {navigationItems.map((item) =>
            item.type === "link" ? (
              <li key={item.title + item.href}>
                <ActiveLink
                  href={item.href}
                  className={cn(
                    "block w-full px-4 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-primary",
                    chipStyle && "rounded-full",
                  )}
                  activeClassName="bg-primary text-white"
                  exact={true}
                >
                  {item.title}
                </ActiveLink>
              </li>
            ) : (
              <li key={item.title + "dropdown"} className="relative group">
                <span className="block w-full px-4 py-2 rounded-md text-base font-medium cursor-pointer select-none group-hover:bg-accent">
                  {item.title}
                </span>
                <ul className="hidden group-hover:block absolute left-full top-0 min-w-[180px] bg-card border rounded-lg shadow-lg z-50 p-2 ml-2">
                  {item.items.map((subItem) => (
                    <li key={subItem.href}>
                      <ActiveLink
                        href={subItem.href}
                        className="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-primary transition-colors"
                        activeClassName="bg-primary/10 text-primary font-medium"
                      >
                        <div className="flex flex-col">
                          <span>{subItem.title}</span>
                          {subItem.description && (
                            <span className="text-xs text-muted-foreground mt-1">
                              {subItem.description}
                            </span>
                          )}
                        </div>
                      </ActiveLink>
                    </li>
                  ))}
                </ul>
              </li>
            ),
          )}
        </ul>
      </nav>
    );
  }

  return (
    <div className="hidden md:block">
      <NavigationMenu viewport={false}>
        <NavigationMenuList className={cn(chipStyle && "gap-3 xl:gap-5")}>
          {navigationItems.map((item) => (
            <NavigationMenuItem
              key={item.title + item.type + item.href}
              className={cn(item.type !== "link" && "relative")}
            >
              {item.type === "link" ? (
                <NavigationMenuLink asChild>
                  <ActiveLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "flex-row transition-all duration-200 ease-in-out",
                      chipStyle
                        ? "bg-transparent hover:bg-primary hover:text-white rounded-full px-4 py-2 flex items-center gap-2 font-medium hover:[&>svg]:text-white! hover:[&>img]:invert hover:[&>img]:brightness-0"
                        : "bg-transparent hover:bg-muted hover:text-primary px-3 py-2 rounded-md font-medium",
                    )}
                    activeClassName={cn(
                      chipStyle
                        ? "bg-primary text-white shadow-md border-primary/20 [&>svg]:text-white! [&>img]:invert [&>img]:brightness-0"
                        : "text-primary",
                    )}
                    href={item.href}
                    exact={true}
                  >
                    <span>{item.title}</span>
                    {item.icon}
                  </ActiveLink>
                </NavigationMenuLink>
              ) : (
                <>
                  <NavigationMenuTrigger
                    className={cn(
                      "group/nav transition-all duration-200 ease-in-out",
                      chipStyle
                        ? "bg-transparent hover:bg-primary hover:text-white hover:shadow-md rounded-full px-4 py-2 border border-transparent hover:border-primary/20 data-[state=open]:bg-primary data-[state=open]:text-white data-[state=open]:shadow-md data-[active]:bg-primary data-[active]:text-white focus:bg-primary focus:text-white font-medium [&>svg]:hidden"
                        : "bg-transparent hover:bg-muted hover:text-primary px-3 py-2 rounded-md data-[state=open]:bg-muted data-[state=open]:text-primary data-[active]:bg-muted data-[active]:text-primary focus:bg-muted focus:text-primary font-medium [&>svg]:hidden",
                    )}
                  >
                    <span className="flex items-center gap-1">
                      {item.title}
                      <ChevronsDown
                        className={cn(
                          "size-4 transition-transform duration-200 group-data-[state=open]/nav:rotate-180",
                          chipStyle
                            ? "text-current"
                            : "text-muted-foreground group-hover/nav:text-primary group-data-[state=open]/nav:text-primary",
                        )}
                      />
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-60 rounded-lg bg-card border shadow-lg z-50 p-2">
                    <ul className="space-y-1">
                      {item.items?.map((subItem) => (
                        <ListItem
                          key={subItem.href}
                          title={subItem.title}
                          href={subItem.href}
                          description={subItem.description}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

// Helper component for dropdown items
const ListItem = ({
  className,
  title,
  href,
  description,
  ...props
}: {
  className?: string;
  title: string;
  href: string;
  description?: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <ActiveLink
          href={href}
          className={cn(
            "relative block select-none rounded-md p-3 leading-none no-underline outline-none group group/li hover:bg-transparent hover:text-primary",
            className,
          )}
          activeClassName="text-primary font-medium is-active"
          {...props}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex justify-end w-4">
                <div className="h-0.5 w-0 bg-primary invisible group-[.is-active]:visible group-hover/li:visible group-[.is-active]:w-4 group-hover/li:w-4 transition-all duration-300"></div>
              </div>
              <div className="size-3 border border-muted-foreground rounded-full bg-muted group-hover/li:bg-primary group-[.is-active]:bg-primary transition-colors duration-200"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium leading-none truncate">
                {title}
              </div>
              {description && (
                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
        </ActiveLink>
      </NavigationMenuLink>
    </li>
  );
};
