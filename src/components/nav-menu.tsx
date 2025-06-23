"use client";

import { ChevronsDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ActiveLink } from "@/components/ui/active-link";
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
        href: "/users/enterprise-hub",
      },
    ],
  },
  {
    title: "Vendor",
    type: "dropdown" as const,
    items: [
      {
        title: "Restaurants",
        href: "/vendors/restaurants",
        description: "Food and dining establishments",
      },
      {
        title: "Grocery Stores",
        href: "/vendors/grocery",
        description: "Grocery and convenience stores",
      },
      {
        title: "Retail Stores",
        href: "/vendors/retail",
        description: "Retail and shopping outlets",
      },
      {
        title: "Grocery Delivery",
        href: "/vendors/grocery-delivery",
        description: "Grocery delivery service providers",
      },
      {
        title: "Food Delivery",
        href: "/vendors/food-delivery",
        description: "Food delivery and restaurant partners",
      },
      {
        title: "Logistics",
        href: "/vendors/logistics",
        description: "Logistics and courier services",
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
  chipStyle?: boolean;
  navigationItems?: NavigationItem[];
}

export function NavMenu({
  chipStyle = false,
  navigationItems = defaultNavigationItems,
}: NavMenuProps) {
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
                      "group/nav flex-row transition-all duration-200 ease-in-out",
                      chipStyle
                        ? "bg-transparent hover:bg-primary hover:text-white rounded-full px-4 py-2 flex items-center gap-2 font-medium"
                        : "bg-transparent hover:bg-muted hover:text-primary px-3 py-2 rounded-md font-medium",
                    )}
                    activeClassName={cn(
                      chipStyle
                        ? "bg-primary text-white shadow-md border-primary/20"
                        : "bg-primary text-primary",
                    )}
                    href={item.href}
                    exact={true}
                  >
                    <span>{item.title}</span>
                    {item.icon && (
                      <span
                        className={cn(
                          "inline-flex items-center transition-colors duration-200",
                          "[&>svg]:size-4 [&>img]:size-4",
                          chipStyle
                            ? "[&>svg]:text-current [&>img]:brightness-0 [&>img]:invert group-hover/nav:[&>img]:brightness-0 group-hover/nav:[&>img]:invert"
                            : "[&>svg]:text-primary group-hover/nav:[&>svg]:text-primary [&>img]:filter [&>img]:brightness-0 [&>img]:contrast-200",
                        )}
                      >
                        {item.icon}
                      </span>
                    )}
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
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
            className,
          )}
          activeClassName="bg-primary/10 text-primary font-medium"
          {...props}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="size-2 rounded-full bg-muted-foreground/40 group-hover:bg-primary transition-colors duration-200"></div>
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
