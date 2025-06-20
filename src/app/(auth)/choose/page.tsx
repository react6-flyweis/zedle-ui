"use client";

import Image from "next/image";
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

const userTypes = [
  {
    iconSrc: userIcon,
    title: "User",
    description: "Order and enjoy our services",
  },
  {
    iconSrc: vendorIcon,
    title: "Vendor",
    description: "Sell your products and services",
  },
  {
    iconSrc: partnerIcon,
    title: "Delivery Partner",
    description: "Deliver orders and earn money",
  },
];
const serviceOptions = [
  {
    iconSrc: groceryIcon,
    title: "Grocery Delivery",
  },
  {
    iconSrc: truckIcon,
    title: "Logistics",
  },
  {
    iconSrc: foodIcon,
    title: "Food Delivery",
  },
  {
    iconSrc: travelIcon,
    title: "Travel & Tourism",
  },
  {
    iconSrc: hairDresserIcon,
    title: "Enterprise Hub",
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
          onClick={() => setSelectedUserType(userType.title)}
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

const ServiceButtons = ({ activeTab }: { activeTab: string }) => {
  const router = useRouter();
  return (
    <div className="w-full space-y-2">
      {serviceOptions.map((service) => (
        <Card
          key={service.title}
          className="p-0 overflow-hidden border border-primary transition-colors"
        >
          <Button
            variant="ghost"
            className="w-full h-auto p-4 justify-start text-left hover:bg-pink-50 rounded-none"
            onClick={() => {
              const targetPath =
                activeTab === "signup"
                  ? `/signup?category=${encodeURIComponent(service.title)}`
                  : `/login?category=${encodeURIComponent(service.title)}`;
              router.push(targetPath);
            }}
          >
            <div className="relative mr-3">
              <Image
                src={service.iconSrc}
                alt={service.title}
                className="max-h-8 max-w-8 object-contain"
              />
            </div>
            <div className="font-semibold text-gray-900 text-lg">
              {service.title}
            </div>
          </Button>
        </Card>
      ))}
    </div>
  );
};

// Component that uses useSearchParams
function ChoosePageContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("signup") ? "signup" : "login";
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(defaultTab);

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
            <UserTypeButtons setSelectedUserType={setSelectedUserType} />
          ) : (
            <ServiceButtons activeTab={activeTab} />
          )}
        </TabsContent>

        <TabsContent value="signup" className="flex justify-center">
          {!selectedUserType ? (
            <UserTypeButtons setSelectedUserType={setSelectedUserType} />
          ) : (
            <ServiceButtons activeTab={activeTab} />
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
