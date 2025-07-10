"use client";

import Image, { type StaticImageData } from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import foodIcon from "@/assets/icons/food.png";
import groceryIcon from "@/assets/icons/grocery.png";
import hairDresserIcon from "@/assets/icons/hairdresser.png";
import partnerIcon from "@/assets/icons/partner.png";
import travelIcon from "@/assets/icons/travel.png";
import truckIcon from "@/assets/icons/truck.png";
// Import icons
import userIcon from "@/assets/icons/user.png";
import vendorIcon from "@/assets/icons/vendor.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CATEGORIES, type ICategory } from "@/constants/categories";

const userTypes = [
  {
    iconSrc: userIcon,
    title: "User",
    key: "user",
    description: "Order and enjoy our services",
  },
  {
    iconSrc: vendorIcon,
    title: "Vendor",
    key: "vendor",
    description: "Sell your products and services",
  },
  {
    iconSrc: partnerIcon,
    title: "Delivery Partner",
    key: "delivery",
    description: "Deliver orders and earn money",
  },
];

const serviceOptions: {
  iconSrc: string | StaticImageData;
  key: ICategory["key"];
}[] = [
  {
    iconSrc: groceryIcon,
    key: "grocery",
  },
  {
    iconSrc: truckIcon,
    key: "logistics",
  },
  {
    iconSrc: foodIcon,
    key: "food",
  },
  {
    iconSrc: travelIcon,
    key: "travel-tourism",
  },
  {
    iconSrc: hairDresserIcon,
    key: "enterprise",
  },
];

const UserTypeButtons = ({
  setSelectedUserType,
}: {
  setSelectedUserType: (type: string) => void;
}) => (
  <div className="w-full space-y-3">
    {userTypes.map((userType) => (
      <Card
        key={userType.title}
        className="p-0 overflow-hidden border border-primary transition-colors"
      >
        <Button
          variant="ghost"
          className="w-full h-auto p-6 justify-start text-left hover:bg-pink-50 rounded-none"
          onClick={() => setSelectedUserType(userType.key)}
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src={userType.iconSrc}
                alt={userType.title}
                className="max-h-8 max-w-8 object-contain"
              />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-xl">
                {userType.title}
              </div>
              <div className="text-gray-600 text-sm">
                {userType.description}
              </div>
            </div>
          </div>
        </Button>
      </Card>
    ))}
  </div>
);

const ServiceButtons = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const serviceButtonClickHandler = (serviceKey: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("category", serviceKey);
    const targetPath = searchParams.get("signup")
      ? `/signup?${newSearchParams.toString()}`
      : `/login?${newSearchParams.toString()}`;
    router.push(targetPath);
  };

  return (
    <div className="w-full space-y-2">
      {serviceOptions.map((service) => (
        <Card
          key={service.key}
          className="p-0 overflow-hidden border border-primary transition-colors"
        >
          <Button
            variant="ghost"
            className="w-full h-auto p-4 justify-start text-left hover:bg-pink-50 rounded-none"
            onClick={() => serviceButtonClickHandler(service.key)}
          >
            <div className="relative mr-3">
              <Image
                src={service.iconSrc}
                alt={service.key}
                className="max-h-8 max-w-8 object-contain"
              />
            </div>
            <div className="font-semibold text-gray-900 text-lg">
              {CATEGORIES.find((category) => category.key === service.key)
                ?.title || service.key}
            </div>
          </Button>
        </Card>
      ))}
    </div>
  );
};

// Component that uses useSearchParams
function ChoosePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("signup") ? "signup" : "login";
  const selectedType = searchParams.get("type");
  const [selectedUserType, setSelectedUserType] = useState(selectedType || "");
  const [activeTab, setActiveTab] = useState(defaultTab);

  const selectUserTypeHandler = (type: string) => {
    setSelectedUserType(type);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("type", type.toLowerCase());
    if (type === "delivery") return router.push(`/login?${newSearchParams}`);
    router.push(`?${newSearchParams}`);
  };

  return (
    <div className=" flex items-center justify-center">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-transparent">
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-white data-[state=active]:border-b-4 border-black border-0 rounded-md py-3 text-lg"
          >
            LOG IN
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-white data-[state=active]:border-b-4 border-black border-0 rounded-md py-3 text-lg"
          >
            SIGN UP
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="flex justify-center">
          {!selectedUserType ? (
            <UserTypeButtons setSelectedUserType={selectUserTypeHandler} />
          ) : (
            <ServiceButtons />
          )}
        </TabsContent>

        <TabsContent value="signup" className="flex justify-center">
          {!selectedUserType ? (
            <UserTypeButtons setSelectedUserType={selectUserTypeHandler} />
          ) : (
            <ServiceButtons />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ChoosePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChoosePageContent />
    </Suspense>
  );
}
