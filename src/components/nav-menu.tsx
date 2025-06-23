import { ChevronsDown } from "lucide-react";
import Link from "next/link";
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
                <Link href={item.href} passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      chipStyle
                        ? "bg-transparent hover:bg-primary hover:text-white rounded-full flex flex-row  hover:[&>svg]:text-white!"
                        : "bg-transparent hover:bg-transparent hover:text-primary"
                    )}
                  >
                    <span>{item.title}</span>
                    {item.icon && (
                      <span className="ml-2 inline-flex items-center">
                        {item.icon}
                      </span>
                    )}
                  </NavigationMenuLink>
                </Link>
              ) : (
                <>
                  <NavigationMenuTrigger
                    className={cn(
                      chipStyle
                        ? "bg-transparent hover:bg-primary hover:text-white rounded-full data-[state=open]:bg-primary data-[state=open]:text-white data-[active]:bg-primary data-[active]:text-white focus:bg-primary focus:text-white [&>svg]:hidden"
                        : "bg-transparent hover:bg-transparent hover:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary data-[active]:bg-transparent focus:bg-transparent [&>svg]:hidden"
                    )}
                  >
                    <span className="flex items-center">
                      {item.title}
                      <ChevronsDown
                        className={cn(
                          "relative top-[1px] ml-1 size-3 transition duration-300",
                          chipStyle && "group-hover:text-white"
                        )}
                      />
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-60 rounded-none bg-accent z-50">
                    <ul className="">
                      {item.items?.map((subItem) => (
                        <ListItem
                          key={subItem.href}
                          title={subItem.title}
                          href={subItem.href}
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
  // children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  // children?: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-2">
            <div className="">
              <div className="size-3 border border-gray-300 bg-gray-200 rounded-full"></div>
            </div>
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          {/* <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p> */}
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
